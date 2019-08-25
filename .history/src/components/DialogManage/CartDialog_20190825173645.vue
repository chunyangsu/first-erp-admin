<template>
  <div>
    <el-dialog :visible.sync="DL_visible" title="购物车" :close-on-click-modal="false" show-close width="70%">
      <el-table ref="proTable" :data="selectedprolist" border fit size="mini" highlight-current-row style="width: 100%">
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
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'CartDialog', // 暂存车
  props: {
    // 已选产品数组
    // selectedprolist: {
    //   type: Array,
    //   default: function () {
    //     return []
    //   }
    // }
  },
  data() {
    return {
      DL_visible: false, // 弹窗开关
      chooseProductList: [],
      
    }
  },
  methods: {
    // 打开暂存车弹窗
    openCart() {
      this.selectedprolist = []
      this.selectedprolist = JSON.parse(localStorage.getItem('selectedprolist'))
      console.log(this.selectedprolist)
      this.DL_visible = true
    }
  }
}
</script>
