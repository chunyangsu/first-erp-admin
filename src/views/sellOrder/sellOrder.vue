<template>
  <div>
    <!-- 搜索栏 -->
    <div>
      <el-button style="margin-right: 20px;" type="primary" size="mini" icon="el-icon-plus" @click.native="$refs.UserOrderDialog.handleCreate">添加</el-button>
    </div>
    <!-- 列表 -->
    <div>
      <el-table ref="orderTable" :data="list" size="mini" border style="width: 100%">
        <!-- 销售订单号 -->
        <el-table-column label="销售订单号" min-width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="$refs.sellOrderDetail.handleDetail(scope.row.id, dialogList)">{{ scope.row.code }}</span>
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
      </el-table>
    </div>
    <!-- 详情弹窗 -->
    <sell-order-detail ref="sellOrderDetail" :max-width="80" :level-width="5" @show-pro-detail="showProDetail" />
    <!-- 产品弹窗 -->
    <pro-detail ref="proDetail" :max-width="80" :level-width="5" @show-sellorder-detail="showSellOrderDetail" />
  </div>
</template>

<script>
import sellOrderDetail from '@/components/DetailManage/sellOrderDetail'
import proDetail from '@/components/DetailManage/proDetail'
export default {
  name: 'SellOrder', // 销售订单
  components: {
    sellOrderDetail,
    proDetail
  },
  data() {
    return {
      list: [],
      dialogList: []
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
    },
    // 打开销售订单详情弹窗
    showSellOrderDetail(id, dialogList) {
      // console.log(dialogList)
      // this.orderDialogList = []
      // this.orderDialogList = dialogList
      this.$refs.sellOrderDetail.handleDetail(id, dialogList)
    },
    // 展示产品详情弹窗
    showProDetail(id, dialogList) {
      // this.proDialogList = []
      // this.proDialogList = dialogList
      this.$refs.proDetail.handleDetail(id, dialogList)
    }
  }
}
</script>

<style>
.link-type {
  color: blue;
  cursor: pointer;
}
</style>
