<template>
  <div class="p-4">
    <t-card header="全局水印" class="mb-4">
      <el-row class="mb-2">
        <el-button type="primary" class="mr-2" @click="setWatermark('vue-toimc-admin')">
          文字默认
        </el-button>
        <el-button type="primary" class="mr-2" @click="setWatermark({ imgUrl: imgUrl })">
          图片水印
        </el-button>
        <el-button color="error" class="mr-2" @click="clear"> Clear </el-button>
      </el-row>
      <el-row>
        <el-col :span="8">
          gap:
          <el-radio-group
            v-model="globalWaterOptions.gap"
            @change="setWatermark(globalWaterOptions)"
          >
            <el-radio label="small" value="small"></el-radio>
            <el-radio label="default" value="default"></el-radio>
            <el-radio label="large" value="large"></el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="6">
          fontSize
          <el-input-number
            v-model="globalWaterOptions.fontSize"
            :min="10"
            :max="50"
            @change="setWatermark(globalWaterOptions)"
          />
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" class="mr-2" @click="handleClick">
            自定义参数
          </el-button></el-col
        >
      </el-row>
    </t-card>
    <t-card header="局部水印">
      <el-row>
        <el-button type="primary" class="mr-2" @click="handleClick2('')"> Create </el-button>
        <el-button type="primary" class="mr-2" @click="handleClick2('img')"> 图片水印 </el-button>
        <el-button color="error" class="mr-2" @click="clearElWatermark"> Clear </el-button>
        <el-button color="warning" class="mr-2" @click="handleClick2('reset')"> Reset </el-button>
      </el-row>
      <div ref="wrapEl" class="md-content pt-3">
        <pre v-precode>
# vue-toimc-admin 管理后台项目

> 基于 Vue3.0+TypeScript+Vite+Element-plus 的管理后台项目
>
> 丰富的基础组件与业务功能组件，工作效率提升 100%

[![license](https://img.shields.io/github/license/toimc-team/vue3-toimc-admin.svg)](LICENSE)![GitHub package.json version](https://img.shields.io/github/package-json/v/toimc-team/vue3-toimc-admin)![Github issues](https://img.shields.io/github/issues/toimc-team/vue3-toimc-admin) ![](https://img.shields.io/badge/Vue-%5E3.2.31-brightgreen)![element-plus](https://img.shields.io/badge/element--plus-2.x-orange)![vite](https://img.shields.io/badge/vite-%5E2.9.0-yellowgreen)

Hello，小伙伴们，我们是 toimc 开源项目团队，本文我们将简单介绍下现阶段我们开源项目的规划，帮助大家来了解我们的开源计划，了解我们团队。

国内镜像站：[https://gitee.com/toimc-team/vue3-toimc-admin](https://gitee.com/toimc-team/vue3-toimc-admin)

## 起源

2022 年 2 月 7 日，Vue 3 成为了新的默认版本。

市面上也出现了很多基于 Vue 3 开发的优秀的中后台解决方案，如 NaiveAdmin、vue-vben-admin、vue-admin-better 等，但是在这些解决方案相关的生态、跨端方案、安全方案等有所欠缺，于是我们便想打造一款拥有良好生态的企业级跨端前后台解决方案。

## 项目开发

版本要求：

- Node LTS 14+
- pnpm 6.x+

安装依赖：

```
pnpm i
```

运行项目：

```
npm run dev
```

打包：

```
npm run build
```

## 项目目录

```bash
.
├── LICENSE
├── README.md
├── auto-imports.d.ts
├── build                # 构建相关脚本
├── commitlint.config.js # commit提交lint
├── components.d.ts
├── index.html
├── jsconfig.json
├── mock                 # mock数据
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js    # postcss配置
├── public
├── src                  # 源码
│   ├── App.vue          # 应用程序
│   ├── assets           # 静态资源
│   ├── components       # 组件
│   ├── directive        # 指令
│   ├── env.d.ts
│   ├── layouts          # 布局
│   ├── main.ts
│   ├── plugins          # 插件
│   ├── router           # 路由
│   ├── settings         # 设置
│   ├── store            # 全局状态管理存储
│   ├── utils            # 工具
│   └── views            # 视图
├── stylelint.config.js  # stylelint配置
├── tsconfig.json
├── tsconfig.node.json
├── types
├── vite.config.ts
└── windi.config.ts
```
        </pre>
      </div>
    </t-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useWatermark } from '@/hooks/useWatermark'
  import imgUrl from '@/assets/images/watermark.png'

  export default defineComponent({
    setup() {
      const globalWaterOptions = reactive({
        str: 'vue-toimc-admin',
        gap: 'default',
        fontSize: 20
      })
      const { setWatermark, clear } = useWatermark()
      const handleClick = () => {
        globalWaterOptions.str = 'vue-toimc-admin is awesome'
        setWatermark(globalWaterOptions)
      }
      const wrapEl = ref()
      const { setWatermark: setElWatermark, clear: clearElWatermark } = useWatermark(wrapEl)

      const handleClick2 = (type: string) => {
        clear()
        if (type === 'img') {
          setElWatermark({ imgUrl: imgUrl })
        } else if (type === 'reset') {
          setElWatermark({ str: '绝对机密', gap: 'default', fontSize: 60 })
        } else {
          setElWatermark({ str: '机密文件', gap: 'default', fontSize: 60 })
        }
      }
      return {
        setWatermark,
        clear,
        globalWaterOptions,
        handleClick,

        wrapEl,
        setElWatermark,
        clearElWatermark,
        imgUrl,
        handleClick2
      }
    }
  })
</script>

<style scoped lang="scss">
  .md-content {
    :deep(img) {
      display: unset;
      margin-right: 4px;
    }

    :deep(p) {
      margin-bottom: 10px;
    }

    :deep(a) {
      color: var(--el-color-primary);
    }
  }
</style>
