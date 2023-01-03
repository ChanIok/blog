<template>
  <div id="nav-bar">
    <div class="menu-wrapper">
      <n-menu
        class="n-menu"
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
      />
    </div>
    <div class="options-wrapper">
      <div class="share-wrapper" v-if="isShareButtonShow">
        <ShareButtonVue></ShareButtonVue>
      </div>

      <n-switch
        v-model:value="LightActive"
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
import { useRoute } from "vue-router";
import {
  LogOutOutline as HomeIcon,
  BookOutline as BookIcon,
  SunnyOutline,
  MoonSharp,
  ChatboxEllipsesOutline,
} from "@vicons/ionicons5";

import ShareButtonVue from "@/components/ShareButton.vue";
import { RouterLink } from "vue-router";
import { isDark, windowWidth } from "@/store";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const route = useRoute();
const LightActive = computed({
  get() {
    return !isDark.value;
  },
  set(newValue) {
    isDark.value = !newValue;
  },
});

const isShareButtonShow = computed(() => {
  return route.path.indexOf("/writings/") == 0 && windowWidth.value >= 960
    ? true
    : false;
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
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/comments",
          },
        },
        { default: () => "留言" }
      ),
    key: "comments",
    icon: renderIcon(ChatboxEllipsesOutline),
  },
];

const activeKey = ref<string | null>(null);
</script>

<style lang="less" scoped>
#nav-bar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .options-wrapper {
    display: flex;
    align-items: center;
    margin-right: 20px;
    .share-wrapper {
      margin-right: 10px;
    }
  }
}
</style>
