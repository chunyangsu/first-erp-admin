<template>
  <div class="container">
    <div id="remarksScroll" style="max-height: 350px; overflow-y: auto;">
      <div v-for="item in remarkList" :key="item.id" class="remark">
        <!-- 单条备注 -->
        <div class="info">
          <!-- 左侧头像 -->
          <!-- <img :src="icon" class="avatar" width="38" height="38"> -->
          <img src="../../assets/images/kaxikai1.jpg" class="avatar" width="38" height="38">
          <!-- 右侧文本 -->
          <div class="right">
            <!-- 姓名和时间 -->
            <div class="name_time clearfix">
              <div class="name">
                <span @click="reply(item)">{{ item.user_name }}</span>
                <!-- <span v-if="item[item.id + 'cancelRepay']" style="font-size: 13px; color: #999;">取消回复</span> -->
              </div>
              <div class="date">{{ item.time }}</div>
            </div>
            <!-- 备注内容 -->
            <pre style="margin: 0;"><div class="content" v-html="item.content"/></pre>
          </div>
        </div>
      </div>
    </div>
    <!-- 无数据时 暂无备注提醒 -->
    <div v-if="remarkList.length === 0" style="text-align: center; padding: 10px 0 5px 0; font-size: 15px;">暂无备注</div>
    <!-- 输入框部分 -->
    <div v-if="showInput" class="footer clearfix">
      <!-- 输入框 -->
      <div style="float: left; width: 84%;">
        <el-form ref="dataForm" :rules="rules" :model="temp">
          <el-form-item prop="inputContent">
            <el-input v-if="placeholder_flag" ref="remarkInput" v-model="temp.inputContent" :rows="2" :placeholder="replyHolder" type="textarea" autofocus @input="searchUser" />
            <el-input v-else ref="remarkInput" v-model="temp.inputContent" :rows="2" placeholder="请输入内容" type="textarea" autofocus @input="searchUser" />
          </el-form-item>
        </el-form>
      </div>
      <!-- 用户下拉框 -->
      <div v-clickoutside="colseOption" v-if="optionVisible" class="userOption">
        <el-table :data="userList" :show-header="false" @cell-click="selected">
          <el-table-column>
            <template slot-scope="scope">
              <span class="itemOption">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 提交按钮 -->
      <div style="float: right; width: 15%;">
        <el-button type="primary" style="height: 54px; float: right;" @click="send">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
