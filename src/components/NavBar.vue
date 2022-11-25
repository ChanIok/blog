<template>
  <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>

<script setup lang="ts">
import { h, ref, Component } from "vue";
import { NIcon, NMenu } from "naive-ui";
import type { MenuOption } from "naive-ui";
import {
  LogOutOutline as HomeIcon,
  BookOutline as BookIcon
} from "@vicons/ionicons5";
import { RouterLink } from "vue-router";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/",
          },
        },
        { default: () => "主页" }
      ),
    key: "go-back-home",
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/writings",
          },
        },
        { default: () => "文章" }
      ),
    key: "writings",
    icon: renderIcon(BookIcon),
  },
];

const activeKey = ref<string | null>(null);
</script>

<style lang="less" scoped></style>
