<template>
  <el-container>
    <!-- 头部 -->
    <el-header style="height: 45px;">
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
    <!-- 主体内容 -->
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside width="200px">
        <!-- 导航菜单 -->
        <el-menu :router="true" :unique-opened="true" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <!-- 一级菜单 首页 -->
          <el-menu-item index="/layout/home">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
          <!-- 一级菜单 用户管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/layout/users">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 权限管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/layout/roles">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>角色列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/layout/rights">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>权限列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 产品管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>产品中心</span>
            </template>
            <el-menu-item index="/layout/products">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>产品管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/layout/brands">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>品牌管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/layout/storage">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/layout/specifications">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>规格参数</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- 个人中心 -->
        <div class="perCenter">
          <el-popover placement="top" width="160">
            <p>这是一段内容这是一段内容确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="small" type="text" @click.native="$refs.PersonCenterDialog.showPerCenterDialog">个人中心</el-button>
              <el-button type="primary" size="small" @click.prevent="logout">退出</el-button>
            </div>
            <el-button slot="reference" style="width: 100%">好看的允儿</el-button>
          </el-popover>
        </div>

      </el-aside>
      <!-- 主体内容 -->
      <el-main>
        <!-- 子路由出口，千万不能少 -->
        <router-view></router-view>
      </el-main>
      <!-- 个人中心对话框 -->
      <person-center-dialog ref="PersonCenterDialog" />
    </el-container>
    <!-- 未读消息子组件 -->
    <News ref="News" />
  </el-container>
</template>

<script>
import PersonCenterDialog from '@/components/DialogManage/PersonCenterDialog'
import News from '@/components/UnReadNews/News'
export default {
  // 子组件
  components: {
    PersonCenterDialog,
    News
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
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
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
        line-height: 43px;
        h1 {
          color: white;
          font-size: 28px;
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
    position: relative;
    background-color: #545c64;
    color: #333;
    // line-height: 200px;
    // 个人中心
    .perCenter {
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
  // 主体内容
  .el-main {
    background-color: #eaeef1;
    color: #333;
    // padding: 0;
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
