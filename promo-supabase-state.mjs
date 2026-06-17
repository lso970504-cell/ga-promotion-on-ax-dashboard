function normalizeText(value, fallback = "") {
  if (value === null || value === undefined) {
    return fallback;
  }

  return String(value);
}

export function createSupabaseSnapshot(state) {
  return {
    serviceState: {
      id: 1,
      selected_month: normalizeText(state.selectedMonth, "2026.06"),
      period: normalizeText(state.period, "직전 6개월"),
      excel_updated_at: normalizeText(state.excelUpdatedAt, ""),
      generated_at: normalizeText(state.generatedAt, ""),
      approved_at: normalizeText(state.approvedAt, ""),
      selected_upload_file_name: normalizeText(state.selectedUploadFileName, "")
    },
    promotions: (state.promotions || []).map((item) => ({
      id: Number(item.id),
      code: normalizeText(item.code, ""),
      agency: normalizeText(item.agency, ""),
      region: normalizeText(item.region, ""),
      branch: normalizeText(item.branch, ""),
      rm: normalizeText(item.rm, ""),
      product: normalizeText(item.product, ""),
      happy_type: normalizeText(item.happyType, ""),
      month: normalizeText(item.month, ""),
      status: normalizeText(item.status, "미확정"),
      error_reason: normalizeText(item.errorReason, ""),
      generated: Boolean(item.generated),
      updated_at: normalizeText(item.updatedAt, ""),
      notice_file: normalizeText(item.noticeFile, "")
    })),
    templateForms: Object.entries(state.templateForms || {}).map(([promotionId, formData]) => ({
      promotion_id: Number(promotionId),
      form_data: formData
    }))
  };
}

export function applySupabaseSnapshot(currentState, snapshot) {
  const nextServiceState = snapshot?.serviceState || {};
  const promotions = (snapshot?.promotions || []).map((item) => ({
    id: Number(item.id),
    code: normalizeText(item.code, ""),
    agency: normalizeText(item.agency, ""),
    region: normalizeText(item.region, ""),
    branch: normalizeText(item.branch, ""),
    rm: normalizeText(item.rm, ""),
    product: normalizeText(item.product, ""),
    happyType: normalizeText(item.happy_type, ""),
    month: normalizeText(item.month, ""),
    status: normalizeText(item.status, "미확정"),
    errorReason: normalizeText(item.error_reason, ""),
    generated: Boolean(item.generated),
    updatedAt: normalizeText(item.updated_at, ""),
    noticeFile: normalizeText(item.notice_file, "")
  }));

  const templateForms = Object.fromEntries(
    (snapshot?.templateForms || []).map((item) => [
      Number(item.promotion_id),
      item.form_data || {}
    ])
  );

  return {
    ...currentState,
    selectedMonth: normalizeText(nextServiceState.selected_month, currentState.selectedMonth),
    period: normalizeText(nextServiceState.period, currentState.period),
    excelUpdatedAt: normalizeText(nextServiceState.excel_updated_at, currentState.excelUpdatedAt),
    generatedAt: normalizeText(nextServiceState.generated_at, currentState.generatedAt),
    approvedAt: normalizeText(nextServiceState.approved_at, currentState.approvedAt),
    selectedUploadFileName: normalizeText(
      nextServiceState.selected_upload_file_name,
      currentState.selectedUploadFileName
    ),
    promotions,
    templateForms
  };
}
