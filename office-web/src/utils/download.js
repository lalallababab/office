// 封装导出数据工具类
import axios from "axios";

const service = axios.create({
    responseType: 'arraybuffer'
})

// 请求拦截器
service.interceptors.request.use(config => {
    config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr')
    return config
}, error => {
    console.log(error)
})

// 响应拦截器
service.interceptors.response.use(resp => {
    const headers = resp.headers
    let reg = RegExp(/application\/json/)
    // 判断是返回流还是Json字符串
    // 如果请求头匹配正则说明是一个普通请求
    if (headers['content-type'].match(reg)) {
        // 字符串对象
        resp.data = unitToString(resp.data)
    } else {
        let fileDownload = require('js-file-download')
        //文件名分割
        let fileName = headers['content-disposition'].split(';')[1].split('filename=')[1]
        let contentType = headers['content-type']
        fileName = decodeURIComponent(fileName)
        fileDownload(resp.data, fileName, contentType)

    }
}, error => {
    console.log(error)
})

// 编码 解码
function unitToString(unitArray) {
    let encodedString = String.fromCharCode.apply(null, new Uint8Array(unitArray))
    let decodedString = decodeURIComponent(escape(encodedString))
    return JSON.parse(decodedString)
}

// 下载文件
let base = ''
export const downloadRequest = (url, params) => {
    return service({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}
export default service;
