import { pathMatchRegexp } from 'utils'
import { queryUser } from 'api'

export default {
  namespace: 'userDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/user/:id', pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const result = yield call(queryUser, payload)
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
