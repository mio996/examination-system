<template>
  <section class="container">
    <header class="header">
      <img class="icon" src="@/assets/icons/icon_top-title.svg" alt="icon">
      <span class="text">问题管理</span>
    </header>

    <div class="query-form">
      <i-form
        :config="queryFormConfig"
        :model="queryFormData"
      ></i-form>
      <el-button>查询</el-button>
    </div>
  </section>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import IForm from '@/components/IForm/index.vue'
  import { useForm } from '@/hooks/useForm'

  const { formConfig } = useForm()

  const queryFormConfig = reactive({
    ...formConfig,
    fieldList: [
      {
        label: '问题名称',
        value: 'name',
        type: 'input'
      }
    ]
  })
  const queryFormData = reactive({
    name: '1'
  })
</script>

<style lang="scss" scoped>
  .container {
    background-color: #fff;
    .header {
      display: flex;
      align-items: center;
      height: 44px;
      padding: 5px 20px;
      border-bottom: 1px solid #e6e6e6;
      .icon {
        width: 20px;
        height: 20px;
        transform: translateY(1px);
      }
      .text {
        margin-left: 8px;
        font-size: 18px;
        color: #333;
        font-weight: 700;
      }
    }
  }
</style>
