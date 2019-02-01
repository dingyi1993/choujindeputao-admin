/* global window */

import { router } from 'utils'
import { stringify } from 'qs'
import cookie from 'js-cookie'
import store from 'store'
import { ROLE_TYPE } from 'utils/constant'
import { queryLayout, pathMatchRegexp } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import { logoutUser, queryUserInfo } from 'api'
import config from 'config'

export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit: [],
    },
    routeList: [
      {
        id: '1',
        icon: 'laptop',
        name: '仪表盘',
        router: '/dashboard',
      },
    ],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },

    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const { success, data } = yield call(queryUserInfo, payload)
      const { locationPathname } = yield select(_ => _.app)

      if (success && data) {
        const routeList = [
          {
            id: '1',
            icon: 'dashboard',
            name: '仪表盘',
            route: '/dashboard',
          },
          // {
          //   id: '2',
          //   breadcrumbParentId: '1',
          //   name: 'Users',
          //   icon: 'user',
          //   route: '/user',
          // },
          {
            id: '7',
            breadcrumbParentId: '1',
            name: '博客管理',
            icon: 'read',
            route: '/blog',
          },
          {
            id: '71',
            menuParentId: '-1',
            breadcrumbParentId: '7',
            name: '博客详情',
            route: '/blog/:id',
          },
          {
            id: '8',
            breadcrumbParentId: '1',
            name: '分类管理',
            icon: 'folder',
            route: '/category',
          },
          // {
          //   id: '21',
          //   menuParentId: '-1',
          //   breadcrumbParentId: '2',
          //   name: '用户详情',
          //   route: '/user/:id',
          // },
          // {
          //   id: '4',
          //   breadcrumbParentId: '1',
          //   name: 'UI组件',
          //   icon: 'camera-o',
          // },
          // {
          //   id: '45',
          //   breadcrumbParentId: '4',
          //   menuParentId: '4',
          //   name: 'Editor',
          //   icon: 'edit',
          //   route: '/UIElement/editor',
          // },
          // {
          //   id: '5',
          //   breadcrumbParentId: '1',
          //   name: 'Charts',
          //   icon: 'code-o',
          // },
          // {
          //   id: '51',
          //   breadcrumbParentId: '5',
          //   menuParentId: '5',
          //   name: 'ECharts',
          //   icon: 'line-chart',
          //   route: '/chart/ECharts',
          // },
          // {
          //   id: '52',
          //   breadcrumbParentId: '5',
          //   menuParentId: '5',
          //   name: 'HighCharts',
          //   icon: 'bar-chart',
          //   route: '/chart/highCharts',
          // },
          // {
          //   id: '53',
          //   breadcrumbParentId: '5',
          //   menuParentId: '5',
          //   name: 'Rechartst',
          //   icon: 'area-chart',
          //   route: '/chart/Recharts',
          // },
        ]
        const permissions = { role: 'admin' }
        if (
          permissions.role === ROLE_TYPE.ADMIN ||
          permissions.role === ROLE_TYPE.DEVELOPER
        ) {
          permissions.visit = routeList.map(item => item.id)
        }
        yield put({
          type: 'updateState',
          payload: {
            user: data,
            permissions,
            routeList,
          },
        })
        if (pathMatchRegexp('/login', window.location.pathname)) {
          router.push({
            pathname: '/dashboard',
          })
        }
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        router.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname,
          }),
        })
      }
    },

    *signOut({ payload }, { call, put }) {
      const data = yield call(logoutUser)
      if (data.success) {
        cookie.remove('jwt_token')
        yield put({
          type: 'updateState',
          payload: {
            user: {},
            permissions: { visit: [] },
            menu: [
              {
                id: '1',
                icon: 'laptop',
                name: '仪表盘',
                router: '/dashboard',
              },
            ],
          },
        })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },
  },
}
