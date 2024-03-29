import { isDark, manifest } from '@/store';
import { getLatestManifestId, getLatestState } from './artools';
import { Liyue } from '@/assets';
import { Venti } from '@/assets';
const imgArr = [Liyue];
const imgArrAsync = [Venti];

export const loadThemeConfig = () => {
  const storageTheme = localStorage.getItem('theme');
  if (storageTheme == undefined || storageTheme == null) {
    localStorage.setItem('theme', 'dark');
  } else if (storageTheme == 'dark') {
    isDark.value = true;
  } else {
    isDark.value = false;
  }
};

export const loadImgs = async () => {
  imgArrAsync.map((path) => {
    const image = new Image();
    image.src = path;
  });
  return await Promise.all(
    imgArr.map((path) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = path;
        image.onload = () => resolve(image);
      });
    }),
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
        localStorage.setItem('manifest', JSON.stringify(state));
      });
  }
  const storageManifest = localStorage.getItem('manifest');
  if (storageManifest) {
    manifest.value = JSON.parse(storageManifest);
    setNewManifest();
  } else {
    await setNewManifest();
  }
};
