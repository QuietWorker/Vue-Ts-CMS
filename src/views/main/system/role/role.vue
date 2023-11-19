<template>
  <div class="role">

    <page-search
    :search-form-config="searchFormConfig"
    @queryBtnClick="handleQueryClick"
    @resetBtnClick="handleResetClick"
    ></page-search>

    <page-content
    ref="pageContentRef"
    :content-table-config="contentTableConfig"
    page-name="role"
    parent-name="system"
    @edit-btn-click="handleEditData"
    @new-btn-click="handleNewData"
    ></page-content>

    <page-modal
    ref="pageModalRef"
    :defaultInfo="defaultInfo"
    :modal-config="modalConfig"
    page-name="role"
    :other-info="otherInfo">
    <div class="menu-tree">
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"/>
    </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { getMenuLeafKeys } from '@/utils/map-menus'

import pageContent from '@/components/page-content';
import pageSearch from '@/components/page-search';
import pageModal from '@/components/page-modal';

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';
import { useStore } from '@/store';
import { ElTree } from 'element-plus';
import { nextTick } from 'vue';
export default defineComponent({
  name: 'role',
  components: {
    pageContent,
    pageSearch,
    pageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    //获取组件
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    //处理pageModal的hook
    const editCallBack = (item:any) => {
      const leafKeys = getMenuLeafKeys(item.menuList)
      //设置叶子节点
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys)
      })
    }
    const [defaultInfo, pageModalRef, handleNewData, handleEditData] = usePageModal(undefined,editCallBack)
    const store = useStore()
    const menus = computed(() => store.state.allMenus)
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList } //otherInfo接收的是对象, menuList是一个数组,所以要用{}包裹

    }
    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      handleResetClick,
      handleQueryClick,
      handleEditData,
      handleNewData,
      handleCheckChange,
      pageContentRef,
      pageModalRef,
      defaultInfo,
      otherInfo,
      menus,
      elTreeRef
    }
  }
})
</script>

<style scoped>
  .menu-tree{
    padding-left: 25px;
  }
</style>
