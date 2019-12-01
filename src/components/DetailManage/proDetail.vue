<template>
  <div>
    <div v-for="(item, index) in dialogList" :key="index">
      <el-dialog title="产品详情" :visible.sync="item.dialogVisible" :width="item.dialogWidth" show-close @close="closeDialog(item.id)">
        <div>产品名称：漩涡鸣人</div>
        <div>产品型号：漩涡鸣人-1</div>
        <div>产品品牌：火影忍者</div>
        <div>产品编码：097-44</div>
        <el-table ref="orderTable" :data="list" size="mini" border style="width: 100%">
          <!-- 销售订单号 -->
          <el-table-column label="销售订单号" min-width="150">
            <template slot-scope="scope">
              <span class="link-type" @click="openOrderDetail(scope.row.id)">{{ scope.row.code }}</span>
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
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProDetail', // 产品详情弹窗
  props: {
    // 弹窗数组
    // dialogList: {
    //   type: Array,
    //   default: function () {
    //     return []
    //   }
    // },
    // 第一个弹窗的做大宽度
    maxWidth: {
      type: Number,
      default: function () {
        return 70
      }
    },
    // 新增叠加弹窗宽度缩小的比例
    levelWidth: {
      type: Number,
      default: function () {
        return 5
      }
    }
  },
  data() {
    return {
      // dialogVisible: false,
      dialogList: [],
      list: []
    }
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
    // 【产品详情】弹窗
    handleDetail(id, tempList) {
      // console.log(tempList)
      if (tempList.length > 0) {
        this.dialogList = tempList
      }
      this.dialogList.push({ id: id })
      this.dialogList.forEach((item, index) => {
        item.dialogVisible = true
        // 每新增一个弹窗，宽度减少5%
        item.dialogWidth = this.maxWidth - index * this.levelWidth + '%'
      })
      console.log(this.dialogList)
      this.getData()
    },
    // 打开订单详情
    openOrderDetail(id) {
      this.$emit('show-sellorder-detail', id, this.dialogList)
    },
    // 关闭弹窗
    closeDialog(id) {
      if (this.dialogList.length > 0) {
        // 关闭最新的弹窗(保留之前打开的)
        this.dialogList[this.dialogList.length - 1].DL_detailDialog = false
        this.dialogList.pop() // 同时去掉最新弹窗的数据
      }
      this.dialogList.push('1')
      this.dialogList.pop()
      // return
    }
  }
}
</script>
