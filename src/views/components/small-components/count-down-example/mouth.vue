<template>
  <el-card class="mb-4">
    <div class="flex w-full h-full">
      <div class="form">
        <el-form label-width="120px">
          <el-form-item label="事件名称：">
            <el-input v-model="title" />
          </el-form-item>
          <el-form-item label="每月几号：">
            <el-input-number v-model="date" :min="1" />
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
          <count-down-mouth
            :font-size="fontSize"
            :background-color="backgroundColor"
            :font-color="fontColor"
            :title="title"
            :date="date"
          ></count-down-mouth>
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
      const backgroundColor = ref('#0092fa')
      const fontColor = ref('#FFF')
      const title = ref('发工资还有')
      const date = ref(1)

      return {
        fontSize,
        backgroundColor,
        fontColor,
        title,
        date
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
