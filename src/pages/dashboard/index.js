import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import {
  NumberCard,
  Browser,
} from './components'
import styles from './index.less'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

@connect(({ app, dashboard, loading }) => ({
  avatar: app.user.avatar,
  username: app.user.username,
  dashboard,
  loading,
}))
class Dashboard extends PureComponent {
  render() {
    const { dashboard, loading } = this.props
    const {
      browser,
    } = dashboard
    const numbers = [
      {
        icon: 'bar-chart',
        color: Color.green,
        title: '博客数',
        number: 2781,
      },
      {
        icon: 'bar-chart',
        color: Color.blue,
        title: '分类数',
        number: 3241,
      },
      {
        icon: 'bar-chart',
        color: Color.purple,
        title: '标签数',
        number: 253,
      },
      {
        icon: 'bar-chart',
        color: Color.red,
        title: '运行天数',
        number: 4324,
      },
    ]

    const numberCards = numbers.map((item, key) => (
      <Col key={key} lg={6} md={12}>
        <NumberCard {...item} />
      </Col>
    ))

    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
        className={styles.dashboard}
      >
        <Row gutter={24}>
          {numberCards}
          <Col lg={18} md={24}>
          </Col>
          {/* <Col lg={8} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <Browser data={browser} />
            </Card>
          </Col> */}
        </Row>
      </Page>
    )
  }
}

Dashboard.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default Dashboard
