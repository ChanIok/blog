<template>
  <div id="writing-introduction">
    <div class="container">
      这里存放一些乱七八糟的东西，大概是一些笔记
      <n-divider />
      原本这些内容是我在 Obsidian 上进行编辑和管理的，偶然间接触到了 Arweave
      这个去中心化存储 ，于是通过 Bundlr Network 上传到 Arweave
      网络当中，来尝试实现数据的永久存储。
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { NDivider } from "naive-ui";
onMounted(() => {});
</script>

<style lang="less" scoped>
#writing-introduction {
  display: flex;
  .container {
    padding: 20px;
  }
}
</style>
