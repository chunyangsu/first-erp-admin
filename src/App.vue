<template>
  <div id="app" @contextmenu.prevent="rightClick($event)" @click="close()">
    <!-- 路由出口 -->
    <router-view/>
    <div class="tags-view-container">
      <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
        <li @click="refresh">刷新</li>
        <li @click="closeCurrent()">关闭当前页</li>
        <!-- <li @click="refreshSelectedAll">刷新所有页面</li> -->
        <!-- <li>关闭其他页面</li> -->
        <!--<hr v-show="tagShow" style="border: 0.5px solid #E8EAED">-->
        <!--<li v-show="tagShow" @click="handleAudit">{{ $t('custagsView.handleAudit') }}</li>-->
        <!--<li v-show="tagShow" @click="turnPurInqBook">{{ $t('custagsView.turnInbook') }}</li>-->
        <!--<li v-show="tagShow" @click="turnSellBook">{{ $t('custagsView.turnSellbook') }}</li>-->
        <!--<li v-show="tagShow" @click="handleClose">{{ $t('custagsView.close') }}</li>-->
        <!-- <li v-for="(item, index) in liListTop" v-show="item.isShow" :key="index" @click="item.eventName">{{ $t(item.tagName) }}</li>
          <hr v-show="liListCenterShow" style="border: 0.5px solid #E8EAED">
          <li v-for="(item, index) in liListCenter" v-show="item.isShow" :key="index" @click="item.eventName">{{ $t(item.tagName) }}</li>
          <hr v-show="liListBottomShow" style="border: 0.5px solid #E8EAED">
          <li v-for="(item, index) in liListBottom" v-show="item.isShow" :key="index" @click="item.eventName">{{ $t(item.tagName) }}</li> -->
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
      // console.log(e)
      // console.log(this.GLOBAL.rightMenu)
      // this.copyContent = window.getSelection().toString()
      // // this.inic()
      // if (e.TagsViews) {
      //   if (JSON.stringify(this.GLOBAL.rightMenu) !== '{}') {
      //     if (this.isPush) {
      //       const _this = this
      //       this.GLOBAL.rightMenu.info.forEach(function (val, i) {
      //         if (typeof val.fun === 'function') {
      //           const temp = {
      //             eventName: val.fun,
      //             tagName: val.tagName,
      //             isShow: true
      //           }
      //           _this.liListTop.push(temp)
      //           if (i + 1 === _this.GLOBAL.rightMenu.info.length) {
      //             _this.isPush = false
      //             _this.GLOBAL.rightMenu = {}
      //           }
      //         }
      //       })
      //     }
      //   }
      // }
      // // 列表
      // if (JSON.stringify(this.GLOBAL.rightMenu) !== '{}') {
      //   if (this.isPush) {
      //     const _this = this
      //     this.GLOBAL.rightMenu.info.forEach(function (val, i) {
      //       if (typeof val.fun === 'function') {
      //         const temp = {
      //           eventName: val.fun,
      //           tagName: val.tagName,
      //           isShow: true
      //         }
      //         _this.liListCenter.push(temp)
      //         if (i + 1 === _this.GLOBAL.rightMenu.info.length) {
      //           _this.isPush = false
      //           _this.liListCenterShow = true
      //           _this.GLOBAL.rightMenu = {}
      //         }
      //       }
      //     })
      //   }
      // }
      // if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      //   const temp = {
      //     eventName: '',
      //     tagName: 'apptagsView.paste',
      //     isShow: true
      //   }
      //   this.liList.push(temp)
      // }
      // if (e.stopAppTag) {
      //   this.liListBottom = []
      //   this.liListBottomShow = false
      //   if (JSON.stringify(this.GLOBAL.rightMenu) !== '{}') {
      //     if (this.isPush) {
      //       const _this = this
      //       this.GLOBAL.rightMenu.info.forEach(function (val, i) {
      //         if (typeof val.fun === 'function') {
      //           const temp = {
      //             eventName: val.fun,
      //             tagName: val.tagName,
      //             isShow: true
      //           }
      //           _this.liListBottom.push(temp)
      //           if (i + 1 === _this.GLOBAL.rightMenu.info.length) {
      //             _this.isPush = false
      //             _this.GLOBAL.rightMenu = {}
      //           }
      //         }
      //       })
      //     }
      //   }
      // }
      this.visible = true
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      this.left = e.clientX - offsetLeft + 12 // 12: margin right
      this.top = e.clientY - 2
    },
    refresh() {
      window.location.reload()
      // this.$store.dispatch('delCachedView', this.$route).then(() => {
      //   const { fullPath } = this.$route
      //   this.$nextTick(() => {
      //     this.$router.replace({
      //       path: '/redirect' + fullPath
      //     })
      //   })
      // })
    },
    // 关闭当前页
    closeCurrent() {
      console.log(1)
    },
    // 全部刷新
    // refreshSelectedAll() {
    //   window.location.reload()
    // },
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
