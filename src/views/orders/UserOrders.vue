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
            <el-popover trigger="click" placement="right" @show="showRemarks(scope.row)">
              <remark v-loading="LD_remark" :show-input="true" :remarks="remarkList" />
              <div slot="reference" style="cursor: pointer;">{{ scope.row.remark }}</div>
            </el-popover>
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
      LD_remark: false,
      remarkList: []
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
    // 获取备注(评论)组件数据
    async getRemarkList() {
      const response = await this.$http.get('/comment/getCommentsList')
      const { data, meta } = response.data
      if (meta.status === 200) {
        this.remarkList = data.comments
        setTimeout(() => {
          this.LD_remark = false
        }, 150)
      }
    },
    // 点击弹窗备注弹窗时，调用数据
    showRemarks(row) {
      this.LD_remark = true
      this.getRemarkList()
    }
    // showMore(row) {
    //   console.log(row)
    //   this.list.forEach(item => {
    //     if (item.id === row.id) {
    //       this.visible = true
    //     }
    //   })
    // },
    // isShow() {
    //   this.visible = false
    // }
  }
}
</script>

<style>
.link-type {
  color: blue;
  cursor: pointer;
}
</style>
