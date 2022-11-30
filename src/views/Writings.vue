<template>
  <div
    id="writings"
    :class="{
      'default-dark-theme': theme == 'dark',
      'light-theme': theme != 'dark',
    }"
  >
    <div class="sidebar-wrapper">
      <n-scrollbar>
        <SidebarVue :menuOptions="writingList" @onClick="onClickCallback" />
      </n-scrollbar>
    </div>
    <div class="local-nav-wrapper">
      <n-scrollbar>
        <LocalNavVue :menuOptions="writingList" @onClick="onClickCallback" />
      </n-scrollbar>
    </div>
    <div class="writings-container">
      <div class="content">
        <MarkdownVue v-if="!showIntroduction" />
        <WritingIntroductionVue v-if="showIntroduction" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { NScrollbar } from "naive-ui";
import SidebarVue from "@/components/Sidebar.vue";
import LocalNavVue from "@/components/LocalNav.vue";
import { getLatestState, CNDecode } from "@/utils/artools";
import axios from "axios";
import { contractAddress } from "@/config";
import { loadingBarAction, theme, currentWritingText } from "@/store";
import MarkdownVue from "@/components/Markdown.vue";
import WritingIntroductionVue from "@/components/WritingIntroduction.vue";

const showIntroduction = ref<boolean>(true);
const writingList = ref<any>([]);

const onClickCallback = async (e: any) => {
  loadingBarAction.value = "start";
  const res = await axios.get(
    process.env.NODE_ENV == "development" ? CNDecode(e) : e
  );
  currentWritingText.value = res.data;
  await nextTick();
  showIntroduction.value = false;
  loadingBarAction.value = "finish";
};

const getWritingList = async () => {
  const manifest = await getLatestState(contractAddress);
  const paths = manifest.paths;
  const catalogue: any[] = [];
  for (const key in paths) {
    if (key.indexOf("writings/") != 0) {
      continue;
    }
    const keys = key.split("/");
    keys.shift();
    keys.reduce((pre, cur, i) => {
      if (i === keys.length - 1) {
        pre.push({
          label: CNDecode(keys[keys.length - 1]),
          key,
        });
        return pre;
      }
      for (const index in pre) {
        if (pre[index].key == cur) {
          return pre[index].children;
        }
      }
      pre.push({
        label: CNDecode(cur),
        key: cur,
        children: [],
      });
      return pre[pre.length - 1].children;
    }, catalogue);
  }
  for (const key in catalogue) {
    writingList.value.push(catalogue[key]);
  }
  writingList.value.sort();
};
onMounted(async () => {
  loadingBarAction.value = "start";
  try {
    await getWritingList();
  } catch (error) {
    console.log(error);
  }
  loadingBarAction.value = "finish";
});
</script>

<style lang="less" scoped>
@import "@/style/varibles.less";
.default-dark-theme {
  background-color: @default-dark-background-color;
  color: @dark-color;
  --theme-border-color: rgba(64, 64, 64);
}

.light-theme {
  background-color: @light-background-color;
  color: @light-color;
  --theme-border-color: rgba(192, 192, 192);
}

#writings {
  width: 100%;
  display: flex;
  height: 100%;
  @media only screen and (max-width: 960px) {
    flex-direction: column;
  }
  .sidebar-wrapper {
    min-width: 250px;
    height: 100%;
    box-sizing: border-box;
    padding: 0px;
    border-right: 1px solid var(--theme-border-color);
    @media only screen and (max-width: 960px) {
      display: none;
    }
  }
  .local-nav-wrapper {
    display: none;
    z-index: 99;
    width: 100%;
    border-bottom: 1px solid var(--theme-border-color);
    box-sizing: border-box;
    flex: 0;
    @media only screen and (max-width: 960px) {
      display: block;
    }
  }
  .writings-container {
    display: flex;
    width: 100%;
    flex: 1;
    overflow: auto;
    .content {
      box-sizing: border-box;
      height: 100%;
      flex: 1;
      overflow: auto;
      @media only screen and (max-width: 960px) {
        padding: 10px 10px 0 10px;
        flex-shrink: 0;
      }
    }
  }
}
</style>
