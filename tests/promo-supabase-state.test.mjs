import test from "node:test";
import assert from "node:assert/strict";

import {
  applySupabaseSnapshot,
  createSupabaseSnapshot
} from "../promo-supabase-state.mjs";

test("createSupabaseSnapshot serializes dashboard state for Supabase tables", () => {
  const state = {
    selectedMonth: "2026.06",
    period: "직전 6개월",
    excelUpdatedAt: "2026-06-16 09:20",
    generatedAt: "2026-06-16 10:10",
    approvedAt: "2026-06-16 10:30",
    selectedUploadFileName: "6월 프로모션 총괄판.xlsx",
    promotions: [
      {
        id: 1,
        code: "A001",
        agency: "에이전시A",
        region: "서울",
        branch: "금천",
        rm: "홍길동M",
        product: "기본가산",
        happyType: "",
        month: "2026.06",
        status: "확정",
        errorReason: "",
        generated: true,
        updatedAt: "2026-06-16 09:20",
        noticeFile: "agency_a.png"
      }
    ],
    templateForms: {
      1: {
        branchName: "에이전시A",
        footerBanner: "홍길동M · 기본가산"
      }
    }
  };

  const snapshot = createSupabaseSnapshot(state);

  assert.deepEqual(snapshot.serviceState, {
    id: 1,
    selected_month: "2026.06",
    period: "직전 6개월",
    excel_updated_at: "2026-06-16 09:20",
    generated_at: "2026-06-16 10:10",
    approved_at: "2026-06-16 10:30",
    selected_upload_file_name: "6월 프로모션 총괄판.xlsx"
  });
  assert.deepEqual(snapshot.promotions, [
    {
      id: 1,
      code: "A001",
      agency: "에이전시A",
      region: "서울",
      branch: "금천",
      rm: "홍길동M",
      product: "기본가산",
      happy_type: "",
      month: "2026.06",
      status: "확정",
      error_reason: "",
      generated: true,
      updated_at: "2026-06-16 09:20",
      notice_file: "agency_a.png"
    }
  ]);
  assert.deepEqual(snapshot.templateForms, [
    {
      promotion_id: 1,
      form_data: {
        branchName: "에이전시A",
        footerBanner: "홍길동M · 기본가산"
      }
    }
  ]);
});

test("applySupabaseSnapshot hydrates app state with remote records", () => {
  const currentState = {
    selectedMonth: "2026.05",
    period: "직전 3개월",
    excelUpdatedAt: "",
    generatedAt: "",
    approvedAt: "",
    selectedUploadFileName: "",
    promotions: [],
    templateForms: {},
    adminPanelOpen: true
  };

  const nextState = applySupabaseSnapshot(currentState, {
    serviceState: {
      id: 1,
      selected_month: "2026.06",
      period: "직전 6개월",
      excel_updated_at: "2026-06-16 09:20",
      generated_at: "2026-06-16 10:10",
      approved_at: "2026-06-16 10:30",
      selected_upload_file_name: "6월 프로모션 총괄판.xlsx"
    },
    promotions: [
      {
        id: 3,
        code: "A003",
        agency: "에이전시C",
        region: "경기",
        branch: "수원",
        rm: "이순신M",
        product: "5~6브릿지",
        happy_type: "해피형",
        month: "2026.06",
        status: "미확정",
        error_reason: "",
        generated: false,
        updated_at: "2026-06-16 08:40",
        notice_file: "agency_c.png"
      }
    ],
    templateForms: [
      {
        promotion_id: 3,
        form_data: {
          branchName: "에이전시C"
        }
      }
    ]
  });

  assert.equal(nextState.selectedMonth, "2026.06");
  assert.equal(nextState.period, "직전 6개월");
  assert.equal(nextState.excelUpdatedAt, "2026-06-16 09:20");
  assert.equal(nextState.generatedAt, "2026-06-16 10:10");
  assert.equal(nextState.approvedAt, "2026-06-16 10:30");
  assert.equal(nextState.selectedUploadFileName, "6월 프로모션 총괄판.xlsx");
  assert.equal(nextState.adminPanelOpen, true);
  assert.deepEqual(nextState.promotions, [
    {
      id: 3,
      code: "A003",
      agency: "에이전시C",
      region: "경기",
      branch: "수원",
      rm: "이순신M",
      product: "5~6브릿지",
      happyType: "해피형",
      month: "2026.06",
      status: "미확정",
      errorReason: "",
      generated: false,
      updatedAt: "2026-06-16 08:40",
      noticeFile: "agency_c.png"
    }
  ]);
  assert.deepEqual(nextState.templateForms, {
    3: {
      branchName: "에이전시C"
    }
  });
});
