<template>
  <div class="flex">
    <div class="nav-bg-item active">
      <icon icon="mdi:water-off-outline" size="26px" color="#515A6E"></icon>
    </div>
    <div class="nav-bg-item">
      <img src="./assets/background.png" alt="" />
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup() {
      return {}
    }
  })
</script>

<style lang="scss" scoped>
  .nav-bg-item {
    display: flex;
    width: 60px;
    height: 60px;
    margin: 5px;
    overflow: hidden;
    background-color: #f7f7f7;
    border-radius: 5px;
    align-items: center;
    justify-content: center;

    &.active {
      box-shadow: 0 0 2px 2px #1890ff;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
