<template>
  <div id="app" @contextmenu.prevent="rightClick($event)" @click="close()">
    <!-- 路由出口 -->
    <router-view/>
    <div class="tags-view-container">
      <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
        <li @click="refresh">刷新</li>
        <li @click="closeCurrent()">关闭当前页</li>
        <!-- <li @click="refreshSelectedAll">刷新所有页面</li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      visible: false, // 是否显示右击菜单
      top: 0, // 右击菜单的位置
      left: 0
    }
  },
  methods: {
    // 右击菜单事件
    rightClick(e) {
      this.visible = true
      const innerHeight = window.innerHeight // 可视窗高度
      const innerWidth = window.innerWidth // 可视窗宽度
      const offsetLeft = this.$el.getBoundingClientRect().left // 右击菜单自身的宽度
      this.left = e.clientX - offsetLeft // 右击菜单相对页面的宽度
      this.top = e.clientY // 右击菜单相对页面的高度
      // 如果右击菜单超过页面的高度时，让他固定在可视窗内
      if (this.top > innerHeight - 80) {
        this.top = innerHeight - 80
      }
      // 如果右击菜单超过页面的宽度时，让他固定在可视窗内
      if (this.left > innerWidth - 210) {
        this.left = innerWidth - 210
      }
    },
    refresh() {
      window.location.reload()
    },
    // 关闭当前页
    closeCurrent() {
      console.log(1)
    },
    // 点击菜单外空白处，菜单关闭
    close() {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="less">
#app {
  height: 100%;
}
.tags-view-container {
  // height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    width: 190px;
    background: #fff;
    z-index: 9999999;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border: 1px solid #bababa;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 9px 22px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
