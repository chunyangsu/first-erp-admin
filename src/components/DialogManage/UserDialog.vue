<template>
  <div>
    <el-dialog title="添加用户" :visible.sync="addUserVisible" @close="closeAddUserDialog">
      <el-form :model="addUserForm" :rules="addUserRules" ref="userAddForm">
        <el-form-item label="用户名" prop="username" label-width="100px">
          <el-input v-model="addUserForm.username" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="100px">
          <el-input v-model="addUserForm.password" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="100px">
          <el-input v-model="addUserForm.email" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" label-width="100px">
          <el-input v-model="addUserForm.mobile" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'UserDialog', // 用户列表弹窗
  data() {
    return {
      addUserVisible: false,
      // 表单属性
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 校验规则
      // required 是否为必填项
      // message 当前规则校验失败时的提示
      // trigger 表单验证的触发实际，blur表示失去焦点时触发
      addUserRules: {
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
  methods: {
    // 5. 展示添加用户对话框
    showAddUserDialog() {
      this.addUserVisible = true
    },
    // 6. 点击确定按钮添加用户
    addUser() {
      // 进行表单验证
      // ref: 在vue中是一个特殊的属性，给组件或者HTML元素添加该属性后，
      // 可以在 js 中通过 this.$refs.loginForm 来获取到当前组件或者DOM对象
      this.$refs.userAddForm.validate(valid => {
        // valid表示是否校验成功
        // 成功就为true
        // 失败就为false
        if (valid) {
          console.log('验证成功')
          // 1. 添加用户数据
          // 2. 隐藏对话框
          // 3. 重置表单
          // 4. 重新展示用户列表
          this.$http.post('/users', this.addUserForm).then(res => {
            // console.log(res)
            const { meta } = res.data
            if (meta.status === 201) {
              this.addUserVisible = false
              this.$emit('getData', this.addUserForm)
            }
          })
        } else {
          console.log('验证失败')
          return false
        }
      })
    },
    // // 7. 关闭添加用户对话框并且清空表单
    closeAddUserDialog() {
      // this.$refs.userAddForm.resetFields()
    }
  }
}
</script>
<style>
.inputWidth {
  width: 250px;
}
</style>
