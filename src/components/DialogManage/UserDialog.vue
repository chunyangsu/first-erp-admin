<template>
  <div>
    <el-dialog title="添加用户" :visible.sync="addUserVisible" @close="closeAddUserDialog">
      <el-form :model="addUserForm" :rules="addUserRules" ref="userAddForm">
        <el-form-item label="跟进人" prop="username" label-width="100px">
          <template>
            <el-radio v-model="isFixed" :label="false">备选项</el-radio>
            <el-radio v-model="isFixed" :label="true">备选项</el-radio>
          </template>
        </el-form-item>
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
        <el-form-item label="手机" prop="mobile" label-width="100px">
          <el-input v-model="addUserForm.mobile" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" label-width="100px">
          <el-input v-model="addUserForm.mobile" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" label-width="100px">
          <el-input v-model="addUserForm.mobile" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" label-width="100px">
          <el-input v-model="addUserForm.mobile" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" label-width="100px">
          <el-input v-model="addUserForm.mobile" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" label-width="100px">
          <el-input v-model="addUserForm.mobile" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" label-width="100px">
          <el-input v-model="addUserForm.mobile" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" label-width="100px">
          <el-input v-model="addUserForm.mobile" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
      </el-form>
      <!-- 操作按钮 -->
      <div slot="footer" id="btn" class="dialog-footer">
        <el-button @click="addUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
      <!-- 固定浮动的状态 -->
      <div slot="footer" v-if="barFixed === true" class="isFixed">
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
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      },
      barFixed: false,
      isFixed: false
      // isFixed: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
  },
  methods: {
    // 监听元素到顶部的距离
    handleScroll() {
      var innerHeight = window.innerHeight
      // const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 设备/屏幕高度
      // console.log(innerHeight)
      const scrollTop = document.getElementById('btn').getBoundingClientRect() // 元素到顶部的距离（动态变化）
      // console.log(scrollTop.top)
      // var offsetTop = document.getElementById('btn').offsetTop // 元素到顶部的距离（不变化）
      // console.log(offsetTop)
      if (scrollTop.top > innerHeight - 55) {
        this.barFixed = true
      } else {
        this.barFixed = false
      }
    },
    // 5. 展示添加用户对话框
    showAddUserDialog() {
      this.addUserVisible = true
      this.handleScroll()
    },
    // 6. 点击确定按钮添加用户
    addUser() {
      console.log(this.isFixed)
      // if (this.radio === 2) {
      //   this.isFixed = true
      // } else {
      //   this.isFixed = false
      // }
      // console.log(this.isFixed)
      this.$refs.userAddForm.validate(valid => {
        if (valid) {
          // console.log('验证成功')
          this.$http.post('/users', this.addUserForm).then(res => {
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
.isFixed {
  position: fixed;
  bottom: 16px;
  right: 374px;
  z-index: 999;
}
</style>
