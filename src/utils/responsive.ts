import { windowWidth, theme } from "@/store";
import { watch } from "vue";

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
  } else {
    theme.value = storageTheme;
  }
};
const onThemeChange = () => {
  watch(
    () => theme.value,
    (value) => {
      localStorage.setItem("theme", value);
    }
  );
};
export const init = () => {
  onResize();
  loadThemeConfig();
  onThemeChange();
};
