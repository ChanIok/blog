<template>
  <div id="background">
    <div
      class="background-img"
      :style="{ backgroundImage: 'url(' + backgroundImg + ')' }"
    ></div>
    <div class="background-mask"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import backgroundImg from "@/assets/Liyue_1.jpg";
import { isLoadCompleted } from "@/store";
onMounted(() => {
  const image = new Image();
  image.src = backgroundImg;
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
  }
  .background-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -998;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
