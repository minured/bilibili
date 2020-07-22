import Vue from 'vue'
import VueRouter from 'vue-router'
import register from "@/views/register"
import Login from "@/views/Login"
import UserInfo from "@/views/UserInfo"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/register',
    component: register
  }, 
  {
    path:"/login",
    component: Login
  },
  {
    path:"/userinfo",
    component: UserInfo
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
