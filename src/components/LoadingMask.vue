<template>
  <div id="loading-mask" v-if="isShow" ref="loadingMask">
    <div class="container">
      <div class="loading-bar"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadingbarImg } from "@/assets/loadingbarImg";
import { isLoadCompleted } from "@/store";
import { computed, watch, onMounted, ref } from "vue";
import { init } from "@/utils/common";
const isShow = ref<boolean>(true);
const barValue = ref<string>("0");
const transition = ref<string>("width 0.6s ease");
const loadingMask = ref<any>();

const background = computed(() => {
  return `url(${loadingbarImg}) no-repeat`;
});
const start = async () => {
  transition.value = "width 5s ease";
  setTimeout(() => {
    barValue.value = "80%";
  }, 5);
  init();
};
const finish = () => {
  transition.value = "width 0.8s ease";
  barValue.value = "100%";
  setTimeout(() => {
    loadingMask.value.style.opacity = 0;
    setTimeout(() => {
      isShow.value = false;
    }, 200);
  }, 800);
};
onMounted(() => {
  const image = new Image();
  image.src = loadingbarImg;
  image.onload = () => {
    start();
  };
});
watch(
  () => isLoadCompleted.value,
  (val) => {
    if (val) {
      setTimeout(() => {
        finish();
      }, 10);
    }
  }
);
</script>

<style lang="less" scoped>
#loading-mask {
  height: 100vh;
  width: 100vw;
  z-index: 998;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s;
  user-select: none;
  background: var(--theme-loading-mask-bg);

  .container {
    overflow: hidden;
    min-width: 400px;
    @media only screen and (max-width: 540px) {
      transform: scale(0.85);
    }
    @media only screen and (max-width: 420px) {
      transform: scale(0.7);
    }
    .loading-bar {
      height: 50px;
      min-width: 400px;
      position: relative;
      background: v-bind(background);
      background-size: 400px 50px;
      transform: translateY(100%);
      filter: drop-shadow(0 -50px 0 var(--theme-loadingbar-background-color));
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        z-index: 999;
        background: v-bind(background);
        background-size: 400px 50px;
        width: v-bind(barValue);
        height: 50px;
        transition: v-bind(transition);
        filter: drop-shadow(0 -50px 0 var(--theme-loadingbar-prospect-color));
      }
    }
  }
}
</style>
