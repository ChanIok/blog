import Arweave from "arweave";
import { createContract } from "smartweave";
import fs from "fs";

const arweaveInstance = Arweave.init({
  host: "arweave.net",
  protocol: "https",
  port: 443,
});

const wallet = JSON.parse(fs.readFileSync("wallet.json").toString());

async function init() {
  const contractSrcData = fs.readFileSync("plugins/contract/pointer.js");
  const initStateData = fs.readFileSync("plugins/contract/pointer.json");
  const res = await createContract(
    arweaveInstance,
    wallet,
    contractSrcData,
    initStateData
  );
  console.log(res);
}
init();
