import axios from 'axios'

// 导出一个函数方便其他调用
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
    // 请求拦截
  instance.interceptors.request.use(config => {

    return config
  }, err => {
    console.log(err)
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 把请求数据和拦截后返回的值，返回的为promise，
  return instance(config)

}

