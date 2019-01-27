import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar, Tag } from 'antd'
import moment from 'moment'
import { Ellipsis } from 'ant-design-pro'
import { DropOption } from 'components'
import Link from 'umi/link'
import styles from './List.less'

const { confirm } = Modal

class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onOpenItem, onEditItem } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要删除？',
        onOk() {
          onDeleteItem(record.id)
        },
      })
    } else if (e.key === '3') {
      confirm({
        title: '确定要打开？',
        onOk() {
          onOpenItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props
    const columns = [
      {
        title: 'banner',
        dataIndex: 'banner',
        render: text => <Avatar shape="square" src={text ? ((process.env.NODE_ENV === 'production' ? 'https://www.dingyi1993.com' : 'http://127.0.0.1:3000') + text) : ''} />,
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
        title: '状态',
        dataIndex: 'status',
        render: text => <Tag color={text === 1 ? 'green' : 'red'}>{text === 1 ? '开启' : '关闭'}</Tag>
      },
      {
        title: '评论数',
        dataIndex: 'comments',
      },
      {
        title: '浏览数',
        dataIndex: 'views',
      },
      {
        title: '发布日期',
        dataIndex: 'datetime',
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '更新日期',
        dataIndex: 'updateTime',
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: '更新' },
                record.status === 1 ? { key: '2', name: '删除' } : { key: '3', name: '打开' },
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
          showTotal: total => `总共 ${total} 条记录`,
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
