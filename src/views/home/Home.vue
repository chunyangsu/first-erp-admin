<template>
  <div>首页</div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {

    }
  },
  created() {
    this.getData()
    // loading效果
    // this.$myLoading.open()
    // setTimeout(() => {
    //   this.$myLoading.hide()
    // }, 3000)
  },
  methods: {
    async getData() {
      const response = await this.$http.get('/comment/getCommentsList')
      console.log(response)
    }
  }
}
</script>

<style>
</style>
