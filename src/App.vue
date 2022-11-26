<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { init } from "./utils/responsive";

onMounted(() => {
  init();
});
</script>

<style lang="less" scoped></style>
