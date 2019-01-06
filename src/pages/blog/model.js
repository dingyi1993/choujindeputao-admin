/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import {
  queryBlogList,
  createBlog,
  removeBlog,
  openBlog,
  updateBlog,
  removeBlogList,
  queryCategoryList,
} from 'api'
import { pageModel } from 'utils/model'

export default modelExtend(pageModel, {
  namespace: 'blog',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/blog', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      !payload.status && (payload.status = -1)
      payload.admin = 1
      const result = yield call(queryBlogList, payload)
      const categoryResult = yield call(queryCategoryList)
      if (result) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: result.data.list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: result.data.count,
            },
          },
        })
        yield put({
          type: 'updateState',
          payload: {
            categories: categoryResult.data.list,
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeBlog, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.blog)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeBlogList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *open({ payload }, { call, put, select }) {
      const data = yield call(openBlog, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.blog)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createBlog, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      // const _id = yield select(({ blog }) => blog.currentItem._id)
      const newBlog = { ...payload }
      const data = yield call(updateBlog, newBlog)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
