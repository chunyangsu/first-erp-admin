<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="users-nav">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索栏 -->
    <el-row class="users-search" :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入用户名" v-model="queryStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="queryUserList(queryStr)"></el-button>
        </el-input>
      </el-col>
      <!-- 添加用户按钮 -->
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-plus" @click.native="$refs.UserDialog.showAddUserDialog">添加</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="usersList" stripe border @contextmenu.native="rightClick($event)" @row-contextmenu="getRow" style="width: 100%">
      <el-table-column prop="username" label="姓名" min-width="60">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="60">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" min-width="60">
      </el-table-column>
      <el-table-column label="用户状态" min-width="60">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#409EFF" inactive-color="#C0CCDA" @change="changeUserState(scope.row.id, scope.row.mg_state)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="showeditUserDialog(scope.row)"></el-button>
          <!-- 删除 -->
          <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="delUser(scope.row.id)"></el-button>
          <!-- 分配角色 -->
          <el-button type="success" size="mini" plain icon="el-icon-check" @click="assignRole(scope.row)">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination background layout="prev, pager, next" :total="totals" :current-page.sync="curPage" :page-size="pageSize" @current-change="changePage">
    </el-pagination>
    <!-- 添加用户对话框 -->
    <!--
        :rules 用来设置表单验证规则的
        ref    在vue中是一个特殊的属性，给组件或者HTML元素添加该属性后，
      可以在 js 中通过 this.$refs.loginForm 来获取到当前组件或者DOM对象
        prop 它的值是 model 对象中的一个属性
          当使用 表单验证 或者 表单重置 功能时，必须要提供该属性
     -->
    <user-dialog ref="UserDialog" :children="children" @getData='getData'></user-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editUserVisible" @close="closeeditUserDialog">
      <el-form :model="editUserForm" :rules="editUserRules" ref="userEditForm">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input disabled :value="editUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="120px">
          <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" label-width="120px">
          <el-input v-model="editUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <!--分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="assignRoleDialog">
      <el-form ref="assignRole" :model="assignRoleForm" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="assignRoleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-select v-model="assignRoleForm.role_id" placeholder="请选择角色">
            <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="assignRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="assignRoleSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UserDialog from '@/components/DialogManage/UserDialog'
