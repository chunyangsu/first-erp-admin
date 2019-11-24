<template>
  <div>
    <!-- 搜索栏 -->
    <div>
      <el-button style="margin-right: 20px;" type="primary" size="mini" icon="el-icon-plus" @click.native="$refs.UserOrderDialog.handleCreate">添加</el-button>
    </div>
    <!-- 列表 -->
    <div>
      <el-table ref="orderTable" :data="list" size="mini" border style="width: 100%">
        <!-- 用户订单号 -->
        <el-table-column label="订单编号" min-width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="$refs.UserOrderDialog.handleUpdate(scope.row)">{{ scope.row.code }}</span>
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
            <el-drawer :visible.sync="scope.row.drawer" :direction="direction" :modal="false" size="40%" @close="choseDrawer">
              <el-radio-group v-model="direction" style="padding-bottom: 20px;">
                <el-radio label="ltr">从左侧弹出</el-radio>
                <el-radio label="rtl">从右侧弹出</el-radio>
              </el-radio-group>
              <sgo-remark ref="sgoRemark" />
            </el-drawer>
            <!-- 表格最后一条备注 -->
            <span @click="showRemarks(scope.row)" style="cursor: pointer;">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建/编辑弹窗 -->
    <user-order-dialog ref="UserOrderDialog"></user-order-dialog>
  </div>
</template>

<script>
import UserOrderDialog from '@/components/DialogManage/UserOrderDialog'
export default {
  name: 'UserOrders', // 用户订单
  components: {
    UserOrderDialog
  },
  data() {
    return {
      list: [],
      // drawer: false,
      direction: 'rtl'
      // LD_remark: false,
      // remarkList: []
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
    // 点击弹窗备注弹窗时，调用数据
    showRemarks(row) {
      this.list.forEach(item => {
        if (item.id === row.id) {
          item.drawer = true
        } else {
          item.drawer = false
        }
      })
      this.list.push('1')
      this.list.pop()
    },
    // 关闭抽屉弹窗
    choseDrawer() {
      this.list.push('1')
      this.list.pop()
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
