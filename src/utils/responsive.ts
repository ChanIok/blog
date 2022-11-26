import { windowWidth } from "@/store";

export const init = () => {
  window.onresize = () => {
    windowWidth.value =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  };
};
