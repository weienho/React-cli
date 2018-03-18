import axios from 'axios'

//获取数据文件专用 例如：json配置文件
const instance = axios.create({
    })
const request = {}

request['get'] = (url,params, headers) => {
    return instance.get(url, { params: params, headers: headers }).then(res => {        
        return res.data
    }).catch(async e => {
          //throw e
        console.log(e);
    })
}

export default request 