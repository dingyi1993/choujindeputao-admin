import React, { Component } from 'react'
import withRouter from 'umi/withRouter'
import BaseLayout from './BaseLayout'

@withRouter
class Layout extends Component {
  render() {
    const { children } = this.props
    return (
      <BaseLayout>{children}</BaseLayout>
    )
  }
}

export default Layout
