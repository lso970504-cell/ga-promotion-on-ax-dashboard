import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = path.resolve("outputs", "login-user-upload-sample");
const outputPath = path.join(outputDir, "login-user-upload-sample.xlsx");
const previewPath = path.join(outputDir, "login-user-upload-sample.png");

await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();

const uploadSheet = workbook.worksheets.add("권한사번업로드");
uploadSheet.showGridLines = false;

uploadSheet.getRange("A1:D1").merge();
uploadSheet.getRange("A2:D2").merge();
uploadSheet.getRange("A1:D1").values = [["권한 사번 업로드 양식"]];
uploadSheet.getRange("A2:D2").values = [["본사담당자가 관리자 섹션에서 첫 번째 시트의 사번, 이름, 권한, 조직 열을 업로드해 로그인 권한에 반영합니다."]];

uploadSheet.getRange("A4:D8").values = [
  ["사번", "이름", "권한", "조직"],
  ["10001", "김본사", "본사담당자", "본사 영업추진팀"],
  ["10002", "이승인", "본사담당자", "본사 프로모션관리팀"],
  ["20001", "박금천", "영업관리자", "금천"],
  ["30001", "최수원", "영업관리자", "수원"]
];

uploadSheet.getRange("A10:D15").values = [
  ["작성 규칙", "" , "", ""],
  ["1", "사번", "숫자 5자리", "예: 10001"],
  ["2", "이름", "담당자 이름", "한글/영문 가능"],
  ["3", "권한", "본사담당자 또는 영업관리자", "둘 중 하나로 입력"],
  ["4", "조직", "본사팀명 또는 지점명", "영업관리자는 지점 기준 권장"],
  ["5", "중복 사번", "마지막 행 기준 반영", "같은 사번이 있으면 아래 행 우선"]
];

uploadSheet.getRange("A1:D1").format = {
  fill: "#0E4BB5",
  font: { bold: true, color: "#FFFFFF", size: 16 },
  horizontalAlignment: "center",
  verticalAlignment: "center"
};
uploadSheet.getRange("A2:D2").format = {
  fill: "#EDF4FF",
  font: { color: "#17324D" },
  wrapText: true,
  horizontalAlignment: "left",
  verticalAlignment: "center"
};
uploadSheet.getRange("A4:D4").format = {
  fill: "#1F6FE5",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  borders: { preset: "all", style: "thin", color: "#C7D6EB" }
};
uploadSheet.getRange("A5:D8").format = {
  borders: { preset: "all", style: "thin", color: "#D8E2F0" },
  verticalAlignment: "center"
};
uploadSheet.getRange("A10:D10").merge();
uploadSheet.getRange("A10:D10").format = {
  fill: "#0F2747",
  font: { bold: true, color: "#FFFFFF" }
};
uploadSheet.getRange("A10:D15").format = {
  borders: { preset: "all", style: "thin", color: "#D8E2F0" },
  wrapText: true,
  verticalAlignment: "center"
};
uploadSheet.getRange("B11:D15").format = {
  fill: "#FBFDFF"
};
uploadSheet.freezePanes.freezeRows(4);
uploadSheet.getRange("A:A").format.columnWidthPx = 110;
uploadSheet.getRange("B:B").format.columnWidthPx = 140;
uploadSheet.getRange("C:C").format.columnWidthPx = 140;
uploadSheet.getRange("D:D").format.columnWidthPx = 220;
uploadSheet.getRange("2:2").format.rowHeightPx = 36;

const guideSheet = workbook.worksheets.add("작성가이드");
guideSheet.showGridLines = false;
guideSheet.getRange("A1:C1").merge();
guideSheet.getRange("A1:C1").values = [["업로드 운영 가이드"]];
guideSheet.getRange("A3:C7").values = [
  ["항목", "설명", "비고"],
  ["업로드 주체", "본사담당자만 업로드", "관리자 섹션에서 반영"],
  ["로그인 비밀번호", "사번과 동일한 5자리", "예: 사번 10001이면 비밀번호도 10001"],
  ["권한값", "본사담당자 / 영업관리자", "업로드 파일에서 두 권한을 함께 관리"],
  ["조직값", "본사팀명 또는 지점명", "영업관리자 필터 기준에 사용"]
];
guideSheet.getRange("A1:C1").format = {
  fill: "#0E4BB5",
  font: { bold: true, color: "#FFFFFF", size: 15 },
  horizontalAlignment: "center"
};
guideSheet.getRange("A3:C3").format = {
  fill: "#1F6FE5",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  borders: { preset: "all", style: "thin", color: "#C7D6EB" }
};
guideSheet.getRange("A4:C7").format = {
  borders: { preset: "all", style: "thin", color: "#D8E2F0" },
  wrapText: true,
  verticalAlignment: "center"
};
guideSheet.getRange("A:A").format.columnWidthPx = 120;
guideSheet.getRange("B:B").format.columnWidthPx = 220;
guideSheet.getRange("C:C").format.columnWidthPx = 220;

const uploadInspect = await workbook.inspect({
  kind: "table",
  range: "권한사번업로드!A4:D8",
  include: "values",
  tableMaxRows: 8,
  tableMaxCols: 4
});

if (!uploadInspect?.ndjson?.includes("본사담당자") || !uploadInspect?.ndjson?.includes("영업관리자")) {
  throw new Error("업로드 샘플 시트 검증에 실패했습니다.");
}

const preview = await workbook.render({
  sheetName: "권한사번업로드",
  range: "A1:D15",
  scale: 1.5,
  format: "png"
});
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

console.log(outputPath);
