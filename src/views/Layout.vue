<template>
  <div id="layout">
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
import { NLoadingBarProvider } from "naive-ui";
</script>

<style lang="less" scoped>
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
      border-bottom: 1px solid rgba(128, 128, 128, 0.2);
    }
    .layout-content {
      box-sizing: border-box;
      overflow: auto;
      flex: 1;
    }
  }
}
</style>
