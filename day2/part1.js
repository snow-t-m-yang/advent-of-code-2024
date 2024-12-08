async function getInput() {
  const path = new URL("./input.txt", import.meta.url);
  const data = await Deno.readTextFile(path);
  return data.split("\n").map(line => line.split(" ").map(Number));
}

function isValid(prev, curr, next, isIncr) {
  if (curr === undefined || next === undefined) return false;
  const diff = next - curr;

  if (diff === 0) return false; // No change
  const order = diff > 0; // Determine direction

  if (order === isIncr) {
    const absDiff = Math.abs(diff);
    return absDiff >= 1 && absDiff <= 3; // Check valid range
  }

  return false;
}

function isReportSafe(report) {
  const isIncr = report[1] - report[0] > 0;

  for (let i = 0; i < report.length - 1; i++) {
    const curr = report[i];
    const next = report[i + 1];

    if (!isValid(null, curr, next, isIncr)) {
      return false; // Unsafe report if any pair is invalid
    }
  }

  return true;
}

function canBeMadeSafe(report) {
  for (let i = 0; i < report.length; i++) {
    const modifiedReport = [...report];
    modifiedReport.splice(i, 1); // Remove one level

    if (isReportSafe(modifiedReport)) {
      return true; // If removing a single level makes it safe
    }
  }

  return false;
}

async function main() {
  const reports = await getInput();
  let safeReportCount = 0;

  for (const report of reports) {
    if (isReportSafe(report) || canBeMadeSafe(report)) {
      safeReportCount++;
    }
  }

  console.log("Final safe report count:", safeReportCount);
  return safeReportCount;
}

await main();