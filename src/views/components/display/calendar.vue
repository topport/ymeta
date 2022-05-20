<template>
  <div class="p-4">
    <el-card class="mb-2" shadow="false">
      <div class="flex items-center justify-between text-gray-600 text-sm pb-4">
        <div>
          <div class="inline pr-4">
            <span>日期控制：</span>
            <el-button-group>
              <el-button type="primary" icon="arrow-left" @click="setDate(-1, 'day')"
                >- Day</el-button
              >
              <el-button type="primary" @click="setDate(1, 'day')"
                >+ Day<el-icon class="el-icon--right"><ArrowRight /></el-icon
              ></el-button>
            </el-button-group>
            <!-- position: center left right -->
          </div>
        </div>
        <div class="inline-block">
          <span>当前时间：</span>
          {{ format(value) }}
        </div>
      </div>
      <el-row>
        <basic-form
          label-width="110px"
          inline
          :schemas="formSchema"
          :action="false"
          @change="updateForm"
        ></basic-form>
      </el-row>

      <t-calendar
        v-model:value="value"
        :show-tool="form.showTool"
        :tool-list="toolList"
        :format="format"
        :position="form.position"
        :show-astro="form.showAstro"
        :show-gz-day="form.showGzDay"
        :show-day-cn="form.showDayCn"
        :border="form.border"
        :size="form.size"
        :inline="form.inline"
        @cell-click="onCellClick"
      >
      </t-calendar>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { ElMessage } from 'element-plus'
  import dayjs from 'dayjs'
  import { FormSchema } from '@/components/Form/types/types'
  import { IToolType } from '@/components/Calendar/TCalendar.vue'

  interface FormProps {
    showTool: boolean
    toolList: IToolType[]
    position: 'center' | 'left' | 'right' | 'left-between' | 'right-between'
    showAstro: boolean
    showGzDay: boolean
    showDayCn: boolean
    border: boolean
    size: 'small' | 'medium' | 'large'
    inline: boolean
  }

  export default defineComponent({
    name: 'CalendarPage',
    setup() {
      // 监听单元格点击事件
      const onCellClick = (val) => ElMessage.success(`当前选中日期为：${format(val.date)}`)
      const value = ref(new Date())
      const formSchema = ref<FormSchema[]>([
        {
          component: 'radio-group',
          label: '位置',
          prop: 'position',
          value: 'center',
          children: [
            {
              component: 'radio',
              label: '居左',
              prop: 'position',
              value: 'left'
            },
            {
              component: 'radio',
              label: '居中',
              prop: 'position',
              value: 'center'
            },
            {
              component: 'radio',
              label: '居右',
              prop: 'position',
              value: 'right'
            },
            {
              component: 'radio',
              label: '居左分散',
              prop: 'position',
              value: 'left-between'
            },
            {
              component: 'radio',
              label: '居右分散',
              prop: 'position',
              value: 'right-between'
            }
          ]
        },
        {
          component: 'radio-group',
          label: '大小',
          prop: 'size',
          value: 'default',
          children: [
            {
              component: 'radio',
              label: '小',
              prop: 'position',
              value: 'small'
            },
            {
              component: 'radio',
              label: '默认',
              prop: 'position',
              value: 'default'
            },
            {
              component: 'radio',
              label: '大',
              prop: 'position',
              value: 'large'
            }
          ]
        },
        {
          component: 'switch',
          label: '显示内置工具',
          prop: 'showTool',
          value: 'false'
        },
        {
          component: 'switch',
          label: '显示阴历',
          prop: 'showDayCn',
          value: true
        },
        {
          component: 'switch',
          label: '显示星座',
          prop: 'showAstro',
          value: false
        },
        {
          component: 'switch',
          label: '显示干支纪年',
          prop: 'showGzDay',
          value: false
        },
        {
          component: 'switch',
          label: '边框',
          prop: 'border',
          value: true
        },
        {
          component: 'switch',
          label: '行内',
          prop: 'inline',
          value: false
        }
      ])

      const form = reactive<FormProps>(
        formSchema.value.map((o) => ({
          [o.prop]: o.value
        })) as any
      )

      const setDate = (val, type) => (value.value = dayjs(value.value).add(val, type).toDate())

      function format(val, fmt = 'YYYY-MM-DD') {
        return dayjs(val).format(fmt)
      }

      function updateForm(val) {
        Object.keys(val).forEach((key) => {
          form[key] = val[key]
        })
      }

      return {
        onCellClick,
        value,
        setDate,
        format,
        formSchema,
        form,
        updateForm,
        toolList: computed(() =>
          form.showTool ? ['prev-year', 'prev-month', 'today', 'next-month', 'next-year'] : []
        )
      }
    }
  })
</script>

<style lang="scss" scoped></style>
