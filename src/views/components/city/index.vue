<template>
  <div class="p-4">
    <el-card header="城市选择器">
      <choose-city></choose-city>
      <br />
      <br />
      <p>城市列表数据</p>
      <p
        >https://github.91chi.fun/https://raw.githubusercontent.com/xiangyuecn/AreaCity-JsSpider-StatsGov/master/src/%E9%87%87%E9%9B%86%E5%88%B0%E7%9A%84%E6%95%B0%E6%8D%AE/ok_data_level3.csv</p
      >
      <br />
      <p>这其中比较难的地方：</p>
      <ul>
        <li>1.动态数据来源</li>
        <li>2.汉字转拼音，会有多音字</li>
        <li>3.自动补全与el-tabs组合</li>
      </ul>
      <choose-city online></choose-city>
    </el-card>
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
