<template>
  <div class="map-chart">
    <baseChart :options="option"></baseChart>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { IDataType } from '../types'
import { PropType } from 'vue'
import { convertData } from '../utils/convertData'
import baseChart from '@/base-ui/chart'
export default defineComponent({
  components: {
    baseChart
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Object as PropType<IDataType[]>,
      required: true
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        backgroundColor: '#fff',
        title: {
          text: props.title,
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          data: ['销量']
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params: any) {
            return params.name + ' : ' + params.value[2]
          }
        },
        visualMap: {
          min: 0,
          // 设置最大值
          max: 60000,
          left: 20,
          bottom: 20,
          calculable: true,
          text: ['高', '低'],
          inRange: {
            color: [
              'rgb(70, 240, 252)',
              'rgb(250, 220, 46)',
              'rgb(245, 38, 186)'
            ]
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          roam: 'scale',
          label: {
            show: false
          },
          emphasis: {
            areaColor: '#f4cccc',
            borderColor: 'rgb(9, 54, 95)',
            itemStyle: {
              areaColor: '#f4cccc'
            }
          }
        },
        series: [
          {
            name: '销量',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(props.data),
            symbolSize: 12,
            emphasis: {
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          },
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75,
            tooltip: {
              show: false
            }
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
