# Current Implementation Map

## Purpose

This skill folder stores the current reusable baseline for the GA promotion dashboard and notice template in `C:\Users\user\Documents\코덱스_day6`.

## Saved Files

### Dashboard

- `assets/current-implementation/20260617.html`
  - current dashboard baseline
  - includes login, dashboard, admin upload, approval, and file-room sections

### Template Editor

- `assets/current-implementation/promo-template.html`
  - standalone template editor
  - useful when directly testing the notice image layout and Excel-driven text/table rendering

### Dashboard Template Runtime

- `assets/current-implementation/template-package/promo-template.html`
  - template used by the dashboard preview/download flow
  - should stay aligned with the standalone template editor for layout behavior

### Data Mapping

- `assets/current-implementation/promo-template-data.browser.js`
- `assets/current-implementation/template-package/promo-template-data.browser.js`
  - browser-side data mapping helpers for Excel-to-template population

## Current Behavior to Preserve

- Keep sample input values in place for editing/demo convenience.
- Keep the main business flow:
  - login with 5-digit employee id and the same 5-digit password,
  - upload Excel,
  - generate standard notices,
  - approve all,
  - allow download only for confirmed items.
- Preserve role split:
  - head-office users can manage uploads and approval,
  - branch users should not see admin controls.
- Preserve organization mapping behavior:
  - region values should be derived from organization-sheet branch mappings when available.
- If future uploaded values are blank:
  - hide empty visual labels when possible,
  - remove blank table columns when both header and all row values are blank,
  - hide empty note box content,
  - collapse left-side max box areas when no value exists,
  - let the remaining layout resize automatically.
- If a month has confirmed rows but missing templateForms, the dashboard should be able to recover notice template data for generation and download.

## Change Discipline

- When editing template layout behavior, update both template HTML files together.
- When editing dashboard wording or upload flow, use `20260617.html` as the primary baseline.
- When saving a new stable version, refresh the files in `assets/current-implementation/` from the latest working implementation.
