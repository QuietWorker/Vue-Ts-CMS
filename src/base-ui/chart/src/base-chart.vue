<template>
  <div class="base-chart">
      <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { onMounted, ref } from 'vue';
import { EChartsOption } from 'echarts'
import { PropType } from 'vue';
import useEchart from '../hooks/useEchart'
import { watchEffect } from 'vue';
export default defineComponent({
  props: {
    width: {
      type: String,
      default:'100%'
    },
    height: {
      type: String,
      default: '360px'
    },
    options: {
      type: Object as PropType<EChartsOption>,
      required:true
    }
  },
  setup (props) {

    const echartDivRef = ref<HTMLElement>()

    onMounted(() => {
      const { setOptions } = useEchart(echartDivRef.value!)

      // （关键）使用 watchEffect，当 props.option 改变时，重新调用 setOption()
      watchEffect(() => {
        setOptions(props.options)
      })
    })

    return {
      echartDivRef
    }
  }
})
</script>

<style scoped>

</style>
