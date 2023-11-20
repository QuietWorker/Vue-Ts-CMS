<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbItems" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path ?? '' }">
          {{ item.name }}</el-breadcrumb-item
        >
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { IBreadcrumbItems } from '../types'
export default defineComponent({
  props: {
    breadcrumbItems: {
      type: Array as PropType<IBreadcrumbItems[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
