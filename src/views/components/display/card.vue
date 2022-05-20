<template>
  <div class="p-4 grid grid-cols-4 gap-3">
    <t-card header="test">普通的用法</t-card>
    <t-card shadow="hover" header="test">设置hover</t-card>
    <t-card>
      <template #header>template header</template>
      <template #footer>template footer</template>
      <div>template支持header,footer,body</div>
    </t-card>
    <t-card body-class="p-4 text-blue-600" footer-class="text-red-500" header-class="text-gray-300">
      <template #header>template header</template>
      <template #footer>template footer</template>
      可以给body, footer, header 设置class
    </t-card>
    <t-card header="test" collapse>
      <p>设置 collapse 属性支持</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
    </t-card>
    <t-card header="test" size="small" collapse>
      <p>设置 size 属性——small</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
    </t-card>
    <t-card header="test" collapse>
      <p>设置 size 属性——default</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
    </t-card>
    <t-card header="test" size="large" collapse>
      <p>设置 size 属性——large</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
      <p>可折叠的card</p>
    </t-card>
    <t-card header="test" tips="这里是tips">
      <p>tips示例</p>
      <p>tips示例</p>
      <p>tips示例</p>
      <p>tips示例</p>
      <p>tips示例</p>
    </t-card>
    <t-card header="test" :tips="{ content: '这里是tips', placement: 'top' }">
      <p>tips示例, 设置placement</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
    </t-card>
    <t-card
      header="test"
      :tips="{ content: '这里是tips', placement: 'top' }"
      tips-icon="ant-design:alert-filled"
    >
      <p>tips示例, 更换icon</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
    </t-card>
    <t-card header="test" :tips="true">
      <template #tips>
        <icon icon="ep:home-filled"></icon>
        <icon icon="ep:postcard"></icon>
        <icon icon="ep:user"></icon>
      </template>
      <p>tips示例, 更换成按钮组</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
    </t-card>
    <t-card header="test" :tips="true" collapse>
      <template #collapse="{ show }">
        <icon v-show="show" icon="ant-design:caret-down-outlined"></icon>
        <icon v-show="!show" icon="ant-design:caret-up-filled"></icon>
      </template>
      <p>自定义collapse的icon</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
    </t-card>
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
