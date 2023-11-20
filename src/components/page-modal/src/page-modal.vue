<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      destroy-on-close
    >
      <yy-form v-model="formData" v-bind="modalConfig"></yy-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import yyForm from '@/base-ui/form'

export default defineComponent({
  components: {
    yyForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        //编辑,
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          id: props.defaultInfo.id,
          editData: { ...formData.value, ...props.otherInfo }
        })
      } else {
        //新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItem) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
