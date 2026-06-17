export const formIds = [
  "promoDate",
  "brandName",
  "mainTitle",
  "subTitle",
  "branchName",
  "branchNote",
  "summaryLabel",
  "summaryMax",
  "summaryTitle",
  "summaryLeft",
  "summaryPill",
  "summaryRight",
  "section1Title",
  "section1Round",
  "section1Max",
  "section1Headers",
  "section1Rows",
  "section2Title",
  "section2Round",
  "section2Max",
  "section2Headers",
  "section2Rows",
  "section2Note",
  "section3Title",
  "section3Round",
  "section3Headers",
  "section3Rows",
  "section4Title",
  "section4Round",
  "section4Max",
  "section4Headers",
  "section4Rows",
  "footerBanner"
];

const defaults = {
  promoDate: "26.6월",
  brandName: "삼성생명",
  mainTitle: "26.6월 프로모션",
  subTitle: "대상상품, 행복종신/플러스원/암치료비플러스/순수3종",
  branchName: "GA코리아",
  branchNote: "(강북직할)",
  summaryLabel: "익월",
  summaryMax: "500%",
  summaryTitle: "정규 시상 (6/1 ~ 6/28)",
  summaryLeft: "300%",
  summaryPill: "13회 추가 시상",
  summaryRight: "700%",
  section1Title: "기본가동프로모션",
  section1Round: "[13회]",
  section1Max: "500%",
  section1Headers: "실적,5만 ↑,10만 ↑,20만 ↑,30만 ↑,50만 ↑,100만 ↑",
  section1Rows: "1~13회|5만|40만|80만|120만|250만|500만\n14~28회|5만|30만|60만|90만|200만|400만",
  section2Title: "5~6월 브릿지",
  section2Round: "[13회]",
  section2Max: "450%",
  section2Headers: "5만 ↑,10만 ↑,20만 ↑,30만 ↑,50만 ↑,100만 ↑",
  section2Rows: "10만|30만|60만|100만|200만|400만",
  section2Note: "※ 멤버십 기준 : 25.11~26.1월 中 최소 합산 The퍼스트/라이트/다모은 5만일 ↑ 가동FC (본인계약 포함), 납기무관",
  section3Title: "6~7월 브릿지",
  section3Round: "[13회]",
  section3Headers: "1/17~31,2/1~13,시상,2/14~28,3/1~6,시상",
  section3Rows: "10만 ↑,5만,60만,10만 ↑,5만,60만\n20만 ↑,5만,100만,20만 ↑,5만,100만\n30만 ↑,5만,150만,30만 ↑,5만,150만\n50만 ↑,5만,250만,50만 ↑,5만,250만",
  section4Title: "Gold 시상",
  section4Round: "[13회]",
  section4Max: "GOLD\n2돈",
  section4Headers: "달성기준,12월,1월,2월",
  section4Rows: "①,10만,10만,10만\n②,1만,15만,15만",
  footerBanner: "1. 세부 지급기준 및 적용조건은 본사 최종 공지 기준으로 운영됩니다. / 2. 프로모션별 중복 적용 여부는 항목별 기준을 확인해 주세요. / 3. 최종 확정 전 안내장은 변경될 수 있습니다."
};

const sectionKeyByName = {
  "상단 정보": "topInfo",
  "상단퍼센트": "summary",
  "상단 퍼센트": "summary",
  "첫번째표": "section1",
  "첫 번째 표": "section1",
  "두번째표": "section2",
  "두 번째 표": "section2",
  "세번째표": "section3",
  "세 번째 표": "section3",
  "네번째표": "section4",
  "네 번째 표": "section4",
  "하단문구": "footer",
  "하단 문구": "footer"
};

