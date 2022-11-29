<template>
  <div id="background">
    <div
      class="background-img"
      :class="{
        'default-dark-theme': theme == 'dark',
        'light-theme': theme != 'dark',
      }"
      :style="{ backgroundImage: 'url(' + backgroundImg + ')' }"
    ></div>
    <div class="background-mask"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Liyue from "@/assets/Liyue_1.jpg";
import Venti from "@/assets/Venti.jpg";
import { isLoadCompleted, theme } from "@/store";
import { computed } from "@vue/reactivity";

const backgroundImg = computed(() => {
  if (theme.value == "dark") {
    return Liyue;
  } else {
    return Venti;
  }
});
onMounted(() => {
  const image = new Image();
  image.src = backgroundImg.value;
  image.onload = () => {
    isLoadCompleted.value = true;
  };
});
</script>

<style lang="less" scoped>
#background {
  .background-img {
    width: 100%;
    height: 100%;
    background-size: cover;
    position: fixed;
    z-index: -999;
    background-position: 50% 50%;
    @media only screen and (max-width: 480px) {
      background-position: 25% 50%;
    }
    transition: all 1s;
  }
  .light-theme {
    background-position: 85% 50%;
  }
  .background-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -998;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