export default {
  components: {
    UserDialog
  },
  // 一进入页面就渲染
  created() {
    this.getUsersList()
    this.getRoleLists()
  },
  // 数据
  data() {
    return {
      usersList: [],
      curPage: 1,
      pageSize: 5,
      totals: 0,
      queryStr: '',
      // 编辑用户对话框属性
      editUserVisible: false,
      assignRoleDialog: false, // 分配角色对话框
      editUserForm: {
        id: -1,
        username: '',
        email: '',
        mobile: '',
        role_id: ''
      },
      // 角色对话框
      assignRoleForm: {
        id: undefined,
        username: undefined,
        role_id: undefined
      },
      roles: [], // 角色列表数组
      children: [],
      // 编辑用户表单验证规则
      editUserRules: {
        email: [
          {
            // required: true,
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮件格式不正确',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            // required: true,
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }
        ]
      },
      tempRow: undefined
    }
  },
  // 方法集合
  methods: {
    // 通过子组件的自定义getData方法获取来自子组件的数据以及做一些其他操作如调用父组件的方法自刷新页面
    getData(children) {
      // console.log(children)
      this.getUsersList()
    },
    // 鼠标右击表格展示菜单
    rightClick(e) {
      e.tempRow = this.tempRow
      // this.GLOBAL.rightMenu = {
      //   type: 'CustomerInquiry',
      //   info: [
      //     { fun: this.audit, tagName: 'custagsView.handleAudit' },
      //     { fun: this.turnPurInqBook, tagName: 'custagsView.turnInbook' },
      //     { fun: this.turnSellBook, tagName: 'custagsView.turnSellbook' },
      //     { fun: this.copyOrder, tagName: 'custagsView.copyInqOrder' },
      //     { fun: this.close, tagName: 'custagsView.close' }
      //   ]
      // }
    },
    // 右击表格触发该事件
    getRow(row, column, event) {
      this.tempRow = row
    },
    // 1. 获取用户列表数据
    // curPage = 1 es6语法，给参数设置默认值为1
    async getUsersList(curPage = 1) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: curPage,
          pagesize: 5,
          query: this.queryStr || ''
        }
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      })
      // 获取数据
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.usersList = data.users
        this.totals = data.total
        this.curPage = data.pagenum
      }
    },
    // 2. 点击切换分页器
    changePage(curPage) {
      this.getUsersList(curPage)
    },
    // 3. 查询
    queryUserList(queryStr) {
      // console.log(queryStr)
      this.curPage = 1
      this.getUsersList()
      // console.log(this.usersList)
      // this.usersList.forEach(item => {
      //   for (let codePoint of item.username) {
      //     // console.log(codePoint)
      //     for (let query of this.queryStr) {
      //       if (query === codePoint) {
      //         console.log(query)
      //         // codePoint = query
      //         codePoint = codePoint + ','
      //       }
      //     }
      //   }
      // })
    },
    // 4. 改变用户状态
    async changeUserState(id, userState) {
      // console.log(id, userState)
      const res = await this.$http.put(`/users/${id}/state/${userState}`, {
        params: {
          uId: id,
          type: userState
        }
      })
      console.log(res)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.$message({
          message: data.mg_state === 0 ? '禁用成功' : '启用成功',
          type: 'success',
          duration: 1000
        })
      } else {
        this.$message({
          message: meta.msg,
          type: 'error',
          duration: 1000
        })
      }
    },
    // 8. 删除用户
    delUser(id) {
      // console.log(id)
      this.$confirm('确认删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`/users/${id}`).then(res => {
            console.log(res)
            const { meta } = res.data
            if (meta.status === 200) {
              this.$message({
                type: 'success',
                message: meta.msg
              })
              // 方法一
              // this.getUsersList()
              // this.curPage = 1
              // 方法二：从本地数据列表中直接删除一行数据
              // const index = this.usersList.findIndex(item => item.id === id)
              // this.usersList.splice(index, 1)
              // const totalPage = Math.ceil(this.usersList.length / this.pageSize)
              // if (this.curPage > totalPage) {
              //   this.getUsersList(--this.curPage)
              // }
              const index = this.usersList.findIndex(item => item.id === id)
              this.usersList.splice(index, 1)
              const pageTotal = Math.ceil(this.usersList.length / this.pageSize)
              if (this.curPage > pageTotal) {
                this.getUsersList(--this.curPage)
              }
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 9. 点击修改按钮弹出修改用户对话框
    showeditUserDialog(curUser) {
      console.log(curUser)
      // 1. 用遍历对象的方法将数据传递给表单
      for (const key in this.editUserForm) {
        this.editUserForm[key] = curUser[key]
      }
      // 2. 展示对话框
      this.editUserVisible = true
    },
    // 10. 关闭修改用户对话框并且重置
    closeeditUserDialog() {
      this.$refs.userEditForm.resetFields()
    },
    // 11. 点击确定按钮提交编辑用户对话框
    editUser() {
      // 1. 先校验
      this.$refs.userEditForm.validate(valid => {
        if (valid) {
          const { id, email, mobile } = this.editUserForm
          this.$http
            .put(`/users/${id}`, {
              email,
              mobile
            })
            .then(res => {
              console.log(res)
              const { data, meta } = res.data
              if (meta.status === 200) {
                // 更新该用户的数据
                const updateUserData = this.usersList.find(
                  item => item.id === id
                )
                updateUserData.email = data.email
                updateUserData.mobile = data.mobile

                // 关闭对话框
                this.editUserVisible = false
              }
            })
        } else {
          return false
        }
      })
    },
    // 获取角色列表数据
    async getRoleLists() {
      const response = await this.$http.get('/roles')
      const { data, meta } = response.data
      if (meta.status === 200) {
        this.roles = data
      }
    },
    // 打开分配角色对话框
    async assignRole(row) {
      this.assignRoleDialog = true
      this.assignRoleForm.username = row.username
      // 获取用户角色id
      const response = await this.$http.get(`/users/${row.id}`)
      const { data, meta } = response.data
      if (meta.status === 200) {
        this.assignRoleForm.role_id = data.rid
      }
    },
    // 分配角色
    assignRoleSure() {

    }
  }
}
</script>

<style scoped lang="less">
// 面包屑导航
.users-nav {
  background-color: #d4dae0;
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  padding-left: 10px;
}
// 搜索栏
.users-search {
  margin-top: 10px;
  .el-select .el-input {
    width: 130px;
  }
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
