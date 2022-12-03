<template>
  <div id="writings">
    <div class="sidebar-wrapper">
      <n-scrollbar>
        <SidebarVue
          :menuOptions="writingList"
          :isloadCompleted="isListloadCompleted"
          @onClick="onClickCallback"
        />
      </n-scrollbar>
    </div>
    <div class="local-nav-wrapper">
      <n-scrollbar>
        <LocalNavVue
          :menuOptions="writingList"
          :isloadCompleted="isListloadCompleted"
          @onClick="onClickCallback"
        />
      </n-scrollbar>
    </div>
    <div class="writings-container">
      <div class="content">
        <MarkdownVue v-show="!showIntroduction" />
        <WritingIntroductionVue v-if="showIntroduction" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick, h } from "vue";
import { NScrollbar, NEllipsis } from "naive-ui";
import SidebarVue from "@/components/Sidebar.vue";
import LocalNavVue from "@/components/LocalNav.vue";
import { CNDecode } from "@/utils/artools";
import { loadManifest } from "@/utils/common";
import axios from "axios";
import { loadingBarAction, currentWritingText, manifest } from "@/store";
import MarkdownVue from "@/components/Markdown.vue";
import WritingIntroductionVue from "@/components/Introduction.vue";

const isListloadCompleted = ref<boolean>(false);
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
  if (!manifest.value) {
    await loadManifest();
  }
  const paths = manifest.value.paths;
  const catalogue: any[] = [];
  for (const key in paths) {
    if (key.indexOf("writings/") != 0) {
      continue;
    }
    await nextTick();
    const keys = key.split("/");
    keys.shift();
    keys.reduce((pre, cur, i) => {
      if (i === keys.length - 1) {
        pre.push({
          label: () =>
            h(NEllipsis, null, {
              default: () => CNDecode(keys[keys.length - 1]),
            }),
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
        label: () => h(NEllipsis, null, { default: () => CNDecode(cur) }),
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
  isListloadCompleted.value = true;
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
#writings {
  width: 100%;
  display: flex;
  height: 100%;
  background-color: var(--theme-bg);
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s,
    background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  @media only screen and (max-width: 960px) {
    flex-direction: column;
  }
  .sidebar-wrapper {
    width: 250px;
    height: 100%;
    box-sizing: border-box;
    padding: 0px;
    border-right: 1px solid var(--theme-border);
    @media only screen and (max-width: 960px) {
      display: none;
    }
  }
  .local-nav-wrapper {
    display: none;
    z-index: 99;
    width: 100%;
    border-bottom: 1px solid var(--theme-border);
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
