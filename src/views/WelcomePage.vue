<template>
  <div id="welcome-page">
    <div class="container">
      <n-card content-style="padding: 20px;" class="n-card-main">
        <n-tabs
          type="line"
          size="large"
          :tabs-padding="20"
          pane-style="padding: 20px;"
        >
          <n-tab-pane name="Hi">
            欢迎来到本站，这里是 ChanIok 在区块链上构建的一心净土
            <!-- <n-button @click="handleClick"> 点它 </n-button> -->
          </n-tab-pane>
          <n-tab-pane class="n-tab-pane-about-me" name="关于我">
            <n-card title="ChanIok" class="n-card-second">
              是个俗人，贪财好色（笑<br />
              <br />
              兴趣比较广，偶尔折腾些新东西
            </n-card>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NCard, NTabs, NTabPane } from "naive-ui";
import { NButton } from "naive-ui";
const handleClick = () => {
  console.log("111");
};
</script>

<style lang="less" scoped>
#welcome-page {
  width: 100vw;
  // height: calc(100vh - 42px);
  height: 100vh;

  .container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .n-card-main {
    background-color: rgba(255, 255, 255, 0.8);
    .n-tab-pane-about-me {
      box-sizing: border-box;
      padding-right: 20px;
    }
  }
}

#content-wrapper {
  background-color: rgba(255, 255, 255, 0.589);
  box-sizing: border-box;
  padding: 100px;
  box-shadow: 0px 1px 10px 5px rgba(255, 255, 255, 0.569);
}
#content {
  display: flex;
  flex-direction: row;
  align-items: center;
}
#avatar {
  width: 100px;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  box-shadow: 0px 1px 5px 1px rgba(32, 32, 32, 0.569);
  flex-shrink: 0;
}
#introduction {
  box-sizing: border-box;
  padding: 20px;
  color: rgb(20, 20, 20);
}

.n-card {
  max-width: 500px;
}
</style>
