// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { APP_NAME } from '@/lib/constants'
import xw from 'xwind'
import Loader from '@/components/assets/Loader'

// noinspection HtmlRequiredTitleElement,JSUnresolvedVariable
export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    return await Document.getInitialProps(ctx)
  }

  render () {
    return (
      <Html lang='fr' css={xw`overflow-x-hidden`}>
        <Head>
          <script async src='https://www.googletagmanager.com/gtag/js?id=G-NFPV2GTSD1' />
          <script dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-NFPV2GTSD1');`
          }}
          />
          <meta charSet='utf-8' />
          <meta name='application-name' content={APP_NAME} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={APP_NAME} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='icons/browserconfig.xml' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='msapplication-TileColor' content='#D40707' />
          <meta name='theme-color' content='#141414' />

          <link rel='shortcut icon' type='image/x-icon' href='/icons/favicon.ico' />
          <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='192x192' href='/icons/android-chrome-192x192.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
          <link rel='icon' type='image/png' sizes='150x150' href='/icons/mstile-150x150.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#141414' />

          <script type='text/javascript' src='modernizr-custom.js' />
          <script dangerouslySetInnerHTML={{
            __html: 'window.onload = () => { document.getElementById(\'loader\').dataset.hide = \'true\'}'
          }}
          />
        </Head>
        <body css={xw`font-body overflow-hidden h-full w-full xs:fixed hmd[fixed hsm:fixed lg:static]`}>
          <Loader />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
