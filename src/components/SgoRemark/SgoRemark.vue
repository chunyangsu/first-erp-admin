<template>
  <div class="container">
    <!-- 备注内容 -->
    <div class="content">
      <div v-for="item in remarkList" :key="item.id" class="remark">
        <!-- 单条备注 -->
        <div class="info">
          <!-- 左侧头像 -->
          <img src="../../assets/images/kaxikai1.jpg" class="avatar" width="38" height="38">
          <!-- 右侧文本 -->
          <div class="right">
            <!-- 姓名和时间 -->
            <div class="name_time clearfix">
              <div class="name">
                <span @click="reply(item)">{{ item.user_name }}</span>
                <!-- <span v-if="item[item.id + 'cancelRepay']" style="font-size: 13px; color: #999;">取消回复</span> -->
              </div>
              <div class="date">{{ item.time }}</div>
            </div>
            <!-- 备注内容 -->
            <pre style="margin: 0;"><div class="content" v-html="item.content"/></pre>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部输入框 -->
    <div class="footer">
      底部
    </div>
  </div>
</template>

<script>

export default {
  name: 'SgoRemark', // 备注组件
  data() {
    return {
      remarkList: [] // 备注数组
    }
  },
  created() {
    this.getRemarks()
  },
  methods: {
    // 获取备注数据
    async getRemarks() {
      this.LD_remark = true
      this.remarkList = []
      const response = await this.$http.get('/comment/getCommentsList')
      const { data, meta } = response.data
      if (meta.status === 200) {
        this.remarkList = data.comments
        console.log(this.remarkList)
        setTimeout(() => {
          this.LD_remark = false
          this.scrollToBottom()
        }, 500)
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  // background-color: #f5f5f5;
  position: relative;
  overflow: hidden;
  // 备注内容
  .content {
    width: 100%;
    height: 100%;
    border-top: 1px solid #e6e1e1;
    position: absolute;
    // left: 0;
    top: 0;
    bottom: 150px;
    z-index:10;
    background-color: #f5f5f5;
  }
  // 底部输入框
  .footer {
    width: 100%;
    height: 150px;
    background-color: white;
    border-top: 1px solid #e6e1e1;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index:200;
  }
}
</style>
