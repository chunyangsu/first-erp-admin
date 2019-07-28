<template>
  <el-dialog title="修改角色" :visible.sync="editRoleVisible" @close="closeeditRoleDialog">
    <el-form :model="editRoleForm" ref="refRole">
      <el-form-item label="角色名称" prop="roleName" label-width="120px">
        <el-input :value="editRoleForm.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc" label-width="120px">
        <el-input v-model="editRoleForm.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editRoleVisible = false">取 消</el-button>
      <el-button type="primary" @click="editRole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
    // 点击编辑按钮弹出对话框，同时展示角色信息
    showEditRole(curRole) {
      this.editRoleVisible = true
      // 遍历对象
      for (var key in this.editRoleForm) {
        this.editRoleForm[key] = curRole[key]
      }
    },
    // 取消编辑对话框并且重置内容
    closeeditRoleDialog() {
      this.$refs.refRole.resetFields()
    },
    // 点击确定按钮，提交编辑对话框
    async editRole() {
      const { id, roleName, roleDesc } = this.editRoleForm
      const res = await this.$http.put(`/roles/${id}`, {
        roleName,
        roleDesc
      })
      const { meta } = res.data
      if (meta.status === 200) {
        this.editRoleVisible = false
        this.$emit('getData', this.editRoleForm)
      }
    }
  }
}
</script>

<style>
</style>
