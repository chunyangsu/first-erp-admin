<template>
  <div class="custom-loading" v-if="show">
    <div class="custom-loading-Mask"></div>
    <div class="custom-loading-box">
      <div class="custom-loading-content">
        <img :src="icon" alt="">
        <span>{{ text }}</span>
        <em :style="{borderLeftColor: progressColor}"></em>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      icon: require('../../assets/images/kaxikai1.jpg'),
      show: false,
      text: '加载中...',
      progressColor: '#ff0000'
    }
  }
}
</script>
<style>
.custom-loading {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
  display: flex;
  /* 横向居中 */
  justify-content: center;
  /* 纵向居中 */
  align-items: center;
}
.custom-loading-Mask {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.custom-loading-box {
  width: 138px;
  height: 138px;
  border-radius: 6px;
  background-color: white;
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-loading-content {
  width: 106px;
  height: 106px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  border: 3px solid #eee;
  position: relative;
}
.custom-loading-content::after {
}
@-webkit-keyframes haha1 {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

.custom-loading-content img {
  width: 30px;
  height: 30px;
  margin-bottom: 15px;
}
.custom-loading-content span {
  width: 100%;
  text-align: center;
  font-size: 15px;
}
.custom-loading-content em {
  position: absolute;
  width: 110px;
  height: 110px;
  left: -2px;
  top: -2px;
  border: 3px solid transparent;
  border-left: 3px solid;
  border-radius: 50%;
  box-sizing: border-box;
  -webkit-animation: haha1 1s infinite linear;
  animation: haha1 1s infinite linear;
}
</style>
