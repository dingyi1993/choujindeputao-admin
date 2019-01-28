import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { queryDashboard } from 'api'
import { pathMatchRegexp } from 'utils'
import { model } from 'utils/model'

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    numbers: [],
    browser: [],
    user: {
      avatar:
        'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathMatchRegexp('/dashboard', pathname) ||
          pathMatchRegexp('/', pathname)
        ) {
          dispatch({ type: 'query' })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      // const data = yield call(queryDashboard, parse(payload))
      // yield put({
      //   type: 'updateState',
      //   payload: data,
      // })
    },
  },
})
