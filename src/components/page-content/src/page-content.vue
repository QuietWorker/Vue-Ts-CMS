<template>
  <div class="page-content">
    <yy-table
      class="table"
      :table-data="dataList"
      :list-count="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" v-if="canCreate" @click="handleNewClick">
          <el-icon><User /></el-icon>
          <span>新增用户</span>
        </el-button>
        <el-button
          ><el-icon> <Refresh /> </el-icon> <span>刷新</span></el-button
        >
      </template>

      <!-- 2.列表中的插槽 -->
      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.status ? 'success' : 'danger'"
          plain
          >{{ scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #enable="scope">
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
      <template #opreate="scope">
        <el-button
          size="small"
          type="primary"
          plain
          v-if="canUpdate"
          @click="handleEditClick(scope.row)"
        >
          <el-icon><Edit /></el-icon>
          <span>编辑</span>
        </el-button>
        <el-button
          size="small"
          type="danger"
          plain
          v-if="canDelete"
          @click="handleDeleteClick(scope.row)"
        >
          <el-icon><Delete /></el-icon>
          <span>删除</span>
        </el-button>
      </template>

      <!-- 在page-content中动态插入剩余插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </yy-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import yyTable from '@/base-ui/table'
import { useStore } from '@/store'
import { ref, watch } from 'vue'
import { usePermission } from '@/hooks/usePermission'
export default defineComponent({
  components: {
    yyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    parentName: {
      type: String,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['editBtnClick', 'deleteBtnClick', 'newBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    //0.获取操作的权限
    const canCreate = usePermission(props.pageName, 'create')
    const canUpdate = usePermission(props.pageName, 'update')
    const canQuery = usePermission(props.pageName, 'query')
    const canDelete = usePermission(props.pageName, 'delete')

    const prevQueryInfo = ref()

    //1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 5 })

    //当数据发生改变时 重新发送网络请求
    watch(pageInfo, () => getPageData({ ...prevQueryInfo.value }))

    //2.发送网络请求

    const getPageData = (queryInfo: any = {}) => {
      if (!canQuery) return //没有权限的时候直接return出去

      prevQueryInfo.value = { ...queryInfo }

      store.dispatch(`${props.parentName}/getPageListAction`, {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo //把传过来的queryInfo赋值
        }
      })
    }
    //最开始就调用一次
    getPageData()

    //3 从vuex中获取数据

    //调用指定模块中的pageListData中这个getter返回的函数
    const dataList = computed(() =>
      store.getters[`${props.parentName}/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`${props.parentName}/pageListCount`](props.pageName)
    )

    //4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'enable') return false
        if (item.slotName === 'createTime') return false
        if (item.slotName === 'updateTime') return false
        if (item.slotName === 'opreate') return false

        return true
      }
    )

    //5.删除、新建、编辑操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }

    return {
      dataList,
      dataCount,
      pageInfo,
      getPageData,
      otherPropSlots,
      handleEditClick,
      handleDeleteClick,
      handleNewClick,
      canCreate,
      canDelete,
      canUpdate
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding-top: 20px;
  border-top: 20px solid #f5f5f5;
}
.table {
  :deep(.el-table__cell) {
    padding: 14px 0;
  }
}
</style>
