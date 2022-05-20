<template>
  <div class="p-4">
    <el-card header="iconify图标示意">
      <div>使用collections + type的组合(推荐)</div>
      <el-row justify="space-between">
        <icon collection="fa-regular" type="angry" size="24px" color="red" />
        <icon collection="mdi" type="access-point" size="28px" color="blue" />
        <icon collection="bi" type="arrow-down-left-square-fill" size="28px" color="blue" />
        <icon collection="ant-design" type="audio-outlined" size="2rem" color="blue" />
      </el-row>
      <div>直接使用icon(懒人适合)</div>
      <el-row>
        <icon icon="bi:arrow-clockwise" size="4em" color="green" />
        <icon icon="logos:ant-design" size="2rem" color="red" />
        <icon icon="ant-design:android-filled" size="1.5rem" color="purple" />
        <icon icon="ant-design:ant-design-outlined" size="1.5rem" color="green" />
      </el-row>
      <div>使用vite插件直接使用 i 标签</div>
      <el-row>
        <i-carbon-accessibility />
        <i-mdi-account-box style="font-size: 2em; color: red;" />
      </el-row>
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

<style scoped></style>
