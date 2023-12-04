<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

  const locale = ref(zhCn)
</script>

<style lang="scss">
  html, body, #app {
    height: 100%;
  }
</style>
