<template>
  <div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible" :close-on-click-modal="false" show-close>
      <el-form ref="dataForm" :model="temp" :rules="rules">
        <el-form-item label="订单编号" prop="code" label-width="100px">
          <el-input v-model="temp.code" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="销售员" prop="saleman_id" label-width="100px">
          <el-input v-model="temp.saleman_id" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="采购员" prop="buyer_id" label-width="100px">
          <el-input v-model="temp.buyer_id" autocomplete="off" class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="订单备注" label-width="100px">
          <el-input v-model="temp.remark" placeholder="请输入订单备注" style="widht: 250px"></el-input>
          <!-- 新增时的单子备注组件 -->
          <!-- <remark-creat v-if="remarkStatus" :content.sync="remarkContent" :objectname.sync="objectNameList" /> -->
          <!-- 编辑时的单子备注组件 -->
          <!-- <el-popover v-else trigger="click" placement="top" @show="showOrderRemark">
            <remark v-loading="LD_remark" :moduleid="quotedList.id" :cur-code="quotedList.code" :remarks="remarkList" :comment-reminds="commentReminds" :moduletype="orderType" />
            <div slot="reference" class="textHidden" style="cursor: pointer; color: blue; text-decoration: underline;" @contextmenu="rightClickElement($event)">{{ quotedList.remark }}</div>
          </el-popover> -->
        </el-form-item>
      </el-form>
      <!-- 操作按钮 -->
      <div slot="footer" id="btn" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'UserOrderDialog', // 用户订单列表弹窗
  data() {
    return {
      dialogVisible: false,
      // 表单属性
      temp: {
        code: undefined,
        saleman_id: undefined,
        buyer_id: undefined,
        remark: ''
      },
      rules: {
        //   code: [
        //     { required: true, message: '请输入用户名', trigger: 'blur' },
        //     { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        //   ],
        //   password: [
        //     { required: true, message: '请输入密码', trigger: 'blur' },
        //     { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        //   ]
      },
      dialogStatus: '',
      textMap: {
        create: '新建',
        update: '编辑'
      }
    }
  },
  methods: {
    // 新建
    handleCreate() {
      this.dialogVisible = true
      this.dialogStatus = 'create'
    },
    // 点击确定按钮，添加订单数据
    createData() {

    },
    // 编辑
    handleUpdate(row) {
      // this.temp = Object.assign({}, row)
      this.dialogVisible = true
      this.dialogStatus = 'update'
    }
  }
}
</script>
<style>
.inputWidth {
  width: 250px;
}
</style>
