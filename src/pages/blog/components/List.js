import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import moment from 'moment'
import { Ellipsis } from 'ant-design-pro'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: 'banner',
        dataIndex: 'banner',
        render: text => <Avatar shape="square" src={text ? ('http://127.0.0.1:3000' + text) : ''} />,
      },
      {
        title: '标题',
        dataIndex: 'title',
        render: (text, record) => (
          <Link to={`blog/${record.id}`}><Ellipsis tooltip length={30}>{text}</Ellipsis></Link>
        ),
      },
      {
        title: '分类',
        dataIndex: 'category.name',
      },
      {
        title: '标签',
        dataIndex: 'tags',
      },
      {
        title: i18n.t`Visibility`,
        dataIndex: 'visibility',
      },
      {
        title: i18n.t`Comments`,
        dataIndex: 'comments',
      },
      {
        title: i18n.t`Views`,
        dataIndex: 'views',
      },
      {
        title: '发布日期',
        dataIndex: 'datetime',
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: i18n.t`Update` },
                { key: '2', name: i18n.t`Delete` },
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
