<template>
  <n-config-provider id="n-config-provider" >
    <n-global-style />
    <router-view></router-view>
  </n-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { init } from "./utils/responsive";
import { darkTheme, NConfigProvider,NGlobalStyle } from "naive-ui";
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
