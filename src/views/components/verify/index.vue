<template>
  <t-card header="拖动校验示例">
    <div class="flex justify-center p-4 items-center bg-gray-700">
      <drag-verify ref="el1" @success="handleSuccess" />
      <el-button type="primary" class="ml-2" @click="handleBtnClick(el1)"> 还原 </el-button>
    </div>

    <div class="flex justify-center p-4 items-center bg-gray-700">
      <drag-verify ref="el2" circle @success="handleSuccess" />
      <el-button type="primary" class="ml-2" @click="handleBtnClick(el2)"> 还原 </el-button>
    </div>

    <div class="flex justify-center p-4 items-center bg-gray-700">
      <drag-verify
        ref="el3"
        text="拖动以进行校验"
        success-text="校验成功"
        :bar-style="{
          backgroundColor: '#018ffb'
        }"
        @success="handleSuccess"
      />
      <el-button type="primary" class="ml-2" @click="handleBtnClick(el3)"> 还原 </el-button>
    </div>

    <div class="flex justify-center p-4 items-center bg-gray-700">
      <drag-verify ref="el4" @success="handleSuccess">
        <template #actionIcon="isPassing">
          <icon v-if="isPassing" icon="ant-design:bug-outlined" />
          <icon v-else icon="ant-design:right-outlined" />
        </template>
      </drag-verify>
      <el-button type="primary" class="ml-2" @click="handleBtnClick(el4)"> 还原 </el-button>
    </div>

    <div class="flex justify-center p-4 items-center bg-gray-700">
      <drag-verify ref="el5" @success="handleSuccess">
        <template #text="isPassing">
          <div v-if="isPassing">
            <icon icon="ant-design:bug-outlined" />
            成功
          </div>
          <div v-else>
            拖动
            <icon icon="ant-design:right-outlined" />
          </div>
        </template>
      </drag-verify>
      <el-button type="primary" class="ml-2" @click="handleBtnClick(el5)"> 还原 </el-button>
    </div>
  </t-card>
  <t-card header="旋转示例">
    <div class="flex justify-center p-4 items-center bg-gray-700">
      <img-rotate-verify ref="el" :src="img" @success="handleSuccess" />
    </div>
  </t-card>
</template>
<script lang="ts">
  import { DragVerifyActionType } from '@/components/Verify/types'
  import img from '@/assets/images/brian.jpg'

  export default defineComponent({
    setup() {
      // const { createMessage } = useMessage()
      const el1 = ref<Nullable<DragVerifyActionType>>(null)
      const el2 = ref<Nullable<DragVerifyActionType>>(null)
      const el3 = ref<Nullable<DragVerifyActionType>>(null)
      const el4 = ref<Nullable<DragVerifyActionType>>(null)
      const el5 = ref<Nullable<DragVerifyActionType>>(null)

      function handleSuccess(data: any) {
        console.log('🚀 ~ file: index.vue ~ line 68 ~ handleSuccess ~ data', data)
        // const { time } = data
        // createMessage.success(`校验成功,耗时${time}秒`)
      }

      function handleBtnClick(elRef: Nullable<DragVerifyActionType>) {
        if (!elRef) {
          return
        }
        elRef.resume()
      }

      return {
        handleSuccess,
        el1,
        el2,
        el3,
        el4,
        el5,
        handleBtnClick,
        img
      }
    }
  })
</script>
<style lang="scss" scoped>
  .bg-gray-700 {
    background-color: #4a5568;
  }
</style>
