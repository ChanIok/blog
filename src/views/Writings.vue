<template>
  <div id="writings">
    <div class="sidebar-wrapper">
      <SidebarVue :menuOptions="writingList" @onClick="onClickCallback" />
    </div>
    <div class="container">
      <div class="content">
        <v-md-preview :text="text" ref="preview"></v-md-preview>
      </div>
      <div class="outline" v-if="reloadOutline">
        <div
          v-for="anchor in titles"
          :style="{ padding: `10px 0 10px ${20 + anchor.indent * 20}px` }"
          @click="handleAnchorClick(anchor)"
          class="outline-item"
          :class="{ isClicked: currentIndex === anchor.lineIndex }"
        >
          <a style="cursor: pointer">{{ anchor.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import SidebarVue from "@/components/Sidebar.vue";
import { getLatestState, CNDecode } from "@/utils/artools";
import axios from "axios";
import { contractAddress } from "@/config";
import { loadingBarAction } from "@/store";

const text = ref("");
const preview = ref<any>(null);
const anchors = ref<any>([]);
const titles = ref<any>([]);
const hTags = ref<any>([]);
const writingList = ref<any>([]);
const reloadOutline = ref<boolean>(true);
const currentIndex = ref<any>();

const onClickCallback = async (e: any) => {
  loadingBarAction.value = "start";
  const res = await axios.get(
    process.env.NODE_ENV == "development" ? CNDecode(e) : e
  );
  text.value = res.data;
  await nextTick();
  setAnchors();
  loadingBarAction.value = "finish";
};

const setAnchors = () => {
  anchors.value = preview.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
  titles.value = Array.from(anchors.value).filter(
    (title: any) => !!title.innerText.trim()
  );
  if (!titles.value.length) {
    titles.value = [];
    return;
  }

  // 通过集合给标题去重，然后排序
  hTags.value = Array.from(
    new Set(titles.value.map((title: any) => title.tagName))
  ).sort();

  titles.value = titles.value.map((el: any) => ({
    title: el.innerText,
    lineIndex: el.getAttribute("data-v-md-line"),
    indent: hTags.value.indexOf(el.tagName),
  }));
};

const handleAnchorClick = (anchor: any) => {
  const { lineIndex } = anchor;
  currentIndex.value = lineIndex;
  const heading = preview.value.$el.querySelector(
    `[data-v-md-line="${lineIndex}"]`
  );
  if (heading) {
    preview.value.scrollToTarget({
      target: heading,
      scrollContainer: window,
      top: 60,
    });
  }
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
    function setVal(obj: any, value: any, keys: string[]) {
      keys.reduce((acc, cur, i) => {
        if (i === keys.length - 1) {
          acc.push({
            label: value.label,
            key: value.key,
          });
          return acc;
        }
        for (const index in acc) {
          if (acc[index].key == cur) {
            return acc[index].children;
          }
        }
        acc.push({
          label: CNDecode(cur),
          key: cur,
          children: [],
        });
        return acc[acc.length - 1].children;
      }, obj);
    }
    setVal(
      catalogue,
      {
        label: CNDecode(keys[keys.length - 1]),
        key,
      },
      keys
    );
  }
  for (const key in catalogue) {
    writingList.value.push(catalogue[key]);
  }
  writingList.value.sort();
};
onMounted(async () => {
  loadingBarAction.value = "start";
  await getWritingList();
  loadingBarAction.value = "finish";
});
</script>

<style lang="less" scoped>
#writings {
  width: 100%;
  height: 100%;
  display: flex;
  .sidebar-wrapper {
    position: sticky;
    min-width: 250px;
    top: 0;
    height: 100vh;
    box-sizing: border-box;
    padding: 0px;
    padding-top: 60px;
    background-color: rgba(255, 255, 255, 0.9);

    border-right: 1px solid rgba(128, 128, 128, 0.2);
  }
  .container {
    display: flex;
    width: 100%;
    .content {
      box-sizing: border-box;
      padding: 40px;
      background-color: rgba(255, 255, 255, 0.9);
      flex: 1;
    }
    .outline {
      position: sticky;
      top: 0;
      height: 100vh;
      box-sizing: border-box;
      padding: 0px;
      padding-top: 72px;
      background-color: rgba(255, 255, 255, 0.9);
      width: 250px;
      .outline-item {
        cursor: pointer;
        font-size: 13px;
        color: rgba(60, 60, 60, 0.7);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 14px;
        &:hover {
          transition: 0.2s;
          color: rgb(33, 53, 71);
        }
      }
      .isClicked {
        color: rgb(33, 53, 71);
      }
    }
  }
}
</style>
