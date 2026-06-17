import assert from "node:assert/strict";
import {
  applySheetRowsToData,
  createInitialFormData
} from "./promo-template-data.mjs";

const baseData = createInitialFormData();

const mappedData = applySheetRowsToData(baseData, [
  ["상단 정보"],
  ["프로모션 날짜", "26.3월"],
  ["회사명", "삼성생명"],
  ["메인 제목", "26.3월 프로모션"],
  ["지사명", "W에셋"],
  ["사업부", "(4,5사업부)"],
  ["상단 퍼센트"],
  ["좌측 배지", "익월"],
  ["최대 퍼센트", "400%"],
  ["가운데 왼쪽 %", "100%"],
  ["빨간 라벨", ""],
  ["가운데 오른쪽 %", "100%"],
  ["첫 번째 표"],
  ["블록 제목", "기본가동시상"],
  ["행 데이터", "1~13회", "5만", "40만", "80만", "120만", "250만", "500만"],
  ["", "14~28회", "5만", "30만", "60만", "90만", "200만", "400만"],
  ["두 번째 표"],
  ["헤더들", "5만 ↑", "10만 ↑", "20만 ↑", "30만 ↑", "50만 ↑", "100만 ↑"],
  ["행 데이터", "10만", "30만", "60만", "100만", "200만", "400만"],
  ["세 번째 표"],
  ["행 데이터", "10만 ↑", "5만", "60만", "10만 ↑", "5만", "60만"],
  ["", "20만 ↑", "5만", "100만", "20만 ↑", "5만", "100만"],
  ["하단 문구"],
  ["하단 배너", "[손사 공동] 10년납 이하 50% 인정, 본인계약 제외"]
]);

assert.equal(mappedData.promoDate, "26.3월");
assert.equal(mappedData.brandName, "삼성생명");
assert.equal(mappedData.mainTitle, "26.3월 프로모션");
assert.equal(mappedData.branchName, "W에셋");
assert.equal(mappedData.branchNote, "(4,5사업부)");
assert.equal(mappedData.summaryLabel, "익월");
assert.equal(mappedData.summaryMax, "400%");
assert.equal(mappedData.section1Title, "기본가동시상");
assert.equal(
  mappedData.section1Rows,
  "1~13회|5만|40만|80만|120만|250만|500만\n14~28회|5만|30만|60만|90만|200만|400만"
);
assert.equal(mappedData.section2Headers, "5만 ↑,10만 ↑,20만 ↑,30만 ↑,50만 ↑,100만 ↑");
assert.equal(mappedData.section2Rows, "10만|30만|60만|100만|200만|400만");
assert.equal(
  mappedData.section3Rows,
  "10만 ↑,5만,60만,10만 ↑,5만,60만\n20만 ↑,5만,100만,20만 ↑,5만,100만"
);
assert.equal(mappedData.footerBanner, "[손사 공동] 10년납 이하 50% 인정, 본인계약 제외");
assert.equal(mappedData.summaryPill, "");

console.log("promo-template-data tests passed");
