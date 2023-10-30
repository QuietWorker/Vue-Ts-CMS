<template>
  <div class="role">
    <page-search :search-form-config="searchFormConfig"></page-search>
    <page-content :content-table-config="contentTableConfig" :page-name="pageName"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content';
import pageSearch from '@/components/page-search';

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'role',
  components: {
    pageContent,
    pageSearch
  },
  setup() {
    const pageName = 'role'
    return {
      contentTableConfig,
      searchFormConfig,
      pageName
    }
  }
})
</script>

<style scoped></style>
