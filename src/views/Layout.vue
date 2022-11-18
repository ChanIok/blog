<template>
  <div
    class="background"
    :style="{ backgroundImage: 'url(' + backgroundImg + ')' }"
  ></div>
  <div class="background-mask"></div>
  <div class="container">
    <div class="menu-wrapper">
      <Menu></Menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import backgroundImg from "@/assets/Liyue_1.jpg";
import Menu from "@/components/Menu.vue";
</script>

<style lang="less" scoped>
.background {
  width: 100%;
  height: 100%;
  background-size: cover;
  position: fixed;
  z-index: -999;
  background-position: 50% 50%;
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
  display: flex;
  flex-direction: column;
  .menu-wrapper {
    width: 100%;
    position: fixed;
    z-index: 998;
    background-color: rgba(255, 255, 255, 1);
  }
  .content {
    box-sizing: border-box;
  }
}
</style>
