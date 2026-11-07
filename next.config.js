const withMDX = require('@next/mdx')();
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
module.exports = (phase) =>
  withMDX({
    // MDX must enter Next's React Server Component compilation in webpack dev.
    pageExtensions: ['js', 'jsx', 'mdx'],
    experimental: { globalNotFound: true },
    ...(phase === PHASE_DEVELOPMENT_SERVER
      ? {
          async redirects() {
            return require('./vercel.json').redirects;
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
