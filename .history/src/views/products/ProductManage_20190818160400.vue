<template>
  <div>
    <el-table :data="list" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" default-expand-all row-key="id" border style="width: 100%">
      <el-table-column label="产品名称" min-width="150">
        <!-- 产品名称 -->
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" min-width="150">
        <!-- 产品品牌 -->
        <template slot-scope="scope">
          <span>{{ scope.row.brand }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" min-width="150">
        <!-- 产品型号 -->
        <template slot-scope="scope">
          <span>{{ scope.row.model }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" width="120">
        <!-- 产品价格 -->
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ProductManage', // 产品管理
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
        console.log(this.list);
      }
    }
  }
}
</script>

<style>
</style>
