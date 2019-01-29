import React, { Component } from 'react'
import withRouter from 'umi/withRouter'
import { LocaleProvider } from 'antd'
import BaseLayout from './BaseLayout'
import zhCN from 'antd/lib/locale-provider/zh_CN'

@withRouter
class Layout extends Component {
  render() {
    const { children } = this.props
    return (
      <LocaleProvider locale={zhCN}>
        <BaseLayout>{children}</BaseLayout>
      </LocaleProvider>
    )
  }
}

export default Layout
