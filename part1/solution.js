// https://adventofcode.com/2024/day/1
async function findDistance() {
  const data = await Deno.readTextFile("input.txt");
  const arr1 = [];
  const arr2 = [];
  let distance = 0;

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
      arr1.push(num1)
      arr2.push(num2)
    }

    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    for (let i = 0; i < arr1.length; i++) {
      distance += Math.abs(arr1[i] - arr2[i]);
    }

    return distance
}

const result = await findDistance();

console.log(result);
