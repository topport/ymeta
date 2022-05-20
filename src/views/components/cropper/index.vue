<template>
  <div class="p-4">
    <el-card header="图片裁剪">
      <div class="pb-4">头像上传</div>
      <el-row>
        <el-col :span="12">
          <cropper-avatar :image="img"></cropper-avatar>
        </el-col>
        <el-col :span="12">
          <cropper-avatar :image="img">
            <template #trigger>
              <el-button>自定义trigger</el-button>
            </template>
          </cropper-avatar>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <div class="pb-4">矩形裁剪</div>
      <el-row>
        <el-col :span="12" class="px-10">
          <cropper
            v-if="img"
            :src="img"
            height="300px"
            :options="{ aspectRatio: 1 }"
            @cropend="handleCropend"
            @ready="handleReady"
          ></cropper>
        </el-col>
        <el-col :span="12">
          <img
            v-if="previewSource"
            class="h-[300px] w-[300px]"
            :src="previewSource"
            alt="预览图片"
          />
        </el-col>
        <p class="pt-4">裁剪后图片信息：{{ info }}</p>
      </el-row>
      <el-divider></el-divider>
      <div class="pb-4">圆形裁剪</div>
      <el-row>
        <el-col :span="12" class="px-10">
          <cropper
            v-if="img"
            :src="img"
            circled
            height="300px"
            :options="{ aspectRatio: 1 }"
            @cropend="handleCropendCircle"
            @ready="handleReadyCircle"
          ></cropper>
        </el-col>
        <el-col :span="12">
          <img
            v-if="previewSourceCircle"
            class="h-[300px] w-[300px]"
            :src="previewSourceCircle"
            alt="预览图片"
          />
        </el-col>
        <p class="pt-4">裁剪后图片信息：{{ infoCircle }}</p>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { CropendResult, Cropper } from '@/components/Cropper/typing'
  import img from '@/assets/images/brian.jpg'
  export default defineComponent({
    setup() {
      const cropper = ref<Cropper>()
      const previewSource = ref('')
      const info = ref()

      const cropperCircle = ref<Cropper>()
      const previewSourceCircle = ref('')
      const infoCircle = ref()

      function handleCropend({ imgBase64, imgInfo }: CropendResult) {
        info.value = imgInfo
        previewSource.value = imgBase64
      }

      function handleReady(cropperInstance: Cropper) {
        cropper.value = cropperInstance
      }

      function handleCropendCircle({ imgBase64, imgInfo }: CropendResult) {
        infoCircle.value = imgInfo
        previewSourceCircle.value = imgBase64
      }

      function handleReadyCircle(cropperInstance: Cropper) {
        cropperCircle.value = cropperInstance
      }
      return {
        img,
        previewSource,
        info,
        previewSourceCircle,
        infoCircle,
        handleCropend,
        handleReady,
        handleCropendCircle,
        handleReadyCircle
      }
    }
  })
</script>

<style scoped></style>
