<template>
  <div class="p-4">
    <el-card class="mb-2">
      <template #header>
        <div class="card-header">
          <span>当前天气</span>
        </div>
      </template>
      <el-row>
        <el-col class="flex items-center">
          <span>开启动画：</span>
          <el-switch v-model="simpleAnimation" />
        </el-col>
        <el-col class="flex items-center">
          <span>显示风力：</span>
          <el-switch v-model="simpleWind" />
        </el-col>
        <el-col class="flex items-center">
          <span>自定义昼夜：</span>
          <el-radio v-model="simpleDayAndNight" label="" size="large">根据当前时间</el-radio>
          <el-radio v-model="simpleDayAndNight" label="day" size="large">白天</el-radio>
          <el-radio v-model="simpleDayAndNight" label="night" size="large">黑夜</el-radio>
        </el-col>
        <el-col class="flex items-center">
          <span>自定义样式：</span>
          <el-form :inline="true" :model="simpleSetting" class="flex items-center">
            <el-form-item label="宽度">
              <el-input-number v-model="simpleSetting.width" />
            </el-form-item>
            <el-form-item label="高度">
              <el-input-number v-model="simpleSetting.height" />
            </el-form-item>
            <el-form-item label="字体">
              <el-input-number v-model="simpleSetting.fontSize" />
            </el-form-item>
            <el-form-item label="圆角">
              <el-input-number v-model="simpleSetting.borderRadius" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col class="flex items-center">
          <span>文字分布：</span>
          <el-radio v-model="simpleTextPosition" label="around" size="large">分散</el-radio>
          <el-radio v-model="simpleTextPosition" label="center" size="large">居中</el-radio>
        </el-col>
      </el-row>
      <weather-simple
        :wind="simpleWind"
        :animation="simpleAnimation"
        :day-or-night="simpleDayAndNight"
        :component-style="simpleSetting"
        :text-position="simpleTextPosition"
      ></weather-simple>
    </el-card>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    setup() {
      const simpleAnimation = ref(false)
      const simpleWind = ref(true)
      const simpleDayAndNight = ref<'day' | 'night' | ''>('')
      const simpleTextPosition = ref<'center' | 'around'>('around')
      const simpleSetting = ref<any>({
        width: 200,
        height: 200,
        fontSize: 15,
        borderRadius: 30
      })

      return {
        simpleAnimation,
        simpleWind,
        simpleDayAndNight,
        simpleSetting,
        simpleTextPosition
      }
    }
  })
</script>

<style scoped lang="scss">
  .el-form-item {
    margin-bottom: 0;
  }
</style>
