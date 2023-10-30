<template>
  <div class="page-content">
        <yy-table
            class="table"
            :table-data="dataList"
            v-bind="contentTableConfig">
            <!-- 1.header中的插槽 -->
            <template #headerHandler>
              <el-button type="primary">
                <el-icon><User /></el-icon>
                <span>新增用户</span>
              </el-button>
              <el-button><el-icon> <Refresh/> </el-icon> <span>刷新</span></el-button>
            </template>

            <!-- 2.列表中的插槽 -->
            <template #status="scope">
              <el-button
              size="small"
              :type="scope.row.enable ? 'success' : 'danger'"
              plain
              >{{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
            </template>
            <template #createTime="scope">
              <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
            </template>
            <template #updateTime="scope">
                <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
            </template>

            <template #opreate>
              <el-button size="small" type="primary" plain>
                <el-icon><Edit /></el-icon>
                <span>编辑</span>
              </el-button>
              <el-button size="small" type="danger" plain>
                <el-icon><Delete /></el-icon>
                <span>删除</span>
              </el-button>
            </template>
        </yy-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import yyTable from '@/base-ui/table'
import { useStore } from '@/store'
export default defineComponent({
  components: {
    yyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required:true
    },
    pageName: {
      type: String,
      required:true
    }
  },
  setup (props) {
    const store = useStore()
    store.dispatch('system/getPageListAciton', {
      pageName: props.pageName,
      queryInfo: {
        "offset": 0,
        "size": 10
      }
    })

    const dataList = computed(
      () => store
        .getters[`system/pageListData`](props.pageName))

    return {
      dataList
    }
  }
})
</script>

<style scoped lang="less">
    .page-content{
    padding-top: 20px;
    border-top: 20px solid #f5f5f5;
  }
    .table {
    :deep(.el-table__cell) {
      padding: 14px 0;
    }
  }

</style>
