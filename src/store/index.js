import Vue from 'vue'
import Vuex from 'vuex'
// import WebSocketClient from '@/utils/websocket'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    token: '',
    isLogin: false,
    userInfo: {},
  },
  mutations: {
    // initWebSocket(state, config) {
    //   state.ws = new WebSocketClient(config)
    //   state.ws.init()
    // },
    setSid(state, value) {
      state.sid = value
    },
    setToken(state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    // 设置用户的基本信息
    setUserInfo(state, value) {
      if (value === '') return
      state.userInfo = value
      // 本地存储用户的基本信息
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 设置isLogin的状态
    setIsLogin(state, value) {
      state.isLogin = value
    }
  },
  actions: {},
  modules: {}
})