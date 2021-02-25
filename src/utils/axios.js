/**
 * 封装axios的请求，返回重新封装的数据格式
 * 对错误的统一处理
 * to => ./request.js
 */

import axios from 'axios'
import errorHandle from './errorHandle'
import store from '@/store'
import publicConfig from '@/config'

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      // 超时时间设置为10s
      timeout: 10000
    }
    return config
  }
  // 设定拦截器
  interceptors(instance) {
    // 请求拦截器
    instance.interceptors.request.use((config) => {
      // Do something before request is sent
      let isPublic = false
      publicConfig.publicPath.map((path) => {
        // 过滤
        isPublic = isPublic || path.test(config.url)
      })
      const token = store.state.token
      if (!isPublic && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }, (err) => {
      // 错误处理
      errorHandle(err)
      return Promise.reject(err)
    })

    // 响应请求的拦截器
    instance.interceptors.response.use((res) => {
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, (err) => {
      // 错误处理
      errorHandle(err)
      return Promise.reject(err)
    })
  }
  // 创建实例
  request(options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }
  get(url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config)
    return this.request(options)
  }
  post(url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
