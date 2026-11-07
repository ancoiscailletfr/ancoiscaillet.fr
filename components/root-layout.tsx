import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import type { Lang } from '../content/site';
import { Footer } from './footer';
import { SiteNav } from './site-nav';
import '../app/globals.css';
import localFont from 'next/font/local';
import Script from 'next/script';

const font = localFont({
  src: '../app/fonts/fira-code-latin-wght-normal.woff2',
  weight: '300 700',
  display: 'swap',
  variable: '--font-code-local',
});
export const metadata: Metadata = {
  metadataBase: new URL('https://ancoiscaillet.fr'),
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon.ico', sizes: 'any' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
};
const script = `(function(){var saved=null;try{saved=localStorage.getItem('theme')}catch(e){}document.documentElement.dataset.theme=saved==='light'||saved==='dark'?saved:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')})();`;
export const viewport: Viewport = { themeColor: '#0d0f1f' };
export function RootLayout({ children, lang }: { children: ReactNode; lang: Lang }) {
  return (
    <html lang={lang} className={font.variable} suppressHydrationWarning>
      <body className="body">
        <Script id="theme" strategy="beforeInteractive">
          {script}
        </Script>
        <SiteNav lang={lang} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
