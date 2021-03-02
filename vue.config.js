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
  },
};
