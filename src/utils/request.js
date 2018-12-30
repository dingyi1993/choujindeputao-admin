import axios from 'axios'
import { cloneDeep, isEmpty } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import qs from 'qs'
import cookie from 'js-cookie'

const { CancelToken } = axios
window.cancelRequest = new Map()

export default function request(options) {
  let { data, url, method = 'get' } = options
  console.log('request options:', options)
  const cloneData = cloneDeep(data)

  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }

    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (e) {
    message.error(e.message)
  }

  options.url =
    method.toLocaleLowerCase() === 'get'
      ? `${url}${isEmpty(cloneData) ? '' : '?'}${qs.stringify(cloneData)}`
      : url

  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })
  // options.headers = {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  // }
  const token = cookie.get('jwt_token')
  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
    }
  }
  if (method.toLocaleLowerCase() === 'post') {
    options.data = qs.stringify(data)
  }

  return axios(options)
    .then(response => {
      const { statusText, status, data } = response

      // let result = {}
      // if (typeof data === 'object') {
      //   result = data
      //   if (Array.isArray(data)) {
      //     result.list = data
      //   }
      // }

      console.log('response:', {
          ...data,
      })
      if (data.code === 0) {
        return Promise.resolve({
          success: true,
          ...data,
        })
      } else if (data.code === 401) {
        return Promise.resolve({
          success: true,
          msg: data.msg,
        })
      }
      return Promise.reject({
        success: false,
        message: data.error,
        ...data,
      })
    })
    .catch(error => {
      console.error(error)
      const { response, message } = error

      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
        }
      }

      let msg
      let code

      if (response && response instanceof Object) {
        const { data, statusText } = response
        code = response.status
        msg = data.message || statusText
      } else {
        code = 600
        msg = error.message || 'Network Error'
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        code,
        message: msg,
      })
    })
}
