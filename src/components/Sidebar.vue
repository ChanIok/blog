<template>
  <div class="sidebar">
    <n-menu
      :indent="12"
      :options="props.menuOptions"
      @update:value="handleUpdateValue"
      accordion
    />
  </div>
</template>

<script setup lang="ts">
import { NMenu } from "naive-ui";
const emit = defineEmits(["onClick"]);
const props = defineProps(["menuOptions"]);
const handleUpdateValue = (e: any) => {
  emit("onClick", e);
};
</script>

<style lang="less" scoped></style>
