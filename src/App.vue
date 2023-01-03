<template>
  <n-config-provider
    id="n-config-provider"
    :theme="isDark ? darkTheme : lightTheme"
  >
    <n-global-style />
    <NMessageProvider>
      <router-view :class="{ dark: isDark }"></router-view>
    </NMessageProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import {
  darkTheme,
  lightTheme,
  NConfigProvider,
  NGlobalStyle,
  NMessageProvider,
} from "naive-ui";
import { isDark } from "@/store";
import { init } from "@/utils/common";
import { onMounted } from "vue";
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
