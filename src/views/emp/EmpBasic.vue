<template>
  <div>
    <div style="display:flex;justify-content:space-between">
      <div>
        <el-input style="width:300px;margin-right:6px"
                  prefix-icon="el-icon-search"
                  placeholder="请输入员工名进行搜索。。。"></el-input>
        <el-button type="primary"
                   icon="el-icon-search">搜索</el-button>
        <el-button type="primary">
          <i class="fa fa-angle-double-down"
             aria-hidden="true"></i>
          高级搜索
        </el-button>
      </div>
      <div>
        <el-button type="success"><i class="fa fa-level-up"
             aria-hidden="true">导入数据</i></el-button>
        <el-button type="success"><i class="fa fa-level-down"
             aria-hidden="true">导出数据</i></el-button>
        <el-button type="primary"
                   icon="el-icon-plus">添加员工</el-button>
      </div>
    </div>
    <div>
      <el-table :data="emps"
                stripe
                border
                style="width: 100%">
        <el-table-column prop="date"
                         label="日期"
                         width="180">
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名"
                         align="left"
                         width="90">
        </el-table-column>
        <el-table-column prop="workID"
                         align="left"
                         label="工号"
                         width="85">
        </el-table-column>
        <el-table-column prop="gender"
                         align="left"
                         label="性别"
                         width="85">
        </el-table-column>
        <el-table-column prop="birthday"
                         align="left"
                         label="出生日期"
                         width="85">
        </el-table-column>
        <el-table-column prop="idCard"
                         align="left"
                         label="身份证号码"
                         width="85">
        </el-table-column>
        <el-table-column prop="weblock"
                         align="left"
                         label="婚姻状况"
                         width="70">
        </el-table-column>
        <el-table-column prop="nation.name"
                         align="left"
                         label="民族"
                         width="50">
        </el-table-column>
        <el-table-column prop="nativePlace"
                         align="left"
                         label="籍贯"
                         width="85">
        </el-table-column>
        <el-table-column prop="politicsStatus.name"
                         align="left"
                         label="政治面貌"
                         width="85">
        </el-table-column>
        <el-table-column prop="email"
                         align="left"
                         label="电子邮件"
                         width="180">
        </el-table-column>
        <el-table-column prop="phone"
                         align="left"
                         label="电话号码"
                         width="85">
        </el-table-column>
        <el-table-column prop="address"
                         align="left"
                         label="联系地址"
                         width="220">
        </el-table-column>
        <el-table-column prop="department.name"
                         align="left"
                         label="所属部门"
                         width="100">
        </el-table-column>
        <el-table-column prop="position.name"
                         align="left"
                         label="职位"
                         width="100">
        </el-table-column>
        <el-table-column prop="engageForm"
                         align="left"
                         label="聘用形式"
                         width="85">
        </el-table-column>
        <el-table-column prop="tiptopDegree"
                         align="left"
                         label="最高学历"
                         width="85">
        </el-table-column>
        <el-table-column prop="specialty"
                         align="left"
                         label="专业"
                         width="85">
        </el-table-column>
        <el-table-column prop="school"
                         align="left"
                         label="学校"
                         width="85">
        </el-table-column>
        <el-table-column prop="beginDate"
                         align="left"
                         label="开始时间"
                         width="85">
        </el-table-column>
        <el-table-column prop="workState"
                         align="left"
                         label="在职状态"
                         width="85">
        </el-table-column>
        <el-table-column prop="conversionTime"
                         align="left"
                         label="转正时间"
                         width="95">
        </el-table-column>
        <el-table-column prop="beginContract"
                         align="left"
                         label="合同起始日期"
                         width="85">
        </el-table-column>
        <el-table-column prop="endContract"
                         align="left"
                         label="合同截止日期"
                         width="85">
        </el-table-column>
        <el-table-column prop="contractTerm"
                         align="left"
                         label="合同期限"
                         width="85">
        </el-table-column>
        <el-table-column prop="work"
                         align="left"
                         label="开始时间"
                         width="85">
        </el-table-column>
        <el-table-column prop="work"
                         align="left"
                         label="开始时间"
                         width="85">
        </el-table-column>
        <el-table-column prop="work"
                         align="left"
                         label="开始时间"
                         width="85">
        </el-table-column>

      </el-table>

    </div>
  </div>
</template>
<script>
export default {
  name: "EmpBasic",
  data () {
    return {
      emps: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>
<style>
</style>
