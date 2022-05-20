<template>
  <div class="p-4">
    <t-card :header="$t('components.tools.i18n.card-title')">
      <el-button-group type="primary">
        <el-button @click="() => toggle('en')">英文</el-button>
        <el-button @click="() => toggle('zh-CN')">中文</el-button>
      </el-button-group>
      <p>需要安装vue-i18n, i18n插件</p>
      <p>使用全局$t方法进行包裹string</p>
      <p>这里是测试文字：{{ $t('test') }}</p>
      <p>这里是测试文字：{{ $t('components.tools.i18n.test') }}</p>
      <p>这里是测试文字： {{ $t('components.tools.i18n.5zpfmf') }}</p>
    </t-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useLocale } from '@/hooks/useLocale'

  export default defineComponent({
    setup() {
      const { changeLocale } = useLocale()

      const toggle = (val) => {
        if (val === 'en') {
          changeLocale('en')
        } else {
          changeLocale('zh-CN')
        }
      }
      return {
        toggle
      }
    }
  })
</script>

<style scoped></style>
