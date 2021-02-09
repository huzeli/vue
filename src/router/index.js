import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index'
import Login from '../views/login'
import Home from '../views/Home'
import Test1 from '../views/Test1'
import Test2 from '../views/Test2'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      hidden: true
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      hidden: true
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      hidden: true
    }, {
      path: '/home',
      name: '导航一',
      component: Home,
      children: [{
        path: '/test1',
        name: '选项一',
        component: Test1
      }, {
        path: '/test2',
        name: '选项2',
        component: Test2
      }]
    }
  ]
})
