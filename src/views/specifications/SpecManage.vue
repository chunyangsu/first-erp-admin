<template>
  <div>
    <!-- 树形菜单 -->
    <el-aside>
      <el-card shadow="never">
        <!-- <div slot="header" class="clearfix">
          <span>规格参数</span>
          <span style="float: right; padding: 0px">
            <el-tooltip :content="isExpandAll ? $t('industry.foldAll') : $t('industry.explandAll')" placement="top">
              <i :class="iconExpandAll" style="float: right; padding: 0px; cursor: pointer;" circle @click="expandAll" />
            </el-tooltip>
          </span>
        </div> -->
        <el-scrollbar>
          <el-tree ref="tree" :data="treeData" :default-expand-all="isExpandAll" :expand-on-click-node="false" :props="defaultProps" node-key="id" highlight-current="true" @node-click="selected" />
        </el-scrollbar>
      </el-card>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: 'SpecManage', // 规格参数
  data() {
    return {
treeData: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  }
}
</script>

<style>
</style>
