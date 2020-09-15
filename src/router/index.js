import Vue from 'vue'
import VueRouter from 'vue-router'


// import Register from "@/views/register"
// import Login from "@/views/Login"
// import UserInfo from "@/views/UserInfo"
// import Edit from '@/views/Edit'
// import Home from '@/views/Home'
// import VideoDetail from "@/views/VideoDetail"
// import EditCategory from "@/views/EditCategory"
// import Search from "@/views/Search"

// 路由懒加载
const Register  = () => import('@/views/register')
const Login  = () => import('@/views/Login')
const UserInfo  = () => import('@/views/UserInfo')
const Edit  = () => import('@/views/Edit')
const Home  = () => import('@/views/Home')
const VideoDetail  = () => import('@/views/VideoDetail')
const EditCategory  = () => import('@/views/EditCategory')
const Search  = () => import('@/views/Search')


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
    component: Register
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
  },
  {
    path: '/editcategory',
    component: EditCategory
  },
  {
    path: "/search",
    component: Search
  }
]



const router = new VueRouter({
  // mode: "history",
  routes
})

router.beforeEach((to, from , next) => {
  // to from 是一个对象
  // next()  是个函数
  // 首先是要判断isToken， 然后 id 和 token 都没有的 就要重新登陆
  if (to.meta.isToken && !localStorage.getItem('id') && !localStorage.getItem('token')) {
    router.push('/login')
    Vue.prototype.$toast.fail("请先登录")
    return 
  }
  next()
  
})

export default router
