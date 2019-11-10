import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'

export default class extends Document {

  static async getInitialProps(context) {
    const {
      req: { locale },
      renderPage: originalRenderPage
    } = context

    const sheets = new ServerStyleSheets()

    context.renderPage = () => originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />)
      })

    const props = await super.getInitialProps(context)

    return {
      ...props,
      locale,
      styles: [
        <React.Fragment key="styles">
          {props.styles}
          {sheets.getStyleElement()}
        </React.Fragment>
      ]
    }
  }

  render () {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript
            }}
          />
          <NextScript />
          <div style={{ display: 'none' }}>{process.env.NODE_ENV}</div>
        </body>
      </html>
    )
  }
}
