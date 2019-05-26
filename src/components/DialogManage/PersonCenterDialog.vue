<template>
  <div>
    <el-dialog title="个人中心" :visible.sync="perCenterVisible">
      <div>111</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'PersonCenterDialog', // 个人中心弹窗
  data() {
    return {
      perCenterVisible: false
    }
  },
  methods: {
    // 展示个人中心对话框
    showPerCenterDialog() {
      this.perCenterVisible = true
    }
  }
}
</script>
