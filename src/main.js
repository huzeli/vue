// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import store from './store/index'
import { postRequest } from '../src/util/api'
import { putRequest } from '../src/util/api'
import { getRequest } from '../src/util/api'
import { deleteRequest } from '../src/util/api'

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
