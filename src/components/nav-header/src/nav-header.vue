<template>
  <div class="nav-header">
    <i class="flod-menu" @click="handleFoldClick">
      <el-icon>
        <component :is="isFold?'fold':'expand'"></component>
      </el-icon>
    </i>
    <div class="content">
      <breadcrumb :breadcrumb-items="breadcrumbItems"/>
      <div>
        <user-info/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import userInfo from './user-info.vue'
import breadcrumb, { IBreadcrumbItems } from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadCrumb } from '@/utils/map-menus'

export default defineComponent({
  components: {
    userInfo,
    breadcrumb
  },
  emits:['foldChange'],
  setup (props,{emit}) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange',isFold.value)
    }
    const store = useStore()


    const route = useRoute()

    //面包屑的数据 : [{name:'',path:''},{}]
    const breadcrumbItems = computed(() => {
      const userMenu = store.state.login.userMenu
      const currentPath = route.path
      return pathMapBreadCrumb(userMenu,currentPath)
    })
    return {
      isFold,
      handleFoldClick,
      breadcrumbItems
    }
  }
})
</script>

<style scoped lang="less">
  .nav-header{
    display: flex;
    width: 100%;
    .flod-menu{
      font-size:30px;
      cursor: pointer;
    }
    .content{
      flex: 1;
      align-items: center;
      justify-content: space-between;

      display: flex;
      padding: 0 10px;
    }
  }
</style>
