<template>
  <div>
    <div class="permissManaTool">
      <el-input placeholder="请输入角色英文名"
                v-model="role.name"
                size="small">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input placeholder="请输入角色中文名"
                v-model="role.nameZh"
                size="small">
      </el-input>
      <el-button type="primary"
                 icon="el-icon-plus"
                 size="small"
                 @click="doAddRole">添加角色</el-button>
    </div>
    <div class="permissManaMain">
      <el-collapse accordion
                   @change="change"
                   v-model="activeName">
        <el-collapse-item :title="r.nameZh"
                          :name="r.id"
                          v-for="(r,index) in roles"
                          :key="index">
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>可访问资源</span>
              <el-button style="float: right; padding: 3px 0;color:red"
                         type="text"
                         icon="el-icon-delete"
                         @click="doDeleteRole(r)"></el-button>
            </div>
            <div>
              <el-tree show-checkbox
                       node-key="id"
                       ref="tree"
                       :key="index"
                       :default-checked-keys="selectedMenus"
                       :data="allMenus"
                       :props="defaultProps"></el-tree>
              <div style="display:flex;justify-content:flex-end">
                <el-button size="mini"
                           @click="cancleUpdate">取消修改</el-button>
                <el-button size="mini"
                           @click="doUpdate(r.id,index)">确认修改</el-button>
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PermissMana',
  data () {
    return {
      role: {
        name: '',
        nameZh: ''
      },
      activeName: '2',
      roles: [],
      allMenus: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectedMenus: [],
      activeName: -1
    }
  },
  methods: {
    initRoles () {
      this.getRequest('/sytem/basic/permiss/').then(resp => {
        if (resp) {
          this.roles = resp
        }
      })
    },
    change (rid) {
      if (rid) {
        this.initAllMenus()
        this.initSelectedMenus(rid)
      }
      // else {
      //   this.allMenus = []
      // }
    },
    initAllMenus () {
      this.getRequest('/system/basic/permiss/menus').then(resp => {
        if (resp) {
          this.allMenus = resp
        }
      })
    },
    initSelectedMenus (id) {
      this.getRequest('/system/basic/permiss/mid/' + id).then(resp => {
        if (resp) {
          this.selectedMenus = resp
        }
      })
    },
    doUpdate (rid, index) {
      let tree = this.$refs.tree[index]
      let selectedKeys = tree.getCheckedKeys(true)
      let url = '/system/basic/permiss/?id=' + rid;
      selectedKeys.forEach(key => {
        url += '&mids=' + key
      });
      this.putRequest(url).then(resp => {
        if (resp) {
          this.initRoles();
          this.activeName = -1
        }
      })
    },
    cancleUpdate () {
      this.activeName = -1
    },
    doAddRole () {
      if (this.role.name && this.role.nameZh) {
        this.postRequest('/sytem/basic/permiss/', this.role).then(resp => {
          if (resp) {
            this.initRoles()
            this.role.name = ''
            this.role.nameZh = ''
          }
        })
      } else {
        this.$message.error('所有字段不能为空');
      }
    },
    doDeleteRole (row) {
      this.$confirm('您是否删除[' + row.nameZh + ']职位?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/sytem/basic/permiss/' + row.id).then(resp => {
          if (resp) {
            this.initRoles()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  mounted () {
    this.initRoles()
  }
}
</script>
<style>
.permissManaTool {
  display: flex;
}
.permissManaTool .el-input {
  width: 300px;
  margin-right: 6px;
  justify-content: flex-start;
}
.permissManaMain {
  margin-top: 10px;
  width: 700px;
}
</style>
