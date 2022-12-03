<template>
  <div id="layout">
    <BackgroundVue />
    <div class="layout-container">
      <n-layout-header class="layout-header">
        <n-loading-bar-provider>
          <LoadingBarVue />
        </n-loading-bar-provider>
        <NavBarVue
      /></n-layout-header>
      <n-layout-content class="layout-content">
        <router-view />
      </n-layout-content>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBarVue from "@/components/NavBar.vue";
import LoadingBarVue from "@/components/LoadingBar.vue";
import BackgroundVue from "@/components/Background.vue";
import { NLoadingBarProvider, NLayoutHeader, NLayoutContent } from "naive-ui";
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
      border-bottom: 1px solid var(--theme-border);
    }
    .layout-content {
      background-color: rgba(0, 0, 0, 0);
    }
  }
}
</style>
