import axios from "axios";
import router from "./src/router";
import Vue from "vue";
const http = axios.create({
  baseURL: "http://192.168.43.156:3456/api",
});

//在then或者catch之前 进行拦截
// 对于进入页面发送ajax的页面， 可达到路由守卫的效果
// 添加请求拦截器
http.interceptors.request.use(
  function(config) {
    // 判断本地token和id再发送请求
    if (localStorage.getItem("username") && localStorage.getItem("token")) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.dir(error);
    if (error.response.status === 401 || error.response.status === 402) {
      router.push("/login");
      Vue.prototype.$toast.fail(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

// 接口列表
const register = (model) => http.post("/register", model);
const userInfo = (username) => http.get("/user", username);
const updateUserInfo = (model) => http.put("/user", model);
const upload = (data) => http.post("/upload", data);
const login = (data) => http.post("/login", data);
const category = () => http.get("/category");
const videoList = (categoryId) => http.get("/category/" + categoryId);
const videoDetail = (videoId) => http.get("/video/" + videoId);
const initLike = (videoId) => http.get("/video/like/" + videoId);
const likeVideo = (videoId) => http.post("/video/like/" + videoId);
const videoCommend = () => http.get("/commend");

export {
  http,
  register,
  userInfo,
  updateUserInfo,
  upload,
  login,
  category,
  videoList,
  videoDetail,
  initLike,
  likeVideo,
  videoCommend,
};
