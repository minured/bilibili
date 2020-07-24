import Vue from 'vue'
import VueRouter from 'vue-router'
import register from "@/views/register"
import Login from "@/views/Login"
import UserInfo from "@/views/UserInfo"
import Edit from '@/views/Edit'
import Home from '@/views/Home'
import VideoDetail from "@/views/VideoDetail"

Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      component: Home,   
      // 可以在meta里面添加每个路由得判断条件，用于守卫时判断
      meta: {
        keepAlive:true
      }
    },
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
    component: UserInfo,
    meta: {
      isToken: true
    }
  },
  {
    path: '/edit',
    component: Edit,
    meta: {
      isToken: true
    }
  },
  {
    path: '/videoDetail/:id',
    component: VideoDetail
  }
]



const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeEach((to, from , next) => {
  // to from 是一个对象
  // next()  是个函数
  // 首先是要判断isToken， 然后 id 和 token 都没有的 就要重新登陆
  if (to.meta.isToken && !localStorage.getItem('id') && !localStorage.getItem('token')) {
    router.push('/login')
    Vue.prototype.$toast.fail("请重新登录")
    return 
  }
  next()
  
})

export default router
