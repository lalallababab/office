let proxyObj = {} // 代理对象
//将域名发送到本地服务器 由本地服务器去找目标服务器 请求从服务端发送就不是跨域了
proxyObj['/'] = {
    // websocket
    ws: false,
    // 代理目标地址
    target: 'http://localhost:8081',
    // 发送请求头 host 会被设置 target
    changeOrigin: true,
    // 不重写请求地址
    pathRewrite: {
        '^/': '/'
    }
}

// 在线聊天 代理
proxyObj['/ws'] = {
    ws: true,
    target: 'ws://localhost:8081'
}


// 访问的默认的路径和端口
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj // 代理
    }
}
