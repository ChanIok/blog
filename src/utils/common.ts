import { isLoadCompleted } from '@/store';
import ClipboardJS from 'clipboard';
import { initHandler } from './handler';
import { loadImgs, loadManifest, loadThemeConfig } from './loader';

export const state = { isLoadManifestCompleted: false };

export const initUtils = () => {
  const clipboard = new ClipboardJS('.btn');
};

export const init = async () => {
  window.parent.postMessage({ action: 'continueLoading' }, '*');
  initHandler();
  initUtils();
  loadThemeConfig();
  await loadImgs();
  if (!state.isLoadManifestCompleted) {
    await loadManifest();
  }
  window.parent.postMessage({ action: 'loadCompleted' }, '*');
  isLoadCompleted.value = true;
};
