<template>
  <div>
    <el-table :data="list" stripe border style="width: 100%">
      <!-- 序号 -->
      <el-table-column label="序号" type="index" width="50" />
      <!--  -->
      <el-table-column label="">
        <span></span>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :page-size="5" :current-page="curPage" @current-change="changePage" :total="total">
    </el-pagination>
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
      list: [],
      // 总条数
      total: 0,
      // 当前页
      curPage: 1
    }
  },
  // 方法集合
  methods: {
    // 1. 获取列表数据
    async getList() {
      const res = await this.$http.get('/goods')
      console.log(res)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.list = data
      }
    }
  }
}
</script>
