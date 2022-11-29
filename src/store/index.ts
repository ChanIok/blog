import { computed, ref } from "vue";

type ILoadingBarAction = "error" | "finish" | "start" | null;

export const loadingBarAction = ref<ILoadingBarAction>(null);

export const isLoadCompleted = ref<boolean>(false);

export const windowWidth = ref<number>(0);

export const theme = ref<string>("dark");

export const currentWritingText = ref<string>("");