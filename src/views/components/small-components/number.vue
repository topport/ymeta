<template>
  <div class="p-4">
    <el-row :gutter="20">
      <el-col :span="12"><example-once /></el-col>
      <el-col :span="12"><example-mouth /></el-col>
      <el-col :span="12"><example-count /></el-col>
      <el-col :span="12"><example-hour /></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ExampleOnce from './count-down-example/once.vue'
  import ExampleMouth from './count-down-example/mouth.vue'
  import ExampleCount from './count-down-example/count.vue'
  import ExampleHour from './count-down-example/hour.vue'
  export default defineComponent({
    name: 'CountDownPage',
    components: {
      ExampleOnce,
      ExampleMouth,
      ExampleCount,
      ExampleHour
    },
    setup() {
      const fontSize = ref(20)
      const backgroundColor = ref('#EEE1DA')
      const fontColor = ref('#9e726f')
      const title = ref('清明节')
      const date = ref('2022-05-28')

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
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
  }
</style>
