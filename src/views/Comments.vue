<template>
  <div id="comments">
    <div class="container">
      <div class="header">
        <n-el tag="span"> 这是一块去中心化的留言板，你可以在这里写点东西... </n-el>
        <n-divider />
      </div>

      <div class="content">
        <iframe :src="url" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NDivider, NEl } from "naive-ui";
import { isDark } from "@/store";
import { computed } from "vue";
const url = computed(() => {
  const s = isDark.value ? "dark" : "light";
  return `https://embed.0xecho.com.ipns.page?color-theme=${s}&desc=Hi&has-h-padding=true&has-v-padding=true&modules=comment%2Ctip&receiver=chaniok.eth&target_uri=https%3A%2F%2Fchaniok.eth.limo%2Fcomments%2Fd5d20`;
});
</script>

<style lang="less" scoped>
#comments {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  background-color: var(--theme-bg);
  transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s,
    background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  .container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    iframe {
      width: 100%;
      height: 100%;
    }
    .header {
      padding: 20px;
    }
    .content {
      width: 100%;
      flex: 1;
    }
  }
}
</style>
