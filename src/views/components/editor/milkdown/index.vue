<template>
  <div class="p-4">
    <t-card header="milkdown编辑器" tips="markdown语法，所见即所得">
      <milkdown :default-value="'# 欢迎使用toimc管理后台项目'"></milkdown>
    </t-card>
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

<style scoped></style>
