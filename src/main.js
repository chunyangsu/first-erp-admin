// 这是一个Vue实现的后台管理系统
// 导入Vue
import Vue from 'vue'
import App from './App'
import router from './router'
// 使用element-ui
import ElementUI from 'element-ui'
// 导入样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入自定义dialog拖拽指令
// import './common/dialogDrag.js'
// 多选搜索组件
import SgoSelect from './components/SgoSelect'
// loading组件
import myLoading from './components/loading'
// 备注组件
import Remark from './components/Remark'
import SgoRemark from './components/SgoRemark'
// 导入css样式
import '@/assets/index.css'
import '@/styles/index.less' // global css
// 导入font-awesome
import 'font-awesome/css/font-awesome.min.css'
// 导入axios
import axios from 'axios'
// 引入mock数据，关闭则注释该行
require('./mock')
Vue.use(myLoading, {
  // 这里的 icon 要换成你本地的
  icon: require('./assets/images/kaxikai1.jpg'),
  progressColor: 'blue'
})
Vue.use(Remark)
Vue.use(SgoRemark)
Vue.use(SgoSelect)
// 将 axios 添加到Vue的原型中
// 实例对象可以直接使用原型对象中的属性或方法
// 所有的组件都是Vue的实例
// 说明: 只要是像 axios 这样的第三方库(与Vue没有任何关系),都应该通过这种方式来统一导入
Vue.prototype.$http = axios

// 配置公共路径
// 配置好公共路径后, 每次使用 axios 发送请求, 只需要写当前接口的路径(比如: /users) 就可以了
// axios 在发送请求之前, 会将 baseUrl + '/users' 得到完整路径, 才会发送请求
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

/*
 只要配置了拦截器，那么所有的请求都会走拦截器，因此可以在拦截器中统一处理headers
*/

// 请求拦截器
axios.interceptors.request.use(function (config) {
  if (!config.url.endsWith('/login')) {
    config.headers['Authorization'] = localStorage.getItem('token')
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.meta.status === 401) {
    router.push('/login')
    localStorage.removeItem('token')
  }
  return response
})

// 安装插件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
