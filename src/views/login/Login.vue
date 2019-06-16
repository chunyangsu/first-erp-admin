<template>
  <div class="login-wrapper">
    <!--
      el-form
        label-position="top" 设置label的位置
        :model 用来给表单设置数据模型（对象）
        :rules 用来设置表单验证规则的
        ref    在vue中是一个特殊的属性，给组件或者HTML元素添加该属性后，
      可以在 js 中通过 this.$refs.loginForm 来获取到当前组件或者DOM对象

      el-form-item
        label 当前表单项的名称
        prop 它的值是 model 对象中的一个属性
          当使用 表单验证 或者 表单重置 功能时，必须要提供该属性

      el-input
        v-model 实现双向数据绑定
     -->
    <el-row type="flex" class="row-bg" justify="center" align="middle">
      <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" class="login-content">
        <el-form label-position="top" :model="loginForm" :rules="loginRules" ref="loginForm" class="loginForm">
          <!--
        el-form-item 是表单元素中的一行
        label 表示当前行的文字提示

        prop 是配合 表单校验 的属性
       -->

          <!-- 用户名 -->
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入axios
import axios from 'axios'

export default {
  // 数据
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // 校验规则
      // required 是否为必填项
      // message 当前规则校验失败时的提示
      // trigger 表单验证的触发实际，blur表示失去焦点时触发
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  // 方法集合
  methods: {
    // 获取后台数据的方法
    // login() {
    //   axios
    //     .post('http://localhost:8888/api/private/v1/login', this.loginForm)
    //     .then(res => {
    //       console.log(res)
    //       // 获取属性和登录状态
    //       const { data, meta } = res.data
    //       console.log(data)
    //       if (meta.status === 200) {
    //         console.log('登录成功')
    //         // 登录成功，需要跳转到后台管理首页
    //         // 同时需要记录token的值
    //         localStorage.setItem('token', data.token)
    //         this.$router.push('/home')
    //       } else {
    //         // console.log('登录失败', meta.msg)
    //         this.$message({
    //           type: 'error',
    //           message: meta.msg,
    //           duration: 1200
    //         })
    //       }
    //     })
    // },

    async login() {
      const res = await axios.post(
        'http://localhost:8888/api/private/v1/login',
        this.loginForm
      )
      console.log(res)
      // 获取属性和登录状态
      const { data, meta } = res.data
      console.log(data)
      if (meta.status === 200) {
        console.log('登录成功')
        // 登录成功，需要跳转到后台管理首页
        // 同时需要记录token的值
        localStorage.setItem('token', data.token)
        this.$router.push('/layout')
      } else {
        // console.log('登录失败', meta.msg)
        this.$message({
          type: 'error',
          message: meta.msg,
          duration: 1200
        })
      }
    },
    // 提交表单的函数
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        // valid 表示是否校验成功
        // 如果成功就为：true
        // 如果失败就为：false
        if (valid) {
          // alert('提交成功!')

          // 获取用户名和密码
          // console.log(this.loginForm)
          this.login()
        } else {
          console.log('提交失败！')
          return false
        }
      })
    },
    // 重置表单的函数
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style>
.login-wrapper {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.login-content {
  background-color: #fff;
  border-radius: 10px;
  padding: 12px 25px;
  min-width: 210px;
}
</style>
