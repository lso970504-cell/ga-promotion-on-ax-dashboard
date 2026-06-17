import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const rootDir = "C:/Users/user/Documents/코덱스_day6";
const outputDir = path.join(rootDir, "outputs", "ga-promotion-template");
const workbookPath = path.join(outputDir, "GA_프로모션_입력표준_쉬운버전.xlsx");

const colors = {
  navy: "#0F4C81",
  sky: "#4FA8F7",
  skyLight: "#EAF6FF",
  white: "#FFFFFF",
  line: "#B7D8F5"
};

function header(range, fill = colors.navy, color = colors.white, size = 12) {
  range.format = {
    fill,
    font: { bold: true, color, size },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    borders: { preset: "all", style: "thin", color: colors.line }
  };
}

function box(range, fill = colors.white) {
  range.format = {
    fill,
    font: { color: "#203040", size: 11 },
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "all", style: "thin", color: colors.line }
  };
}

const workbook = Workbook.create();

const guide = workbook.worksheets.add("안내");
guide.showGridLines = false;
guide.getRange("A1:B1").merge();
guide.getRange("A1").values = [["GA 프로모션 입력 쉬운 버전"]];
guide.getRange("A1").format = {
  fill: colors.sky,
  font: { bold: true, color: colors.white, size: 18 },
  horizontalAlignment: "center",
  verticalAlignment: "center"
};
guide.getRange("A3:B11").values = [
  ["구분", "설명"],
  ["2번째 시트", "제목과 블록 이름만 입력합니다."],
  ["3번째 시트", "유의사항만 입력합니다."],
  ["기준월", "예: 2026.06"],
  ["대상상품", "예: 행복종신/플러스원/암치료비플러스/순수3종"],
  ["시상기간", "예: 6/1 ~ 6/28"],
  ["블록1~블록5", "정규시상, 기본가동프로모션처럼 이름만 적습니다."],
  ["Gold 시상", "필요한 달만 블록5에 Gold 시상 입력"],
  ["유의사항", "3번째 시트에 1줄씩 입력"]
];
header(guide.getRange("A3:B3"));
box(guide.getRange("A4:B11"));
guide.getRange("A:A").format.columnWidthPx = 180;
guide.getRange("B:B").format.columnWidthPx = 470;

const input = workbook.worksheets.add("프로모션입력");
input.showGridLines = false;
input.getRange("A1:B1").merge();
input.getRange("A1").values = [["2번째 시트 입력"]];
input.getRange("A1").format = {
  fill: colors.sky,
  font: { bold: true, color: colors.white, size: 18 },
  horizontalAlignment: "center",
  verticalAlignment: "center"
};

input.getRange("A3:B11").values = [
  ["항목", "값"],
  ["기준월", "2026.06"],
  ["대상상품", "행복종신/플러스원/암치료비플러스/순수3종"],
  ["시상기간", "6/1 ~ 6/28"],
  ["블록1", "정규시상"],
  ["블록2", "기본가동프로모션"],
  ["블록3", "5~6월 브릿지"],
  ["블록4", "6~7월 브릿지"],
  ["블록5", "Gold 시상"]
];
header(input.getRange("A3:B3"));
box(input.getRange("A4:B11"));

input.getRange("A13:B17").values = [
  ["입력 방법", "설명"],
  ["1", "왼쪽 항목은 그대로 두고 오른쪽 값만 바꾸면 됩니다."],
  ["2", "블록이 없으면 B칸을 비워두면 됩니다."],
  ["3", "새 블록이 생기면 아래 줄에 블록6, 블록7처럼 추가하면 됩니다."],
  ["4", "Gold 시상이 없으면 블록5를 비워두면 됩니다."]
];
header(input.getRange("A13:B13"), colors.sky, colors.navy);
box(input.getRange("A14:B17"), colors.skyLight);
input.getRange("A:A").format.columnWidthPx = 180;
input.getRange("B:B").format.columnWidthPx = 520;

const notice = workbook.worksheets.add("유의사항입력");
notice.showGridLines = false;
notice.getRange("A1:B1").merge();
notice.getRange("A1").values = [["3번째 시트 유의사항 입력"]];
notice.getRange("A1").format = {
  fill: colors.sky,
  font: { bold: true, color: colors.white, size: 18 },
  horizontalAlignment: "center",
  verticalAlignment: "center"
};
notice.getRange("A3:B6").values = [
  ["항목", "문구"],
  ["유의사항1", "세부 지급기준 및 적용조건은 본사 최종 공지 기준으로 운영됩니다."],
  ["유의사항2", "프로모션별 중복 적용 여부는 항목별 기준을 확인해 주세요."],
  ["유의사항3", "최종 확정 전 안내장은 변경될 수 있습니다."]
];
header(notice.getRange("A3:B3"));
box(notice.getRange("A4:B6"));
notice.getRange("A8:B10").values = [
  ["입력 방법", "설명"],
  ["1", "문구는 1줄씩 적습니다."],
  ["2", "없는 문구는 비워둘 수 있습니다."]
];
header(notice.getRange("A8:B8"), colors.sky, colors.navy);
box(notice.getRange("A9:B10"), colors.skyLight);
notice.getRange("A:A").format.columnWidthPx = 180;
notice.getRange("B:B").format.columnWidthPx = 560;

for (const sheet of workbook.worksheets.items) {
  const used = sheet.getUsedRange();
  used.format.rowHeightPx = 30;
}

await fs.mkdir(outputDir, { recursive: true });

for (const sheetName of ["프로모션입력", "유의사항입력"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1.4, format: "png" });
  await fs.writeFile(path.join(outputDir, `${sheetName}-쉬운버전.png`), new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(workbookPath);

console.log(JSON.stringify({ workbookPath }, null, 2));
