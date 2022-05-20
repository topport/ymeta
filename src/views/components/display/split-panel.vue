<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span class="font-medium">切割面板</span>
      </div>
    </template>
    <div class="split-panel">
      <splitpanel :splitSet="settingLR">
        <!-- #paneL 表示指定该组件为左侧面板 -->
        <template #pageL>
          <!-- 自定义左侧面板的内容 -->
          <div class="panel">1</div>
        </template>
        <!-- #paneR 表示指定该组件为右侧面板 -->
        <template #pageR>
          <div class="panel">2</div>
        </template>
      </splitpanel>
    </div>
  </el-card>
</template>

<script setup lang="ts">
  import splitpanel, { ContextProps } from '@/components/SplitPanel'
  import { ref } from 'vue'
  const settingLR = ref<ContextProps>({
    minPercent: 20,
    defaultPercent: 40,
    split: 'vertical'
  })
</script>

<style lang="scss" scoped>
  $W: 100%;
  $H: 70vh;
  .split-panel {
    width: 70vw;
    height: $H;
    text-align: center;
    font-size: 50px;
    color: #fff;
    border: 1px solid #e5e6eb;
    .panel {
      width: $W;
      height: $W;
      color: rgba($color: dodgerblue, $alpha: 0.8);
      line-height: $H;
    }
    .dv-b {
      color: rgba($color: #000, $alpha: 0.8);
    }
  }
</style>
