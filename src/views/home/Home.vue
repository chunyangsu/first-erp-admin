<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row>
        <!-- 图片logo -->
        <el-col :span="8" class="logo">
          <!-- <img src="../../assets/logo.png" alt=""> -->
        </el-col>
        <!-- 大标题 -->
        <el-col :span="8" class="title">
          <h1>ERP后台管理系统</h1>
        </el-col>
        <!-- right -->
        <!-- <el-col :span="8" class="right">
          <span>好看的允儿</span>
          <a href="javascript:;" @click.prevent="logout">退出</a>
        </el-col> -->
      </el-row>
    </el-header>
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside width="200px">
        <!-- 导航菜单 -->
        <el-menu :router="true" :unique-opened="true" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <!-- 一级菜单 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/home/users">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/home/roles">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>角色列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/rights">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>权限列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 产品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>产品管理</span>
            </template>
            <el-menu-item index="/home/products">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>产品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/brands">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>品牌列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- 个人中心 -->
        <el-popover placement="bottom" width="160">
          <p>这是一段内容这是一段内容确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="small" type="text" @click.native="showPerCenterDialog">个人中心</el-button>
            <el-button type="primary" size="small" @click.prevent="logout">退出</el-button>
          </div>
          <el-button slot="reference" style="width: 100%">好看的允儿</el-button>
        </el-popover>
      </el-aside>
      <!-- 主体内容 -->
      <el-main>
        <!-- 子路由出口，千万不能少 -->
        <router-view></router-view>
      </el-main>
      <!-- 个人中心对话框 -->
      <el-dialog title="个人中心" :visible.sync="perCenterVisible" width="60%">
        <el-tabs v-model="activeName" tabPosition="left" type="card" @tab-click="handleClick">
          <el-tab-pane label="账号管理" name="first">
            <!-- 表单 -->
            <el-form :model="addUserForm" :rules="addUserRules" ref="userAddForm">
              <el-form-item label="用户名" prop="username" label-width="100px">
                <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" label-width="100px">
                <el-input v-model="addUserForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email" label-width="100px">
                <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="mobile" label-width="100px">
                <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <!-- <div slot="footer" class="dialog-footer">
              <el-button @click="addUserVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
            </div> -->
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理2</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理3</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿4</el-tab-pane>
        </el-tabs>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
// import PersonCenterDialog from '@/components/DialogManage/PersonCenterDialog'
export default {
  // 子组件
  // components: {
  //   PersonCenterDialog
  // },
  data() {
    return {
      perCenterVisible: false,
      activeName: 'first',
      // 表单属性
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 校验规则
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
    // 退出功能
    logout() {
      this.$confirm('您是否确认退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 1. 跳转到登录页
        // 2. 清除token
        localStorage.removeItem('token')
        this.$router.push('/login')
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    // 展示个人中心对话框
    showPerCenterDialog() {
      this.perCenterVisible = true
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
  // 头部
  .el-header {
    padding: 0;
    background-color: #b3c1cd;
    color: #333;
    text-align: center;
    .el-row {
      height: 100%;
      // logo
      .logo {
        height: 100%;
        text-align: left;
        padding-left: 15px;
      }
      // 标题
      .title {
        height: 100%;
        line-height: 60px;
        h1 {
          color: white;
          font-size: 35px;
          margin: 0;
        }
      }
      // 右侧退出部分
      .right {
        line-height: 60px;
        font-weight: bold;
        text-align: right;
        padding-right: 20px;
        span {
          margin-right: 5px;
        }
        a {
          text-decoration: none;
          color: rgb(177, 7, 7);
        }
      }
    }
  }
  // 左侧
  .el-aside {
    background-color: #545c64;
    color: #333;
    line-height: 200px;
  }
  // 主体内容
  .el-main {
    background-color: #eaeef1;
    color: #333;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>
