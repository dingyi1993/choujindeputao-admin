import { pathMatchRegexp } from 'utils'
import { queryBlog } from 'api'

export default {
  namespace: 'blogDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/blog/:id', pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const result = yield call(queryBlog, payload)
      const { success, data } = result
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data,
          },
        })
      } else {
        throw result
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
