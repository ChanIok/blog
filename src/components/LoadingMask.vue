<template>
  <div id="loading-mask" v-if="isShow" ref="loadingMask">
    <div class="loading-bar">
      <img :src="loadingbarImg" alt="Loading..." />
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadingbarImg } from "@/assets/loadingbarImg";
import { isLoadCompleted } from "@/store";
import { computed, watch, onBeforeMount, onMounted, ref } from "vue";
const isShow = ref<boolean>(true);
const barValue = ref<string>("0");
const transition = ref<string>("width 0.6s ease");
const loadingMask = ref<any>();

const background = computed(() => {
  return `url(${loadingbarImg}) no-repeat`;
});

onMounted(() => {
  const image = new Image();
  image.src = loadingbarImg;
  image.onload = () => {
    start();
  };
});
watch(isLoadCompleted, (val) => {
  if (val) {
    setTimeout(() => {
      finish();
    }, 10);
  }
});
const start = async () => {
  transition.value = "width 5s ease";
  setTimeout(() => {
    barValue.value = "80%";
  }, 5);
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
</script>
<style lang="less" scoped>
#loading-mask {
  --loadingbar-background-color: #2c2b30;
  --loadingbar-prospect-color: #ece5d8;
  background-color: #161d22;
  height: 100vh;
  width: 100vw;
  z-index: 998;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s;
  pointer-events: none;
  .loading-bar {
    height: 50px;
    user-select: none;
    overflow: hidden;
    min-width: 400px;
    position: relative;
    img {
      width: 400px;
      filter: brightness(0.2);
    }
    @media only screen and (max-width: 540px) {
      transform: scale(0.8);
    }
    @media only screen and (max-width: 420px) {
      transform: scale(0.7);
    }
  }
  .loading-bar::after {
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
  }
}
</style>
