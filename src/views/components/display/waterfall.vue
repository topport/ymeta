<template>
  <div class="h-screen flex overflow-hidden">
    <!-- {{ list }} -->
    <!-- 左侧列表 -->
    <div class="flex-auto overflow-y-auto">
      <waterfall-box
        :list="list"
        :row-key="options.rowKey"
        :gutter="options.gutter"
        :has-around-gutter="options.hasAroundGutter"
        :width="options.width"
        :breakpoints="options.breakpoints"
        :img-selector="options.imgSelector"
        :background-color="options.backgroundColor"
        :animation-effect="options.animationEffect"
        :animation-duration="options.animationDuration"
        :animation-delay="options.animationDelay"
        :lazyload="options.lazyload"
        :load-props="options.loadProps"
      >
      </waterfall-box>

      <div class="flex justify-center py-10 bg-gray-900">
        <button
          class="px-5 py-2 rounded-full bg-gray-700 text-md text-white cursor-pointer hover:bg-gray-800 transition-all duration-300"
          @click="handleLoadMore"
          >加载更多</button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import axios, { AxiosResponse } from 'axios'
  import { ViewCard } from '@/components/Waterfall/types/waterfall'
  import loading from '@/assets/images/loading.png'

  interface Item {
    id?: number
    origin?: string
    title?: string
    content?: string
  }

  export default defineComponent({
    setup() {
      async function getData(): Promise<Item[]> {
        const result: Item[] = []
        try {
          const res = (await axios.get('/api/public/mix')) as AxiosResponse
          if (res.status === 200) {
            const data = res.data as {
              code?: number
              data?: Item[]
              msg?: string
            }
            if (data.code === 200) {
              result.push(...(data.data || []))
            }
          }
        } catch (error) {
          console.log(error)
        }
        return result
      }

      function useWaterfall() {
        const list = ref<ViewCard[]>([])
        const options = reactive({
          // 唯一key值
          rowKey: 'id',
          // 卡片之间的间隙
          gutter: 10,
          // 是否有周围的gutter
          hasAroundGutter: true,
          // 卡片在PC上的宽度
          width: 320,
          // 自定义行显示个数，主要用于对移动端的适配
          breakpoints: {
            1200: {
              // 当屏幕宽度小于等于1200
              rowPerView: 4
            },
            800: {
              // 当屏幕宽度小于等于800
              rowPerView: 3
            },
            500: {
              // 当屏幕宽度小于等于500
              rowPerView: 2
            }
          },
          // 动画效果
          animationEffect: 'animate__fadeInUp',
          // 动画时间
          animationDuration: 1000,
          // 动画延迟
          animationDelay: 300,
          // 背景色
          backgroundColor: '#2C2E3A',
          // imgSelector
          imgSelector: 'src.original',
          // 加载配置
          loadProps: {
            loading
            // error
          },
          // 是否懒加载
          lazyload: true
        })

        onMounted(async () => {
          await handleLoadMore()
        })
        // 加载更多
        async function handleLoadMore() {
          const res = await getData()
          res.map((item) => {
            list.value.push({
              src: item
            })
          })
        }
        return {
          list,
          options,
          handleLoadMore
        }
      }

      const { list, options, handleLoadMore } = useWaterfall()

      return {
        list,
        options,
        handleLoadMore
      }
    }
  })
</script>

<style scoped></style>
