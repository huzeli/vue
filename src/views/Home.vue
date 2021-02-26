<template>
  <el-container>
    <el-header class="homeHeader">
      <div class="title">云E办</div>
      <el-dropdown class="userinfo"
                   @command="commandHandler">
        <span class="el-dropdown-link">
          {{user.obj.name}}<i><img :src="user.obj.userFace" /></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
          <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item command="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu router>
          <el-submenu index="1"
                      v-for="(item,index) in routes"
                      :key="index"
                      v-if="!item.hidden">
            <template slot="title"><i :class="item.iconCls"
                 style="color:#1accff; margin-right:5px"></i><span>{{item.name}}</span></template>
            <el-menu-item :index="children.path"
                          v-for="(children,indexj) in item.children"
                          :key="indexj"><span>{{children.name}}</span></el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right"
                         v-if="this.$router.currentRoute.path!='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="homeWelcome"
               v-if="this.$router.currentRoute.path=='/home'">
            欢迎来到云E办系统！！！
          </div>
          <router-view class="homeRouteView" />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    debugger;
    return {
      user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  computed: {
    routes () {
      return this.$store.state.routes;
    }
  },
  methods: {
    commandHandler (command) {
      debugger;
      if (command == 'logout') {
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest('/logout')
          window.sessionStorage.removeItem('tokenStr')
          window.sessionStorage.removeItem('user')
          this.$store.commit('initRoutes', [])
          this.$router.replace('/')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作'
          });
        });
      }
    }
  }
}
</script>

<style>
/* .el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
.homeHeader {
  background: #409eff;
  display: flex;
  align-items: center;
  /*去除空格
  */
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.homeHeader .title {
  font-size: 30px;
  font-family: 华文楷体;
  color: white;
}
.homeHeader .userinfo {
  cursor: pointer;
}
.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}
.homeWelcome {
  text-align: center;
  font-size: 30px;
  font-family: 华文楷体;
  color: #409eff;
  padding-top: 50px;
}
.homeRouteView {
  margin-top: 10px;
}
</style>
