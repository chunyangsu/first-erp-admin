<template>
  <div>
    <el-table :data="roleData" stripe border style="width: 100%">
      <!-- 表格扩展列 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 无数据时的提示 -->
          <el-row v-if="scope.row.children.length === 0">
            <el-col>
              暂无权限，请分配！
            </el-col>
          </el-row>
          <!-- 有数据时，遍历一级菜单 -->
          <el-row class="level1-row" v-for="level1 in scope.row.children" :key="level1.id">
            <!-- 第一列：展示一级菜单的名字 -->
            <el-col :span="4">
              <el-tag closable @close="delRoleRightById(scope.row.id, level1.id)">
                {{ level1.authName }}
              </el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!-- 第二列：展示二级菜单 -->
            <el-col :span="20">
              <el-row class="level2-row" v-for="level2 in level1.children" :key="level2.id">
                <el-col :span="4">
                  <el-tag closable type="success" @close="delRoleRightById(scope.row.id, level2.id)">
                    {{ level2.authName }}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 展示三级菜单 -->
                <el-col :span="20">
                  <el-tag class="level3-tag" closable type="warning" v-for="level3 in level2.children" :key="level3.id" @close="delRoleRightById(scope.row.id, level3.id)">
                    {{ level3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" width="50">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Roles', // 角色管理
  components: {
    RolesDialog
  },
  created() {
    this.getRoleList()
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
