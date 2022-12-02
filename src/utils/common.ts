import { windowWidth, isDark, isLoadCompleted, manifest } from "@/store";
import { watch } from "vue";

import Liyue from "@/assets/Liyue_1.jpg";
import Venti from "@/assets/Venti.jpg";

import { getLatestManifestId, getLatestState } from "./artools";
const imgArr = [Liyue, Venti];

const onResize = () => {
  window.onresize = () => {
    windowWidth.value =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  };
};

const loadThemeConfig = () => {
  const storageTheme = localStorage.getItem("theme");
  if (storageTheme == undefined || storageTheme == null) {
    localStorage.setItem("theme", "dark");
  } else if (storageTheme == "dark") {
    isDark.value = true;
  } else {
    isDark.value = false;
  }
};

const onThemeChange = () => {
  watch(
    () => isDark.value,
    (value) => {
      if (value) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    }
  );
};

const loadImgs = async () => {
  return await Promise.all(
    imgArr.map((path) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = path;
        image.onload = () => resolve(image);
      });
    })
  );
};

export const loadManifest = async () => {
  const storageManifest = localStorage.getItem("manifest");
  if (storageManifest) {
    manifest.value = JSON.parse(storageManifest);
  }
  getLatestManifestId()
    .then(async (txId) => {
      return getLatestState(txId);
    })
    .then((state) => {
      manifest.value = state;
      localStorage.setItem("manifest", JSON.stringify(state));
    });
};

export const init = async () => {
  onResize();
  loadThemeConfig();
  onThemeChange();
  await loadImgs();
  loadManifest();
  isLoadCompleted.value = true;
};