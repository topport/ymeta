<template>
  <div class="p-4 overflow-auto">
    <el-card header="图标选择器">
      <div>默认用法： {{ choose }}</div>
      <icon-picker v-model:choose="choose"></icon-picker>
      <div class="pt-4">带footer： {{ choose1 }}</div>
      <icon-picker v-model:choose="choose1" footer @pick="pick"></icon-picker>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { ElMessage } from 'element-plus'

  export default defineComponent({
    setup() {
      const choose = ref('')
      const choose1 = ref('')

      function pick(item) {
        ElMessage({
          type: 'success',
          message: '回调pick：' + item
        })
      }

      return {
        choose,
        choose1,
        pick
      }
    }
  })
</script>

<style scoped></style>
