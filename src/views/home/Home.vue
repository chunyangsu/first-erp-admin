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
    <!-- 主体内容 -->
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
    <!-- 浮动按钮 -->
    <div class="unReadNews" @mousedown.self="move">
      <div class="icon" @click="ShowNewsDialog">
        <i class="el-icon-more" />
        <el-badge :value="news" :max="99" class="mark" />
      </div>
    </div>
    <!-- 消息弹窗 -->
    <el-dialog title="未读消息" :visible.sync="newsVisible">
      <div>今天是六一儿童节</div>
    </el-dialog>
  </el-container>
</template>

<script>
import PersonCenterDialog from '@/components/DialogManage/PersonCenterDialog'
export default {
  // 子组件
  components: {
    PersonCenterDialog
  },
  data() {
    return {
      news: 1, // 未读消息数量初始化
      newsVisible: false, // 未读消息弹窗展示隐藏
      positionX: 0,
      positionY: 0
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
    // 打开未读消息弹窗
    ShowNewsDialog() {
      this.newsVisible = true
    },
    // 鼠标拖拽事件
    move(e) {
      const odiv = e.target // 获取目标元素

      // 算出鼠标相对元素的位置
      const disX = e.clientX - odiv.offsetLeft
      const disY = e.clientY - odiv.offsetTop
      document.onmousemove = e => {
        // 鼠标按下并移动的事件
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        const left = e.clientX - disX
        const top = e.clientY - disY

        // 绑定元素位置到positionX和positionY上面
        this.positionX = top
        this.positionY = left

        // 移动当前元素
        odiv.style.left = left + 'px'
        odiv.style.top = top + 'px'
      }
      document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null
      }
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
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
/* 未读消息 */
.unReadNews {
  position: fixed;
  bottom: 50px;
  right: 40px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #409eff;
  box-shadow: 0 3px 10px #aaa;
  z-index: 999;
}
.unReadNews .icon {
  position: absolute;
  left: 10px;
  top: 9px;
  color: white;
  font-size: 15px;
  height: 0;
  cursor: pointer;
}
.el-icon-more {
  height: 0;
}
/* 未读消息数量标记 */
.mark {
  margin-top: 10px;
  position: absolute;
  right: -23px;
  top: -27px;
}
</style>
