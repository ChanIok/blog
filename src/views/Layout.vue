<template>
  <div
    id="layout"
    :class="{
      'default-dark-theme': theme == 'dark',
      'light-theme': theme != 'dark',
    }"
  >
    <LoadingMaskVue />
    <BackgroundVue />
    <div class="layout-container">
      <div class="layout-header">
        <n-loading-bar-provider>
          <LoadingBarVue />
        </n-loading-bar-provider>
        <NavBarVue />
      </div>
      <div class="layout-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBarVue from "@/components/NavBar.vue";
import LoadingBarVue from "@/components/LoadingBar.vue";
import LoadingMaskVue from "@/components/LoadingMask.vue";
import BackgroundVue from "@/components/Background.vue";
import { theme } from "@/store";
import { NLoadingBarProvider } from "naive-ui";
</script>

<style lang="less" scoped>
.default-dark-theme {
  --theme-border-color: rgba(64, 64, 64);
  --theme-background-color: rgb(24, 24, 28);
}

.light-theme {
  --theme-border-color: rgba(192, 192, 192);
  --theme-background-color: rgb(255, 255, 255);
}

#layout {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  .layout-container {
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;

    .layout-header {
      z-index: 99;
      box-sizing: border-box;
      background-color: var(--theme-background-color);
      border-bottom: 1px solid var(--theme-border-color);
    }
    .layout-content {
      box-sizing: border-box;
      overflow: auto;
      flex: 1;
    }
  }
}
</style>
