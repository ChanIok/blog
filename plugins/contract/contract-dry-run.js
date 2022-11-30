import Arweave from "arweave";
import { interactWriteDryRun } from "smartweave";
import fs from "fs";

const arweaveInstance = Arweave.init({
  host: "arweave.net",
  protocol: "https",
  port: 443,
});

const contractId = "9EHg3xV6uH6vI_9ajNAtDySi4lsNsvDqEuoabDhPKNM";
const wallet = JSON.parse(fs.readFileSync("wallet.json").toString());

async function update() {
  const input = {
    function: "append",
    txId: "M69t7mf02yxvIsSZ6X9j3XJ02yvc85Pji28bi96_Keo",
  };

  const res = await interactWriteDryRun(
    arweaveInstance,
    wallet,
    contractId,
    input
  );
  console.log(res);
}
update();
