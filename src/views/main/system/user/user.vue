<template>
  <div class="user">
      <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"/>

      <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      parent-name="system"
      @edit-btn-click="handleEditData"
      @new-btn-click="handleNewData" />

      <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      :modal-config="modalConfigRef"
      page-name="users"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalTableConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'
import { computed } from 'vue'

export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent,
    pageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    //pageModal相关hook逻辑

    //1.处理密码的逻辑
    const newCallBack = () => {
      const passwordItem = modalTableConfig.formItem.find(
        (item) =>item.field==='password'
      )
      passwordItem!.isHidden = false

    }
    const editCallBack = () => {
      const passwordItem = modalTableConfig.formItem.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    //2.动态添加部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalTableConfig.formItem.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.allDepartments.map((item) => {
        return { label: item.name, value: item.id }
      })
      const roleItem = modalTableConfig.formItem.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.allRoles.map((item) => {
        return { label: item.name, value: item.id }
      })
      return modalTableConfig
    })

    //3.调用hook获取公共变量和函数
    const [defaultInfo, pageModalRef, handleNewData, handleEditData] = usePageModal(newCallBack, editCallBack)
    return {
      searchFormConfig,
      contentTableConfig,
      modalTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData,
      pageModalRef,
      modalConfigRef,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="less">

</style>
