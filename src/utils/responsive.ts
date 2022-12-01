import { windowWidth, isDark, isLoadCompleted } from "@/store";
import { watch } from "vue";

import Liyue from "@/assets/Liyue_1.jpg";
import Venti from "@/assets/Venti.jpg";
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

const loadImg = async () => {
  return await Promise.all(
    imgArr.map((path) => {
      new Promise((resolve) => {
        const image = new Image();
        image.src = path;
        image.onload = () => resolve(image);
      });
    })
  );
};

export const init = async () => {
  onResize();
  loadThemeConfig();
  onThemeChange();
  await loadImg();
  isLoadCompleted.value = true;
};
