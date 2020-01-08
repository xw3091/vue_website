module.exports = {
    // 部署应用包的基本URL
    publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
    // 生产环境目录名
    outputDir: "dist",
    // 生成文件是否包含哈希值
    filenameHashing: true,
    // 服务配置
    devServer: {
        host: "0.0.0.0",
        port: 8989,
        https: false,
        open: true
    },
    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': []
            }
        }
    }
}
