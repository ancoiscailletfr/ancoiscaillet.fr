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

const script = `(function(){var c=null,d=document.documentElement;try{c=localStorage.getItem('theme')}catch(e){}if(c!=='light'&&c!=='dark')c='system';d.dataset.themeChoice=c;d.dataset.theme=c==='system'?(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'):c})();`;

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d0f1f' },
    { media: '(prefers-color-scheme: light)', color: '#fbf8f3' },
  ],
};

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
