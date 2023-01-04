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
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
onMounted(() => {
  init();
  onHashChange();
});
const onHashChange = () => {
  watch(
    () => route.path,
    (value) => {
      if (value) {
        window.parent.postMessage({ action: "setHash", data: value }, "*");
      }
    }
  );
};
</script>

<style lang="less" scoped>
#n-config-provider {
  width: 100%;
  height: 100%;
}
</style>
