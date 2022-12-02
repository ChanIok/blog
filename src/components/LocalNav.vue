<template>
  <div id="local-nav">
    <div class="container">
      <n-button quaternary @click="activate">
        <n-icon size="24">
          <MenuOutline />
        </n-icon>
        <span style="margin-left: 10px"> 浏览 </span>
        <transition name="spin-wrapper">
          <n-spin
            size="small"
            style="margin-left: 10px; transform: scale(0.7)"
            v-if="!props.isloadCompleted"
        /></transition>
      </n-button>
    </div>
    <n-drawer
      v-model:show="active"
      :width="drawerWidth"
      placement="left"
      resizable
    >
      <n-drawer-content title="目录" :body-content-style="'padding:5px'">
        <n-menu
          :indent="12"
          :options="props.menuOptions"
          @update:value="handleUpdateValue"
          accordion
        />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<script setup lang="ts">
import {
  NButton,
  NIcon,
  NDrawer,
  NDrawerContent,
  NMenu,
  NSpin,
} from "naive-ui";
import { MenuOutline } from "@vicons/ionicons5";
import { ref } from "vue";
const emit = defineEmits(["onClick"]);
const props = defineProps(["menuOptions", "isloadCompleted"]);
const handleUpdateValue = (e: any) => {
  emit("onClick", e);
  active.value = false;
};
const active = ref(false);
const drawerWidth = ref<number>(300);
const activate = () => {
  if (window.innerWidth < 350) {
    drawerWidth.value = window.innerWidth - 50;
  }
  active.value = true;
};
</script>
<style lang="less" scoped>
#local-nav {
  height: 42px;
  .container {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    line-height: 42px;
    box-sizing: border-box;
    padding: 0 10px 0 5px;
    align-items: center;
    .spin-wrapper-leave-active {
      transition: opacity 0.5s;
    }
    .spin-wrapper-leave-to {
      opacity: 0;
    }
  }
}
</style>
