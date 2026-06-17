import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const rootDir = "C:/Users/user/Documents/코덱스_day6";
const outputDir = path.join(rootDir, "outputs", "ga-promotion-template");
const workbookPath = path.join(outputDir, "GA_프로모션_입력표준_샘플.xlsx");

const colors = {
  navy: "#0F4C81",
  sky: "#4FA8F7",
  skyLight: "#EAF6FF",
  yellow: "#FFE45C",
  green: "#E9F8EE",
  line: "#B7D8F5",
  white: "#FFFFFF",
  grayText: "#5B6875"
};

function setHeader(range, fill = colors.navy, fontColor = colors.white) {
  range.format = {
    fill,
    font: { bold: true, color: fontColor, size: 11 },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    borders: { preset: "all", style: "thin", color: colors.line }
  };
}

function setCellBox(range, fill = colors.white) {
  range.format = {
    fill,
    font: { color: "#1F2D3D", size: 10 },
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "all", style: "thin", color: colors.line }
  };
}

function applyWidths(sheet) {
  sheet.getRange("A:A").format.columnWidthPx = 170;
  sheet.getRange("B:B").format.columnWidthPx = 320;
  sheet.getRange("C:C").format.columnWidthPx = 120;
  sheet.getRange("D:D").format.columnWidthPx = 170;
  sheet.getRange("E:E").format.columnWidthPx = 210;
  sheet.getRange("F:F").format.columnWidthPx = 190;
  sheet.getRange("G:G").format.columnWidthPx = 250;
  sheet.getRange("H:H").format.columnWidthPx = 90;
}

const workbook = Workbook.create();

const guide = workbook.worksheets.add("안내");
guide.showGridLines = false;
guide.freezePanes.freezeRows(3);
guide.getRange("A1:G1").merge();
guide.getRange("A1").values = [["GA 프로모션 입력 표준 샘플"]];
guide.getRange("A1").format = {
  fill: colors.sky,
  font: { bold: true, color: colors.white, size: 18 },
  horizontalAlignment: "center",
  verticalAlignment: "center"
};
guide.getRange("A2:G2").merge();
guide.getRange("A2").values = [["이 파일은 관리자 업로드용 표준 샘플입니다. 시스템은 두번째 시트와 세번째 유의사항 시트를 읽습니다."]];
guide.getRange("A2").format = {
  fill: colors.skyLight,
  font: { color: colors.navy, size: 11 },
  horizontalAlignment: "left",
  verticalAlignment: "center",
  wrapText: true
};

guide.getRange("A4:B10").values = [
  ["구분", "설명"],
  ["1번 시트", "안내용 시트입니다. 시스템에서 읽지 않습니다."],
  ["2번 시트", "프로모션입력 시트입니다. 기준월, 대상상품, 시상기간, 블록명, Gold 입력값을 관리합니다."],
  ["3번 시트", "유의사항입력 시트입니다. 안내장 하단 문구 1~3줄을 관리합니다."],
  ["기준월", "2026.06 형식으로 입력하면 제목은 26.6월 프로모션으로 자동 변경됩니다."],
  ["블록명", "정규시상, 기본가동프로모션, 5~6월 브릿지, 6~7월 브릿지, Gold 시상처럼 실제 이름 그대로 입력합니다."],
  ["Gold 시상", "Gold사용여부가 Y일 때만 안내장에 표시됩니다."]
];
setHeader(guide.getRange("A4:B4"), colors.navy);
setCellBox(guide.getRange("A5:B10"), colors.white);
guide.getRange("A12:B16").values = [
  ["운영 순서", "설명"],
  ["1. 업로드", "관리자가 파일 업로드"],
  ["2. 반영", "두번째 시트와 세번째 시트 값 읽기"],
  ["3. 미리보기", "표준안내장 시안 생성"],
  ["4. 전체 승인", "확정 후 다운로드 허용"]
];
setHeader(guide.getRange("A12:B12"), colors.sky, colors.navy);
setCellBox(guide.getRange("A13:B16"), colors.skyLight);
guide.getRange("A:G").format.columnWidthPx = 150;
guide.getRange("B:B").format.columnWidthPx = 420;

