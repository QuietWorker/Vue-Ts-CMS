<template>
  <div class="bar-chart">
    <baseChart :options="option"></baseChart>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import baseChart from '@/base-ui/chart'
import { computed } from 'vue'
import { PropType } from 'vue'
import { IDataType } from '../types'
import * as echarts from 'echarts'

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
          text: '商品收藏量'
        },
        xAxis: {
          data: props.xLabels,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
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
