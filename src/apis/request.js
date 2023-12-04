import axios from 'axios'
import { stringify } from 'qs'
import { get, merge, isEmpty } from 'lodash'
// import { getStorage } from '@/utils/storage'
import log from '@/utils/log'
// import router from '@/router'
import { ElMessage } from 'element-plus'

// 创建axios实例
function createService() {
  const service = axios.create()

  service.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    ({ data, config }) => {
      switch (data.code) {
        case 200:
          return data
        default:
          ElMessage.error(data.msg)
          return Promise.reject(new Error(data.msg))
      }
    },
    (error) => {
      log.danger('err ===> ' + error)
      return Promise.reject(error)
    }
  )

  return service
}

function createRequest(service) {
  return function (config) {
    const configDefault = {
      headers: {
        'Content-Type': get(config, 'headers.Content-Type', 'application/json'),
        timeout: 1000 * 60,
        baseURL: config.baseURL || process.env.VUE_APP_BASE_API,
        data: {}
      }
    }
    const option = merge(configDefault, config)
    if (option.method === 'get') {
      option.params = option.data
      delete option.data
    }
    if (!isEmpty(option.params)) {
      option.url = option.url + '?' + stringify(option.params, { allowDots: true, encode: false })
      option.params = {}
    }
    return service(option)
  }
}

const service = createService()
export const request = createRequest(service)
