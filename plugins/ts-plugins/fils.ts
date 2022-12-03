import { sync as globSync } from "glob";
import path from "path";
import hash from "object-hash";
import fs from "fs";
import Bundlr from "@bundlr-network/client";
import axios from "axios";

const jwk = JSON.parse(fs.readFileSync("wallet.json").toString());
const bundlr = new Bundlr("http://node1.bundlr.network", "arweave", jwk);

export const getFileToHash = (filesPath: string) => {
  const resolvedBasePath = path.resolve(filesPath);
  const paths = globSync("**/*", { cwd: resolvedBasePath, nodir: true });
  const fileToHash: Record<string, any> = {};
  paths.forEach((filepathTemp) => {
    fileToHash[filepathTemp] = hash.sha1(
      fs.readFileSync(path.resolve(resolvedBasePath, filepathTemp)).toString()
    );
  });
  console.log(fileToHash);
};

export const CNEncode = (str: string) => {
  str.match(/[\u4E00-\u9FA5]/g)?.forEach((t) => {
    str = str.replace(t, encodeURIComponent(t));
  });
  str = str.replace(/%/g, "$");
  return str;
};

export const differentialUpload = async (
  filesPath: string,
  latestManifest: Record<string, any>
) => {
  const resolvedBasePath = path.resolve(filesPath);
  console.log(resolvedBasePath);
  const paths = globSync("**/*", { cwd: resolvedBasePath, nodir: true });
  let manifest: Record<string, any> = {
    manifest: "arweave/paths",
    version: "0.1.0",
    index: {
      path: "index.html",
    },
    paths: {},
  };
  // 文件哈希到文件路径
  let hashToPath: Record<string, any> = {};
  for (const key in latestManifest.paths) {
    hashToPath[latestManifest.paths[key].hash] = {
      path: key,
      id: latestManifest.paths[key].id,
    };
  }
  // 循环，逐个上传
  for (const item of paths) {
    if (item == "manifest.json") {
      continue;
    }
    const itemHash = hash.sha1(
      fs.readFileSync(path.resolve(resolvedBasePath, item)).toString()
    );
    // 清单中，如果文件内容无更改
    if (itemHash in hashToPath) {
      manifest.paths[item] = {
        id: hashToPath[itemHash].id,
        hash: itemHash,
      };
      // 否则重新上传
    } else {
      const res = await bundlr.uploadFile(path.resolve(resolvedBasePath, item));
      if (res.id == undefined) {
        throw `upload file failed:${item}`;
      }
      console.log(`uploaded file:${item}`);
      manifest.paths[item] = {
        id: res.id,
        hash: hash.sha1(
          fs.readFileSync(path.resolve(resolvedBasePath, item)).toString()
        ),
      };
    }
  }
  // 上传原始清单数据
  let manifestContent = JSON.stringify(manifest);
  fs.writeFileSync("./dist/manifest.json", manifestContent);
  await bundlr.uploadFile("./dist/manifest.json").then((res) => {
    manifest.paths["manifest.json"] = {
      id: res.id,
      hash: hash.sha1(fs.readFileSync("./dist/manifest.json").toString()),
    };
  });
  // 上传最终清单
  manifestContent = JSON.stringify(manifest);
  const res = await bundlr.upload(manifestContent, {
    tags: [
      { name: "Content-type", value: "application/x.arweave-manifest+json" },
      { name: "App-Name", value: "PlaneOfEuthymia" },
    ],
  });
  if (res.id == undefined) {
    throw `upload manifest failed`;
  }
  console.log(`upload complete:${res.id}`);
};

const getLatestManifest = async (id: string) => {
  const data = (await axios.get(`https://arweave.net/${id}/manifest.json`))
    .data;
  return data;
};

const a = async () => {
  differentialUpload(
    "./dist",
    await getLatestManifest("K0WzERSDJn8fK0IZOJqa-b9vn7bdk53AuPCpfYwTwdI")
  );
};
a();
