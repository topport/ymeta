<template>
  <div class="p-4">
    <div class="pb-4">行内</div>
    <calendar-card layout="left" width="200" class="mb-2 mr-4" inline></calendar-card>
    <calendar-card layout="left" width="200" class="mb-2" inline shadow></calendar-card>
    <div class="pb-4">居右</div>
    <calendar-card layout="right" class="mb-2"></calendar-card>
    <calendar-card r-card class="mb-2"></calendar-card>
    <div class="pb-4">设置字体大小</div>
    <calendar-card width="600" font-size="30" height="300"></calendar-card>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'CalendarCard',
    setup() {
      return {}
    }
  })
</script>

<style scoped></style>
