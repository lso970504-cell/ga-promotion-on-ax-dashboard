# Current Template Map

## Purpose

This skill folder stores the reusable baseline for the GA promotion standard notice template in `C:\Users\user\Documents\코덱스_day6`.

## Saved Files

### Standalone Template

- `assets/current-template/promo-template.html`
  - used for direct template testing and preview

### Dashboard Runtime Template

- `assets/current-template/template-package/promo-template.html`
  - used by dashboard preview and download flows

### Data Mapping

- `assets/current-template/promo-template-data.browser.js`
- `assets/current-template/template-package/promo-template-data.browser.js`
  - browser-side mapping helpers for Excel values and template sections

## Current Behavior to Preserve

- Keep the template visually close to the current standard promotion notice style.
- Keep title, branch box, block titles, and table values readable on a single image.
- Keep both template HTML files synchronized.
- Keep blank-value handling dynamic:
  - hide empty labels,
  - hide empty notice text,
  - collapse empty max boxes,
  - remove empty table columns when possible.
- Treat uploaded Excel values as the source for block titles, labels, left values, tables, and notice text.

## Change Discipline

- Edit both template HTML files together.
- If a layout fix is only for the dashboard runtime, document that difference explicitly before keeping the two copies different.
- When a stable template revision is reached, refresh the snapshot files in this skill folder.
