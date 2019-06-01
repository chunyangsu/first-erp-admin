<template>
  <div>
    <el-dialog title="个人中心" :visible.sync="perCenterVisible" width="60%">
      <el-tabs v-model="activeName" tabPosition="left" type="card" @tab-click="handleClick">
        <el-tab-pane label="账号管理" name="first">
          <!-- 表单 -->
          <el-form :model="addUserForm" :rules="addUserRules" ref="userAddForm">
            <el-form-item label="用户名" prop="username" label-width="100px">
              <el-input v-model="addUserForm.username" autocomplete="off" class="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" label-width="100px">
              <el-input v-model="addUserForm.password" autocomplete="off" class="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" label-width="100px">
              <el-input v-model="addUserForm.email" autocomplete="off" class="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile" label-width="100px">
              <el-input v-model="addUserForm.mobile" autocomplete="off" class="inputWidth"></el-input>
            </el-form-item>
          </el-form>
          <!-- <div slot="footer" class="dialog-footer">
              <el-button @click="addUserVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
            </div> -->
        </el-tab-pane>
        <el-tab-pane label="角色分配" name="second">
          <!-- 分配角色表单 -->
          <el-form ref="assignRole" :model="assignRoleForm" label-width="80px">
            <el-form-item label="活动名称" label-width="100px">
              <el-input v-model="assignRoleForm.username" class="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="角色列表" label-width="100px">
              <el-select v-model="assignRoleForm.role_id" placeholder="请选择角色" class="inputWidth">
                <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!-- <div slot="footer" class="dialog-footer">
            <el-button @click="assignRoleDialog = false">取 消</el-button>
            <el-button type="primary" @click="assignRoleSure">确 定</el-button>
          </div> -->
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'PersonCenterDialog', // 个人中心弹窗
  data() {
    return {
      perCenterVisible: false,
      activeName: 'first',
      // 表单属性
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 校验规则
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      },
      // 角色对话框
      assignRoleForm: {
        id: undefined,
        username: undefined,
        role_id: undefined
      },
      roles: [], // 角色列表数组
    }
  },
  methods: {
    // 展示个人中心对话框
    showPerCenterDialog() {
      this.perCenterVisible = true
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>
<style>
 /* tab栏 */
 /* .el-tabs__header {
   background-color: #545c64;
 }
 .el-tabs__item {
   color: white;
 } */
 /* input框长度 */
.inputWidth {
  width: 250px;
}
</style>
