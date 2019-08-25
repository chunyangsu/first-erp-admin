import Vue from 'vue'
import Router from 'vue-router'
// 导入Login组件，注意不要添加.vue后缀
import Login from '@/views/login/Login'
// 导入Layout组件
import Layout from '@/views/layout/Layout'
// 导入Home组件
import Home from '@/views/home/Home'
// 导入Users组件
import Users from '@/views/users/Users'
// 导入Rights组件
import Rights from '@/views/rights/Rights'
// 导入Roles组件
import Roles from '@/views/roles/Roles'
// 导入商品管理
import GoodsManage from '@/views/GoodsManage/GoodsManage'
// 导入产品管理
import ProductManage from '@/views/products/ProductManage'
// 导入规格参数组件
import SpecManage from '@/views/specifications/SpecManage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    children: [{
      path: 'home',
      component: Home
    }, {
      path: 'users',
      component: Users
    }, {
      path: 'rights',
      component: Rights
    }, {
      path: 'roles',
      component: Roles
    }, {
      path: 'path: 'products',
      component: ProductManage',
      component: ProductManage
    }, {
      path: 'products',
      component: ProductManage
    }, {
      path: 'specifications',
      component: SpecManage
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
