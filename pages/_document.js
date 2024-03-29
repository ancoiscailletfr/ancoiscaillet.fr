// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
import Document, {
  Head, Html, Main, NextScript,
} from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='fr'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
