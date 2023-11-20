import * as echarts from 'echarts'

import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData as any)
export default function (dom: HTMLElement) {
  const echartInstance = echarts.init(dom)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  const updateSize = () => {
    echartInstance.resize()
  }

  //浏览器窗口大小改变时,图表的大小也相应地改变

  window.addEventListener('resize', updateSize)
  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
