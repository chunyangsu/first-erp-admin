<template>
  <div>
    <el-table :data="count" id="remarksScroll" max-height="200" stripe border size="mini" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.id}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]
    }
  },
  methods: {
    load() {
      var dom = this.$el.querySelector('#remarksScroll')
      dom.addEventListener('scroll', function () {
        const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight
        console.log(scrollDistance)
        if (scrollDistance <= 0) {
          // 等于0证明已经到底，可以请求接口
          //   if ($this.currentPage < $this.totalPage) {// 当前页数小于总页数就请求
          //     $this.currentPage++;// 当前页数自增
          //     // 请求接口的代码
          //     $this.$axios.fun().then(res => {
          //       $this.tableData = $this.tableData.concat(res.data)
          //       // 将请求回来的数据和当前展示的数据合并在一起
          //     })
          //   }
        }
      })
    }
  }
}
</script>
