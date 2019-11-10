import React from 'react'
import { autorun } from 'mobx'
import { inject, observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import { withSnackbar } from 'notistack'

@inject('store')
@observer
class Toaster extends React.Component {
  displayed = []
  storeDisplayed (id) {
    this.displayed.push(id)
  }

  componentDidMount () {
    autorun(() => {
      const {
        displayed,
        props: {
          store: {
            toast: {
              list = [],
              removeToast
            }
          }
        }
      } = this

      list.forEach(({ id, message, options = {} }) => {
        if (displayed.includes(id)) {
          return
        }

        const {
          intl,
          ...newOptions
        } = options

        if (intl) {
          message = this.props.intl.formatMessage({ id: message })
        }

        this.props.enqueueSnackbar(message, newOptions)
        this.storeDisplayed(id)
        removeToast(id)
      })
    })
  }

  render () {
    return null
  }
}

export default withSnackbar(injectIntl(Toaster))
