import { ref } from "vue";

type ILoadingBarAction = "error" | "finish" | "start" | null;

export const loadingBarAction = ref<ILoadingBarAction>(null);
