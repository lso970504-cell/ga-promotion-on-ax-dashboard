---
name: ga-promo-notice-template
description: Update or test the GA promotion standard notice template used in C:\Users\user\Documents\코덱스_day6. Use when editing notice image layout, Excel-to-template mapping, section hide/show behavior, blank-field handling, title wording, colors, or keeping promo-template.html in sync with template-package copies.
---

# GA Promo Notice Template

Keep the standard notice template reusable, visually consistent, and easy to continue.

## Quick Start

1. Read [references/current-template.md](references/current-template.md) first.
2. Treat `assets/current-template/promo-template.html` as the standalone template baseline.
3. Treat `assets/current-template/template-package/promo-template.html` as the dashboard runtime copy.
4. Update both template HTML files together unless the user explicitly wants them to differ.

## Working Rules

- Preserve the Samsung-style promotion notice look unless the user asks for a new direction.
- Keep the layout readable first:
  - strong title area,
  - clear section separation,
  - readable table values,
  - stable spacing for long labels.
- Preserve runtime blank handling:
  - hide empty labels or boxes where possible,
  - collapse empty max areas,
  - remove empty columns when both header and row values are blank.
- Keep uploaded Excel values as the source of truth for visible text and numeric blocks.
- Do not change only one template copy and leave the other behind.

## Main Files

- Standalone template:
  - `assets/current-template/promo-template.html`
- Dashboard runtime template:
  - `assets/current-template/template-package/promo-template.html`
- Template data mapping:
  - `assets/current-template/promo-template-data.browser.js`
  - `assets/current-template/template-package/promo-template-data.browser.js`

## Typical Tasks

### 1. Update title or header layout

- Adjust company name, month title, product line, or branch-name box.
- Keep the top area balanced for both short and long text.

### 2. Update block layout

- Adjust block titles, round labels, left max box, or table spacing.
- If a block may be missing in uploaded data, prefer hiding it cleanly over leaving an empty shell.

### 3. Update Excel-to-template behavior

- Verify that uploaded values populate the intended block.
- If values do not match the image, inspect mapping before changing visual layout.

### 4. Prepare a saved template baseline

- Refresh the template snapshot files after a stable change.
- Keep both template copies and both mapping files aligned.

## Resources

### references/

- `references/current-template.md`
  - current template file map and rules to preserve

### assets/

- `assets/current-template/`
  - snapshot of the current template implementation files
