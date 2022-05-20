import type { ECharts } from 'echarts'
import { debounce } from 'lodash-es'

export function useCharts(responsive = true) {
  const chartRef = ref<any>(null)
  const chart = ref<ECharts | null>(null)

  onMounted(() => {
    if (responsive) {
      window.addEventListener('resize', debounce(resize, 200))
    }
  })

  function resize() {
    chart.value?.resize()
  }

  function destroy() {
    chart.value = null
    if (responsive) {
      window.removeEventListener('resize', resize)
    }
  }

  // todo Expose

  onUnmounted(destroy)

  return { chartRef, chart, resize, destroy }
}
