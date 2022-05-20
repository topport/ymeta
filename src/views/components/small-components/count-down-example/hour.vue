<template>
  <el-card class="mb-4">
    <div class="flex w-full h-full">
      <div class="form">
        <el-form label-width="120px">
          <el-form-item label="事件名称：">
            <el-input v-model="title" />
          </el-form-item>
          <el-form-item label="事件时间：">
            <el-time-picker v-model="date" placeholder="Arbitrary time" />
          </el-form-item>
          <el-form-item label="结束提醒：">
            <el-input v-model="endText" />
          </el-form-item>
          <el-form-item label="字体大小：">
            <el-input-number v-model="fontSize" :min="1" />
          </el-form-item>
          <el-form-item label="背景颜色：">
            <el-color-picker v-model="backgroundColor" />
          </el-form-item>
          <el-form-item label="字体颜色：">
            <el-color-picker v-model="fontColor" />
          </el-form-item>
        </el-form>
      </div>
      <div class="flex-1 flex justify-center items-center">
        <div class="box">
          <count-down-hour
            :font-size="fontSize"
            :background-color="backgroundColor"
            :font-color="fontColor"
            :title="title"
            :date="date"
            :end-text="endText"
          ></count-down-hour>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup() {
      const fontSize = ref(20)
      const backgroundColor = ref('#64A099')
      const fontColor = ref('#FFF')
      const title = ref('距离下班还有')
      const endText = ref('下班啦')

      const date = ref(new Date(2000, 1, 1, 10, 0))

      return {
        fontSize,
        backgroundColor,
        fontColor,
        title,
        date,
        endText
      }
    }
  })
</script>

<style scoped>
  .box {
    width: 168px;
    height: 168px;
  }
</style>
