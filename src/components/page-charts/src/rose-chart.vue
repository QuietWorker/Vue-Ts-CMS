<template>
  <div class="rose-chart">
    <baseChart :options="option"></baseChart>
  </div>
</template>

<script lang="ts">
import { PropType, computed } from 'vue'
import { defineComponent } from 'vue'
import baseChart from '@/base-ui/chart'
import { IDataType } from '../types'
export default defineComponent({
  components: {
    baseChart
  },
  props: {
    roseData: {
      type: Array as PropType<IDataType[]>,
      required: true
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        // legend: {
        //   top: 'bottom'
        // },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '类别数据',
            type: 'pie',
            radius: [10, 120],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.roseData
          }
        ]
      }
    })

    return {
      option
    }
  }
})
</script>

<style scoped></style>
