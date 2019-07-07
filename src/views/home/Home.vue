<template>
  <div>首页</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {
    this.$myLoading.open()
    setTimeout(() => {
      this.$myLoading.hide()
    }, 3000)
  },
  methods: {

  }
}
</script>

<style>
</style>
