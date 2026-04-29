## Plan: Watering history — show last 3 dates

TL;DR
Add a per-plant `history` array stored in the existing client-side localStorage. Migrate existing `date` values into `history`, update client script logic to push new water events into `history`, and update the watering page to display the last 3 formatted dates per plant.

**Steps**
1. Update data model (client): change plant objects to include `history: string[]` (ISO date strings). *depends on step 2*
2. Implement migration and persistence: modify `public/scripts/local.js` to load existing data, convert any legacy `date` field into `history = [date]`, and ensure `saveData()`/`loadData()` consistently read/write `history`.
3. Update watering actions: update the function that marks a plant as watered to unshift/append today's ISO date into `history`, truncate to keep a reasonable length (e.g., 10), then recompute `days`/`isDry` using the most recent date. *blocks step 4*
4. UI rendering: modify `src/pages/watering.astro` to render the last 3 dates for each plant (client-side loop over `plant.history.slice(0,3)`), formatting them with `toLocaleDateString()` or a small formatting helper. Ensure markup matches existing styling.
5. Backwards compatibility: ensure loading handles plants that already have `history` arrays (no-op) and plants with only `date` (convert). Add a one-time migration path when loading.
6. Verification: manually test watering interactions, localStorage contents, and UI display. Optionally add a short README note documenting the new localStorage schema.

**Relevant files**
- public/scripts/local.js — modify data model, migration, save/load, and watering actions
- src/pages/watering.astro — update template to display last 3 watering dates per plant
- src/utils.ts — optional: add a shared date formatting helper (client-side formatting likely sufficient)
- README.md — optional: document the schema change

**Verification**
1. Open the watering page, open browser devtools → Application → Local Storage, confirm `plants` entries now include `history` arrays after loading.
2. Click "water" for a plant, verify UI updates and `history` has a new ISO date at index 0.
3. Water the same plant multiple times, confirm only the most recent dates are kept and UI shows last 3 in descending order.
4. Test migration: seed localStorage with legacy `date`-only items, reload page, confirm conversion to `history` with that date preserved.

**Decisions / Rationale**
- Chosen approach: client-side localStorage `history` (minimal changes, works offline, aligns with current code in public/scripts/local.js).
- Alternatives considered: storing history in Markdown frontmatter (requires rebuild/deploy) or using a backend (sync + complexity). Those are not recommended for this request's scope.

**Further considerations**
1. If the user wants cross-device sync later, we should design an API and add an optional server adapter to persist `history` remotely.
2. If privacy or persistence beyond client is required, explore Git-backed CMS edits for logged users or an authenticated server endpoint.
