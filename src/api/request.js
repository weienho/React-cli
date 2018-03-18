import axios from 'axios'
import { initConfig } from '../constants/config'
// import envs from '../envs'

const request = {}

//先读取json配置文件再初始化 读取 API 的axios
initConfig.then(function (configJson) {
    const instance = axios.create({
        baseURL: configJson.webApiBaseUrl.val,
        withCredentials: true, // 跨域 cookie
        // timeout: 1000,
        // headers: {'X-Custom-Header': 'foobar'}
    })

    request['post'] = (controller, action, params, headers, baseUrl) => {
        let uri = getUrl(baseUrl, controller, action)

        return instance.post(uri, params, { headers: headers }).then(res => {
            return res.data
        }).catch(async e => {
            console.log(e);
        })
    }

    request['get'] = (controller, action, params, headers, baseUrl) => {
        let uri = getUrl(baseUrl, controller, action)
        return instance.get(uri, { params: params, headers: headers }).then(res => {
            return res.data
        }).catch(async e => {
            //throw e
            console.log(e);
        })
    }


    //rsponse 拦截器
    instance.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        // 返回 401 清除sessionStorage中的会员相关信息并跳转到登录页面                   
                        // localStorage.removeItem(localStorage.signedAllInfo)
                        // store.commit('resetMemberTrade');
                        break;
                    case 500:
                        alert('系统错误，操作失败')
                        break;
                    case 404:
                        break;
                }
            }
            return Promise.reject(error.response.data) // 返回接口返回的错误信息
        });
})

// const instance = axios.create({
//         baseURL:common.webApiBaseUrl,
//         withCredentials: true, // 跨域 cookie
//         // timeout: 1000,
//         // headers: {'X-Custom-Header': 'foobar'}
//     })
// const defaultURL = 'http://localhost:5000/api'

/*
const methods = ['post', 'put', 'patch', 'delete', 'get', 'head']

methods.forEach(method => {
  request[method] = (...args) => {
    return instance[method](...args).then(res => {
      // if (!res.data || res.data.code !== 200) {
      //   // eslint-disable-next-line
      //   throw res.data
      // }
      return res.data
    }).catch(async e => {
      throw e
    })
  }
})
*/
const getUrl = (baseUrl, controller, action) => {
    let result = ''
    if (!(baseUrl === null || baseUrl === undefined || baseUrl === '')) {
        result = baseUrl
    }
    if (controller !== null && controller !== undefined && controller !== '') {
        result += '/' + controller
    }
    if (action !== null && action !== undefined && action !== '') {
        result += '/' + action
    }
    return result
}

export default request

// const defaultConfig = {
//   method: 'post'
// }
// export default (url, config) => {
//   config = Object.assign({}, defaultConfig, config)
//
//   return instance.request(config).catch(e => {
//     console.log('e', e)
//     return e
//   })
// }