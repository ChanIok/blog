<template>
  <div
    id="nav-bar"
    :class="{
      'default-dark-theme': theme == 'dark',
      'light-theme': theme != 'dark',
    }"
  >
    <div class="menu-wrapper">
      <n-menu
        class="n-menu"
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
      />
    </div>
    <div class="options-wrapper">
      <n-switch
        v-model:value="lightActive"
        size="medium"
        :rail-style="railStyle"
      >
        <template #checked-icon>
          <n-icon :component="SunnyOutline" />
        </template>
        <template #unchecked-icon>
          <n-icon :component="MoonSharp" />
        </template>
      </n-switch>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref, Component, CSSProperties, watch, computed } from "vue";
import { NIcon, NMenu, NSwitch } from "naive-ui";
import type { MenuOption } from "naive-ui";
import {
  LogOutOutline as HomeIcon,
  BookOutline as BookIcon,
  SunnyOutline,
  MoonSharp,
} from "@vicons/ionicons5";

import { RouterLink } from "vue-router";
import { theme } from "@/store";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const lightActive = computed({
  get() {
    return theme.value == "dark" ? false : true;
  },

  set(newValue) {
    theme.value = newValue ? "light" : "dark";
  },
});

const railStyle = ({
  focused,
  checked,
}: {
  focused: boolean;
  checked: boolean;
}) => {
  const style: CSSProperties = {};
  if (checked) {
    style.background = "#F1F1F1";
    if (focused) {
      style.boxShadow = "0 0 0 2px #F1F1F140";
    }
  } else {
    style.background = "#7E7E7E";
    if (focused) {
      style.boxShadow = "0 0 0 2px #7E7E7E40";
    }
  }
  return style;
};

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

<style lang="less" scoped>
@import "@/style/varibles.less";

.default-dark-theme {
  background-color: @default-dark-background-color;
  color: @dark-color;
}

.light-theme {
  background-color: @light-background-color;
  color: @light-color;
}

#nav-bar {
  display: flex;
  justify-content: space-between;
  .options-wrapper {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
}
</style>
