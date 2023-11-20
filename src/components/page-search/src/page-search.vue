<template>
  <div class="page-search">
    <yy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="header-btns">
          <el-button @click="handleResetClick">
            <el-icon><Delete /></el-icon>
            <span>重置</span>
          </el-button>
          <el-button type="primary" @click="handleSearchChange">
            <el-icon><Search /></el-icon>
            <span>搜索</span>
          </el-button>
        </div>
      </template>
    </yy-form>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue'
import yyForm, { IForm } from '@/base-ui/form'
export default defineComponent({
  components: {
    yyForm
  },
  props: {
    searchFormConfig: {
      type: Object as PropType<IForm>,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'], //发送点击事件
  setup(props, { emit }) {
    //双向绑定的属性应该是由配置文件的field来决定的
    const formItems = props.searchFormConfig?.formItem ?? []

    const formOriginData: any = {}

    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    //1.优化一:formData中的属性应该动态来决定
    const formData = ref(formOriginData)

    //2.优化二:当用户点击重置
    const handleResetClick = () => {
      //直接修改formData的属性
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    //3.当用户点击搜索
    const handleSearchChange = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleSearchChange
    }
  }
})
</script>

<style scoped>
.header-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
