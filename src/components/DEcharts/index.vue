<template>
  <div ref="chartRef" class="chart" @resize="resize"></div>
</template>

<script lang="ts">
  import * as echarts from 'echarts'
  import { useCharts } from './useCharts'

  export default defineComponent({
    props: {
      option: {
        type: Object,
        default: () => {}
      },
      responsive: {
        type: Boolean,
        default: true
      }
    },
    setup(props: any) {
      const { chart, chartRef, resize } = useCharts(props.responsive)

      onMounted(() => {
        chart.value = echarts.init(chartRef.value)
        chart.value.setOption(props.option)
      })

      return { chartRef, chart, resize }
    }
  })
</script>

<style lang="scss" scoped>
  .chart {
    width: 100%;
    height: 400px;
  }
</style>
