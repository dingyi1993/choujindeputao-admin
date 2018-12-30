import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import {
  NumberCard,
  Quote,
  Browser,
  User,
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
    const { avatar, username, dashboard, loading } = this.props
    const {
      quote,
      numbers,
      browser,
      user,
    } = dashboard

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
          <Col lg={6} md={24}>
            <Row gutter={24}>
              <Col lg={24} md={12}>
              </Col>
              <Col lg={24} md={12}>
                <Card
                  bordered={false}
                  className={styles.quote}
                  bodyStyle={{
                    padding: 0,
                    height: 204,
                    background: Color.peach,
                  }}
                >
                  <ScrollBar>
                    <Quote {...quote} />
                  </ScrollBar>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg={12} md={24}>
          </Col>
          <Col lg={12} md={24}>
          </Col>
          <Col lg={24} md={24}>
          </Col>
          <Col lg={8} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <Browser data={browser} />
            </Card>
          </Col>
          <Col lg={8} md={24}>
          </Col>
          <Col lg={8} md={24}>
            <Card
              bordered={false}
              bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}
            >
              <User {...user} avatar={avatar} username={username} />
            </Card>
          </Col>
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
