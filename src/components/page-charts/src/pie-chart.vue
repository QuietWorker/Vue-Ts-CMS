<template>
  <div class="pie-chart">
    <baseChart :options="pieOption"></baseChart>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import baseChart from '@/base-ui/chart'
import { IDataType } from '../types'
import { PropType } from 'vue'
import { computed } from 'vue'

export default defineComponent({
  props: {
    pieData: {
      type: Array as PropType<IDataType[]>,
      required:true
    }
  },
  components: {
    baseChart
  },
  setup (props) {
    const pieOption = computed(() => {
      return {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
            left: 'left'
        },
        series: [
          {
            name: "分类数据",
            type: 'pie',
            radius: '50%',
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      }
    )
    return {
      pieOption
    }
  }
})
</script>

<style scoped>

</style>
