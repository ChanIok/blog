<template>
  <div id="sidebar">
    <div class="skeleton-wrapper" v-if="!props.isloadCompleted">
      <n-space vertical>
        <n-skeleton height="40px" width="100%" />
        <n-skeleton height="40px" width="100%" :sharp="false" />
      </n-space>
    </div>
    <n-menu
      :root-indent="20"
      :indent="12"
      :options="props.menuOptions"
      @update:value="handleUpdateValue"
      accordion
    />
  </div>
</template>

<script setup lang="ts">
import { NMenu, NSpace, NSkeleton } from "naive-ui";
const emit = defineEmits(["onClick"]);
const props = defineProps(["menuOptions", "isloadCompleted"]);
const handleUpdateValue = (e: any) => {
  emit("onClick", e);
};
</script>

<style lang="less" scoped>
#sidebar {
  width: 100%;
  .skeleton-wrapper {
    padding: 10px;
  }
}
</style>
