import Vue from 'vue'
import Router from 'vue-router'
// 导入Login组件，注意不要添加.vue后缀
import Login from '@/components/login/Login'
// 导入Home组件
import Home from '@/components/home/Home'
// 导入Users组件
import Users from '@/components/users/Users'
// 导入Rights组件
import Rights from '@/components/rights/Rights'
// 导入Roles组件
import Roles from '@/components/roles/Roles'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: 'users',
      component: Users
    }, {
      path: 'rights',
      component: Rights
    }, {
      path: 'roles',
      component: Roles
    }]
  }
  ]
})
// 导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.path === '/login') {
    // 访问的是登录页面
    next()
  } else {
    // 访问的不是登录页面
    const token = localStorage.getItem('token')
    if (token) {
      // 有token, 登录成功
      next()
    } else {
      next('/login')
    }
  }
})

export default router
