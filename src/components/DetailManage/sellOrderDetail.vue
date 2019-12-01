<template>
  <div>
    <div v-for="(item, index) in dialogList" :key="index">
      <el-dialog title="销售订单详情" :visible.sync="item.dialogVisible" :width="item.dialogWidth" show-close @close="closeDialog(item.id)">
        <el-table ref="proTable" :data="productList" size="mini" border style="width: 100%">
          <!-- 产品名称 -->
          <el-table-column label="产品名称" min-width="150">
            <template slot-scope="scope">
              <span class="link-type" @click="openProDetail(scope.row.id)">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <!-- 产品品牌 -->
          <el-table-column label="产品品牌" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.brand }}</span>
            </template>
          </el-table-column>
          <!-- 产品型号 -->
          <el-table-column label="型号" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.model }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SellOrderDetail', // 销售订单详情弹窗
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
      productList: []

    }
  },
  methods: {
    async getProductList() {
      const response = await this.$http.get('/products/getProductsList')
      const { data, meta } = response.data
      if (meta.status === 200) {
        this.productList = data.products
      }
    },
    // 【订单详情】弹窗
    handleDetail(id, tempList) {
      if (tempList.length > 0) {
        this.dialogList = tempList
      }
      this.dialogList.push({ id: id })
      this.dialogList.forEach((item, index) => {
        item.dialogVisible = true
        // 每新增一个弹窗，宽度减少5%
        item.dialogWidth = this.maxWidth - index * this.levelWidth + '%'
      })
      // console.log(this.dialogList)
      this.getProductList()
    },
    // 打开产品详情
    openProDetail(id) {
      this.$emit('show-pro-detail', id, this.dialogList)
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
