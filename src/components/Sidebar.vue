<template>
  <div id="sidebar">
    <div class="skeleton-wrapper" v-if="!props.isloadCompleted">
      <n-space vertical>
        <n-skeleton height="40px" width="100%" />
        <n-skeleton height="40px" width="100%" :sharp="false" />
      </n-space>
    </div>
    <n-menu
      ref="menuInstRef"
      :root-indent="20"
      :indent="12"
      :options="props.menuOptions"
      :default-value="writingListKey"
      :value="writingListKey"
      @update:value="handleUpdateValue"
      accordion
    />
  </div>
</template>

<script setup lang="ts">
  import { NMenu, MenuInst, NSpace, NSkeleton } from 'naive-ui';
  import { watch, ref } from 'vue';
  const menuInstRef = ref<MenuInst | null>(null);
  const emit = defineEmits(['onClick']);
  const props = defineProps([
    'menuOptions',
    'isloadCompleted',
    'writingListKey',
  ]);
  const handleUpdateValue = (e: any) => {
    emit('onClick', e);
  };
  watch(
    () => props.writingListKey,
    (val) => {
      menuInstRef.value?.showOption(val);
    },
  );
  
</script>

<style lang="less" scoped>
  #sidebar {
    width: 100%;
    .skeleton-wrapper {
      padding: 10px;
    }
  }
</style>
