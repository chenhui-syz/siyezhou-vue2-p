import axios from '@/utils/request'
import qs from 'qs'

// 用户签到
const userSign = () => axios.get('/user/fav')

// 更新用户基本资料
const updateUserInfo = (data) => axios.post('/user/basic', data)

// 确认修改用户名
const updateUsername = (data) => axios.get('/public/reset-email?' + qs.stringify(data))


// 获取用户未读消息
const getMsg = (data) => axios.get('/user/getmsg?' + qs.stringify(data))


export {
  userSign,
  updateUserInfo,
  updateUsername,
  getMsg
}
