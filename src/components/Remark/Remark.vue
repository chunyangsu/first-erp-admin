<template>
  <div class="container">
    <div id="remarksScroll" style="height: 350px; overflow-y: auto;">
      <div v-for="item in remarks" :key="item.id" class="remark">
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
            <div class="content">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 无数据时 暂无备注提醒 -->
    <div v-if="remarks.length === 0" style="text-align: center; padding: 10px 0 5px 0; font-size: 15px;">暂无备注</div>
    <!-- 输入框部分 -->
    <div v-if="showInput" class="footer clearfix">
      <!-- 输入框 -->
      <div style="float: left; width: 84%;">
        <el-form ref="dataForm" :rules="rules" :model="temp">
          <el-form-item prop="inputContent">
            <el-input v-if="placeholder_flag" ref="remarkInput" v-model="temp.inputContent" :rows="2" :placeholder="replyHolder" type="textarea" autofocus @keyup.shift.50.native="showUserList" />
            <el-input v-else ref="remarkInput" v-model="temp.inputContent" :rows="2" placeholder="请输入内容" type="textarea" autofocus @keyup.shift.50.native="showUserList" />
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
  name: 'Remark', // 备注组件
  directives: {
    Clickoutside
  },
  props: {
    // 备注数组
    remarks: {
      type: Array,
      default: function () {
        return []
      }
    },
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
      temp: {
        inputContent: '' // 输入框内容
      },
      userInfo: {}, // 当前用户
      replyObjectId: undefined, // 回复对象的id
      // cancelRepay: false,
      userList: [{
        id: 1,
        name: '苏春阳'
      }, {
        id: 2,
        name: '杨晗'
      }, {
        id: 3,
        name: '王月磊'
      }, {
        id: 4,
        name: '顾剑晨'
      }
      ],
      reminds: [], // @对象的id
      objectNameList: [], // @对象名称的数组
      optionVisible: false,
      placeholder_flag: false,
      replyHolder: '',
      rules: {
        // inputContent: [{ required: true, message: '评论内容不能为空', trigger: ['blur', 'change'] }]
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
    // 输入@展示用户下拉框
    showUserList() {
      this.optionVisible = true
      this.placeholder_flag = true
    },
    // 点击空白处关闭用户下拉框
    colseOption() {
      this.optionVisible = false
    },
    // 用户下拉框选择事件
    selected(row, column, cell, event) {
      this.objectNameList.push(row.name) // 获取@对象的name，组成数组
      this.objectNameList = Array.from(new Set(this.objectNameList)) // 数组去重
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
    // 提交
    send() {
      this.scrollToBottom() // 滚动条至最底部
      this.objectNameList.forEach(item => {
        if (this.temp.inputContent.includes(item)) {
          console.log(item)
        }
      })
      // 提交后隐藏备注弹窗
      // this.visible = false
      // this.$emit('update:visible')
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
    height: 300px;
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
