<template>
  <v-chart
    ref="chartRef"
    :option="option"
    :style="style"
    :class="prefixClass"
    v-bind="$attrs"
  ></v-chart>
</template>

<script lang="ts">
  import VChart from 'vue-echarts'
  // import VChart, { THEME_KEY } from 'vue-echarts'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import * as AllCharts from 'echarts/charts'
  import * as AllComponents from 'echarts/components'

  import type { ChartsComponentsType, ChartsType } from './types'
  import { useCharts } from './useCharts'

  export default defineComponent({
    components: {
      VChart
    },
    props: {
      type: {
        type: String as PropType<ChartsType>,
        default: 'PieChart'
      },
      components: {
        type: Array as PropType<ChartsComponentsType[]>,
        default: () => [
          'TitleComponent',
          'TooltipComponent',
          'LegendComponent',
          'AriaComponent',
          'GridComponent'
        ]
      },
      option: {
        type: Object,
        default: () => {}
      },
      style: {
        type: [String, Object],
        default: () => ({})
      },
      prefixClass: {
        type: [String, Object],
        default: 'v-charts'
      },
      responsive: {
        type: Boolean,
        default: true
      }
    },
    setup(props) {
      const { chartRef, chart } = useCharts(props.responsive)

      onBeforeMount(() => {
        // 注册组件
        use([
          CanvasRenderer,
          AllCharts[props.type],
          ...props.components.map((o) => AllComponents[o])
        ])
      })

      // todo Expose

      return { chartRef, chart }
    }
  })
</script>

<style lang="scss" scoped>
  .v-charts {
    width: 100%;
    height: 400px;
  }
</style>
