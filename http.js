import axios from 'axios'
import router from "./src/router"
import Vue from "vue"
const http = axios.create({
    baseURL: 'http://112.74.99.5:3000/web/api'
})


//在then或者catch之前 进行拦截
// 对于进入页面发送ajax的页面， 可达到路由守卫的效果
// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 判断本地token和id再发送请求
    if (localStorage.getItem('id') && localStorage.getItem('token')) {
        config.headers.Authorization = "Bearer " + localStorage.getItem('token')
    } 
    
    return config;
  }, function (error) {

    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    console.dir(error)
  if (error.response.status === 401 || error.response.status === 402) {
      router.push('/login')
      Vue.prototype.$toast.fail(error.response.data.message)
  }
    return Promise.reject(error);
  });

export default http