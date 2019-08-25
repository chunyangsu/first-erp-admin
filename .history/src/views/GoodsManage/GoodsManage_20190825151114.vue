<template>
  <div>
    <el-table :data="roleData" stripe border style="width: 100%">
      <el-table-column label="序号" type="index" width="50">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'GoodsManage', // 商品管理
  created() {
    this.getList()
  },
  // 数据
  data() {
    return {
      roleData: [],
      children: []
    }
  },
  // 方法集合
  methods: {
    // 1. 获取列表数据
    async getList() {
      // const res = await this.$http.get('/roles')
      // const { data, meta } = res.data
      // if (meta.status === 200) {
      //   this.roleData = data
      // }
    }
  }
}
</script>

<style scope lang="less">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.level1-row {
  padding: 20px 0;
  border-bottom: 1px dotted #ccc;

  &:last-child {
    border-bottom: 0;
  }
}

.level2-row {
  padding-bottom: 10px;
}

.level3-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
