<template>
  <div class="wrapper">
    <div class="content" :style="{ 'font-size': fontSize + 'px' }">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'CountDownWrapper',
    props: {
      fontSize: {
        type: [Number, String],
        default: 18
      }
    },
    setup() {
      return {}
    }
  })
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 100%;
    width: 100%;
    background-color: var(--bg-card);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 0 10px 3px #0000001a;

    .content {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
</style>
