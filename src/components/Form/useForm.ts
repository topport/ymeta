import { error } from '@/utils/log'
import { FormActionType, FormSchema } from './types/types'

export function useForm(schema: FormSchema[]) {
  const formRef = ref<Nullable<FormActionType>>(null)

  const formModel = reactive(
    schema.map((o) => ({
      [o.prop]: o.value
    }))
  )

  async function getForm() {
    const form = unref(formRef)

    if (!form) {
      error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!'
      )
    }
    await nextTick()
    return form as FormActionType
  }

  function update(val: typeof formModel) {
    Object.keys(val).forEach((key) => {
      formModel[key] = val[key]
    })
  }

  return {
    form: getForm(),
    model: formModel,
    update
  }
}
