import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'
import Rights from '@/components/power/Rights'
import Roles from '@/components/power/Roles'
import Cate from '@/components/goods/Cate'
import Params from '@/components/goods/Params'
import GoodsList from '@/components/goods/List'
import Add from '@/components/goods/Add'
import Order from '@/components/order/Order'

Vue.use(Router)

const router=new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'//重定向
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect:'/welcome',
      children:[
        {
          path: '/welcome',
          name: 'Welcome',
          component: Welcome
        },
        {
          path: '/users',
          name: 'Users',
          component: Users
        },
        {
          path: '/rights',
          name: 'Rights',
          component: Rights
        },
        {
          path: '/roles',
          name: 'Roles',
          component: Roles
        },
        {
          path: '/categories',
          name: 'Cate',
          component: Cate
        },
        {
          path: '/params',
          name: 'Params',
          component: Params
        },
        {
          path: '/goods',
          name: 'GoodsList',
          component: GoodsList
        },
        {
          path: '/goods/add',
          name: 'Add',
          component: Add
        },
        {
          path: '/orders',
          name: 'Order',
          component: Order
        }
      ]
    }
  ]
})

//挂载路由导航守卫进行token验证，防止用户改URL就可以访问页面
router.beforeEach((to,from,next)=>{
  //to将要访问的路径，from从哪个路径跳转而来,next是一个函数，表示放行：next()放行next('/login')强制跳转
  if(to.path==='/login') return next();
  //获取token
  const tokenStr=window.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  next();
})
export default router
