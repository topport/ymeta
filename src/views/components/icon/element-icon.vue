<template>
  <div class="p-4 wrapper">
    <el-card>
      <template #header>
        <el-row justify="space-between">
          <div>ElementPlus图标</div>
          <el-row align="middle">
            <el-row align="middle">
              <div class="pr-1">只复制icon名</div>
              <el-switch v-model="copyAll" />
            </el-row>
            <el-divider direction="vertical"></el-divider>
            <el-row align="middle">
              <div class="pr-1">显示文字</div>
              <el-switch v-model="showText" />
            </el-row>
            <el-divider direction="vertical"></el-divider>
            <el-row align="middle">
              <div class="pr-1">显示图标</div>
              <el-switch v-model="showIcon" />
            </el-row>
          </el-row>
        </el-row>
      </template>
      <icon-list
        :items="items"
        :show-icon="showIcon"
        :show-text="showText"
        :classes="classes"
        @click="handleCopy"
      ></icon-list>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { IconData } from '@/components/Icon/data'
  import type { IconTypes } from '@/components/Icon/types'

  import { ElMessage } from 'element-plus'

  export default defineComponent({
    setup() {
      const showIcon = ref(true)
      const showText = ref(false)
      const copyAll = ref(true)

      function handleCopy(item: string) {
        const { copy } = useClipboard()
        copy(copyAll.value ? item : `<icon type="${item}"></icon>`)
        ElMessage({
          message: `复制 ${item} 成功！`,
          type: 'success'
        })
      }

      return {
        items: IconData as IconTypes[],
        handleCopy,
        showIcon,
        showText,
        copyAll,
        classes: computed(() => {
          return showText.value ? 'w-1/8 py-6' : 'p-1'
        })
      }
    }
  })
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow-y: auto;
  }
</style>
