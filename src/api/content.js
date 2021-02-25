
import axios from '@/utils/request'
// 这个插件可以帮助把get接受的参数直接以字符串的形式写在路由上
import qs from 'qs'

// 读取文章列表
const getLists = (options) => axios.get('/public/list?' + qs.stringify(options))

// 图片上传接口
const uploadImg = (formData) => axios.post('/content/upload', formData)

// 发帖接口
const addPost = (data) => axios.post('/content/add', {
  ...data
})

export {
  getLists,
  uploadImg,
  addPost
}
