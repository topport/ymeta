<template>
  <div class="p-4">
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <span class="flex-1">
           grid
          </span>
        </div>
      </template>

    </el-card>
  </div>
</template>
<script lang="ts">
  import { GITHUB_URL, SITE_URL, DOC_URL } from '@/settings/siteSetting'
  import { DescItem } from '@/components/Descriptions/types'

  export default defineComponent({
    setup() {
      const { pkg, lastBuildTime } = __APP_INFO__

      const { dependencies, devDependencies, name, version } = pkg

      const schema: DescItem[] = []

      const devSchema: DescItem[] = []

      const infoSchema: DescItem[] = [
        {
          label: '版本',
          field: version
        },
        {
          label: '最后编译时间',
          field: lastBuildTime
        },
        {
          label: '文档地址',
          field: {
            link: DOC_URL,
            text: '点击预览'
          }
        },
        {
          label: '预览地址',
          field: {
            link: SITE_URL,
            text: '点击访问'
          }
        },
        {
          label: 'Github',
          field: {
            link: GITHUB_URL,
            text: '点击访问'
          }
        }
      ]

      Object.keys(dependencies).forEach((key) => {
        schema.push({ field: dependencies[key], label: key })
      })

      Object.keys(devDependencies).forEach((key) => {
        devSchema.push({ field: devDependencies[key], label: key })
      })

      return {
        name,
        GITHUB_URL,
        infoSchema,
        schema,
        devSchema
      }
    }
  })
</script>
