// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import store from './store/index'
import { postRequest, putRequest, getRequest, deleteRequest } from '../src/util/api'
import { initMenu } from './util/menus'
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })
/* eslint-disable no-new */
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest

router.beforeEach((to, from, next) => {
  if (window.sessionStorage.getItem('tokenStr')) {
    debugger;
    initMenu(router, store);
    if (!window.sessionStorage.getItem('user')) {
      return getRequest('/admin/info').then(resp => {
        if (resp) {
          window.sessionStorage.setItem('user', JSON.stringify(resp))
        }
      })
    }
    next()
  } else {
    if (to.path == '/') {
      next()
    } else {
      debugger;
      next('/?redirect=' + to.path)
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
