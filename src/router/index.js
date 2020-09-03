import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

const router=new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
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
