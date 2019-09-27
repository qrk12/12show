import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = getToken()
    config.validateStatus = function(status) {
      return status < 500 // 报错拦截的状态吗
    }

    if (config.data && config.data.isUpload) {
      // 上传文件修改上传的类型
      const formData = new FormData()
      formData.append('file', config.data.file, 'crop.jpg')
      formData.append('type', config.data.type)
      config.data = formData
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const data = response.data
    if (response.status < 300) {
      return Promise.resolve(data)
    } else {
      // 错误
      Message({
        message: data.error,
        type: 'error',
        duration: 5000
      })

      if (response.status === 401 || response.status === 403) {
        removeToken()
        console.log('重新登录')
        location.reload()
      }

    //   return Promise.reject(new Error(data.error || 'Error'))
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
