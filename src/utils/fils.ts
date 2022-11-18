import { sync as globSync } from "glob";
import path from "path";
import hash from "object-hash";
import fs from "fs";

export const getFileToHash = () => {
  const resolvedBasePath = path.resolve("./output");
  const paths = globSync("**/*", { cwd: resolvedBasePath, nodir: true });
  console.log(paths);
  const fileToHash: Record<string, any> = {};
  paths.forEach((filepathTemp) => {
    fileToHash[
      hash.sha1(
        fs.readFileSync(path.resolve(resolvedBasePath, filepathTemp)).toString()
      )
    ] = filepathTemp;
  });
  console.log(fileToHash);
};
