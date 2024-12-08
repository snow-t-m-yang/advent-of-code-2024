// get inputdata
async function getInput() {
  // const path = new URL("./input.txt", import.meta.url);
  const path = new URL("./input.txt", import.meta.url);
  const data = await Deno.readTextFile(path);

  return data.split("\n");
}

function isValid(prev, curr, next, isIncr) {
  const diff = next === undefined ? prev - curr : curr - next;
  if (diff === 0) return false;

  const order = diff > 0 ? false : true;
  // console.log("order", order);
  // console.log("diff", diff);
  if (order === isIncr) {
    const absDiff = Math.abs(diff);
    // console.log("absDiff", absDiff);
    if (absDiff > 0 && absDiff <= 3) {
      return true;
    }
  }

  return false;
}

async function main() {
  let safeReport = 0;
  const reports = await getInput();

  for (const report of reports) {
    let safeLevel = 0;
    const seperatedReport = report.split(" ");
    const isIncr = seperatedReport[0] - seperatedReport[1] < 0;

    for (let i = 0; i < seperatedReport.length; i++) {
      // check if valid
      const curr = seperatedReport[i];
      const next = i + 1 < seperatedReport.length ? seperatedReport[i + 1] : undefined;
      const prev = i > 0 ? seperatedReport[i - 1] : null;

      if (isValid(prev, curr, next, isIncr)) {
        safeLevel += 1;
        // console.log("safeLevel", safeLevel, seperatedReport.length);
      } else {
        // possibleUnsafeLevels.push(i, i + 1);
        // check if prev and next can be remove?
        let prev = i === 0 ? null : i - 1;
        let curr = i;
        let next = i + 1;
        let mayBeRemove = [prev, curr, next];
        const report = [...seperatedReport];

        for (const idx of mayBeRemove) {
          safeLevel = 0;
          const modifiedReport = [...report];
          modifiedReport.splice(idx, 1);

          for (let i = 0; i < modifiedReport.length; i++) {
            // check if valid
            const curr = modifiedReport[i];
            const next = modifiedReport[i + 1];
            const prev = i === 0 ? null : modifiedReport[i - 1];

            if (isValid(prev, curr, next, isIncr)) {
              safeLevel += 1;
              console.log(safeLevel);
            }
          }
          
          if (
            safeLevel === seperatedReport.length - 1
          ) {
            safeReport += 1;
            break;
          }
        }
      }
    }

    if (
      safeLevel === seperatedReport.length
    ) {
      safeReport += 1;
      console.log("safeReport:", safeReport);
    }
  }
  console.log("final safe report", safeReport);
  return safeReport;
}

await main();