const fieldBySectionAndLabel = {
  topInfo: {
    "프로모션날짜": "promoDate",
    "프로모션 날짜": "promoDate",
    "회사명": "brandName",
    "지사": "branchName",
    "지사명": "branchName",
    "사업부": "branchNote",
    "보조문구": "branchNote",
    "보조 문구": "branchNote",
    "제목": "mainTitle",
    "메인제목": "mainTitle",
    "메인 제목": "mainTitle",
    "서브제목": "subTitle",
    "서브 제목": "subTitle",
    "우측지사명": "branchName",
    "우측 지사명": "branchName",
    "우측보조문구": "branchNote",
    "우측 보조 문구": "branchNote"
  },
  summary: {
    "좌측배지": "summaryLabel",
    "좌측 배지": "summaryLabel",
    "최대퍼센트": "summaryMax",
    "최대 퍼센트": "summaryMax",
    "가운데제목": "summaryTitle",
    "가운데 제목": "summaryTitle",
    "가운데왼쪽%": "summaryLeft",
    "가운데 왼쪽 %": "summaryLeft",
    "빨간라벨": "summaryPill",
    "빨간 라벨": "summaryPill",
    "가운데오른쪽%": "summaryRight",
    "가운데 오른쪽 %": "summaryRight"
  },
  section1: {
    "블록제목": "section1Title",
    "블록 제목": "section1Title",
    "회차표기": "section1Round",
    "회차 표기": "section1Round",
    "좌측최대값": "section1Max",
    "좌측 최대값": "section1Max",
    "헤더들": "section1Headers",
    "헤더들,쉼표로구분": "section1Headers",
    "헤더들, 쉼표로 구분": "section1Headers",
    "행데이터": "section1Rows",
    "행 데이터": "section1Rows",
    "행 데이터,줄바꿈으로구분,각줄은|로칸구분": "section1Rows",
    "행 데이터, 줄바꿈으로 구분, 각 줄은 | 로 칸 구분": "section1Rows"
  },
  section2: {
    "블록제목": "section2Title",
    "블록 제목": "section2Title",
    "회차표기": "section2Round",
    "회차 표기": "section2Round",
    "좌측최대값": "section2Max",
    "좌측 최대값": "section2Max",
    "헤더들": "section2Headers",
    "행데이터": "section2Rows",
    "행 데이터": "section2Rows",
    "하단주석": "section2Note",
    "하단 주석": "section2Note"
  },
  section3: {
    "블록제목": "section3Title",
    "블록 제목": "section3Title",
    "회차표기": "section3Round",
    "회차 표기": "section3Round",
    "헤더들": "section3Headers",
    "행데이터": "section3Rows",
    "행 데이터": "section3Rows"
  },
  section4: {
    "블록제목": "section4Title",
    "블록 제목": "section4Title",
    "회차표기": "section4Round",
    "회차 표기": "section4Round",
    "좌측최대값": "section4Max",
    "좌측 최대값": "section4Max",
    "헤더들": "section4Headers",
    "행데이터": "section4Rows",
    "행 데이터": "section4Rows"
  },
  footer: {
    "하단배너": "footerBanner",
    "하단 배너": "footerBanner"
  }
};

const rowJoinerByField = {
  section1Rows: "|",
  section2Rows: "|",
  section3Rows: ",",
  section4Rows: ","
};

function normalizeText(value) {
  return String(value ?? "").replace(/\r/g, "").trim();
}

function compactLabel(value) {
  return normalizeText(value).replace(/\s+/g, "");
}

function getFieldId(sectionKey, label) {
  if (!sectionKey) {
    return null;
  }

  const fields = fieldBySectionAndLabel[sectionKey];
  if (!fields) {
    return null;
  }

  return fields[label] ?? fields[compactLabel(label)] ?? null;
}

function getRowJoiner(fieldId) {
  return rowJoinerByField[fieldId] ?? ",";
}

function stringifyRowValues(fieldId, values) {
  const cleanValues = values.map(normalizeText).filter(Boolean);
  if (cleanValues.length === 0) {
    return "";
  }

  return cleanValues.join(getRowJoiner(fieldId));
}

export function createInitialFormData() {
  return { ...defaults };
}

export function applySheetRowsToData(currentData, sheetRows) {
  const nextData = { ...currentData };
  let currentSection = null;
  let pendingRowsFieldId = null;

  for (const row of sheetRows) {
    const firstCell = normalizeText(row?.[0] ?? "");
    const compactFirstCell = compactLabel(firstCell);
    const trailingValues = (row ?? []).slice(1).map(normalizeText).filter(Boolean);

    if (!firstCell && trailingValues.length > 0 && pendingRowsFieldId) {
      const continuation = stringifyRowValues(pendingRowsFieldId, trailingValues);
      if (continuation) {
        nextData[pendingRowsFieldId] = nextData[pendingRowsFieldId]
          ? `${nextData[pendingRowsFieldId]}\n${continuation}`
          : continuation;
      }
      continue;
    }

    pendingRowsFieldId = null;

    if (!firstCell) {
      continue;
    }

    const switchedSection = sectionKeyByName[firstCell] ?? sectionKeyByName[compactFirstCell];
    if (switchedSection) {
      currentSection = switchedSection;
      continue;
    }

    const fieldId = getFieldId(currentSection, firstCell);
    if (!fieldId) {
      continue;
    }

    const isRowField = fieldId.endsWith("Rows");
    let nextValue = "";

    if (isRowField) {
      nextValue = stringifyRowValues(fieldId, trailingValues);
      pendingRowsFieldId = fieldId;
    } else if (fieldId.endsWith("Headers")) {
      nextValue = trailingValues.join(",");
    } else {
      nextValue = trailingValues.join(" ").trim();
    }

    nextData[fieldId] = nextValue;
  }

  return nextData;
}
