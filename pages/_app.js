import App from 'next/app'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'

import { ThemeProvider } from '@material-ui/styles'
import { SnackbarProvider } from 'notistack'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../public/theme'

import devConfig from '../config/config.dev'

import { initializeStore } from '../store'
import { isServer } from '../utils/env-utils'

import ErrorCatcher from '../components/common/error-catcher'

import Toaster from '../components/common/toaster'

import '../public/styles/common.css'

export default class BaseApp extends App {

  constructor (props) {
    super(props)
    this.store = initializeStore(props.isServer, props.initialState)
  }

  static async getInitialProps ({ Component, ctx }) {
    const store = initializeStore(isServer())

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const { req } = ctx
    const {
      locale = devConfig.defaultLocale,
      messages = {}
    } = req || window.__NEXT_DATA__.props

    return {
      initialState: getSnapshot(store),
      isServer,
      pageProps,
      locale,
      messages
    }
  }

  componentDidMount () {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render () {
    const { Component, pageProps, router, locale, messages } = this.props
    this.store.app.setLocale(locale)

    return (
      <ErrorCatcher>
        <IntlProvider
          locale={locale}
          messages={messages}
        > 
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={this.store}>
              <SnackbarProvider
                maxSnack={5}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <Toaster />
                <Component
                  className="page-component"
                  {...pageProps}
                  router={router}
                />
              </SnackbarProvider>
            </Provider>
          </ThemeProvider>
        </IntlProvider>
      </ErrorCatcher>
    )
  }
}
