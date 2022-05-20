<template>
  <div class="p-4 wrapper">
    <el-card header="svg图标集成">
      <h1>svg图片示例</h1>
      <svg-icon icon-class="example-27" size="20rem"></svg-icon>
      <svg-icon icon-class="example-3" width="220px" height="110px"></svg-icon>
      <h1 class="pt-4 pb-2">iconfont示例：</h1>
      <svg-icon
        url="https://at.alicdn.com/t/font_1791095_hy6b9xbrdsk.css"
        class-name="iconfont-qian1"
        :size="'24px'"
      ></svg-icon>
    </el-card>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    setup() {
      return {}
    }
  })
</script>

<style lang="scss" scoped></style>
