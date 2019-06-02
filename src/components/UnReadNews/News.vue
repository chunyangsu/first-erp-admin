<template>
  <div>
    <!-- 浮动按钮 -->
    <div id="drag" class="unReadNews" v-drag.limit @click="ShowNewsDialog">
      <div class="icon">
        <i class="el-icon-more" />
        <el-badge :value="news" :max="99" class="mark" />
      </div>
    </div>
    <!-- 消息弹窗 -->
    <el-dialog title="未读消息" :visible.sync="newsVisible">
      <div>今天是六一儿童节</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'News', // 未读消息
  data() {
    return {
      news: 1, // 未读消息数量初始化
      newsVisible: false // 未读消息弹窗展示隐藏
    }
  },
  methods: {
    // 打开未读消息弹窗
    // 浮动按钮点击事件
    ShowNewsDialog(e) {
      //  验证是否为点击事件，是则继续执行click事件，否则不执行
      let isClick = document.getElementById('drag').getAttribute('data-flag')
      if (isClick === 'true') {
        this.newsVisible = true
        return false
      }
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
    }
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
  left: 10px;
  top: 9px;
  color: white;
  font-size: 15px;
  height: 0;
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
