/**
 * 实例化HttpRequest
 * 并将动态的baseUrl传入HttpRequest的实例中
 * 导出为axios
 * to => ../api 文件夹
 * api文件夹里封装了所有的接口，原始方法本应该是 import axios from 'axios'
 * 现在在api文件夹中统一引用本文件导出的axios import axios from '@/utils/request'
*/

import HttpRequest from './axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.process

const axios = new HttpRequest(baseUrl)

export default axios
