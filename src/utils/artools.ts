import axios from "axios";
import { nextTick, h } from "vue";
import { loadManifest } from "./common";
import { NEllipsis } from "naive-ui";
import { manifest } from "@/store";

export const getLatestManifestId = async () => {
  const graphql = {
    query:
      "query getTransactions($ids: [ID!], $owners: [String!], $recipients: [String!], $tags: [TagFilter!], $bundledIn: [ID!], $block: BlockFilter, $first: Int = 10, $after: String, $sort: SortOrder = HEIGHT_DESC) {\n  transactions(\n    ids: $ids\n    owners: $owners\n    recipients: $recipients\n    tags: $tags\n    bundledIn: $bundledIn\n    block: $block\n    first: $first\n    after: $after\n    sort: $sort\n  ) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        id\n        block {\n          height\n          id\n          timestamp\n        }\n        recipient\n        owner {\n          address\n          key\n        }\n        fee {\n          winston\n          ar\n        }\n        quantity {\n          winston\n          ar\n        }\n        tags {\n          name\n          value\n        }\n        data {\n          size\n          type\n        }\n        bundledIn {\n          id\n        }\n      }\n    }\n  }\n}\n",
    variables: {
      owners: ["LGphzQz7HJd9E8i2UpzzYK_V6azt1wAZDTJ8iNllka0"],
      tags: [
        {
          name: "App-Name",
          values: ["PlaneOfEuthymia"],
        },
      ],
      first: 10,
    },
    operationName: "getTransactions",
  };
  return (await axios.post("https://arweave.net/graphql", graphql)).data.data
    .transactions.edges[0].node.id;
};

export const getLatestState = async (txId: string) => {
  return (await axios.get(`https://arweave.net/${txId}/manifest.json`)).data;
};

export const getWritingsList = async () => {
  if (!manifest.value) {
    await loadManifest();
  }
  const paths = manifest.value?.paths;
  const catalogue: any[] = [];
  const writingList: any[] = [];
  for (const key in paths) {
    if (key.indexOf("writings/") != 0) {
      continue;
    }
    if (key.indexOf("writings/attachments") == 0) {
      continue;
    }
    await nextTick();
    const keys = key.split("/");
    keys.shift();
    keys.reduce((pre, cur, i) => {
      if (i === keys.length - 1) {
        pre.push({
          label: () =>
            h(NEllipsis, null, {
              default: () => keys[keys.length - 1],
            }),
          key,
        });
        return pre;
      }
      for (const index in pre) {
        if (pre[index].key == cur) {
          return pre[index].children;
        }
      }
      pre.push({
        label: () => h(NEllipsis, null, { default: () => cur }),
        key: cur,
        children: [],
      });
      return pre[pre.length - 1].children;
    }, catalogue);
  }
  for (const key in catalogue) {
    writingList.push(catalogue[key]);
  }
  writingList.sort();
  return writingList;
};
