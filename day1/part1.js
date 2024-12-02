// https://adventofcode.com/2024/day/1
async function findDistance() {
  let distance = 0;

  const [arr1, arr2] = await createLists();

  for (let i = 0; i < arr1.length; i++) {
    distance += Math.abs(arr1[i] - arr2[i]);
  }

  return distance;
}

export async function createLists() {
  const data = await Deno.readTextFile(new URL("./input.txt", import.meta.url));

  const arr1 = [];
  const arr2 = [];

  const parseData = data
    .trim()
    .split("\n")
    .map((line) => {
      const numbers = line
        .trim()
        .split(/\s+/)
        .map(Number);

      return numbers;
    });

  for (const [num1, num2] of parseData) {
    arr1.push(num1);
    arr2.push(num2);
  }

  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);

  return [arr1, arr2];
}
const result = findDistance();

console.log(result);