const input = workbook.worksheets.add("프로모션입력");
input.showGridLines = false;
input.freezePanes.freezeRows(10);
applyWidths(input);

input.getRange("A1:G1").merge();
input.getRange("A1").values = [["두번째 시트 입력영역"]];
input.getRange("A1").format = {
  fill: colors.sky,
  font: { bold: true, color: colors.white, size: 16 },
  horizontalAlignment: "center",
  verticalAlignment: "center"
};

input.getRange("A3:B9").values = [
  ["항목", "값"],
  ["기준월", "2026.06"],
  ["대상상품", "행복종신/플러스원/암치료비플러스/순수3종"],
  ["시상기간", "6/1 ~ 6/28"],
  ["GA명", "GA코리아"],
  ["지점명", "강북직할"],
  ["프로모션 담당", "(RM)_김진수"]
];
setHeader(input.getRange("A3:B3"), colors.navy);
setCellBox(input.getRange("A4:B9"), colors.white);

input.getRange("D3:G8").values = [
  ["안내", "설명", "", ""],
  ["제목 생성", "기준월 값으로 26.6월 프로모션 생성", "", ""],
  ["대상상품 표시", "상단 보조문구로 그대로 반영", "", ""],
  ["블록명 규칙", "실제 블록명을 그대로 사용", "", ""],
  ["적용여부 블록", "사용하지 않음", "", ""],
  ["색상 방향", "비비드한 하늘색 + 삼성 블루 포인트", "", ""]
];
setHeader(input.getRange("D3:E3"), colors.sky, colors.navy);
input.getRange("D3:E3").merge(true);
setCellBox(input.getRange("D4:E8"), colors.skyLight);

input.getRange("A11:G11").merge();
input.getRange("A11").values = [["블록 인식 기준"]];
input.getRange("A11").format = {
  fill: colors.sky,
  font: { bold: true, color: colors.white, size: 13 },
  horizontalAlignment: "left",
  verticalAlignment: "center"
};

input.getRange("A12:G18").values = [
  ["순서", "블록명", "사용여부", "표시제목", "회차", "기간", "비고"],
  [1, "정규시상", "Y", "정규시상", "", "6/1 ~ 6/28", "상단 띠 영역"],
  [2, "기본가동프로모션", "Y", "기본가동프로모션", "13회", "", "표 블록 1"],
  [3, "5~6월 브릿지", "Y", "5~6월 브릿지", "13회", "", "표 블록 2"],
  [4, "6~7월 브릿지", "Y", "6~7월 브릿지", "13회", "", "표 블록 3"],
  [5, "Gold 시상", "Y", "Gold 시상", "13회", "", "표 블록 4"],
  [6, "추가 블록 예시", "", "", "", "", "필요시 행 추가"]
];
setHeader(input.getRange("A12:G12"), colors.navy);
setCellBox(input.getRange("A13:G18"), colors.white);

input.getRange("A20:G20").merge();
input.getRange("A20").values = [["Gold 시상 입력 예시"]];
input.getRange("A20").format = {
  fill: colors.yellow,
  font: { bold: true, color: colors.navy, size: 13 },
  horizontalAlignment: "left",
  verticalAlignment: "center"
};

input.getRange("A21:B26").values = [
  ["항목", "값"],
  ["Gold사용여부", "Y"],
  ["Gold제목", "Gold 시상"],
  ["Gold강조문구", "GOLD 2돈"],
  ["Gold회차", "13회"],
  ["Gold비고", "없으면 빈칸 가능"]
];
setHeader(input.getRange("A21:B21"), colors.navy);
setCellBox(input.getRange("A22:B26"), colors.white);

