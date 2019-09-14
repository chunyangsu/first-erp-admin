<template>
  <div>
    <!-- 搜索栏 -->
    <div>
      <el-button style="margin-right: 20px;" type="primary" size="mini" icon="el-icon-plus">添加</el-button>
    </div>
    <!-- 列表 -->
    <div>
      <el-table ref="orderTable" :data="list" size="mini" border style="width: 100%">
        <!-- 用户订单号 -->
        <el-table-column label="订单编号" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <!-- 销售员 -->
        <el-table-column label="销售员" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.saleman }}</span>
          </template>
        </el-table-column>
        <!-- 采购员 -->
        <el-table-column label="采购员" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.buyer }}</span>
          </template>
        </el-table-column>
        <!-- 订单备注 -->
        <el-table-column label="产品备注" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserOrders', // 用户订单
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取列表数据
    async getData() {
      const response = await this.$http.get('/orders/getOrdersList')
      const { data, meta } = response.data
      if (meta.status === 200) {
        this.list = data.orders
      }
    }
  }
}
</script>

<style>
</style>
