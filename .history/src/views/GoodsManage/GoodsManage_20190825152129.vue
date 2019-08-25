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
    this.getList()
  },
  // 方法集合
  methods: {
    // 1. 获取列表数据
    async getList(pagenum = 1) {
      const res = await this.$http.get(`/goods`, {
        params: {
          pagenum,
          pagesize: 5
        }
      })

      const { meta, data } = res.data

      if (meta.status === 200) {
        this.list = data.goods
        this.total = data.total

        // console.log(typeof pagenum)
        // 设置当前页，注意：分页组件中需要的是 number 类型，所以， pagenum - 0 将字符串转化为number
        this.curPage = pagenum - 0
      }
    }
  }
}
</script>
