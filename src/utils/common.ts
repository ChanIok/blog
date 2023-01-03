import { windowWidth, isDark, isLoadCompleted, manifest } from "@/store";
import { watch } from "vue";
import { Liyue } from "@/assets";
import ClipboardJS from "clipboard";

// import { Venti } from "@/assets";

import { getLatestManifestId, getLatestState } from "./artools";
const imgArr = [Liyue];

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
        window.parent.postMessage({ action: "setTheme", data: "dark" }, "*");
      } else {
        localStorage.setItem("theme", "light");
        window.parent.postMessage({ action: "setTheme", data: "light" }, "*");
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
  async function setNewManifest() {
    await getLatestManifestId()
      .then(async (txId) => {
        return getLatestState(txId);
      })
      .then((state) => {
        manifest.value = state;
        localStorage.setItem("manifest", JSON.stringify(state));
      });
  }
  const storageManifest = localStorage.getItem("manifest");
  if (storageManifest) {
    manifest.value = JSON.parse(storageManifest);
    setNewManifest();
  } else {
    await setNewManifest();
  }
};

export const initUtils = () => {
  const clipboard = new ClipboardJS(".btn");
};

export const init = async () => {
  window.parent.postMessage({ action: "continueLoading" }, "*");
  initUtils();
  onResize();
  loadThemeConfig();
  onThemeChange();
  await loadImgs();
  await loadManifest();
  window.parent.postMessage({ action: "loadCompleted" }, "*");
  isLoadCompleted.value = true;
};
