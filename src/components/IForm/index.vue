<template>
  <el-form
    :ref="formRef"
    :model="formVal"
    v-bind="{ ...$attrs, ...config }"
    class="i-form"
  >
    <el-row :gutter="config.gutter || 0">
      <el-col
        v-for="(e, index) in config.fieldList"
        :key="index"
        :span="(e.span ? e.span : config.span) || 24"
      >
        <template v-if="e.type === 'slot'">
          <slot :name="e.value" :prop="e"></slot>
        </template>
        <el-form-item
          v-else
          :prop="e.other && e.otherKey === formVal[e.value] ? e.otherValue : e.value"
          :label="config.colon ? (e.label ? e.label + ':' : '') : e.label"
          :class="[e.type === 'upload' ? 'i-form-item-upload' : (e.className || '')]"
          :style="{
            'height': e.type === 'upload' ? (e.peops.height || '70px') : 'auto',
            '--HEIGHT': e.type === 'upload'? (e.peops.height || '70px') : 'auto',
            'display': e.display
          }"
          v-bind="$attrs"
        >
          <div v-if="e.type === 'text'" class="i-form-item-text">{{ form[e.value] || '-' }}</div>
          <template v-else>
            <!-- <template> -->
              <component
                :is="'el-' + formatFormComp(e)"
                :type="e.type"
                :placeholder="formatFormComp(e, 'label')"
                :options="e.options"
                :popper-append-to-body="false"
                :append-to-body="false"
                v-model="formVal[e.value]"
                v-bind="{ ...$attrs, clearable: true, filterable: true, ...e.props }"
                @change="handleChange(e.event, e.value, formVal[e.value])"
                style="width: 100%;"
              ></component>
            <!-- </template> -->
          </template>
        </el-form-item>
      </el-col>
      <el-col
        v-if="buttons && buttons.length"
        :span="config.btnSpan || config.span"
        :offset="config.btnOffset"
        :style="{ paddingLeft: config.btnOffset === 0 ? '30px' : 0 }"
      >
        <el-button
          v-for="(e, index) in buttons"
          :key="'button' + index"
          v-bind="{ ...$attrs, ...e }"
          @click="e.callback"
        >{{ e.label }}</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
  const formVal = reactive({})
  const props = defineProps({
    config: {
      type: Object,
      default: () => {}
    },
    model: {
      type: Object,
      default: () => {}
    },
    formRef: {
      type: [String, Object],
      default: 'formRef'
    },
    buttons: {
      type: Array,
      default: () => []
    }
  })

  const emit = defineEmits(['change'])

  // 表单组件事件处理
  const handleChange = (e, key, value) => {
    if (!e) return
    emit('change', { key, value })
  }

  // 表单组件格式化
  const formatFormComp = (e, target) => {
    const { type } = e

    if (target) {
      return `请${type === 'input' || type === 'textarea' ? '输入' : '选择'}${e[target]}`
    } else {
      return type === 'textarea' 
        ? 'input'
        : type === 'checkbox' || type === 'radio'
          ? `${type}-group`
          : type
    }
  }
</script>

<style scoped>

</style>
