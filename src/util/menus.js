import router from '../router'
import store from '../store'
import { getRequest } from '../util/api'
export const initMenu = (route, state) => {
  if (store.state.routes.length > 0) {
    return
  }
  getRequest('/system/config/menu').then(data => {
    if (data) {
      // 格式化好的Router
      let fmtRoutes = formatRoutes(data)
      router.addRoutes(fmtRoutes)
      store.commit('initRoutes', formatRoutes)
    }
  })
}
export const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(routes => {
    let {
      path,
      component,
      name,
      iconCls,
      children,
    } = router

    if (children && children instanceof Array) {
      children = formatRoutes(children)
    }
    let fmRouter = {
      path: path,
      name: name,
      iconCls: iconCls,
      children: children,
      component (resolve) {
        require(['../views' + component + '.vue'])
      }
    }
  });
}