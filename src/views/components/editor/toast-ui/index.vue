<template>
  <div class="p-4">
    <t-card class="mb-4">
      <el-row>
        <basic-form :schemas="formSchema" inline label-width="80px">
          <template #action>
            <el-row>
              <el-button type="primary" @click="() => handleGetHeight()">获取高度</el-button>
              <el-button type="primary" @click="() => handleGetHTMLText()">获取HTML</el-button>
              <el-button type="primary" @click="() => handleGetMarkdown()">获取Markdown</el-button>
              <el-button type="success" @click="() => handleSetHTMLText()">设置HTML</el-button>
              <el-button type="success" @click="() => handleSetMarkdown()">设置Markdown</el-button>
              <el-button type="success" @click="() => handleInsertText()">插入文本</el-button>
              <el-button type="danger" @click="() => handleEditorReset()">清空内容</el-button>
            </el-row>
          </template>
        </basic-form>
      </el-row>
    </t-card>
    <toast-editor
      ref="editor"
      :key="form"
      :initial-edit-type="form.mode"
      :initial-value="form.initValue"
      :preview-highlight="form.previewHighlight"
      :height="form.height"
      :language="form.language"
      :theme="form.theme"
    ></toast-editor>
    <t-card class="mt-5" header="测试Markdown预览">
      <pre v-precode>
      ![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)

      # Awesome Editor!

      It has been _released as opensource in 2018_ and has ~~continually~~ evolved to **receive 10k GitHub ⭐️ Stars**.

      ## Create Instance

      You can create an instance with the following code and use `getHtml()` and `getMarkdown()` of the [Editor](https://github.com/nhn/tui.editor).

      ```js
      const editor = new Editor(options);
      ```

      > See the table below for default options
      > > More API information can be found in the document

      | name | type | description |
      | --- | --- | --- |
      | el | `HTMLElement` | container element |

      ## Features

      * CommonMark + GFM Specifications
        * Live Preview
        * Scroll Sync
        * Auto Indent
        * Syntax Highlight
              1. Markdown
              2. Preview

      ## Support Wrappers

      > * Wrappers
      >    1. [x] React
      >    2. [x] Vue
      >    3. [ ] Ember
      </pre>
    </t-card>
  </div>
</template>

<script lang="ts">
  import { FormSchema } from '@/components/Form/types/types'
  import { defineComponent } from 'vue'
  import { ElMessageBox } from 'element-plus'
  export default defineComponent({
    setup() {
      const editor = ref()

      // 是否是Markdown模式
      // const isMarkdownMode = () => {
      //   console.log(editor.value.isMarkdownMode())
      // }
      // 是否是所见即所得模式
      // const isWysiwygMode = () => {
      //   console.log(editor.value.isWysiwygMode())
      // }

      const handleGetHeight = () => {
        ElMessageBox.alert(editor.value.getHeight(), '编辑器高度', {
          confirmButtonText: 'OK'
        })
      }

      const handleGetHTMLText = () => {
        ElMessageBox.alert(editor.value.getHTML(), 'HTML内容', {
          confirmButtonText: 'OK'
        })
      }

      const handleGetMarkdown = () => {
        ElMessageBox.alert(editor.value.getMarkdown(), 'Markdown内容', {
          confirmButtonText: 'OK'
        })
      }

      const handleSetMarkdown = () => {
        ElMessageBox.prompt('请输入Markdown内容', 'Markdown', {
          confirmButtonText: '确认'
        }).then(({ value }) => {
          editor.value.setMarkdown(value)
        })
      }

      const handleSetHTMLText = () => {
        ElMessageBox.prompt('请输入HTML内容', 'HTML', {
          confirmButtonText: '确认'
        }).then(({ value }) => {
          editor.value.setHTML(value)
        })
      }

      const handleInsertText = () => {
        ElMessageBox.prompt('请输入文本内容', 'Text', {
          confirmButtonText: '确认'
        }).then(({ value }) => {
          editor.value.insertText(value)
        })
      }

      const handleToggleShow = (val) => {
        val === true ? editor.value.show() : editor.value.hide()
      }

      const handleEditorReset = () => {
        editor.value.reset()
      }

      const handleEditorMode = (val) => {
        editor.value.changeMode(val)
      }

      const handlePreviewHighlight = (val) => {
        form.previewHighlight = val
      }

      const handleChangeHeight = (val) => {
        form.height = val
        editor.value.setHeight(val + 'px')
      }

      const handleChangeLanguage = (val) => {
        form.language = val
        // TODO: bug 不能切换
        editor.value.setLanguage(val)
      }

      const handleChangeTheme = (val) => {
        form.theme = val
      }

      let form = reactive({
        show: true, // 显示editor
        mode: 'markdown', // 编辑器模式 markdown / wysiwyg
        initValue: 'hello', // 初始值
        previewHighlight: true, // 编辑块高亮
        height: 500, // 编辑器高度
        language: 'en-US', // 国际化
        theme: '' // 主题
      })

      const formSchema: FormSchema[] = reactive([
        {
          component: 'switch',
          value: form.show,
          label: '是否显示',
          prop: 'isShow',
          events: {
            change: handleToggleShow
          }
        },
        {
          component: 'radio-group',
          value: form.mode,
          label: '编辑模式',
          prop: 'mode',
          children: [
            { component: 'radio-button', label: 'markdown', value: 'markdown' },
            { component: 'radio-button', label: 'wysiwyg', value: 'wysiwyg' }
          ],
          events: {
            change: handleEditorMode
          }
        },
        {
          component: 'switch',
          value: form.previewHighlight,
          label: '预览高亮',
          prop: 'previewHighlight',
          events: {
            input: handlePreviewHighlight
          }
        },
        {
          component: 'input-number',
          value: form.height,
          label: '高度(px)',
          prop: 'height',
          attrs: {
            min: 300,
            step: 50,
            'step-strictly': true
          },
          events: {
            change: handleChangeHeight
          }
        },
        {
          component: 'radio-group',
          value: form.language,
          label: '设置语言',
          prop: 'language',
          children: [
            { component: 'radio-button', label: '英', value: 'en-US' },
            { component: 'radio-button', label: '中', value: 'zh-CN' },
            { component: 'radio-button', label: '繁', value: 'zh-TW' }
          ],
          events: {
            change: handleChangeLanguage
          }
        },
        {
          component: 'radio-group',
          value: form.theme,
          label: '设置主题',
          prop: 'theme',
          children: [
            { component: 'radio-button', label: 'Light', value: '' },
            { component: 'radio-button', label: 'Dark', value: 'dark' }
          ],
          events: {
            change: handleChangeTheme
          }
        }
      ] as FormSchema[])

      return {
        editor,
        form,
        formSchema,
        handleGetHeight,
        handleGetHTMLText,
        handleGetMarkdown,
        handleSetHTMLText,
        handleSetMarkdown,
        handleInsertText,
        handleEditorReset
      }
    }
  })
</script>

<style lang="scss" scoped></style>
