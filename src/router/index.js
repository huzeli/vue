import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Index from '@/components/index'
import Login from '../views/login'
// import Home from '../views/Home'
// import Test1 from '../views/Test1'
// import Test2 from '../views/Test2'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      hidden: true
    }]
})
