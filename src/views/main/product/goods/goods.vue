<template>
  <div class="goods">
    <page-content
      parent-name="product"
      page-name="goods"
      :content-table-config="contentTableConfig"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          preview-teleported
          fit="cover"
          :src="scope.row.imgUrl"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[scope.row.imgUrl]"
        /><!-- preview-teleported是用来解决层级问题 详见eleplus官方文档 -->
      </template>
      <template #oldPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
      <template #newPrice="scope">
        {{ '￥' + scope.row.newPrice }}
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'goods',
  components: {
    pageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
