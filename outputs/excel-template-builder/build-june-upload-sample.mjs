import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const outputDir = path.resolve("outputs", "ga-promotion-template");
const outputPath = path.join(outputDir, "6월_프로모션_입력샘플_20260617.xlsx");

fs.mkdirSync(outputDir, { recursive: true });

function makeSheet(data, widths = []) {
  const sheet = XLSX.utils.aoa_to_sheet(data);
  if (widths.length) {
    sheet["!cols"] = widths.map((wch) => ({ wch }));
  }
  return sheet;
}

const workbook = XLSX.utils.book_new();

const guideRows = [
  ["GA 프로모션 업로드 샘플"],
  ["이 파일은 관리자 업로드용 샘플입니다. 2번째 시트는 프로모션입력, 3번째 시트는 데이터, 4번째 시트는 유의사항입력, 5번째 시트는 조직 기준으로 사용합니다."],
  [],
  ["시트", "설명"],
  ["1. 안내", "파일 사용 안내"],
  ["2. 프로모션입력", "기준월, 대상상품, 블록명을 입력합니다."],
  ["3. 데이터", "전체 대리점 반영용 데이터입니다. 샘플은 1행만 넣었습니다."],
  ["4. 유의사항입력", "안내장 하단 문구를 1~3줄 입력합니다."],
  ["5. 조직", "지점명과 지역단명을 매칭합니다."],
  ["확정 기준", "데이터 시트 왼쪽 첫 열의 최종확정 여부를 ○ / X 로 입력합니다."]
];
const guideSheet = makeSheet(guideRows, [22, 70]);
guideSheet["!merges"] = [
  XLSX.utils.decode_range("A1:B1"),
  XLSX.utils.decode_range("A2:B2")
];
XLSX.utils.book_append_sheet(workbook, guideSheet, "안내");

const inputRows = [
  ["프로모션입력"],
  [],
  ["항목", "값"],
  ["기준월", "2026.06"],
  ["대상상품", "행복종신/플러스원/암치료비플러스/순수3종"],
  ["시상기간", "6/1 ~ 6/28"],
  ["블록1", "정규시상"],
  ["블록2", "기본가동프로모션"],
  ["블록3", "5~6월 브릿지"],
  ["블록4", "6~7월 브릿지"],
  ["블록5", "Gold 시상"],
  [],
  ["입력 안내", "설명"],
  ["1", "왼쪽 항목은 그대로 두고 오른쪽 값만 바꾸면 됩니다."],
  ["2", "월은 2026.06 형식으로 입력합니다."],
  ["3", "블록은 필요한 만큼 아래로 추가할 수 있습니다."],
  ["4", "항목이 없으면 비워두기"]
];
const inputSheet = makeSheet(inputRows, [20, 72]);
inputSheet["!merges"] = [XLSX.utils.decode_range("A1:B1")];
XLSX.utils.book_append_sheet(workbook, inputSheet, "프로모션입력");

const dataRows = [
  ["데이터 시트"],
  ["최종확정 여부", "코드", "GA명", "지점명", "정규시상", "기본가동프로모션", "5~6월 브릿지", "6~7월 브릿지", "Gold 시상", "비고"],
  ["○", "GA001", "코리아", "강북직할", "500%", "최대 500%", "최대 450%", "5만 / 60만 / 100만 / 150만 / 250만", "GOLD 2돈", "샘플 1행"]
];
const dataSheet = makeSheet(dataRows, [14, 12, 16, 16, 16, 20, 16, 28, 14, 16]);
dataSheet["!merges"] = [XLSX.utils.decode_range("A1:J1")];
XLSX.utils.book_append_sheet(workbook, dataSheet, "데이터");

const noticeRows = [
  ["유의사항입력"],
  [],
  ["항목", "문구"],
  ["유의사항1", "세부 지급기준 및 적용조건은 본사 최종 공지 기준으로 운영됩니다."],
  ["유의사항2", "프로모션별 중복 적용 여부는 항목별 기준을 확인해 주세요."],
  ["유의사항3", "최종 확정 전 안내장은 변경될 수 있습니다."]
];
const noticeSheet = makeSheet(noticeRows, [20, 78]);
noticeSheet["!merges"] = [XLSX.utils.decode_range("A1:B1")];
XLSX.utils.book_append_sheet(workbook, noticeSheet, "유의사항입력");

const orgRows = [
  ["조직 시트"],
  ["지점명", "지역단명", "메모"],
  ["강북직할", "강북지역단", "지점 기준으로 지역단을 자동 매핑합니다."]
];
const orgSheet = makeSheet(orgRows, [18, 18, 40]);
orgSheet["!merges"] = [XLSX.utils.decode_range("A1:C1")];
XLSX.utils.book_append_sheet(workbook, orgSheet, "조직");

XLSX.writeFile(workbook, outputPath);
console.log(outputPath);
