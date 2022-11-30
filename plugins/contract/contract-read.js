import Arweave from "arweave";
import { readContract } from "smartweave";

const arweaveInstance = Arweave.init({
  host: "arweave.net",
  protocol: "https",
  port: 443,
});


async function getLatestState() {
  const contractIntialStateTx = "CEqK4anMjbBXYpYjZtT0pPjGNVNJ82xY0wapDb7gBMU";
  const latestState = await readContract(
    arweaveInstance,
    contractIntialStateTx
  );
  console.log(latestState);
}
getLatestState();
