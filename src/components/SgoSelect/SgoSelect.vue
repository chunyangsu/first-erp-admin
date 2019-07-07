<template>
  <div v-clickoutside="colse" class="sgo-select">
    <!-- 内容框 -->
    <div class="sgo-select_input clearfix">
      <!-- 搜索框 -->
      <div v-show="searchInputShow" @click="open">
        <el-input ref="searchInput" v-model="param" :placeholder="placeholder" style="width: 100%;" clearable @change="handleSearch" @contextmenu.native="inputRightClick($event)" />
      </div>
      <!-- 选中结果 -->
      <div v-if="searchTagsShow" class="sgo-select_tagBox" @click="open()">
        <el-tag v-if="selected.length > 0" :closable="!selectDisabled" :size="collapseTagSize" type="info" disable-transitions @close="handleClose(selected[0])">
          <span class="a textHidden">{{ selected[0][tagfield] }}</span>
        </el-tag>
        <el-tag v-if="selected.length > 1" :closable="false" :size="collapseTagSize" type="info" disable-transitions>
          <span>+ {{ selected.length - 1 }}</span>
        </el-tag>
        <span v-if="selected.length <= 0">{{ placeholder }}</span>
      </div>
    </div>
    <!-- 搜索结果弹窗 -->
    <div v-if="searchVisible" class="dialog">
      <div class="selectList">
        <!-- 未选列表 -->
        <div class="noSelect">
          <el-table v-loading="LD_loading" ref="proModel" :data="data" fit style="width: 100%; cursor:pointer" max-height="250" size="mini" @row-click="handleCurrentChange">
            <template v-for="(col , index) in cols">
              <el-table-column :key="index" :prop="col.prop" :label="col.label" />
            </template>
          </el-table>
        </div>
        <!-- 已选列表 -->
        <div class="selected">
          <!-- <el-tag v-for="tag in selected" :key="tag.id" :type="tag.type" closable @close="handleClose(tag)">
            {{ tag[tagfield] }}
          </el-tag> -->
          <!-- 选中值标签 -->
          <div v-for="tag in selected" :key="tag.id" class="selection clearfix">
            <div class="content textHidden">
              <el-popover v-if="tag[tagfield].length > 15" trigger="hover" placement="right">
                <pre><div style="max-width:600px;overflow:auto;">{{ tag[tagfield] }}</div></pre>
                <div slot="reference" class="textHidden">{{ tag[tagfield] }}</div>
              </el-popover>
              <span v-else>{{ tag[tagfield] }}</span>
            </div>
            <div class="close" @click="handleClose(tag)">×</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import waves from '@/directive/waves' // 水波纹指令
