<template>
  <div class="user">
      <page-search :searchFormConfig="searchFormConfig"/>
      <page-content :contentTableConfig="contentTableConfig" :pageName="propUrlName"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'


export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent
  },
  setup() {
    const propUrlName='users'
    return {
      searchFormConfig,
      contentTableConfig,
      propUrlName
    }
  }
})
</script>

<style scoped lang="less">

</style>
