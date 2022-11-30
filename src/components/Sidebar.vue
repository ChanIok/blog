<template>
  <div id="sidebar">

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
import { NMenu, NEllipsis } from "naive-ui";
const emit = defineEmits(["onClick"]);
const props = defineProps(["menuOptions"]);
const handleUpdateValue = (e: any) => {
  emit("onClick", e);
};
</script>

<style lang="less" scoped>
#sidebar {
  width: 100%;
}
</style>
