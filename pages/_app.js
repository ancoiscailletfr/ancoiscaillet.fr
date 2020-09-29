import Head from 'next/head'
import '../styles/base.css'
import React from 'react'

// eslint-disable-next-line react/prop-types
export default function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>François Caillet</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
