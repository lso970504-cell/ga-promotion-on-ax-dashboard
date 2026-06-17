# GA 프로모션 ON AX 대시보드 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 로그인, 권한별 화면, 승인 상태 관리, 전체 대리점 조회를 포함한 `index.html` 단일 파일 프로토타입을 완성한다.

**Architecture:** 정적 HTML 파일 하나에 레이아웃, 디자인 토큰, 더미 데이터, 상태 관리 로직을 모두 내장한다. 로그인 성공 후 메모리 상태를 기준으로 본사담당자 화면과 지점/지사 담당자 화면을 분기하고, 승인/반려 액션은 브라우저에서 즉시 KPI와 테이블에 반영한다.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript

---

## File Structure

- Create: `C:\Users\user\Documents\코덱스_day6\index.html`
- Create: `C:\Users\user\Documents\코덱스_day6\docs\superpowers\plans\2026-06-16-ga-promotion-on-ax-dashboard.md`
- Reference: `C:\Users\user\Documents\코덱스_day6\docs\superpowers\specs\2026-06-16-ga-promotion-on-ax-dashboard-design.md`

### Responsibility Map

- `index.html`
  - 삼성생명 톤의 로그인 화면
  - 본사담당자/지점담당자 화면 전환
  - 더미 사용자/프로모션 데이터
  - 승인 상태 변경 로직
  - KPI 집계 및 재렌더링

## Task 1: Base Shell And Data Model

**Files:**
- Create: `C:\Users\user\Documents\코덱스_day6\index.html`

