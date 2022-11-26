<template>
  <div id="layout">
    <div
      class="background"
      :style="{ backgroundImage: 'url(' + backgroundImg + ')' }"
    ></div>
    <div class="background-mask"></div>
    <LoadingMaskVue />
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
import backgroundImg from "@/assets/Liyue_1.jpg";
import NavBarVue from "@/components/NavBar.vue";
import LoadingBarVue from "@/components/LoadingBar.vue";
import LoadingMaskVue from "@/components/LoadingMask.vue";
import { NLoadingBarProvider } from "naive-ui";
import { isLoadCompleted } from "@/store";
import { onMounted } from "vue";

onMounted(() => {
  const image = new Image();
  image.src = backgroundImg;
  image.onload = () => {
    isLoadCompleted.value = true;
  };
});
</script>

<style lang="less" scoped>
@import "@/style/varibles.less";

#layout {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  .background {
    width: 100%;
    height: 100%;
    background-size: cover;
    position: fixed;
    z-index: -999;
    background-position: 50% 50%;
    @media only screen and (max-width: 480px) {
      background-position: 25% 50%;
    }
  }
  .background-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -998;
    background-color: rgba(0, 0, 0, 0.2);
  }
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
