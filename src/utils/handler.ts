import { state } from './common';
import { windowWidth, isDark, manifest } from '@/store';
import { watch } from 'vue';

const onLoadManifest = () => {
  window.addEventListener('message', function (e) {
    if (e.data.action == 'loadManifest') {
      localStorage.setItem('manifest', JSON.stringify(e.data.data));
      manifest.value = e.data.data;
      state.isLoadManifestCompleted = true;
    }
  });
};

const onResize = () => {
  function setWidth() {
    windowWidth.value =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  }
  setWidth();
  window.onresize = () => {
    setWidth();
  };
};

const onThemeChange = () => {
  watch(
    () => isDark.value,
    (value) => {
      if (value) {
        localStorage.setItem('theme', 'dark');
        window.parent.postMessage({ action: 'setTheme', data: 'dark' }, '*');
      } else {
        localStorage.setItem('theme', 'light');
        window.parent.postMessage({ action: 'setTheme', data: 'light' }, '*');
      }
    },
  );
};

export const initHandler = () => {
  onLoadManifest();
  onResize();
  onThemeChange();
};
