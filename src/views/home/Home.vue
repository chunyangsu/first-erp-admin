<template>
  <el-table ref="table" :data="tableData" border stripe style="width: 100%">
    <el-table-column prop="date" label="日期" width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
      <template slot-scope="scope" style="position:relative">
        <el-popover trigger="click" :open-delay=150 placement="right">
          <remark :remarks="remarkList" />
          <div slot="reference" v-html="scope.row.name" />
        </el-popover>
        <!-- <div v-if="scope.row[scope.row.id + 'remarkVisible']" class="remark ">我是一个粉刷匠</div> -->
        <!-- <div style="background-color: red; " @click="showRemark(scope.row)">{{ scope.row.name }}</div> -->
      </template>
    </el-table-column>
    <el-table-column prop="address " label="地址 ">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      remarkList: [], // 备注数组
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      remarkVisible: false
    }
  },
  created() {
    this.getData()
    // loading效果
    // this.$myLoading.open()
    // setTimeout(() => {
    //   this.$myLoading.hide()
    // }, 3000)
  },
  methods: {
    async getData() {
      const response = await this.$http.get('/comment/getCommentsList')
      const { data, meta } = response.data
      if (meta.status === 200) {
        this.remarkList = data.comments
      }
    },
    // 鼠标滑入展示备注组件
    showRemark(row) {
      setTimeout(() => {
        row[row.id + 'remarkVisible'] = true
      }, 150)
    }
  }
}
</script>

<style scope>
/* .remark {
  position: absolute;
  right: 180px;
  top: 0;
  width: 200px;
  height: 100px;
  background-color: yellow;
  border: 1px solid #ccc;
  z-index: 999;
} */
</style>
