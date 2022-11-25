<script setup lang="ts">
import { useLoadingBar } from "naive-ui";
import { watch } from "vue";
import { loadingBarAction } from "@/store";
const loadingBar = useLoadingBar();

watch(loadingBarAction, (val) => {
  if (val == "start") {
    loadingBar.start();
  } else if (val == "finish") {
    loadingBar.finish();
  } else if (val == "error") {
    loadingBar.error();
  }
});
</script>

<template>
  <div></div>
</template>

<style lang="less" scoped></style>
