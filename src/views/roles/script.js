export default {
  created() {
    this.getRoleList()
  },
  // 数据
  data() {
    return {
      roleData: [],
      // 隐藏修改角色对话框
      editRoleVisible: false,
      // 角色对话框属性
      editRoleForm: {
        id: -1,
        roleName: '',
        roleDesc: ''
      }
    }
  },
  // 方法集合
  methods: {
    // 1. 获取角色列表数据
    async getRoleList() {
      const res = await this.$http.get('/roles')
      console.log(res)
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
          console.log(id)
          // 点击确定按钮 删除该角色
          const res = await this.$http.delete(`/roles/${id}`)
          console.log(res)
          const { meta } = res.data
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: 1000
            })
            // this.getRoleList()
            const index = this.roleData.findIndex(item => item.id === id)
            this.roleData.splice(index, 1)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000
          })
        })
    },
    // 3. 点击编辑按钮弹出对话框，同时展示角色信息
    showEditRole(curRole) {
      this.editRoleVisible = true
      console.log(curRole)
      // 遍历对象
      for (var key in this.editRoleForm) {
        this.editRoleForm[key] = curRole[key]
      }
    },
    // 4. 取消编辑对话框并且重置内容
    closeeditRoleDialog() {
      this.$refs.refRole.resetFields()
    },
    // 5. 点击确定按钮，提交编辑对话框
    //   1. 退出对话框
    //   2. 数据更新
    async editRole() {
      const { id, roleName, roleDesc } = this.editRoleForm
      const res = await this.$http.put(`/roles/${id}`, {
        roleName,
        roleDesc
      })
      console.log(res)
      const { meta } = res.data
      if (meta.status === 200) {
        this.editRoleVisible = false
        this.getRoleList()
      }
    }
  }
}
