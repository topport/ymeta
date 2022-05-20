<template>
  <div class="m-4">
    <calendar-card layout="left" width="200" class="mb-2 mr-4" inline></calendar-card>
    <calendar-card layout="left" width="200" class="mb-2" inline shadow></calendar-card>
    <calendar-card layout="right" class="mb-2"></calendar-card>
    <calendar-card r-card class="mb-2"></calendar-card>
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
