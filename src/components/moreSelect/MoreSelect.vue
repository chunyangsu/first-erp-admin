<template>
  <div class="search">
    <!-- 内容框 -->
    <div class="box clearfix">
      <!-- 第一个搜索内容 -->
      <div class="left textHidden">
        <span>{{ placeholder }}</span>
      </div>
      <div class="right">
        <!-- + num -->
        <div @click="open"> + 1</div>
        <!-- <div v-if="num > 0" @click="open"> + 1</div> -->
        <!-- 下拉箭头按钮 -->
        <!-- <el-button @click="open">
          <i v-if="!searchVisible" class="fa fa-angle-double-down" aria-hidden="true" />
          <i v-else class="fa fa-angle-double-up" aria-hidden="true" />
        </el-button> -->
      </div>
    </div>
    <!-- 搜索框内容展示 -->
    <div v-if="searchVisible" class="dialog">
      <!-- 搜索框 -->
      <div class="searchBox">
        <el-input v-model="listQuery.param" :placeholder="placeholder" style="width: 254px;" clearable />
        <!-- <el-button :type="buttonStyle.search.type" :size="buttonStyle.search.size" :icon="buttonStyle.search.icon" @click="handleSearch" /> -->
      </div>
      <!-- 下拉列表 -->
      <div class="selectList">
        <!-- 未选列表 -->
        <div class="selected">
          <el-card>
            <!-- 头部标题 -->
            <div slot="header" class="clearfix">
              <span class="select">未选列表</span>
            </div>
            <el-table ref="proModel" :data="data" fit style="width: 100%" max-height="250" size="mini" @row-dblclick="handleCurrentChange">
              <template v-for="(col , index) in cols">
                <el-table-column :key="index" :prop="col.prop" :label="col.label" />
              </template>
            </el-table>
          </el-card>
        </div>
        <!-- 已选列表 -->
        <div class="noSelect">
          <el-card style="margin-top: 10px;">
            <!-- 头部标题 -->
            <div slot="header" class="clearfix">
              <span class="select">已选列表</span>
            </div>
            <!-- 选中值标签 -->
            <div class="selection clearfix">
              <div class="content textHidden">
                <el-popover v-if="selections.length > 2" trigger="hover" placement="right">
                  <pre><div v-html="selections"/></pre>
                  <div slot="reference" class="textHidden" v-html="selections" />
                </el-popover>
              </div>
              <div class="close">×</div>
            </div>
            <!-- <el-tag v-for="tag in selectedList" :key="tag.id" :type="tag.type" closable @close="handleClose(tag)">
              {{ tag.model }}
            </el-tag> -->
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import waves from '@/directive/waves' // 水波纹指令
// import buttonStyle from '@/common/buttonStyle'
export default {
  name: 'MoreSelect',
  // 接收父组件传递的数据
  props: {
    // input框站位提示
    placeholder: {
      type: String,
      default: function () {
        return ''
      }
    },
    // 搜索到的表格数据
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      cols: [],
      searchVisible: false,
      // buttonStyle: buttonStyle, // 按钮样式配置
      listQuery: {
        param: '' // 搜索框输入的值
      },
      proModelList: [], // 未选型号数组
      selectedList: [], // 已选型号数组
      selectProIds: [], // 已选型号id数组
      selections: '啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
      // LD_ProModel: false
    }
  },
  methods: {
    // 用于父组件调用的方法，同时传入父组件配置的参数：数据，字段名的语言包，需要展示的字段名
    createTableColumn(data, param, fieldArr) {
      this.cols = []
      const _this = this
      if (data.length > 0) {
        Object.keys(data[0]).forEach(function (key) {
          if (fieldArr.includes(key)) {
            _this.cols.push({ label: _this.$t(param + '.' + key), prop: key })
          }
        })
      }
    },
    // 切换搜索弹窗
    open() {
      if (this.searchVisible === false) {
        this.searchVisible = true
      } else {
        this.searchVisible = false
      }
    },
    // 搜索产品型号事件
    handleSearch() {
      // 将搜索框内输入的值传给父组件
      this.$emit('getProModelList', this.listQuery.param)
    },
    // 双击选中
    handleCurrentChange(val) {
      const that = this
      that.data.forEach(function (value, i) {
        if (val.id === value.id) {
          that.data.splice(i, 1)
          that.selectedList.push(val)
        }
      })
      // 判断第一个产品型号是否展示
      // if (that.data.length > 0) {
      //   this.toboxdata.firstModel = that.data[0].model
      // }
      // else if (childdata.length === 0) {
      //   this.toboxdata.firstModel = '产品型号'
      // }
      that.$emit('update:foo', that.selectedList)
    },
    // 删除标签事件
    handleClose(row) {
      const that = this
      that.selectedList.forEach(function (value, i) {
        if (row.id === value.id) {
          that.selectedList.splice(i, 1)
          that.data.unshift(row)
        }
      })
      //   // 判断型号数量
      //   if (childdata.length > 1) {
      //     this.toboxdata.num = childdata.length - 1
      //   } else if (childdata.length < 2) {
      //     this.toboxdata.num = 0
      //   }
      that.$emit('update:foo', that.selectedList)
    }
  }
}
</script>

<style>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.clearfix::after {
  content: '';
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}
/* 文字溢出隐藏 */
.textHidden {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search {
  position: relative;
  display: inline-block;
}
.box {
  width: 200px;
  height: 33px;
  line-height: 35px;
  font-size: 14px;
  color: rgb(184, 182, 182);
  border: 0.5px solid #ccc;
  /* margin-top: 10px; */
}
/* 第一个搜索内容框 */
.box .left {
  width: 150px;
  height: 100%;
  float: left;
  padding-left: 8px;
  border-right: 1px solid #ccc;
  background-color: white;
}
/* 按钮 */
.box .right {
  width: 38px;
  float: left;
  font-size: 15px;
  cursor: pointer;
}
/* 搜索列表 */
.dialog {
  position: absolute;
  left: 0;
  top: 40px;
  width: 600px;
  height: 500px;
  border: 1px solid #ccc;
  z-index: 99;
  background-color: white;
}
/* 搜索框 */
.searchBox {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
/* 下拉列表 */
.selectList {
  width: 100%;
}
/* 已选列表 */
.selectList .selected {
  width: 100%;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #ccc;
}
/* 未选列表 */
.selectList .noSelect {
  width: 100%;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  color: #666;
}
/* 表格标题 */
.dialog .el-card__header {
  padding: 10px;
}
.dialog .el-card__body {
  padding: 10px;
}
/* 选中值标签样式 */
.selection {
  width: 141px;
  border: 1px solid rgba(64, 158, 255, 0.2);
  background-color: rgba(64, 158, 255, 0.1);
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-radius: 4px;
}
/* 选中值内容 */
.selection .content {
  width: 125px;
  float: left;
}
/* 选中值×按钮 */
.selection .close {
  float: left;
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
  text-align: center;
  margin-top: 7px;
  color: #409eff;
  cursor: pointer;
}
.selection .close:hover {
  color: white;
  background-color: #409eff;
  border-radius: 50%;
}
</style>
