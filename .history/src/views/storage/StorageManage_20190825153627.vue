<template>
  <div>
    <el-table ref="proTable" :data="list" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" default-expand-all row-key="id" border style="width: 100%">
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
  </div>
</template>

<script>
export default {
  name: 'StorageManage', // 产品管理
  data() {
    return {
      list: []
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
        console.log(this.list)
        this.$refs.proTable.$el.style.color = 'red'
        // this.list.forEach(item => {
        //   if (item.children && item.children.length > 0) {
        //     item.children.forEach(val => {
        //       val.style.color = 'red'
        //     })
        //   }
        // })
      }
    }
  }
}
</script>

<style>
</style>
