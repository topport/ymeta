<template>
  <div>
    <div class="p-4 overflow-y-auto custom">
      <el-card>
        <template #header>
          <div class="flex justify-between items-center">
            <span class="flex-1">分步表单</span>
          </div>
        </template>
        <!-- 步骤条 -->
        <el-steps :active="active" align-center>
          <el-step title="第一步" description="填写转账信息" />
          <el-step title="第二步" description="确认转账信息" />
          <el-step title="第三步" description="完成" />
        </el-steps>
        <el-row justify="center" class="mt-10">
          <el-col :span="12">
            <basic-form
              v-if="active == 1"
              ref="formOne"
              :schemas="form.one"
              :label-width="labelWidth"
              :label-position="labelPosition"
              size="large"
            >
              <template #action="{ validate, model }">
                <el-button type="primary" @click="handleSubmitOne(validate, model)"
                  >下一步</el-button
                >
              </template>
            </basic-form>
            <el-form
              v-if="active == 2"
              :label-width="labelWidth"
              :label-position="labelPosition"
              size="large"
            >
              <el-form-item v-for="(item, index) in form.one" :key="index" :label="item.label">
                <el-input v-model="item['value']" disabled></el-input>
              </el-form-item>
              <el-form-item label="支付密码" prop="password">
                <el-input v-model="form.two.value" placeholder="输入支付密码" />
              </el-form-item>
              <el-form-item>
                <el-button :loading="loading" @click="handleSubmit">提交</el-button>
                <el-button type="primary" @click="handleClickPrev">上一步</el-button>
              </el-form-item>
            </el-form>
            <el-main v-if="active === 3">
              <el-result icon="success" title="转账成功">
                <template #extra>
                  <el-button type="primary">再转一笔</el-button>
                </template>
              </el-result>
            </el-main>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { ElMessage } from 'element-plus'

  export default defineComponent({
    name: 'StepForm',
    setup() {
      const loading = ref(false)
      const active = ref(1)
      const labelPosition = ref('right')
      const labelWidth = ref('120px')
      const form = reactive({
        one: [
          {
            component: 'input',
            value: '',
            label: '付款账户',
            prop: 'payment',
            rules: [{ required: true, message: '请输入付款账户号', trigger: 'blur' }],
            attrs: {
              placeholder: '付款账户号',
              clearable: true
            }
          },
          {
            component: 'input',
            value: '',
            label: '收款账户',
            prop: 'receive-payment',
            rules: [{ required: true, message: '请输入付款账户号', trigger: 'blur' }],
            attrs: {
              placeholder: '收款账户',
              clearable: true
            }
          },
          {
            component: 'input',
            value: '',
            label: '收款人姓名',
            prop: 'payee',
            rules: [{ required: true, message: '请输入收款人姓名', trigger: 'blur' }],
            attrs: {
              placeholder: '收款人姓名',
              clearable: true
            }
          },
          {
            component: 'input',
            value: '',
            label: '转账金额',
            prop: 'amount',
            rules: [{ required: true, message: '请输入转账金额', trigger: 'blur' }],
            attrs: {
              placeholder: '转账金额',
              clearable: true
            }
          }
        ],
        two: {
          component: 'input',
          value: '',
          label: '支付密码',
          prop: 'payment',
          rules: [{ required: true, message: '请输入支付密码', trigger: 'blur' }],
          attrs: {
            placeholder: '输入支付密码',
            clearable: true
          }
        }
      })

      const models = ref()

      function handleClickPrev() {
        if (active.value === 0) return
        active.value -= 1
      }

      async function handleSubmitOne(formEl, model) {
        console.log('formEl:', formEl)
        if (!formEl) return
        console.log('model:', model)
        formEl()
          .then((res) => {
            if (!res) return
            form.one = form.one.map((item) => {
              item.value = model[item.prop]
              return item
            })
            active.value += 1
          })
          .catch((error) => console.error('step one verification failed:', error))
      }

      function handleSubmit(forms: any) {
        console.log('forms:', forms)
        loading.value = true
        setTimeout(() => {
          loading.value = false
          ElMessage({
            type: 'success',
            message: '控制台查看打印数据'
          })
          active.value++
        }, 3000)
      }

      return {
        loading,
        active,
        labelPosition,
        labelWidth,
        form,
        models,
        handleClickPrev,
        handleSubmitOne,
        handleSubmit
      }
    }
  })
</script>

<style scoped lang=""></style>
