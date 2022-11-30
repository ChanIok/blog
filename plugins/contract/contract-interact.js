import Arweave from "arweave";
import { interactWrite } from "smartweave";
import fs from "fs";

const arweaveInstance = Arweave.init({
  host: "arweave.net",
  protocol: "https",
  port: 443,
});

const contractId = "2U87-PZeqem0ONKExBVk-Vxwwjondwiei8b6Zwafzpo";
const wallet = JSON.parse(fs.readFileSync("wallet.json").toString());

async function update() {
  const input = {
    function: "update",
    txIds: [
      "M69t7mf02yxvIsSZ6X9j3XJ02yvc85Pji28bi96_Keo",
      "9_3pl0jk-WKaUpAVcqT0xKeYOO40Ew8qpoRfgN7Qpm4",
      "THkAf72grA04Mt6Lsi0IU8vCAlL4Zrd8oansWO3uxK0",
      "iQ7hWjcYJid8PdY-zXwOpsa1qB6K5aIi52QMp5H7rAg"
    ],
  };

  const res = await interactWrite(arweaveInstance, wallet, contractId, input);
  console.log(res);
}
update();