- [ ] **Step 1: Write the initial shell with semantic regions and embedded data**

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GA 프로모션 ON AX 대시보드</title>
    <style>
      :root {
        --brand-900: #0c2f6f;
        --brand-700: #164c9c;
        --brand-500: #2d79f3;
        --surface: #f4f7fb;
        --card: #ffffff;
        --text: #11203a;
        --muted: #66758f;
        --line: #dbe3f0;
        --success: #24a148;
        --warning: #f1c21b;
        --danger: #da1e28;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script>
      const users = [
        { employeeId: "10001", name: "김본사", role: "hq", org: "본사 영업추진팀" },
        { employeeId: "10002", name: "이승인", role: "hq", org: "본사 프로모션관리팀" },
        { employeeId: "20001", name: "박강남", role: "branch", org: "강남지점" },
        { employeeId: "30001", name: "최수원", role: "branch", org: "수원지사" }
      ];

      const promotions = [
        { id: 1, agency: "더블유에셋", region: "서울", branch: "강남지점", rm: "정RM", product: "종신", month: "2026.6월", updatedAt: "2026-06-16 09:10", status: "확정", noticeFile: "Wasset_종신_0616.pptx" },
        { id: 2, agency: "피플라이프", region: "경기", branch: "수원지사", rm: "윤RM", product: "건강", month: "2026.6월", updatedAt: "2026-06-16 08:40", status: "미확정", noticeFile: "Peoplelife_건강_0616.png" },
        { id: 3, agency: "글로벌금융판매", region: "부산", branch: "부산지점", rm: "송RM", product: "연금", month: "2026.6월", updatedAt: "2026-06-15 17:20", status: "반려", noticeFile: "Global_연금_0615.pptx" }
      ];

      const state = {
        currentUser: null,
        currentTab: "overview",
        month: "2026.6월",
        period: "직전 6개월",
        promotions
      };
    </script>
  </body>
</html>
```

- [ ] **Step 2: Save the file and verify the browser can parse it**

Run: `Get-Content C:\Users\user\Documents\코덱스_day6\index.html | Select-Object -First 20`
Expected: the first 20 lines show the HTML shell, `<style>`, and `<script>` blocks without truncation

- [ ] **Step 3: Add layout primitives for login view and dashboard view**

```html
<body>
  <div id="app">
    <section class="screen login-screen"></section>
    <section class="screen dashboard-screen" hidden></section>
  </div>
</body>
```

```css
body {
  margin: 0;
  font-family: "Segoe UI", "Malgun Gothic", sans-serif;
  background:
    radial-gradient(circle at top right, rgba(45, 121, 243, 0.18), transparent 24rem),
    linear-gradient(180deg, #eef4ff 0%, var(--surface) 100%);
  color: var(--text);
}

.screen {
  min-height: 100vh;
}

.login-screen,
.dashboard-screen {
  padding: 32px;
}
```

- [ ] **Step 4: Verify the file still contains both screen containers**

Run: `Select-String -Path C:\Users\user\Documents\코덱스_day6\index.html -Pattern "login-screen|dashboard-screen"`
Expected: two matches, one for `login-screen` and one for `dashboard-screen`

## Task 2: Login Experience And Role Routing

**Files:**
- Modify: `C:\Users\user\Documents\코덱스_day6\index.html`

- [ ] **Step 1: Write the login card markup and helper text**

```html
<section class="screen login-screen" id="loginScreen">
  <div class="login-layout">
    <div class="brand-panel">
      <div class="brand-mark">SAMSUNG LIFE</div>
      <h1>GA 프로모션 ON AX 대시보드</h1>
      <p>실시간 상태 확인, 안내장 승인 관리, 전체 대리점 조회를 한 화면에서 관리합니다.</p>
      <div class="brand-meta">
        <span>실시간 상태</span>
        <span>2026.6월 고정</span>
        <span>직전 6개월 조회</span>
      </div>
    </div>
    <div class="login-card">
      <h2>로그인</h2>
      <p class="helper">사번 5자리와 동일한 5자리 비밀번호로 로그인합니다.</p>
      <label for="employeeId">사번</label>
      <input id="employeeId" class="field" maxlength="5" inputmode="numeric" placeholder="예: 10001">
      <label for="password">비밀번호</label>
      <input id="password" class="field" maxlength="5" inputmode="numeric" type="password" placeholder="사번 5자리 입력">
      <button id="loginButton" class="primary-button">로그인</button>
      <p id="loginError" class="error-text" hidden></p>
      <div class="demo-box">
        <strong>더미 계정</strong>
        <p>본사담당자: 10001, 10002</p>
        <p>지점/지사 담당자: 20001, 30001</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add login validation and role lookup**

```js
function findUser(employeeId) {
  return users.find((user) => user.employeeId === employeeId) || null;
}

function isFiveDigitNumber(value) {
  return /^\d{5}$/.test(value);
}

function handleLogin() {
  const employeeId = document.getElementById("employeeId").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("loginError");

  if (!isFiveDigitNumber(employeeId) || !isFiveDigitNumber(password)) {
    errorEl.textContent = "사번과 비밀번호는 5자리 숫자로 입력해주세요.";
    errorEl.hidden = false;
    return;
  }

  if (employeeId !== password) {
    errorEl.textContent = "비밀번호는 사번과 동일한 5자리여야 합니다.";
    errorEl.hidden = false;
    return;
  }

  const user = findUser(employeeId);
  if (!user) {
    errorEl.textContent = "등록된 사용자가 아닙니다.";
    errorEl.hidden = false;
    return;
  }

  errorEl.hidden = true;
  state.currentUser = user;
  state.currentTab = user.role === "hq" ? "overview" : "branch-home";
  renderApp();
}
```

- [ ] **Step 3: Bind the login button and Enter key**

```js
function bindLoginEvents() {
  document.getElementById("loginButton").addEventListener("click", handleLogin);
  ["employeeId", "password"].forEach((id) => {
    document.getElementById(id).addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        handleLogin();
      }
    });
  });
}
```

- [ ] **Step 4: Verify validation strings and login button exist**

Run: `Select-String -Path C:\Users\user\Documents\코덱스_day6\index.html -Pattern "사번과 비밀번호는 5자리 숫자|비밀번호는 사번과 동일한 5자리|등록된 사용자가 아닙니다.|loginButton"`
Expected: four matches covering both error messages and the login button ID

## Task 3: Dashboard Header, KPI Cards, And HQ Tabs

**Files:**
- Modify: `C:\Users\user\Documents\코덱스_day6\index.html`

- [ ] **Step 1: Create summary helpers for KPI counts**

```js
function getSummary(data) {
  return {
    total: data.length,
    confirmed: data.filter((item) => item.status === "확정").length,
    pending: data.filter((item) => item.status === "미확정").length,
    rejected: data.filter((item) => item.status === "반려").length,
    updatedToday: data.filter((item) => item.updatedAt.startsWith("2026-06-16")).length
  };
}
```

- [ ] **Step 2: Render the common header and HQ overview cards**

```js
function renderSummaryCards(summary) {
  return `
    <div class="kpi-grid">
      <article class="kpi-card"><span>전체 대리점</span><strong>${summary.total}</strong></article>
      <article class="kpi-card"><span>확정</span><strong>${summary.confirmed}</strong></article>
      <article class="kpi-card"><span>미확정</span><strong>${summary.pending}</strong></article>
      <article class="kpi-card"><span>반려</span><strong>${summary.rejected}</strong></article>
      <article class="kpi-card"><span>오늘 업데이트</span><strong>${summary.updatedToday}</strong></article>
    </div>
  `;
}

function renderDashboardHeader() {
  return `
    <header class="dashboard-header">
      <div>
        <div class="title-eyebrow">SAMSUNG LIFE</div>
        <h1>GA 프로모션 ON AX 대시보드 현황</h1>
      </div>
      <div class="header-status">
        <span class="live-pill">실시간 상태</span>
        <span>${state.month}</span>
        <button type="button" class="ghost-button">${state.period}</button>
      </div>
    </header>
  `;
}
```

- [ ] **Step 3: Render HQ tabs and overview section**

```js
function renderHqTabs() {
  const tabs = [
    { key: "overview", label: "대시보드 개요" },
    { key: "approval", label: "승인 관리" },
    { key: "excel", label: "엑셀 업데이트" },
    { key: "agencies", label: "전체 대리점 조회" }
  ];

  return `
    <nav class="tab-row">
      ${tabs.map((tab) => `
        <button
          type="button"
          class="tab-button ${state.currentTab === tab.key ? "active" : ""}"
          data-tab="${tab.key}">
          ${tab.label}
        </button>
      `).join("")}
    </nav>
  `;
}
```

- [ ] **Step 4: Verify the HQ tab labels are all present**

Run: `Select-String -Path C:\Users\user\Documents\코덱스_day6\index.html -Pattern "대시보드 개요|승인 관리|엑셀 업데이트|전체 대리점 조회"`
Expected: four matches for all HQ tabs

## Task 4: Approval Table, Traffic Light States, And Branch View

**Files:**
- Modify: `C:\Users\user\Documents\코덱스_day6\index.html`

- [ ] **Step 1: Create status badge and approval actions**

```js
function getStatusClass(status) {
  if (status === "확정") return "status-confirmed";
  if (status === "반려") return "status-rejected";
  return "status-pending";
}

function updatePromotionStatus(id, nextStatus) {
  state.promotions = state.promotions.map((item) => {
    if (item.id === id) {
      return { ...item, status: nextStatus, updatedAt: "2026-06-16 10:30" };
    }
    return item;
  });
  renderApp();
}
```

- [ ] **Step 2: Render the HQ approval table with button controls**

```js
function renderApprovalTable(data) {
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>안내장 승인 관리</h2>
        <p>관리자가 승인하면 확정, 승인하지 않으면 미확정 또는 반려 상태로 표시합니다.</p>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>대리점</th>
            <th>지역</th>
            <th>담당 RM</th>
            <th>상품군</th>
            <th>상태</th>
            <th>최근 갱신</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          ${data.map((item) => `
            <tr>
              <td>${item.agency}</td>
              <td>${item.region}</td>
              <td>${item.rm}</td>
              <td>${item.product}</td>
              <td><span class="status-badge ${getStatusClass(item.status)}">${item.status}</span></td>
              <td>${item.updatedAt}</td>
              <td class="actions">
                <button type="button" data-action="confirm" data-id="${item.id}">확정</button>
                <button type="button" data-action="pending" data-id="${item.id}">미확정</button>
                <button type="button" data-action="reject" data-id="${item.id}">반려</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </section>
  `;
}
```

- [ ] **Step 3: Render branch view with default branch focus and download state**

```js
function getBranchPromotions() {
  return state.promotions.filter((item) => item.branch === state.currentUser.org);
}

function renderBranchHome() {
  const branchData = getBranchPromotions();
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>${state.currentUser.org} 프로모션 현황</h2>
        <p>기본값은 소속 조직 기준이며, 필요 시 전체 대리점 조회로 확장할 수 있습니다.</p>
      </div>
      <div class="branch-list">
        ${branchData.map((item) => `
          <article class="branch-card">
            <div>
              <strong>${item.agency}</strong>
              <span>${item.product} · ${item.updatedAt}</span>
            </div>
            <div class="branch-actions">
              <span class="status-badge ${getStatusClass(item.status)}">${item.status}</span>
              <button type="button" class="download-button" ${item.status === "확정" ? "" : "disabled"}>
                ${item.status === "확정" ? "안내장 다운로드" : "승인 후 다운로드"}
              </button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}
```

- [ ] **Step 4: Verify the three state labels and download gating text exist**

Run: `Select-String -Path C:\Users\user\Documents\코덱스_day6\index.html -Pattern "확정|미확정|반려|승인 후 다운로드|안내장 다운로드"`
Expected: matches for the three status labels and both download button texts

## Task 5: Render Loop, Event Binding, And Responsive Polish

**Files:**
- Modify: `C:\Users\user\Documents\코덱스_day6\index.html`

- [ ] **Step 1: Implement the main render function**

```js
function renderHqView() {
  const summary = getSummary(state.promotions);
  const tabContent = {
    overview: `
      <section class="panel">
        <h2>실시간 운영 요약</h2>
        <p>전체 대리점 현황과 승인 처리 현황을 한눈에 확인합니다.</p>
        ${renderSummaryCards(summary)}
      </section>
    `,
    approval: renderApprovalTable(state.promotions),
    excel: `
      <section class="panel">
        <h2>엑셀 파일 업데이트</h2>
        <p>전체 대리점 엑셀 파일은 영업관리자 확인용으로 항상 노출합니다.</p>
        <div class="excel-box">
          <input type="file" class="field">
          <button type="button" class="primary-button">엑셀 파일 업데이트</button>
          <button type="button" class="ghost-button">양식 다운로드</button>
        </div>
        <div class="file-card">전체대리점_프로모션현황_2026-06.xlsx · 최근 반영 2026-06-16 09:20</div>
      </section>
    `,
    agencies: renderApprovalTable(state.promotions)
  };

  return `
    ${renderDashboardHeader()}
    ${renderHqTabs()}
    ${tabContent[state.currentTab]}
  `;
}

function renderApp() {
  const app = document.getElementById("app");

  if (!state.currentUser) {
    app.innerHTML = document.getElementById("loginScreen")
      ? app.innerHTML
      : "";
    app.innerHTML = `
      <section class="screen login-screen" id="loginScreen">...</section>
      <section class="screen dashboard-screen" id="dashboardScreen" hidden></section>
    `;
    bindLoginEvents();
    return;
  }

  app.innerHTML = `
    <section class="screen dashboard-screen" id="dashboardScreen">
      ${state.currentUser.role === "hq" ? renderHqView() : `${renderDashboardHeader()}${renderBranchHome()}`}
    </section>
  `;

  bindDashboardEvents();
}
```

- [ ] **Step 2: Bind HQ tab clicks and approval actions**

```js
function bindDashboardEvents() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentTab = button.dataset.tab;
      renderApp();
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const nextStatusMap = {
        confirm: "확정",
        pending: "미확정",
        reject: "반려"
      };
      updatePromotionStatus(id, nextStatusMap[button.dataset.action]);
    });
  });
}

renderApp();
```

- [ ] **Step 3: Add responsive rules for tablet and mobile widths**

```css
@media (max-width: 960px) {
  .login-layout,
  .dashboard-header,
  .kpi-grid {
    grid-template-columns: 1fr;
    display: grid;
  }

  .data-table {
    display: block;
    overflow-x: auto;
  }
}

@media (max-width: 640px) {
  .login-screen,
  .dashboard-screen {
    padding: 18px;
  }

  .tab-row {
    overflow-x: auto;
    white-space: nowrap;
  }
}
```

- [ ] **Step 4: Run final static checks**

Run: `Select-String -Path C:\Users\user\Documents\코덱스_day6\index.html -Pattern "renderApp\\(|bindDashboardEvents\\(|@media \\(max-width: 960px\\)|@media \\(max-width: 640px\\)"`
Expected: matches for the main render loop, dashboard event binding, and both responsive breakpoints

- [ ] **Step 5: Manual verification checklist**

Run: `Start-Process C:\Users\user\Documents\코덱스_day6\index.html`
Expected:
- login screen opens first
- `10001 / 10001` logs into 본사담당자 화면
- `20001 / 20001` logs into 강남지점 화면
- approval buttons change status badges immediately
- only `확정` rows show active-style download text

