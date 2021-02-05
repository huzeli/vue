<template>
<div>
    <el-form ref="form" :model="loginForm">
        <h3>系统登录</h3>
        <el-form-item>
            <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    name: "login",
    data () {
        return{
            loginForm: {
                username: 'admin',
                password: '123',
                code: ''
            }
        }
    }
}
</script>

<style>
</style>
