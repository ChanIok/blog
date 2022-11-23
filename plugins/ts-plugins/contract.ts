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
  console.log(latestState);
  const data = (
    await axios.get(
      `https://arweave.net/${latestState.manifest.pop()}/manifest.json`
    )
  ).data;
  return data;
};
