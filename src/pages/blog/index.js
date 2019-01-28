import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'

@connect(({ blog, loading }) => ({ blog, loading }))
class Blog extends PureComponent {
  render() {
    const { location, dispatch, blog, loading } = this.props
    const { query, pathname } = location
    const {
      list,
      categories,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      selectedRowKeys,
    } = blog

    const handleRefresh = newQuery => {
      router.push({
        pathname,
        search: stringify(
          {
            ...query,
            ...newQuery,
          },
          { arrayFormat: 'repeat' }
        ),
      })
    }

    const modalProps = {
      categories,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`blog/${modalType}`],
      title: modalType === 'create' ? '创建博客' : '更新博客',
      centered: true,
      onOk(data) {
        dispatch({
          type: `blog/${modalType}`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'blog/hideModal',
        })
      },
    }

    const listProps = {
      dataSource: list,
      loading: loading.effects['blog/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem(id) {
        dispatch({
          type: 'blog/delete',
          payload: id,
        }).then(() => {
          handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onOpenItem(id) {
        dispatch({
          type: 'blog/open',
          payload: id,
        }).then(() => {
          handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'blog/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'blog/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }

    const filterProps = {
      categories,
      filter: {
        ...query,
      },
      onFilterChange(value) {
        handleRefresh({
          ...value,
          page: 1,
        })
      },
      onAdd() {
        dispatch({
          type: 'blog/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }

    const handleDeleteItems = () => {
      dispatch({
        type: 'blog/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      }).then(() => {
        handleRefresh({
          page:
            list.length === selectedRowKeys.length && pagination.current > 1
              ? pagination.current - 1
              : pagination.current,
        })
      })
    }

    return (
      <Page inner>
        <Filter {...filterProps} />
        {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm
                title="Are you sure delete these items?"
                placement="left"
                onConfirm={handleDeleteItems}
              >
                <Button type="primary" style={{ marginLeft: 8 }}>
                  Remove
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        )}
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </Page>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Blog
