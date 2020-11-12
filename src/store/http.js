import axios from 'axios'
import QS from 'qs'

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://172.16.53.78:8090/'
  // axios.defaults.baseURL = 'http://127.0.0.1:8090/'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = 'http://198.74.122.84:8080/'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://47.242.84.38:8080/'
}

axios.defaults.timeout = 10000

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 响应拦截
// axios.interceptors.response.use(response => {

// }, error => {

// })

var get = function (url, params) {
  let token = sessionStorage.getItem('token')
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      params: params,
      url: url,
      headers: {
        'token': token
      },
      paramsSerializer: function (params) {
        return QS.stringify(params, {arrayFormat: 'repeat'})
      }
    })
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error.data)
    })
  })
}

var post = function (url, params) {
  let token = sessionStorage.getItem('token')
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      data: QS.stringify(params),
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'token': token
      }
    }).then(response => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error.data)
    })
  })
}

var postJson = function (url, params) {
  let token = sessionStorage.getItem('token')
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      data: JSON.stringify(params),
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    }).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error.data)
    })
  })
}

export default {
  get: get,
  post: post,
  postJson: postJson
}
