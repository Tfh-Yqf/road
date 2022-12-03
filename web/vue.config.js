const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  assetsDir: "static",
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
        threshold: 2048,
        deleteOriginalAssets: false,
        minRatio: 0.8,
      }),
    ],
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // devServer: {
  //   proxy: {
  //     "/api_user": {
  //       target: "http://124.71.68.240:8081",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api_user': '/user'
  //       }
  //     },
  //     "/api_task":{
  //       target: "http://124.71.68.240:8082",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api_task': '/task'
  //       }
  //     }
  //   },
  // },
};
