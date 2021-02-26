<template>
  <div>
    <div>
      <el-input class="addPosInput"
                size="small"
                placeholder="请输入内容"
                suffix-icon="el-icon-plus"
                @keydown.enter.native="addPostions"
                v-model="pos.name">
      </el-input>
      <el-button icon="el-icon-plus"
                 type="primary"
                 size="small"
                 @click="addPostions">添加</el-button>
    </div>
    <div class="posManaMain">
      <el-table :data="positions"
                style="width: 70%">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="id"
                         label="编号"
                         width="80">
        </el-table-column>
        <el-table-column prop="name"
                         label="职位"
                         width="120">
        </el-table-column>
        <el-table-column prop="createDate"
                         label="创建时间"
                         width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="showEditView(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="enabled"
                         label="是否启用"
                         width="80">
        </el-table-column> -->
      </el-table>
      <el-dialog title="提示"
                 :visible.sync="dialogVisible"
                 width="30%"
                 :before-close="handleClose">
        <span>编辑职位</span>
        <div>
          <el-tag>职位名称</el-tag>
          <el-input v-model="updatePos.name"
                    class="updatePosInput"></el-input>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button size="small"
                     @click="dialogVisible = false">取 消</el-button>
          <el-button size="small"
                     type="primary"
                     @click="doUpdate">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PosMana',
  data () {
    return {
      pos: {
        name: ''
      },
      positions: [{
        id: '2016-05-02',
        name: '王小虎',
        createDate: '上海市普陀区金沙江路151弄'
        // enabled: false
      }, {
        id: '2016-05-02',
        name: '王小虎',
        createDate: '上海市普陀区金沙江路1518弄'
        // enabled: false
      }],
      dialogVisible: false,
      updatePos: {
        name: ''
      }
    }
  },
  methods: {
    addPostions () {
      if (this.pos.name) {
        this.postRequest('/system/basic/pos/', this.pos).then(resp => {
          this.initPositions()
          this.pos.name = ''
        })
      } else {
        this.$message.error('职位名称不能为空！！！');
      }
    },
    initPositions () {
      this.postRequest('/system/basic/pos/').then(resp => {
        if (resp) {
          this.positions = resp
        }
      })
    },
    showEditView (index, data) {
      Object.assign(this.updatePos.data)
      this.updatePos.createDate = ''
      this.dialogVisible = true;
    },
    doUpdate () {
      this.postRequest('/system/basic/pos/', this.updatePos).then(resp => {
        if (resp) {
          this.initPositions()
          this.dialogVisible = false
        }
      })
    },
    handleEdit (index, data) {
      console.log(index, data);
    },
    handleDelete (index, data) {
      this.$confirm('您是否删除该职位?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/pos/' + data.id).then(resp => {
          if (resp) {
            this.initPositions()
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
    this.initPositions();
  }

}
</script>

<style>
.addPosInput {
  width: 300px;
  margin-right: 8px;
}
.posManaMain {
  margin-top: 10px;
}
.updatePosInput {
  width: 200px;
}
</style>
