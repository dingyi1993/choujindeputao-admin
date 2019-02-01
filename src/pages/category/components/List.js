import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import moment from 'moment'
import { DropOption } from 'components'
import styles from './List.less'

const { confirm } = Modal

class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要删除？',
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, tags, ...tableProps } = this.props
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '创建日期',
        dataIndex: 'createTime',
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
                { key: '2', name: '删除' },
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
}

export default List