input.getRange("D21:H24").values = [
  ["구분", "달성기준", "12월", "1월", "2월"],
  ["①", "", "10만", "10만", "10만"],
  ["②", "", "1만", "15만", "15만"],
  ["비고", "필요 시 행 추가", "", "", ""]
];
setHeader(input.getRange("D21:H21"), colors.navy);
setCellBox(input.getRange("D22:H24"), colors.white);

input.getRange("A28:G32").values = [
  ["입력 원칙", "설명", "", "", "", "", ""],
  ["1", "Gold 시상이 있는 달에는 Gold사용여부를 Y로 입력", "", "", "", "", ""],
  ["2", "Gold 시상이 없는 달에는 Gold사용여부를 N 또는 빈칸으로 입력", "", "", "", "", ""],
  ["3", "Gold 표 값은 달성기준/월별 값 기준으로 행 추가 가능", "", "", "", "", ""],
  ["4", "블록명은 반드시 Gold 시상처럼 실제 사용 이름으로 입력", "", "", "", "", ""]
];
setHeader(input.getRange("A28:B28"), colors.sky, colors.navy);
input.getRange("A28:G28").merge(false);
setCellBox(input.getRange("A29:B32"), colors.green);

const notice = workbook.worksheets.add("유의사항입력");
notice.showGridLines = false;
notice.freezePanes.freezeRows(3);
notice.getRange("A1:C1").merge();
notice.getRange("A1").values = [["세번째 시트 유의사항 입력영역"]];
notice.getRange("A1").format = {
  fill: colors.sky,
  font: { bold: true, color: colors.white, size: 16 },
  horizontalAlignment: "center",
  verticalAlignment: "center"
};
notice.getRange("A3:B6").values = [
  ["항목", "문구"],
  ["유의사항1", "세부 지급기준 및 적용조건은 본사 최종 공지 기준으로 운영됩니다."],
  ["유의사항2", "프로모션별 중복 적용 여부는 항목별 기준을 확인해 주세요."],
  ["유의사항3", "최종 확정 전 안내장은 변경될 수 있습니다."]
];
setHeader(notice.getRange("A3:B3"), colors.navy);
setCellBox(notice.getRange("A4:B6"), colors.white);
notice.getRange("A8:B11").values = [
  ["입력 규칙", "설명"],
  ["1", "유의사항은 1줄씩 나누어 입력합니다."],
  ["2", "없는 줄은 비워둘 수 있습니다."],
  ["3", "안내장 하단에는 최대 3줄 우선 노출됩니다."]
];
setHeader(notice.getRange("A8:B8"), colors.sky, colors.navy);
setCellBox(notice.getRange("A9:B11"), colors.skyLight);
notice.getRange("A:A").format.columnWidthPx = 150;
notice.getRange("B:B").format.columnWidthPx = 520;

for (const sheet of workbook.worksheets.items) {
  const used = sheet.getUsedRange();
  used.format.rowHeightPx = 28;
}
guide.getRange("A1:G2").format.rowHeightPx = 32;
input.getRange("A1:G1").format.rowHeightPx = 34;
input.getRange("A11:G11").format.rowHeightPx = 30;
input.getRange("A20:G20").format.rowHeightPx = 30;
input.getRange("D4:E8").format.rowHeightPx = 40;
input.getRange("A28:B32").format.rowHeightPx = 34;
notice.getRange("A1:C1").format.rowHeightPx = 34;

await fs.mkdir(outputDir, { recursive: true });

const inspect = await workbook.inspect({
  kind: "workbook,sheet,table",
  maxChars: 5000,
  tableMaxRows: 8,
  tableMaxCols: 8
});
await fs.writeFile(path.join(outputDir, "inspect.txt"), inspect.ndjson, "utf8");

for (const sheetName of ["안내", "프로모션입력", "유의사항입력"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1.4, format: "png" });
  await fs.writeFile(path.join(outputDir, `${sheetName}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(workbookPath);

console.log(JSON.stringify({ workbookPath }, null, 2));
