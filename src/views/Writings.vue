<template>
  <div id="writings">
    <div class="sidebar-wrapper">
      <n-scrollbar>
        <SidebarVue
          :menuOptions="writingList"
          :isloadCompleted="isListloadCompleted"
          :writingListKey="writingListKey"
          @onClick="onClickCallback"
        />
      </n-scrollbar>
    </div>
    <div class="local-nav-wrapper">
      <n-scrollbar>
        <LocalNavVue
          :menuOptions="writingList"
          :isloadCompleted="isListloadCompleted"
          :writingListKey="writingListKey"
          @onClick="onClickCallback"
        />
      </n-scrollbar>
    </div>
    <div class="writings-container">
      <div class="content">
        <MarkdownVue v-show="!showIntroduction" />
        <IntroductionVue v-if="showIntroduction" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, nextTick, watch } from 'vue';
  import { NScrollbar } from 'naive-ui';
  import SidebarVue from '@/components/Sidebar.vue';
  import LocalNavVue from '@/components/LocalNav.vue';
  import axios from 'axios';
  import { loadingBarAction, currentWritingText, manifest } from '@/store';
  import MarkdownVue from '@/components/Markdown.vue';
  import IntroductionVue from '@/components/Introduction.vue';
  import { getFullPath, getWritingsList } from '@/utils/artools';
  import { useRouter, useRoute } from 'vue-router';
  import { getWritingLocally } from '@/utils/dev';
  const router = useRouter();
  const route = useRoute();

  const isListloadCompleted = ref<boolean>(false);
  const showIntroduction = ref<boolean>(true);
  const writingList = ref<any>([]);
  const writingListKey = ref<string>('about');

  const onClickCallback = async (path: any) => {
    if (path == 'about') {
      showIntroduction.value = true;
      router.push({ path: '/writings' });
      return;
    }
    router.push({ path: `/writings/${manifest.value?.paths[path].id}` });
  };

  const loadWriting = async () => {
    const txIdTemp = route.params.txId;
    if (route.params.txId == undefined || route.params.txId == '') {
      return;
    }
    const path = await getFullPath(txIdTemp as string);
    if (path == '') {
      return;
    }
    writingListKey.value = path;
    loadingBarAction.value = 'start';

    if (process.env.NODE_ENV === 'development') {
      currentWritingText.value = await getWritingLocally(
        manifest.value!.paths[path].id,
      );
    } else {
      currentWritingText.value = (
        await axios.get(`https://arweave.net/${manifest.value!.paths[path].id}`)
      ).data;
    }

    await nextTick();
    showIntroduction.value = false;
    loadingBarAction.value = 'finish';
  };
  watch(
    () => route.params.txId,
    () => {
      loadWriting();
    },
  );

  onMounted(async () => {
    loadingBarAction.value = 'start';
    try {
      writingList.value = await getWritingsList();
      isListloadCompleted.value = true;
      loadWriting();
    } catch (error) {
      console.log(error);
    }
    loadingBarAction.value = 'finish';
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
