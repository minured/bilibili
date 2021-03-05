module.exports = {
  // // 部署到 github pages 即生产环境填自己的仓库路径
  publicPath: process.env.NODE_ENV === "production" ? "/bilibili/" : "/",

  // 全局样式,全局变量
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/baseStyle.scss";`,
      },
    },
  },
  devServer: {
    host: "0.0.0.0",
    // 跨域设置
    // proxy: {
    //   "/api": {
    //     //node.js服务器运行的地址
    //     target: "http://localhost:3456",
    //     changeOrigin: true,
    //     //路径重写
    //     pathRewrite: {
    //       "^/api": "http://localhost:3456",
    //     },
    //   },
    // },
  },
};
