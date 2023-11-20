<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      lazy
      v-bind="childrenProps"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        label="选择"
        type="selection"
        align="center"
        min-width="50"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        label="序号"
        type="index"
        align="center"
        min-width="50"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" showOverflowTooltip>
          <template #default="slotProps">
            <slot :name="propItem.slotName" :row="slotProps.row">
              {{ slotProps.row[propItem.prop] }}
              <!-- 默认值 -->
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[5, 10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    tableData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array as PropType<any[]>,
      required: false
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    listCount: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 0,
        pageSize: 10
      })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      //需要把数据传到对应组件
      emit('selectionChange', value)
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  padding: 0 5px;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
}
.footer {
  margin-top: 15px;
  .el-pagination {
    justify-content: flex-end;
  }
}
</style>
