<template>
  <div id="wrapper" class="card">
    <div
      id="background"
      :style="{ backgroundImage: 'url(' + backgroundImg + ')' }"
    ></div>
    <div id="container">
      <div id="content-wrapper">
        <div id="content">
          <div
            id="avatar"
            :style="{ backgroundImage: 'url(' + avatar + ')' }"
          ></div>
          <div id="introduction">
            网站部署测试，这是第一版
            <br />
            后面慢慢完善
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import backgroundImg from "@/assets/Liyue_1.jpg";
import avatar from "@/assets/doge-648.jpg";

const count = ref(0);
</script>

<style scoped>
#background {
  width: 100%;
  height: 100%;
  background-size: cover;
  position: absolute;
  z-index: -1;
  background-position: 50% 50%;
}
#wrapper {
  width: 100%;
  height: 100%;
}
#container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
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
</style>
