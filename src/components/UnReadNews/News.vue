<template>
  <div>
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
  </div>
</template>
<script>
export default {
  name: 'News', // 未读消息
  data() {
    return {
      news: 1, // 未读消息数量初始化
      newsVisible: false, // 未读消息弹窗展示隐藏
      positionX: 0,
      positionY: 0
    }
  },
  methods: {
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
