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
      <el-button size="small"
                 type="danger"
                 style="margin-left:20px"
                 :disabled="this.multipleSelection.length==0"
                 @click="deleteMany">批量删除</el-button>
    </div>
    <div class="posManaMain">
      <el-table :data="positions"
                style="width: 70%"
                @selection-change="handleSelectionChange">
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
                 width="30%">
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
      positions: [],
      dialogVisible: false,
      updatePos: {
        name: ''
      },
      multipleSelection: []
    }
  },
  methods: {
    initPositions () {
      this.getRequest('/system/basic/pos/').then(resp => {
        if (resp) {
          this.positions = resp
        }
      })
    },
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
    doUpdate () {
      this.putRequest('/system/basic/pos/', this.updatePos).then(resp => {
        if (resp) {
          this.initPositions()
          this.dialogVisible = false
        }
      })
    },
    showEditView (index, data) {
      debugger
      Object.assign(this.updatePos, data)
      this.updatePos.createDate = ''
      this.dialogVisible = true;
    },

    handleEdit (index, data) {
      console.log(index, data);
    },
    handleDelete (index, data) {
      this.$confirm('您是否删除[' + data.name + ']职位?', '提示', {
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
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    deleteMany () {
      this.$confirm('您是否删除[' + this.multipleSelection.length + ']条职位?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?'
        this.multipleSelection.forEach(item => {
          ids += 'ids=' + item.id + '&'
        })

        this.deleteRequest('/system/basic/pos/' + ids).then(resp => {
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
