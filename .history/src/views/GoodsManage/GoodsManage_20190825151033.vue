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
    getData(children) {
      this.getRoleList()
    },
    // 1. 获取角色列表数据
    async getRoleList() {
      const res = await this.$http.get('/roles')
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.roleData = data
      }
    },
    // 2. 点击删除按钮弹出提示框
    delRole(id) {
      this.$confirm('确认删除该角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击确定按钮 删除该角色
          const res = await this.$http.delete(`/roles/${id}`)
          const { meta } = res.data
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: 2000
            })
            const index = this.roleData.findIndex(item => item.id === id)
            this.roleData.splice(index, 1)
            this.getRoleList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 2000
          })
        })
    },
    // 3. 删除指定角色的权限
    async delRoleRightById(roleId, rightId) {
      const res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
      const {
        data,
        meta
      } = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 2000
        })
        const curRole = this.rolesList.find(item => item.id === roleId)
        curRole.children = data
      }
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
