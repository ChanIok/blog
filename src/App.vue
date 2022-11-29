<template>
  <n-config-provider
    id="n-config-provider"
    :theme="theme == 'dark' ? darkTheme : lightTheme"
  >
    <n-global-style />
    <router-view></router-view>
  </n-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { init } from "./utils/responsive";
import { darkTheme, lightTheme, NConfigProvider, NGlobalStyle } from "naive-ui";
import { theme } from "@/store";
onMounted(() => {
  init();
});
</script>

<style lang="less" scoped>
#n-config-provider {
  width: 100%;
  height: 100%;
}
</style>