// import Clickoutside from 'element-ui/src/utils/clickoutside'
export default {
  name: 'SgoSelect',
  directives: {
    // waves,
    // Clickoutside
  },
  // 接收父组件传递的数据
  props: {
    size: {
      type: String,
      default: 'mini'
    },
    // input框站位提示
    placeholder: {
      type: String,
      default: function () {
        return ''
      }
    },
    tagfield: {
      type: String,
      default: ''
    },
    // input框参数
    param: {
      type: String,
      default: ''
    },
    // 搜索到的表格数据
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    selected: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 搜索到的表格数据
    searchfield: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      toInput: true,
      cols: [],
      searchVisible: false,
      LD_loading: false
    }
  },
  computed: {
    selectSize() {
      return this.size
    },
    selectDisabled() {
      return this.disabled
    },
    collapseTagSize() {
      return ['small', 'mini'].indexOf(this.selectSize) > -1
        ? 'mini'
        : 'small'
    },
    searchInputShow() {
      return (this.toInput && this.searchVisible) || (this.selected.length <= 0)
    },
    searchTagsShow() {
      return (!this.toInput || !this.searchVisible) && this.selected.length > 0
    }
  },
  watch: {
    data(newVal, oldVal) {
      this.LD_loading = false
      const _this = this
      if (newVal.length > 0 && oldVal.length === 0) {
        _this.cols = []
        Object.keys(newVal[0]).forEach(function (key) {
          Object.keys(_this.searchfield).forEach(function (key2) {
            if (key2 === key) {
              _this.cols.push({ label: _this.searchfield[key2], prop: key })
            }
          })
        })
      }
    }
  },
  methods: {
    // 输入框右击事件
    inputRightClick(e) {
      e.stop = true
    },
    // 切换搜索弹窗
    toggle() {
      if (this.searchVisible === false) {
        this.searchVisible = true
        this.toInput = true
        this.$nextTick(() => {
          this.$refs['searchInput'].focus()
        })
      } else {
        this.searchVisible = false
      }
    },
    open() {
      this.searchVisible = true
      this.toInput = true
      this.$nextTick(() => {
        this.$refs['searchInput'].focus()
      })
    },
    colse() {
      this.searchVisible = false
    },
    // 搜索产品型号事件
    handleSearch() {
      this.LD_loading = true
      // 将搜索框内输入的值传给父组件
      this.$emit('remote-method', this.param)
    },
    // 单击选中
    handleCurrentChange(val) {
      const that = this
      that.data.forEach(function (value, i) {
        if (val.id === value.id) {
          that.data.splice(i, 1)
          that.selected.push(val)
        }
      })
      this.toInput = false
      that.$emit('update:selected', that.selected)
    },
    // 删除标签事件
    handleClose(row) {
      const that = this
      that.selected.forEach(function (value, i) {
        if (row.id === value.id) {
          that.selected.splice(i, 1)
          that.data.unshift(row)
        }
      })
      that.$emit('update:selected', that.selected)
    }
  }
}
</script>

<style scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.sgo-select {
  position: relative;
  display: inline-block;
  height: 36px;
  line-height: 36px;
}
.sgo-select_input {
  width: 172px;
  height: 36px;
  line-height: 35px;
  font-size: 14px;
  color: rgb(184, 182, 182);
}
/* 搜索列表 */
.dialog {
  position: absolute;
  left: 0;
  top: 40px;
  width: 600px;
  border: 1px solid #dcdfe6;
  z-index: 99;
  background-color: #fff;
}
/* 搜索框 */
.sgo-select_tagBox {
  width: 100%;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  padding-left: 8px;
  border: 1px solid #ccc;
}
.el-input--medium .el-input__inner {
  height: 32px;
  line-height: 36px;
}
/* 下拉列表 */
.selectList {
  width: 100%;
}
/* 未选列表 */
.selectList .noSelect {
  width: 100%;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #ccc;
}
/* 已选列表 */
.selectList .selected {
  padding: 0 4px;
  width: 100%;
  font-size: 14px;
  color: #666;
}
.selected .el-tag {
  margin: 0 5px 5px 0;
}
.a {
  max-width: 75px;
  float: left;
  overflow: hidden;
}
/* 选中值标签样式 */
.selection {
  max-width: 163px;
  border: 1px solid rgba(64, 158, 255, 0.2);
  background-color: rgba(64, 158, 255, 0.1);
  padding-left: 8px;
  padding-right: 5px;
  height: 27px;
  line-height: 27px;
  font-size: 12px;
  float: left;
  margin-right: 8px;
  margin-top: 6px;
  margin-bottom: 5px;
  color: #409eff;
}
/* 选中值内容 */
.selection .content {
  max-width: 125px;
  float: left;
}
/* 选中值×按钮 */
.selection .close {
  float: left;
  width: 13px;
  height: 13px;
  line-height: 16px;
  font-size: 16px;
  text-align: center;
  margin-top: 6px;
  color: #409eff;
  cursor: pointer;
}
.selection .close:hover {
  color: white;
  background-color: #409eff;
  border-radius: 50%;
}
</style>
