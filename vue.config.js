const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: config => {
      config.resolve.alias.set('@$', resolve('src'))
    },
    outputDir: "dist",
    assetsDir: "assets",
    lintOnSave: false,
    devServer: {
      open: true,
      host: "localhost",
      port: "8081",
      https: false,
      hotOnly: false,
      // proxy: {
      //   "/api": {
      //     target: "http://localhost:8089", 
      //     ws: true,
      //     changeOrigin: true,
      //     pathRewrite: {
      //       "^/api": "",
      //     },
      //   },
      // },
    },
  };