import { router, pathMatchRegexp } from 'utils'
import { loginUser } from 'api'
import cookie from 'js-cookie'

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { put, call, select }) {
      const result = yield call(loginUser, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (result.success) {
        cookie.set('jwt_token', result.data.token)
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (!pathMatchRegexp('/login', from)) {
          if (from === '/') router.push('/dashboard')
          else router.push(from)
        } else {
          router.push('/dashboard')
        }
      } else {
        throw result
      }
    },
  },
}
