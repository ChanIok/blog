<template>
  <div id="writing-introduction">
    <div class="header">关于</div>
    <n-divider />
    <div class="about-me">
      <div class="title">关于我</div>
      <div class="content">
        ISTP，是个赌狗，喜欢投机，贪财好色
        <br />
        每天在贪婪和恐惧之间徘徊，曾经拥有很多，但都得而复失
      </div>
    </div>
    <n-divider />
    <div class="about-web">
      关于本站
      <div class="container">
        这里存放一些乱七八糟的东西，大概是一些笔记和日常记录
        <br />
        原本这些内容是我在 Obsidian 上进行编辑和管理的，偶然间接触到了 Arweave
        这个去中心化存储 ，于是通过 Bundlr Network 上传到 Arweave
        网络当中，来尝试实现数据的永久存储。
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { NDivider } from 'naive-ui';
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
