<template>
  <div>
    <el-table :data="list" stripe border style="width: 100%">
      <!-- 序号 -->
      <!-- <el-table-column label="序号" type="index" width="50" /> -->
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :page-size="5" :current-page="curPage" @current-change="changePage" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'GoodsManage', // 商品管理
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
  created() {
    this.getUsersList()
  },
  // 方法集合
  methods: {
    // 1. 获取列表数据
    async getUsersList(curPage = 1) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: curPage,
          pagesize: 5,
          query: this.queryStr || ''
        }
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      })
      // 获取数据
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.usersList = data.users
        this.totals = data.total
        this.curPage = data.pagenum
      }
    }
  }
}
</script>
