import axios from "axios";
import {Message} from "element-ui";
import router from "@/router";

// 请求拦截器
axios.interceptors.request.use(config => {
    // 如果存在 token，头部添加
    if (window.sessionStorage.getItem("tokenStr")) {
        // key Authorization valuetokenStr
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr')
    }
    return config;
},error => {
    console.log(error)
})

// 响应拦截器
axios.interceptors.response.use(success => {
    // 错误判断
    if (success.status && success.status === 200) {
        if (success.data.code === 500 || success.data.code === 401 || success.data.code === 403) {
            Message.error({message: success.data.message})
            return
        }
        if (success.data.message) {
            Message.success({message: success.data.message})
        }
    }
    return success.data
}, error => {
    if (error.response.code === 504 || error.response.code === 404) {
        Message.error({message: '服务器被吃掉了'})
    } else if (error.response.code === 403) {
        Message.error({message: '权限不足，请联系管理员！'})
    } else if (error.response.code === 401) {
        Message.error({message: '您还未登录，请登录！'})
        router.replace('/') // 路由替换
    } else {
        if (error.response.data.message) {
            Message.error({message: error.response.data.message})
        } else {
            Message.error({message: '未知错误！'})
        }
    }
    return
})

// 前置路径
let base = '';

//post请求
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}

// get请求
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}

// put请求
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}

// delete请求
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}
