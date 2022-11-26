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
          <span> Hi，欢迎来到本站， </span>
          <span> 这里是我构筑于区块链的一心净土 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UniverseVue from "@/components/Universe.vue";
</script>

<style lang="less" scoped>
#welcome-page {
  width: 100%;
  height: 100%;
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
