import pageModal from '@/components/page-modal'
import { ref } from 'vue'

type callBackFn = (item?: any) => void
export function usePageModal(
  newCallBack?: callBackFn,
  editCallBack?: callBackFn
) {
  const defaultInfo = ref({})
  const pageModalRef = ref<InstanceType<typeof pageModal>>()

  const handleNewData = () => {
    //新建数据的时候需要置空
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCallBack && newCallBack()
  }

  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }

    editCallBack && editCallBack(item)
  }

  return [defaultInfo, pageModalRef, handleNewData, handleEditData]
}
