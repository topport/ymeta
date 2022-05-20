<template>
  <el-card class="mb-4">
    <div class="flex w-full h-full">
      <div class="form">
        <el-form label-width="120px">
          <el-form-item label="事件名称：">
            <el-input v-model="title" />
          </el-form-item>
          <el-form-item label="事件日期：">
            <el-date-picker v-model="date" type="date" placeholder="请选择一个日期" />
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
          <count-down-count
            :font-size="fontSize"
            :background-color="backgroundColor"
            :font-color="fontColor"
            :title="title"
            :date="date"
          ></count-down-count>
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
      const backgroundColor = ref('#FFF')
      const fontColor = ref('#EA8197')
      const title = ref('和她❤️恋爱已经')
      const date = ref('2022-02-28')

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
