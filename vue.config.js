const { defineConfig } = require('@vue/cli-service');

const path = require('path');

module.exports = defineConfig({
    publicPath: './',
    devServer: {
        // 监听端口
        port: 10200,
        // 关闭主机检查，使微应用可以被 fetch
        historyApiFallback: true,
        allowedHosts: "all",
        // 配置跨域请求头，解决开发环境的跨域问题
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        open: true
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            }
        },
        output: {
            // 微应用的包名，这里与主应用中注册的微应用名称一致
            library: "card-highlighting",
            // 将你的 library 暴露为所有的模块定义下都可运行的方式
            libraryTarget: 'umd'
        }
    }
});