export default {
  name: 'SgoRemark', // 备注组件
  directives: {
    Clickoutside
  },
  props: {
    // 是否隐藏input框
    showInput: {
      type: Boolean,
      default: function () {
        return true
      }
    }
  },
  data() {
    return {
      LD_loading: false,
      remarkList: [], // 备注数组
      temp: {
        inputContent: '' // 输入框内容
      },
      userInfo: {}, // 当前用户
      replyObjectId: undefined, // 回复对象的id
      // cancelRepay: false,
      userList: [], // 用户列表
      allUserList: [], // 完整的用户列表，用于删除搜索关键字后再次赋值给用户列表
      reminds: [], // @对象的id
      objectNameList: [], // @对象名称的数组
      optionVisible: false,
      placeholder_flag: false,
      replyHolder: '',
      rules: {
        // inputContent: [{ required: true,
        //   pattern: /^[\s\S]*.*[^\s][\s\S]*$/, // 非空校验：不可全为空格和换行，允许字符前面和后面为空
        //   message: this.$t('不可为空'),
        //   trigger: 'change' }]
      }
    }
  },
  created() {
    this.scrollToBottom()
  },
  methods: {
    // 滚动条至最底部
    scrollToBottom() {
      this.$nextTick(() => {
        var container = this.$el.querySelector('#remarksScroll')
        container.scrollTop = container.scrollHeight
      })
    },
    // 获取备注数据
    async getRemarks() {
      this.remarkList = []
      const response = await this.$http.get('/comment/getCommentsList')
      const { data, meta } = response.data
      if (meta.status === 200) {
        // this.remarkList = data.comments
        data.comments.forEach(item => {
          this.remarkList.push(item)
        })
        console.log(this.remarkList)
        // setTimeout(() => {
        //   this.LD_remark = false
        // }, 150)
      }
    },
    // 获取用户列表数据
    async getUserList() {
      const response = await this.$http.get('/users/getUsersList')
      const { data, meta } = response.data
      if (meta.status === 200) {
        this.userList = data.users
        this.allUserList = data.users // 将完整的用户列表存在另一个数组中
      }
    },
    // 点击空白处关闭用户下拉框
    colseOption() {
      this.optionVisible = false
    },
    // 用户下拉框选择事件
    selected(row, column, cell, event) {
      this.objectNameList.push(row.name) // 获取@对象的name，组成数组
      this.objectNameList = Array.from(new Set(this.objectNameList)) // 数组去重
      // 去掉@后面手动输入的字符串，以确保@后面紧跟着点击的下拉选项
      this.temp.inputContent = this.temp.inputContent.slice(0, this.temp.inputContent.lastIndexOf('@') + 1)
      this.temp.inputContent = this.temp.inputContent + row.name // 将@对象的名字展示在输入框内
      this.$nextTick(() => {
        this.$refs['remarkInput'].focus()
      })
      this.optionVisible = false
    },
    // 点击人名展示回复对象
    reply(row) {
      // this.cancelRepay = false
      this.placeholder_flag = true // 回复xxx占位文本
      this.temp.inputContent = ''
      this.replyHolder = '回复' + row.user_name + '：'
      if (this.replyObjectId === undefined || this.replyObjectId !== row.id) {
        this.replyObjectId = row.id
      } else if (this.replyObjectId === row.id) {
        // 取消回复
        this.replyObjectId = undefined
        this.placeholder_flag = false
      }
      this.$nextTick(() => {
        this.$refs['remarkInput'].focus()
      })
    },
    // 弹出下拉列表后输入关键字进行搜索
    searchUser(val) {
      // 判断最后一个字符是否是@，是的话弹出下拉列表
      if (val.charAt(val.length - 1) === '@') {
        this.optionVisible = true
        this.placeholder_flag = false
        // 已经获取了用户列表数据，就不再调用接口了
        if (this.allUserList.length > 0) {
          this.userList = this.allUserList
        } else {
          this.getUserList()
        }
      }
      if (val.includes('@')) {
        // 获取@最后一次出现的位置(下标)并截取最后一个@及后面的字符串，+1 是从@后面一个字符开始算起(不包括@)
        const str = val.slice(val.lastIndexOf('@') + 1)
        if (str !== '') {
          this.userList = this.userList.filter(item => item.name.includes(str))
        } else {
          // 获取所有的用户列表
          this.userList = this.allUserList
        }
      } else {
        // input框内没有@时，关闭下拉框
        this.optionVisible = false
        this.placeholder_flag = false
      }
    },
    replaceRemark(val, value) {
      const replaceReg = new RegExp(val, 'ig')
      const replaceString = '<span style="color: #2289f0;">' + val + '</span>'
      return value.replace(replaceReg, replaceString)
    },
    // 提交
    send() {
      this.objectNameList.forEach(item => {
        if (this.temp.inputContent.includes(item)) {
          this.temp.inputContent = this.replaceRemark('@' + item, this.temp.inputContent)
        }
      })
      // 提交成功，给备注数据数组新增最新备注
      // const curTime = parseTime(Date.parse(new Date())) // 获取当前时间
      // 将新添加的备注push进数组里
      this.remarkList.push({
        // comment_user_icon: this.userIcon,
        // comment_user_name: this.userInfo.name,
        // comment_object_id: this.replyObjectId, // 回复对象的id
        // comment_object_name: this.replyObjectName, // 回复对象的名字
        // time: curTime,
        content: this.temp.inputContent
      })
      this.temp.inputContent = ''
      this.placeholder_flag = false
      this.$nextTick(() => {
        this.scrollToBottom()
        // this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  box-sizing: border-box;
  // 备注
  .remark {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    border-bottom: 1px solid #eaebec;
    // 用户信息
    .info {
      position: relative;
      display: flex;
      align-items: center;
      // 左侧头像
      .avatar {
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
      }
      // 右侧文字
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 48px;
        .name_time {
          // 姓名
          .name {
            float: left;
            width: 200px;
            font-size: 16px;
            color: rgb(34, 137, 240);
            font-weight: 500;
            cursor: pointer;
            // &:hover {
            //   color: rgb(57, 76, 245);
            // }
          }
          // 时间
          .date {
            float: right;
            font-size: 13px;
            color: #909399;
            padding-right: 10px;
          }
        }
        // 内容
        .content {
          width: 300px;
          font-size: 15px;
          color: #303133;
          padding: 5px 0;
        }
      }
    }
  }
  // 底部备注按钮和输入框
  .footer {
    padding: 10px 0;
    position: relative;
  }
  // 用户下拉框
  .userOption {
    position: absolute;
    left: 0;
    top: 64px;
    width: 150px;
    min-height: 60px;
    max-height: 200px;
    overflow-y: auto;
    background-color: white;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .itemOption {
      padding-left: 10px;
    }
  }
}
</style>
