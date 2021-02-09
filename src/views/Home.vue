<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu router>
          <el-submenu index="1"
                      v-for="(item,index) in this.$router.options.routes"
                      :key="index"
                      v-if="!item.hidden">
            <template slot="title"><i class="el-icon-message"></i><span>{{item.name}}</span></template>
            <el-menu-item :index="children.path"
                          v-for="(children,indexj) in item.children"
                          :key="indexj"><span>{{children.name}}</span></el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style>
.el-header,
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
}
</style>
