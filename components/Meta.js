import Head from 'next/head'
import { APP_NAME } from '@/lib/constants'

/**
 * populate head with vendor script & other meta data
 * @returns {JSX.Element}
 * @constructor
 */
const Meta = () => (
  <Head>
    <script async src='https://www.googletagmanager.com/gtag/js?id=G-NFPV2GTSD1' />
    {/* eslint-disable-next-line react/no-danger -- TODO */}
    <script dangerouslySetInnerHTML={{
      __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-NFPV2GTSD1');`,
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

    <link rel='icon' type='image/x-icon' href='/icons/favicon.ico' />
    <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
    <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
    <link rel='icon' type='image/png' sizes='192x192' href='/icons/android-chrome-192x192.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
    <link rel='icon' type='image/png' sizes='150x150' href='/icons/mstile-150x150.png' />
    <link rel='manifest' href='/manifest.json' />
    <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#141414' />

    <script type='text/javascript' src='modernizr-custom.js' />

    {/* eslint-disable-next-line react/no-danger -- TODO */}
    <script dangerouslySetInnerHTML={{
      __html: 'window.onload = () => { document.getElementById(\'loader\').dataset.hide = \'true\'}',
    }}
    />
  </Head>
)

export default Meta
