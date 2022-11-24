<template>
  <div id="welcome-page">
    <UniverseVue />
    <div class="container">
      <div class="card">
        <div class="header">
          <div class="header-left">ChanIok</div>
          <div class="header-right">.eth</div>
        </div>
        <div class="content">
          Hi，欢迎来到本站，这里是 我 构筑于区块链的一心净土
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UniverseVue from "@/components/Universe.vue";
import { ref } from "vue";
import { NCard, NTabs, NTabPane } from "naive-ui";
</script>

<style lang="less" scoped>
#welcome-page {
  width: 100vw;
  height: 100vh;
  .container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    .card {
      font-family: "Microsoft YaHei";
      display: flex;
      flex-direction: column;
      max-width: 500px;
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 42px;
        color: rgb(255, 255, 255);
        line-height: 72px;
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
      }
    }
  }
}
</style>
