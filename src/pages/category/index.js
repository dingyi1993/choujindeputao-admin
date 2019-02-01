import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'

@connect(({ category, loading }) => ({ category, loading }))
class Category extends PureComponent {
  render() {
    const { location, dispatch, category, loading } = this.props
    const { query, pathname } = location
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      modalType,
    } = category

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
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`category/${modalType}`],
      title: modalType === 'create' ? '创建分类' : '更新分类',
      centered: true,
      onOk(data) {
        dispatch({
          type: `category/${modalType}`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'category/hideModal',
        })
      },
    }

    const listProps = {
      dataSource: list,
      loading: loading.effects['category/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem(id) {
        dispatch({
          type: 'category/delete',
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
          type: 'category/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
    }

    const filterProps = {
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
          type: 'category/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }

    return (
      <Page inner>
        <Filter {...filterProps} />
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </Page>
    )
  }
}

Category.propTypes = {
  category: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Category
