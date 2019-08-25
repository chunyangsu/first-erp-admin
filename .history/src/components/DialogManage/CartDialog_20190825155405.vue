<template>
  <div>
    <el-dialog :visible.sync="DL_visible" title="" :close-on-click-modal="false" show-close width="70%">
      <el-table ref="proTable" :data="list" border fit size="mini" highlight-current-row style="width: 100%" @selection-change="selectionPro">
        <el-table-column type="selection" width="50px" align="center" />
        <el-table-column width="50px" label="序号" type="index" align="center" />
        <!-- 产品名称 -->
        <el-table-column label="产品名称" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <!-- 产品品牌 -->
        <el-table-column label="产品品牌" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.brand }}</span>
          </template>
        </el-table-column>
        <!-- 产品型号 -->
        <el-table-column label="型号" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.model }}</span>
          </template>
        </el-table-column>
        <!-- 产品价格 -->
        <el-table-column label="产品价格" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import ToOutboundOrder from '@/components/TransferManage/ToOutboundOrder'
import ExitOrderDialog from '@/components/DialogManage/ExitOrderDialog'
import ImportedOrderDialog from '@/components/DialogManage/ImportedOrderDialog'
import TerritoryOrderDialog from '@/components/DialogManage/TerritoryOrderDialog'
import { numberCurrency, moneyToNum } from '@/utils'

