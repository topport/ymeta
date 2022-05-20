<template>
  <t-card header="复制图片到剪切板">
    <h1>看到一个好玩的功能</h1>
    <el-link type="primary" target="_blank" :underline="false" href="https://chalk.ist/"
      >在线形成好看的代码图片</el-link
    >
    <br />
    <br />
    <h1>复制在线图片（需要设置图片为anoymous访问）</h1>

    <t-input v-model="inputValue" placeholder="请输入在线图片地址"></t-input>
    <p class="p-2">图片预览：</p>
    <div>
      <el-image style="width: 300px; height: 300px" :src="img" fit="contain" />
    </div>
    <el-button type="primary" @click="handleCopyClick">复制图片</el-button>
    <p class="text-gray-400 pt-2 text-sm">复制成功后，可以在ppt中粘贴尝试！</p>
  </t-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { copyImage } from '@/utils/file/base64Conver'
  import img from '@/assets/images/brian.jpg'
  import { ElMessage } from 'element-plus'

  export default defineComponent({
    setup() {
      const inputValue = ref(img)

      async function handleCopyClick() {
        const res = await copyImage(inputValue.value)
        ElMessage.success('' + res)
      }
      return {
        handleCopyClick,
        img,
        inputValue
      }
    }
  })
</script>

<style scoped></style>
