import React from 'react'
// import { withBaseApi } from '../../api/base'

class ErrorCatcher extends React.Component {
  async componentDidCatch (...error) {
    this.props.api.log({ content: JSON.stringify(error) })
  }

  componentDidMount () {
    window.onerror = (...error) => {
      this.props.api.log({ content: JSON.stringify(error) })
    }
  }

  render () {
    return this.props.children
  }
}

// export default withBaseApi(ErrorCatcher)
export default ErrorCatcher
