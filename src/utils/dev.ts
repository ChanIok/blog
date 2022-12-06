import { manifest } from "@/store";
import axios from "axios";
export const getWritingLocally = async (txId: string) => {
  let res = "";
  if (!manifest.value) {
    return res;
  }
  for (const path in manifest.value.paths) {
    if (manifest.value.paths[path].id == txId) {
      res = (await axios.get(`./${path}`)).data;
    }
  }
  return res;
};
