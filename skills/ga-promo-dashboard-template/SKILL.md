---
name: ga-promo-dashboard-template
description: Update or extend the GA promotion dashboard and standard notice image template used in C:\Users\user\Documents\코덱스_day6. Use when working on Excel-uploaded promotion data, dashboard UI wording or layout, region-branch-agency mapping, approval and download rules, or syncing 20260617.html with promo-template files.
---

# GA Promo Dashboard Template

Keep the current GA promotion dashboard and notice-template implementation reusable and easy to continue.

## Quick Start

1. Read [references/current-implementation.md](references/current-implementation.md) first.
2. Treat `assets/current-implementation/20260617.html` as the saved dashboard baseline.
3. Treat both template files as a pair:
   - `assets/current-implementation/promo-template.html`
   - `assets/current-implementation/template-package/promo-template.html`
4. When changing template behavior, update both copies consistently unless there is a deliberate reason not to.

## Working Rules

- Treat `20260617.html` as the main working file unless the user explicitly asks for another version.
- Preserve sample input data; do not delete or clear example values just to support optional blank layouts.
- Implement blank handling as runtime behavior:
  - hide empty labels or blocks,
  - remove columns where both header and row values are blank,
  - collapse empty left max boxes,
  - resize remaining layout automatically.
- Keep the dashboard flow centered on `Excel upload -> standard notice generation -> approve all -> preview/download`.
- Prefer PC-first readability and clear Korean labels.
- Preserve role separation:
  - `hq` users can see admin controls,
  - `branch` users can only view, search, preview, and download approved items.
- Preserve business rules:
  - only confirmed items can become downloadable,
  - unconfirmed items stay disabled,
  - region values should follow organization-sheet mapping from branch names whenever possible.
- When saving a new stable state, keep the updated implementation files together so the dashboard file and template files do not drift apart.

## Main Files

- Dashboard baseline:
  - `assets/current-implementation/20260617.html`
- Standalone template editor:
  - `assets/current-implementation/promo-template.html`
- Dashboard preview/download template:
  - `assets/current-implementation/template-package/promo-template.html`
- Template data binding logic:
  - `assets/current-implementation/promo-template-data.browser.js`
  - `assets/current-implementation/template-package/promo-template-data.browser.js`

## Typical Tasks

### 1. Update dashboard wording or layout

- Start from `20260617.html`.
- Keep Korean labels manager-friendly and easy to scan.
- Check the promotion table layout as a whole:
  - region,
  - branch,
  - GA agency name,
  - status chip,
  - preview/download buttons.
- Preserve the existing upload, approval, preview, and download flow unless the request explicitly changes it.

### 2. Update the standard notice image template

- Start from both `promo-template.html` files.
- Mirror structural changes across both files.
- If a field can be omitted in uploaded Excel data, hide it instead of leaving an empty box whenever possible.

### 3. Support new Excel input behavior

- Keep parser logic separate from presentation logic.
- If the user changes the upload schema, update the data-mapping JS and verify how the template renders with partial blanks.
- If branch-to-region values look wrong in the dashboard, inspect organization-sheet mapping before changing table markup.
- If confirmed rows exist but notice generation says no confirmed data is available, inspect `templateForms` recovery and month-scoped state first.

## Resources

### references/

- `references/current-implementation.md`
  - file map, current behavior, and what each saved file is for

### assets/

- `assets/current-implementation/`
  - snapshot of the current dashboard and template implementation files
