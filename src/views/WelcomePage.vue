<template>
  <div id="welcome-page">
    <UniverseVue />
    <div class="welcome-page-container">
      <div
        class="card"
        :class="{
          'light-theme': !isDark,
        }"
      >
        <div class="header">
          <div class="header-left">ChanIok</div>
          <div class="header-right">.eth</div>
        </div>
        <div class="content">
          <span> Hi，欢迎来到本站， </span>
          <span> 这里是我构筑于区块链的一心净土 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UniverseVue from "@/components/Universe.vue";
import { isDark } from "@/store";
</script>

<style lang="less" scoped>
#welcome-page {
  width: 100%;
  height: 100%;
  .welcome-page-container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    .light-theme {
      text-shadow: 2px 3px 5px rgba(128, 128, 128, 0.3);
    }
    .card {
      display: flex;
      flex-direction: column;
      max-width: 500px;
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36px;
        color: rgb(255, 255, 255);
        line-height: 48px;
        .header-right {
          margin-left: 10px;
          margin-top: 20px;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
      .content {
        font-size: 18px;
        color: rgb(255, 255, 255);
        margin-bottom: 20px;
        @media only screen and (max-width: 480px) {
          margin-top: 20px;
          line-height: 32px;
          span {
            text-align: center;
            display: block;
          }
        }
      }
    }
  }
}
</style>
