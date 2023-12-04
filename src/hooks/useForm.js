import { reactive, onMounted } from 'vue'

export function useForm() {
  const formConfig = reactive({
    ref: 'form',
    span: 8,
    btnSpan: 4,
    btnOffset: 0,
    colon: true
  })
  
  const formButtons = reactive([])
  
  const uploadConfig = reactive({
    action: '',
    limit: 50,
    maxSize: 1024 * 1024 * 1024 * 2, // 单个文件最大2GB
    multiple: true,
    acceptExtension: [],
    headers: {}
  })
  
  onMounted(() => {
    uploadConfig.action = process.env.VUE_APP_BASE_API
  })

  const onSubmit = (callback) => {
    formConfig.ref.validate((valid) => {
      if (!valid) return
      callback && callback()
    })
  }

  const onReset = (callback) => {
    formConfig.ref.resetFields()
    callback && callback()
  }

  return {
    formConfig,
    formButtons,
    uploadConfig,
    onSubmit,
    onReset
  }
}