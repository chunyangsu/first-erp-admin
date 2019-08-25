<template>
  <div>
    <el-table :data="list" stripe border style="width: 100%">
      <!-- 序号 -->
      <el-table-column label="序号" type="index" width="50"/>
      <!--  -->
      <el-table-column label=""></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'GoodsManage', // 商品管理
  created() {
    this.getList()
  },
  // 数据
  data() {
    return {
      list: []
    }
  },
  // 方法集合
  methods: {
    // 1. 获取列表数据
    async getList() {
      // const res = await this.$http.get('/roles')
      // const { data, meta } = res.data
      // if (meta.status === 200) {
      //   this.roleData = data
      // }
    }
  }
}
</script>
