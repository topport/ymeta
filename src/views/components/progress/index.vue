<template>
  <div class="p-4">
    <el-card header="动态进度条">
      <p>默认用法</p>
      <d-progress is-animation :percentage="60" :time="1500"></d-progress>
      <d-progress is-animation :percentage="60"></d-progress>
      <p>不同的type类型：</p>
      <br />
      <d-progress is-animation :percentage="70" type="circle"></d-progress>
      <d-progress is-animation :percentage="80" type="dashboard"></d-progress>
      <p>设置颜色：</p>
      <d-progress is-animation :percentage="45" color="red"></d-progress>
      <d-progress is-animation :percentage="90" color="#10FD12"></d-progress>
      <p>循环原动画：</p>
      <d-progress indeterminate :percentage="60"></d-progress>
      <p>控制动画</p>
      <d-progress is-animation :percentage="100" color="red"></d-progress>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup() {
      return {}
    }
  })
</script>

<style scoped lang="scss">
  p {
    padding-top: 10px;
    padding-bottom: 6px;
  }
</style>
