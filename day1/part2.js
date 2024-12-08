import { createLists } from "./part1.js";

async function findSimilarity() {
  const lists = await createLists();
  let answer = 0;

  const duplicates = lists[1].reduce((duplicates, num) => {
    if (num in duplicates) {
      duplicates[num] += 1;
    } else {
      duplicates[num] = 1;
    }

    return duplicates;
  }, {});

  for (const [k, v] of Object.entries(duplicates)) {
    const intKey = Number(k);
    if (lists[0].includes(intKey)) {
      answer += intKey * v;
    }
  }

  return answer;
}

await findSimilarity();
