# Rule source and additions

For skill maintainers. The assistant does not need to read this file when looking up.

## Source

- The `guroos_abn_lookup` and `guroos_abn_search` tools of the Guroos app (g-workspace-tauri, `host/src/mcp/abn-tools.ts`), reading ABN Lookup data from the Australian Business Register (ABR). The error messages, the "ABN status" line and the "Due diligence notes" section are produced by the tool; SKILL.md relies on that exact wording. If the tool's wording changes, review the "Tools" section and Steps 1 and 2 of SKILL.md.
- Guroos's "Documents & Verification" checklist only says "(ABN lookup)" under payslip; there is no specific rule for business lookups. Every rule below is an addition.

## Additions beyond the checklist (awaiting Guroos confirmation)

| # | Addition | Reason | If Guroos disagrees |
|---|---|---|---|
| 1 | Four notify tags: ABN cancelled, Not found, Invalid ABN, Business name mismatch | A cancelled ABN must not be used to trade; a wrong number is usually a misread | Change the list in Step 2 |
| 2 | Business name comparison: ignore case, punctuation, a leading "The", the entity-type suffix; match the entity name or one business name; abbreviations are DIFFERENT | The name on payslips and invoices is usually a business name | Change the "Name comparison" paragraph |
| 3 | Trust: drop "The Trustee for" before comparing; do not compare the trustee | ABR records trust names as "The Trustee for X" and has no trustee name | Remove the trust exception |
| 4 | Sole trader: compare the entity name as a person's name, like `doc-check-identity` (ignore word order, commas; a missing middle name is DIFFERENT) | ABR records individuals' names as "SURNAME, Given names" | Compare as a business name |
| 5 | ABN status neither Active nor Cancelled: "Could not check", no conclusion | The tool cannot classify that status | Add a reading for each status |
| 6 | ACN present: always write the ASIC status under "Could not check" | ABR has no ASIC registration status; "ABN active" does not mean the company is still registered | Write it only when the user asks whether the company is still operating |
| 7 | Active under 12 months, not registered for GST, sole trader: Notes only | Acceptability depends on the lender and the application; staff decide | Make them notify tags |
| 8 | ABN Lookup printout / photo: look up again, the printout is only a hint | A printout may be old or altered | Handle it as a document, with a source file check |
| 9 | Today's date taken from the system | Same as the `doc-check-*` skills | Take it from a date tool |
| 10 | No "Conclusion" line (unlike the `doc-check-*` skills) | The skill is for lookups, not for assessing the whole application; the "Notices", "Could not check", "Notes" sections are enough for staff to decide | Add a 4-level Conclusion like `doc-check-*` |

## Alignment with the doc-check-* skills

Two skills call `guroos_abn_lookup` themselves and have their own rules; they do not read this file:
- `doc-check-income`, part A (Payslip): looks up the ABN printed on the payslip; tags `[ABN cancelled]`, `[Invalid ABN]`, `[Employer name mismatch]`.
- `doc-check-entity-credit`, part B (Company Extract): looks up by the ACN on the extract; ABN status goes under Notes.

Current differences from this skill (not yet fixed):
- The name comparison rule of `doc-check-income` has no trust (item 3) or sole trader (item 4) exception yet, and does not yet drop a leading "The" or "Pty. Ltd.".
- `doc-check-income` folds "no record" into `[Invalid ABN]`; this skill separates it as `[Not found]`.
- The result template of `doc-check-entity-credit` has no `[ABN cancelled]` tag yet, although part B requires notifying when the ABN is cancelled.
- An unclear ABN status (item 5) is not yet covered in either skill.

When changing the rules here, review those two places.
