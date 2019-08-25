<template>
  <div>
    <!-- 打开暂存车 -->
    <el-button style="margin-right: 20px; float: right;" type="primary" @click.native="$refs.CartDialog.openCart">打开暂存车</el-button>
    <!-- 加入暂存车 -->
    <el-button style="margin-right: 20px; float: right;" type="primary" icon="el-icon-plus" @click="addCart">加入暂存车</el-button>
    <el-table ref="proTable" :data="list" border fit size="mini" highlight-current-row style="width: 100%" @selection-change="selectionPro">
      <el-table-column type="selection" width="50px" align="center" />
      <el-table-column width="50px" label="序号" type="index" align="center" />
      <!-- 产品名称 -->
      <el-table-column label="产品名称" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
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
      <!-- 产品价格 -->
      <el-table-column label="产品价格" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 暂存车 -->
    <cart-dialog ref="CartDialog" :selectedprolist="cartProductList" />
  </div>
</template>

<script>
import CartDialog from '@/components/DialogManage/CartDialog'
export default {
  name: 'StorageManage', // 库存管理
  components: {
    
  }
  data() {
    return {
      list: [],
      chooseProductList: [], // 已选产品
      cartProductList: [] // 暂存车内产品
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取备注(评论)组件数据
    async getData() {
      const response = await this.$http.get('/products/getProductsList')
      const { data, meta } = response.data
      if (meta.status === 200) {
        this.list = data.products
      }
    },
    // 产品选择回调
    selectionPro(selection, row) {
      this.chooseProductList = selection
    },
    // 加入暂存车
    addCart() {
      this.cartProductList = this.cartProductList.concat(this.chooseProductList)
      // 数组去重
      // const hash = {}
      // const newArr = this.cartProductList.reduceRight((item, next) => {
      //   hash[next.id] ? '' : (hash[next.id] = true && item.unshift(next))
      //   return item
      // }, [])
      // this.cartProductList = newArr
    }
  }
}
</script>

<style>
</style>
