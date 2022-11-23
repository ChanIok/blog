import Arweave from "arweave";
import { readContract } from "smartweave";
import axios from "axios";

const arweaveInstance = Arweave.init({
  host: "arweave.net",
  protocol: "https",
  port: 443,
});

export const getLatestState = async (txId: string) => {
  const contractIntialStateTx = txId;
  const latestState = await readContract(
    arweaveInstance,
    contractIntialStateTx
  );
  const id = latestState.manifest.pop();
  const data = (await axios.get(`https://arweave.net/${id}/manifest.json`))
    .data;
  return data;
};
