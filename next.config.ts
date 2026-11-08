import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import { redirects } from './vercel.json';

const withMDX = createMDX();

export default (phase: string): NextConfig =>
  withMDX({
    // MDX must enter Next's React Server Component compilation in webpack dev.
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    experimental: { globalNotFound: true },
    ...(phase === PHASE_DEVELOPMENT_SERVER
      ? {
          async redirects() {
            return redirects;
          },
          async rewrites() {
            return {
              beforeFiles: [
                { source: '/', destination: '/fr' },
                {
                  source: '/:path((?!en(?:/|$)|fr(?:/|$)|_next(?:/|$)|.*\\.).*)',
                  destination: '/fr/:path',
                },
              ],
            };
          },
        }
      : { output: 'export' }),
  });
