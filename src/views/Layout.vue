<template>
  <div id="layout">
    <LoadingMaskVue />
    <BackgroundVue />
    <div class="container">
      <div class="header">
        <n-loading-bar-provider>
          <LoadingBarVue />
        </n-loading-bar-provider>
        <NavBarVue />
      </div>
      <div class="content">
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
@import "@/style/varibles.less";

#layout {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  .container {
    width: 100%;
    height: 100%;
    flex-direction: column;
    position: relative;
    .header {
      position: fixed;
      width: 100%;
      z-index: 99;
      background-color: rgba(255, 255, 255, 1);
      box-sizing: border-box;
      border-bottom: 1px solid rgba(128, 128, 128, 0.2);
    }
    .content {
      position: absolute;
      top: @header-height;
      height: calc(100% - @header-height);
      box-sizing: border-box;
      width: 100%;
      overflow: auto;
    }
  }
}
</style>