export default {
  name: 'CartDialog', // 暂存车
  components: {
    ToOutboundOrder,
    ExitOrderDialog,
    ImportedOrderDialog,
    TerritoryOrderDialog
  },
  props: {
    // 已选产品数组
    selectedprolist: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      DL_visible: false, // 弹窗开关
      DL_title: '', // 弹窗标题
      chooseProductList: [],
      outShow: true, // 出库单
      isShow: false, // 是否同步出库value值
      isAndOut: true,
      internalOrderShow: true, // 内部订货单
      internalExitShow: true, // 出口内部订货单
      internalImportShow: false, // 进口内部订货单
      internalTerritoryShow: false, // 境内内部订货单
      statusArr: [], // 临时用于存储内部订货单状态的数组
      warehouseArr: [], // 临时存放仓库的数组
      storageStatusArr: [], // 临时存放在库状态
      goodStatusArr: [],
      tempRow: undefined,
      tempRowTable: undefined
    }
  },
  methods: {
    dealPrice(price) {
      return numberCurrency(moneyToNum(price))
    },
    // 输入框右击事件
    inputRightClick(e) {
      e.stop = true
    },
    // 弹窗空白处右击菜单
    rightClick(e) {
      e.tempRow = this.tempRow
      this.tempRowTable = this.tempRow
      this.GLOBAL.rightMenu.menuRoweRcord.status = true
      this.GLOBAL.rightMenu.menuRoweRcord.isPrevent = true
      this.GLOBAL.rightMenu.menuRoweRcord.type = 'CartDialog'
      if (this.tempRow) {
        this.GLOBAL.rightMenu.menuRoweRcord.funs = [
          { fun: this.delete, tagName: 'roweRcordMenusView.delete' }, // 删除
          { fun: this.closeDialog, tagName: 'dialogMenusView.closeDialog' }, // 关闭弹窗
          { fun: this.refreshDialog, tagName: 'dialogMenusView.refreshDialog' } // 刷新弹窗
        ]
      } else {
        this.GLOBAL.rightMenu.menuRoweRcord.funs = [
          { fun: this.closeDialog, tagName: 'dialogMenusView.closeDialog' }, // 关闭弹窗
          { fun: this.refreshDialog, tagName: 'dialogMenusView.refreshDialog' } // 刷新弹窗
        ]
      }
      this.tempRow = undefined
    },
    // 通过element ui 表格右击事件  获取row值
    getRow(row, column, event) {
      this.tempRow = row
    },
    // 关闭弹窗
    closeDialog() {
      this.DL_visible = false
    },
    // 刷新弹窗
    refreshDialog() {
      this.$parent.$refs.CartDialog.openCart()
    },
    // 删除
    delete() {
      this.$confirm(this.$t('tipsDilog.org_content'), this.$t('tipsDilog.title'), {
        confirmButtonText: this.$t('tipsDilog.confirmButtonText'),
        cancelButtonText: this.$t('tipsDilog.cancelButtonText'),
        type: 'warning'
      }).then(() => {
        const index = this.selectedprolist.findIndex(item => item.id === this.tempRowTable.id)
        this.selectedprolist.splice(index, 1)
        this.$message({
          type: 'success',
          message: this.$t('tipsDilog.message_1'),
          duration: 2000
        })
      })
    },
    // 按钮呈禁用状态
    inic() {
      this.outShow = true // 出库
      this.internalOrderShow = true // 内部订货单
      this.internalImportShow = false // 进口
      this.internalTerritoryShow = false // 境内
      this.internalExitShow = true // 出口
    },
    // 产品选择回调
    selectionPro(selection, row) {
      this.inic()
      this.chooseProductList = []
      this.warehouseArr = [] // 仓库数组
      this.statusArr = [] // 内部订货单状态数组
      this.storageStatusArr = [] // 在库状态数组
      this.goodStatusArr = []
      if (selection.length > 0) {
        selection.forEach(item => {
          // 不考虑自由状态的情况(自由状态不限制出库和生成内部订货单)
          if (item.status !== -1) {
            this.statusArr.push(item.status)
          }
          this.goodStatusArr.push(Number(item.goods_status))
          this.storageStatusArr.push(item.in_storge_status)
          this.warehouseArr.push(item.warehouse_id)
        })
        this.statusArr = Array.from(new Set(this.statusArr)) // 内部订货单状态数组去重
        this.storageStatusArr = Array.from(new Set(this.storageStatusArr)) // 在库状态数组去重
        this.warehouseArr = Array.from(new Set(this.warehouseArr)) // 仓库数组去重
        this.goodStatusArr = Array.from(new Set(this.goodStatusArr)) // 产品状态数组去重
        const _this = this
        // 判断产品状态是否异常
        if (_this.goodStatusArr.includes(2)) {
          _this.inic()
          _this.$message.error('产品状态异常')
        } else {
          // 判断内部订货单状态（-1的状态既可出库也可生成内部订货单）
          // 出库：0,2,5
          // 内部订货单：1,3,4
          if (_this.statusArr.includes(1) || _this.statusArr.includes(3) || _this.statusArr.includes(4)) {
            // 不可出库
            _this.outShow = true // 出库
            if (_this.statusArr.length > 1) {
              _this.$message.error('产品订货单状态不一致')
            } else if (_this.statusArr.length === 1) {
              // 内部订货单状态一致
              _this.chooseProductList = selection
              if (_this.statusArr[0] === 1) {
                // 生成出口内部订货单
                _this.internalOrderShow = false
              }
              if (_this.statusArr[0] === 3) {
                // 生成进口内部订货单
                _this.internalExitShow = false
                _this.internalTerritoryShow = false
                _this.internalImportShow = true
              }
              if (_this.statusArr[0] === 4) {
                // 生成境内内部订货单
                _this.internalOrderShow = false
                _this.internalExitShow = false
                _this.internalImportShow = false
                _this.internalTerritoryShow = true
              }
            }
          } else {
            // 判断在库状态：只用于限制出库按钮 1: 在库 2: 在途 3: 已发货
            if (_this.storageStatusArr.includes(2) || _this.storageStatusArr.includes(3)) {
              _this.$message.error('产品不在库')
            } else {
              // 判断仓库是否一致
              if (_this.warehouseArr.length > 1) {
                _this.$message.error('仓库不一致')
              } else {
                // 可出库
                _this.outShow = false
                _this.chooseProductList = selection
              }
            }
          }
        }
      } else {
        // 取消所有勾选后，所有按钮禁用
        this.inic()
      }
    },
    // 清空已选产品
    clear() {
      this.chooseProductList = []
      this.$refs.toSelectProduct.clearSelection()
    },
    // 勾选同步出库
    // checkOutBound(isShow) {
    //   if (isShow) {
    //     this.isAndOut = true
    //     this.outShow = true
    //   } else {
    //     this.isAndOut = false
    //     this.outShow = false
    //   }
    // },
    // 打开暂存车弹窗
    openCart() {
      this.DL_title = this.$t('textMap.cart')
      this.DL_visible = true
      this.outShow = true
      this.internalOrderShow = true
      this.selectedprolist.forEach(item => {
        item.maxNum = item.num
      })
      this.$nextTick(() => {
        this.clear()
      })
    }
  }
}
</script>
<style>
.purOrderClass .el-input-number--mini {
  width: 100px;
}
</style>
