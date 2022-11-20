<template>
  <div id="article">
    <div class="outline">
      <div
        v-for="anchor in titles"
        :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
        @click="handleAnchorClick(anchor)"
      >
        <a style="cursor: pointer">{{ anchor.title }}</a>
      </div>
    </div>
    <div class="content">
      <v-md-preview :text="text" ref="preview"></v-md-preview>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import axios from "axios";

const text = ref("");
const preview = ref<any>(null);
const anchors = ref<any>([]);
const titles = ref<any>([]);
const hTags = ref<any>([]);

const CNEncode = (str: string) => {
  str.match(/[\u4E00-\u9FA5]/g)?.forEach((t) => {
    str = str.replace(t, encodeURIComponent(t));
  });
  str = str.replace(/%/g, "$");
  return str;
};

const getArticle = async () => {
  const url = "writings/注会/2. 存货/2.1 存货的确认和初始计量.md";
  const res = await axios.get(
    (process.env.NODE_ENV == "development" ? url : CNEncode(url))
  );
  text.value = res.data;
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
  const heading = preview.value.$el.querySelector(
    `[data-v-md-line="${lineIndex}"]`
  );
  if (heading) {
    preview.value.scrollToTarget({
      target: heading,
      scrollContainer: window,
      top: 60,
    });
    console.log("----");
  }
};

onMounted(async () => {
  await getArticle();
  await nextTick();
  setAnchors();
});
</script>
<style lang="less" scoped>
#article {
  width: 100%;
  height: 100%;
  display: flex;
  .content {
    overflow: auto;
    box-sizing: border-box;
    padding: 40px;
    background-color: rgba(255, 255, 255, 0.9);
  }
  .outline {
    position: sticky;
    top: 0;
    height: 100vh;
    box-sizing: border-box;
    padding: 20px;
    padding-top: 60px;
    background-color: rgba(255, 255, 255, 0.95);
  }
}
</style>
