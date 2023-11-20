<template>
  <div class="line-chart">
    <baseChart :options="option"></baseChart>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import baseChart from '@/base-ui/chart'
import { computed } from 'vue'
import { PropType } from 'vue'
import { IDataType } from '../types'

export default defineComponent({
  components: {
    baseChart
  },
  props: {
    xLabels: {
      type: Array,
      required: true
    },
    values: {
      type: Array
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        title: {
          text: '堆叠区域图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: props.xLabels
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '分别销量',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: props.values
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
