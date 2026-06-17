import XLSX from "xlsx";

function normalizeText(value) {
  return String(value ?? "")
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildRecord(row, rowNumber, sheetName) {
  return {
    sheetName,
    rowNumber,
    branchAssigned: normalizeText(row[1]),
    registrationCode: normalizeText(row[2]),
    internalCode: normalizeText(row[3]),
    gaName: normalizeText(row[4]),
    pureType: normalizeText(row[5]),
    happyType: normalizeText(row[6]),
    finalConfirm: normalizeText(row[7]),
    happyFiveYearNextMonth: normalizeText(row[8]),
    happySevenYearNextMonth: normalizeText(row[9]),
    plusOneNextMonth: normalizeText(row[10]),
    plusOne13th: normalizeText(row[11]),
    cancerNextMonth: normalizeText(row[12]),
    cancer13th: normalizeText(row[13]),
    pureNextMonthBase: normalizeText(row[14]),
    agencyAdvance: normalizeText(row[15]),
    branchManager: normalizeText(row[16]),
    baseOperationPromo: normalizeText(row[17]),
    marketingLinked: normalizeText(row[18]),
    bridgeMayJune: normalizeText(row[19]),
    bridgeJuneJuly: normalizeText(row[20]),
    bridgeJuneAugust: normalizeText(row[21]),
    agencyExtraReward: normalizeText(row[22]),
    preferredPlanReward: normalizeText(row[23]),
    managingBranch: normalizeText(row[24]),
    promoManager: normalizeText(row[25]),
    branchCount: normalizeText(row[26]),
    divisionCount: normalizeText(row[27])
  };
}

function main() {
  const [, , workbookPath, gaQuery = "GA"] = process.argv;

  if (!workbookPath) {
    console.error("Usage: node extract-second-sheet-data.mjs <xlsx-path> [ga-name]");
    process.exit(1);
  }

  const workbook = XLSX.readFile(workbookPath);
  const sheetName = workbook.SheetNames[1];

  if (!sheetName) {
    console.error("Second sheet was not found.");
    process.exit(1);
  }

  const worksheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: false,
    defval: ""
  });

  const normalizedQuery = normalizeText(gaQuery);
  const matches = [];

  rows.forEach((row, index) => {
    const gaName = normalizeText(row[4]);
    if (!gaName) return;
    if (gaName.includes(normalizedQuery)) {
      matches.push(buildRecord(row, index + 1, sheetName));
    }
  });

  const result = {
    workbookPath,
    query: gaQuery,
    matchCount: matches.length,
    matches
  };

  process.stdout.write(JSON.stringify(result, null, 2));
}

main();
