<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
      <yyCard title="分类商品类型(饼图)">
        <pieChart :pie-data="categoryGoodsCount"></pieChart>
      </yyCard>
      </el-col>
      <el-col :span="10">
      <yyCard title="不同城市商品销量">
        <mapChart :data="cityGoodsSalesData"></mapChart>
      </yyCard>
    </el-col>
      <el-col :span="7">
      <yyCard title="分类商品数量(玫瑰图)">
        <roseChart :rose-data="categoryGoodsCount"></roseChart>
      </yyCard>
    </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
        <el-col :span="12">
        <yyCard title="分类商品销量">
            <lineChart v-bind="categoryGoodsSale"></lineChart>
        </yyCard>
        </el-col>
        <el-col :span="12">
        <yyCard title="分类商品收藏量">
          <barChart v-bind="categoryGoodsFavor"></barChart>
        </yyCard>
      </el-col>

    </el-row>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue'
import baseChart from '@/base-ui/chart'
import { pieChart, roseChart, lineChart, barChart ,mapChart} from '@/components/page-charts'

import yyCard from '@/base-ui/card'
export default defineComponent({
  name: 'dashboard',
  components: {
    yyCard,
    baseChart,
    pieChart,
    roseChart,
    lineChart,
    barChart,
    mapChart
  },
  setup() {

    const store = useStore()

    store.dispatch('dashboard/getDashboardDataAction')

    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return {
          name: item.name,
          value: item.goodsCount
        }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return {
        xLabels,values
      }
    })
    const categoryGoodsFavor= computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return {
        xLabels, values
      }
    })
    const cityGoodsSalesData = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item) => ({
        value: item.count,
        name: item.address
      }))
    })
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      cityGoodsSalesData
    }
  }
})
</script>

<style scoped lang="less">
  .content-row{
    margin-top: 20px;
  }

</style>

