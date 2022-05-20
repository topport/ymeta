<template>
  <div class="p-4">
    <el-card header="详情面板">
      <descriptions title="关于Brain" :items="items"></descriptions>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { DescItem } from '@/components/Descriptions/types'
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup() {
      const items = ref([
        {
          label: '姓名',
          field: 'toimc'
        },
        {
          label: '电话',
          field: '1340000000'
        },
        {
          label: '年龄',
          field: '18'
        },
        {
          label: '性别',
          field: '女',
          tag: {
            type: 'primary'
          }
        },
        {
          label: '学校',
          field: '西安交大'
        },
        {
          label: '个人主页',
          field: {
            link: 'https://www.toimc.com',
            text: '点击访问'
          }
        }
      ] as DescItem[])
      return {
        items
      }
    }
  })
</script>

<style scoped></style>
