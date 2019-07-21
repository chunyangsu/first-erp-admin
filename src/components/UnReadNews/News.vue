<template>
  <div v-clickoutside="close">
    <!-- 浮动按钮 -->
    <div id="drag" class="unReadNews" v-drag.limit @click="ShowNewsDialog">
      <div class="icon">
        <i class="fa fa-commenting fa-lg" />
        <el-badge :value="news" :max="99" class="mark" />
      </div>
    </div>
    <!-- 消息弹窗 -->
    <div v-if="newsVisible" class="todo">
      <div class="header">
        <el-tabs v-model="activeName">
          <!-- 用户列表模块 -->
          <el-tab-pane label="用户" name="first">
            <el-table v-loading="LD_list" :data="usersList" :show-header="false" border>
              <el-table-column type="index" width="35" />
              <el-table-column>
                <template slot-scope="scope">
                  <span>{{ scope.row.username }}</span>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination :total="totals" :current-page="curPage" :page-size="pageSize" background layout="prev, pager, next" @current-change="changePage" />
          </el-tab-pane>
          <!-- 角色列表模块 -->
          <el-tab-pane label="角色" name="second">
          </el-tab-pane>
          <!-- 产品列表模块 -->
          <el-tab-pane label="产品" name="third">
          </el-tab-pane>
        </el-tabs>
        <!-- 关闭按钮 -->
        <i class="el-icon-close" @click="close" />
      </div>
    </div>
  </div>
</template>
<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
export default {
  name: 'News', // 未读消息
  data() {
    return {
      news: 1, // 未读消息数量初始化
      newsVisible: false, // 未读消息弹窗展示隐藏
      activeName: 'first',
      LD_list: true,
      usersList: [],
      // 分页器
      curPage: 1,
      pageSize: 5,
      totals: 0
    }
  },
  created() {
    // 定时轮询（定时向后台请求数据）
    // setInterval(this.getUsersList, 10000)
  },
  methods: {
    // 打开未读消息弹窗
    // 浮动按钮点击事件
    ShowNewsDialog(e) {
      //  验证是否为点击事件，是则继续执行click事件，否则不执行
      let isClick = document.getElementById('drag').getAttribute('data-flag')
      if (isClick === 'true') {
        if (this.newsVisible === false) {
          this.newsVisible = true
          this.getUsersList()
        } else {
          this.newsVisible = false
        }
      }
    },
    // 关闭代办列表弹窗
    close() {
      this.newsVisible = false
    },
    // 1. 获取用户列表数据
    // curPage = 1 es6语法，给参数设置默认值为1
    async getUsersList(curPage = 1) {
      this.LD_list = true
      const res = await this.$http.get('/users', {
        params: {
          pagenum: curPage,
          pagesize: 5
        }
      })
      // 获取数据
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.usersList = data.users
        this.totals = data.total
        this.curPage = data.pagenum
        // 通知弹窗
        // this.notifySuccess('您有一条新消息！')
      }
      setTimeout(() => {
        this.LD_list = false
      }, 400)
    },
    // 2. 点击切换分页器
    changePage(curPage) {
      this.getUsersList(curPage)
    },
    // Notification 通知
    notifySuccess(msg) {
      this.instance = this.$notify({
        title: '消息',
        message: msg,
        type: 'warning', // 橘黄色
        offset: 100,
        position: 'bottom-right',
        duration: 5000,
        // Notification通知弹窗点击事件
        onClick: function () {
          this.close()
        }
      })
    }
  },
  directives: {
    // 自定义鼠标拖拽指令
    drag: {
      // 指令的定义
      bind: function (el, binding) {
        let odiv = el // 获取当前元素
        let firstTime = '' // 声明按钮起始时间
        let lastTime = ''
        odiv.onmousedown = (e) => {
          document.getElementById('drag').setAttribute('data-flag', false)
          firstTime = new Date().getTime()
          // 算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft
          let disY = e.clientY - odiv.offsetTop

          document.onmousemove = (e) => {
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX
            let top = e.clientY - disY
            //  限制在可视窗范围内移动元素
            if (left > 0 && left < document.body.clientWidth - 45) {
              odiv.style.left = left + 'px'
            }
            if (top > 0 && top < document.body.clientHeight - 35) {
              odiv.style.top = top + 'px'
            }
          }
          document.onmouseup = (e) => {
            document.onmousemove = null
            document.onmouseup = null
            // onmouseup 时的时间，并计算差值
            lastTime = new Date().getTime()
            if ((lastTime - firstTime) < 200) {
              document.getElementById('drag').setAttribute('data-flag', true)
            }
          }
          return false
        }
      }
    },
    Clickoutside
  }
}
</script>
<style>
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
  cursor: pointer;
  z-index: 999;
}
.unReadNews .icon {
  position: absolute;
  left: 8px;
  top: 5px;
  color: white;
  font-size: 15px;
  height: 0;
}
/* 未读消息数量标记 */
.mark {
  margin-top: 10px;
  position: absolute;
  right: -20px;
  top: -25px;
}
/* 代办弹窗样式 */
.todo {
  width: 350px;
  height: 340px;
  position: fixed;
  bottom: 75px;
  right: 53px;
  padding-bottom: 10px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 1px 8px rgb(179, 178, 178);
  background: #fff;
  z-index: 99;
}
.header {
  padding: 0 10px;
  position: relative;
  height: 100%;
}
.header .el-tabs {
  height: 100%;
}
.header i {
  position: absolute;
  top: 15px;
  right: 20px;
}
.header i:hover {
  font-size: 20px;
  top: 14px;
  right: 18px;
  cursor: pointer;
}
.todo .el-pagination {
  margin-top: 5px;
  float: right;
}
/* 分页器右箭头 */
.todo .btn-next {
  position: relative;
}
.todo .btn-next .el-icon-arrow-right {
  position: absolute;
  left: 9px;
  top: 8px;
}
/* 分页器左箭头 */
.todo .btn-prev {
  position: relative;
}
.todo .btn-prev .el-icon-arrow-left {
  position: absolute;
  left: 9px;
  top: 8px;
}
</style>
