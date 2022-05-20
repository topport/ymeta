<template>
  <div class="p-4">
    <el-card header="Slider 滑块">
      <div class="slider-demo">
        <span>默认值</span>
        <d-slider v-model="values.v1" tooltip-visible></d-slider>
      </div>
      <div class="slider-demo">
        <span>范围</span>
        <d-slider v-model="values.v2" :min="1" :max="50"></d-slider>
      </div>

      <div class="slider-demo">
        <span>隐藏提示</span>
        <d-slider v-model="values.v2" :min="1" :max="50" :show-tooltip="false"></d-slider>
      </div>
      <div class="slider-demo">
        <span>格式化提示</span>
        <d-slider
          v-model="values.v3"
          :step="0.1"
          :min="0"
          :max="1"
          :format-tooltip="formatTooltip"
        ></d-slider>
      </div>
      <div class="slider-demo">
        <span>步长</span>
        <d-slider v-model="values.v4" :step="10"></d-slider>
      </div>
      <div class="slider-demo">
        <span>间断点</span>
        <d-slider v-model="values.v5" :step="10" show-stops></d-slider>
      </div>

      <div class="slider-demo">
        <span>带输入框</span>
        <d-slider v-model="values.v6" show-input></d-slider>
      </div>

      <div>
        <div class="slider-demo">
          <span>尺寸</span>
          <el-radio-group v-model="size.current">
            <el-radio v-for="item in size.sizes" :key="item" :label="item">{{ item }}</el-radio>
          </el-radio-group>
        </div>
        <div class="slider-demo">
          <span></span>
          <d-slider
            v-model="values.v7"
            :size="size.current"
            show-input
            :input-size="size.current"
          ></d-slider>
        </div>
      </div>

      <div class="slider-demo">
        <span>范围</span>
        <d-slider v-model="values.v7" range show-stops :step="10" :max="100"></d-slider>
      </div>
      <div class="slider-demo">
        <span>标记</span>
        <d-slider
          v-model="values.v8"
          :marks="marks"
          :min="30"
          :max="50"
          :format-tooltip="formatTemperature"
        ></d-slider>
      </div>

      <div class="slider-demo">
        <span>按钮大小</span>
        <d-slider v-model="values.v9" :button-size="30"></d-slider>
      </div>
      <div class="slider-demo">
        <span>背景色</span>
        <el-color-picker v-model="color" />
        <d-slider v-model="values.v10" :color="color"></d-slider>
      </div>
      <div class="slider-demo">
        <span>彩虹色</span>
        <d-slider v-model="values.v11" rainbow></d-slider>
      </div>
      <div class="slider-demo">
        <span>垂直</span>
        <d-slider v-model="values.v12" vertical height="200px" show-stops :step="10"></d-slider>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type { CSSProperties } from 'vue'

  export default defineComponent({
    setup() {
      const values = reactive({
        v1: 10,
        v2: 20,
        v3: 0.3,
        v4: 40,
        v5: 50,
        v6: 60,
        v7: [20, 80],
        v8: 37,
        v9: 70,
        v10: 70,
        v11: 70,
        v12: 70
      })

      const size = reactive({
        current: 'default',
        sizes: ['small', 'default', 'large']
      })
      interface Mark {
        style: CSSProperties
        label: string
      }

      type Marks = Record<number, Mark | string>

      const marks = reactive<Marks>({
        37: {
          style: {
            color: 'green'
          },
          label: '正常'
        },
        38: {
          style: {
            color: 'red'
          },
          label: '发烧'
        }
      })
      const formatTooltip = (value: number) => {
        console.log(value)
        return `${(value * 100).toFixed(2)}%`
      }
      const formatTemperature = (value: number) => {
        return `${value}°C`
      }

      const color = ref('#ff0000')
      return { values, formatTooltip, size, marks, formatTemperature, color }
    }
  })
</script>

<style scoped lang="scss">
  .slider-demo {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;

    > span {
      width: 100px;
      margin-right: 10px;
      text-align: right;
    }
  }
</style>
