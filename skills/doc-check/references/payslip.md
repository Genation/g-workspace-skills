# Payslip (rule 12)

## Scope

- Payslip (Pay Slip, Pay Advice, Pay Statement, Earnings Statement) from any payroll software or employee portal, including browser printouts. Checklist rule 12.
- A payslip is usually 1–2 pages: read all of it. One file may combine several payslips: find every `Pay period` block on every page. Each payslip is one member of the set (section 5).

## 1. Required structural signs

The nine Fair Work mandatory items on a payslip.

| Type | Required signs | Easily confused with |
|---|---|---|
| Payslip | (1) employer name at the top of the page; (2) Employer ABN; (3) employee name; (4) pay period (`Pay period`, `Period start / end`; some payslips print only the end date: `Period ending`, `Week ending` with the frequency); (5) `Pay date` / `Payment date`; (6) earnings table: pay lines (hours × rate, or salary) and total earnings (`Gross`, `Gross Pay`, `Gross Earnings`, `Total Gross`, `Total Earnings`); (7) deductions, including PAYG `Tax` (may be $0.00 or not printed when no tax is withheld in the period); (8) `Net pay`; (9) `Superannuation` paid by the employer (amount, usually with the fund name) | timesheet, roster (no `Pay date` and `Net pay`) → Out of scope |

## 2. Step 0 for this group

### 2A. File source

| Source group | Payslip |
|---|---|
| office tool; not a PDF (DOCX, XLSX…) | FLAG (small employers often use Excel/Word, but the file is editable) |
| PDF printer | FLAG (re-printed, no longer the source file) |
| image (JPG/PNG) | FLAG (photo of a payslip) |
| design tool; PDF editor/processor | STOP `[Source]` (payroll software does not export payslips through these tools) |

Other sources: NOTE (employee portals often print from the browser or export through an HTML-to-PDF converter). JPG/PNG image files: the "image (JPG/PNG)" row, whatever source group the image block shows.

### 2B. Signs checked by type

| Tag in the block | Decision |
|---|---|
| `[Content edited]`, `[Text covered]` | STOP |
| `[Image edited] The file information names an image editor: …` | STOP |
| `[Image edited] The EXIF thumbnail (…) has a different aspect ratio from the main image …` | FLAG |
| `[Text as outlines]`, `[Photo/scan]` | FLAG |

Scanned pages and pages Guroos re-rendered (payslip printed through a PDF printer, text drawn as strokes): read the figures on the attached page images ("Page N: scanned image, …" or "Page N: page image redrawn by Guroos …, see the attached image …"). Page with no text layer and no readable image ("no text layer; <reason>"; "scanned image not sent" that `guroos_attachment_page` cannot render; a file in the client folder for which `guroos_document_read` returns no page image (SKILL.md section 2); blurry image) → `UNREADABLE`; the "Content" line says a PDF downloaded directly from the payroll software or employee portal is needed. Step 0 FLAG points (PDF printer, text drawn as strokes…) still get one `[Source file]` line under Notices; the Conclusion is still `UNREADABLE`.

### 2C. Figure and date checks

`Gross` in the table below is the total earnings label of sign (6) in section 1.

| Comparison | Passes when |
|---|---|
| Net pay | `Gross` − `Tax` − deductions (pre- and post-tax) + post-tax additions (reimbursements, non-taxable allowances) = `Net pay`. If there is a `Total deductions`, use that line (if it already includes `Tax`, do not subtract `Tax` again). `Gross` printed after salary sacrifice (`Taxable gross`): do not subtract salary sacrifice again. Superannuation paid by the employer is NOT subtracted |
| Earnings lines | sum of the lines = `Gross`; each line hours × rate = amount |
| YTD | YTD Gross, YTD Tax, YTD Net all ≥ the period's figures |
| Dates | period start ≤ period end; `Pay date` not before period start |

- A failed comparison (amount differs by more than $1), including Net pay → `[Figures mismatch]` per the common template; the Dates comparison records the printed dates instead of the difference. No STOP `[Figures]`: genuine payslips can have adjustments or back pay printed outside the table.
- Unclear which group an item belongs to → skip that comparison, Notes "could not compare <comparison>: group of <item> unclear". A zero line (section 4) changes no total: never a reason to skip.
- The payslip's document date is the `Pay date` (if none, the period end).
- Notes only: period length differs from the printed frequency (weekly 7 days, fortnightly 14 days, monthly 1 month); `Pay date` more than 31 days after the period end; period end after today while `Pay date` is not after today (paid mid-period).

## 3. Record in Fact Find

| Type | Field | If absent, write |
|---|---|---|
| Payslip | Employer ABN: ABN as printed, plus the lookup result "(ABN Lookup <lookup date>: <entity name>, <ABN status>)" | "not on the payslip" (search by name: "ABN lookup" below) |
| Payslip | Employer address | "not on the payslip" |
| Payslip | Employer phone no. | "not on the payslip" |
| Payslip | Salary Sacrifice / Packaging / Deductions before tax (item name and amount for the period) | "not on the payslip"; only zero lines (section 4): "none (<item name as printed> $0.00)" |

Net pay, period, Pay date do not go into Fact Find; record them in the "Facts for cross-checking" line (section 5).

**ABN lookup** (ABN Lookup; SKILL.md 5.5). Look up each employer in the batch once; payslips with the same ABN share the result.
- Payslip prints an ABN: `guroos_abn_lookup(abn=<ABN as printed>, name_to_match=<employer name as printed at the top of the page>)`.
- No ABN printed: `guroos_abn_search(name=<employer name>)`. Exactly one candidate (not counting "former name" lines): look that candidate up as above; MATCH → Fact Find writes "<ABN> (not printed on payslip; ABN Lookup by name, <lookup date>: <entity name>, <ABN status>)". Several candidates, none, or NO MATCH: Fact Find "not on the payslip", "Could not check: Employer ABN: <N> candidates on ABN Lookup, none chosen" (no candidates: "not found by name"); do not choose yourself.
- "ABN status" neither Active nor Cancelled: "Could not check: ABN status", with the ABR link the tool gives.
- The tool's "Due diligence notes" (not registered for GST; Active for less than 12 months; sole trader) → Notes, keeping the tool's meaning. ABR only has state and postcode: the employer's address and phone number come from the payslip.

## 4. Notices

| Condition | Tag | Safe evidence | Action |
|---|---|---|---|
| Employee name does not match any Applicant (middle-name-only difference, like "ISLA M BRENNAN": match, SKILL.md section 6; no Notes) | Name mismatch | both names verbatim, where they differ | refer to staff for review |
| Has Salary Sacrifice, Salary Packaging, deductions before tax (pre-tax deduction, RESC), novated lease; including items named after a salary packaging provider, items containing `Pre Tax` / `Pre-Tax` / `Bef.Tax`, packaging fees deducted before tax; only with an amount above $0.00 (zero lines: below the table) | Salary sacrifice | item name and amount as printed | request a Statement or Employment Letter / Contract from the client |
| The set's LATEST payslip is over 30 days old, counted from Pay date (if none, the period end) | Over 30 days | Pay date and today per the tool | refer to staff for review |
| Payslips in the set are not consecutive | Not consecutive | the tool's "Gap" lines | refer to staff for review |
| Two adjacent-period payslips, same financial year, no payslip in between: later YTD Gross − earlier YTD Gross differs from the later period's Gross by more than $1 | Figures mismatch | both YTD Gross and Gross as printed | refer to staff for review |
| Step 0 has a FLAG point | Source file | source group, software name, tag in the block | verify with the employer or request the original |
| Payslip prints a TFN (the block's "ID numbers" line, a page with `[TFN hidden]` or a TFN visible on the image) | TFN | page number | mask the TFN before saving or sending |
| ABN Lookup: the employer's ABN status is Cancelled | ABN cancelled | ABN, cancellation date per the tool | refer to staff for review |
| ABN Lookup: "ABR has no record" for the ABN printed on the payslip | Not found | ABN as printed | check the ABN on the payslip with the client |
| ABN Lookup still says the ABN is invalid after re-reading (number read from an image, scanned page) | Invalid ABN | ABN as read | check the ABN on the payslip with the client |
| ABN Lookup: "Name check" is NO MATCH | Business name mismatch | employer name on the payslip and ABR name (entity, trading name) verbatim | refer to staff for review |

**Zero lines.** Payslip templates print every item, even when nothing was paid or deducted. A line whose amount for the period is $0.00, blank or "-", and whose YTD (if printed) is also $0.00, blank or "-", means none: salary sacrifice, packaging, pre-tax and post-tax deductions, allowances, reimbursements, overtime, bonus, leave. It raises no Notices line (no `[Salary sacrifice]`, so no request to the client), no "Could not check" line and no Notes line; it changes no 2C total, so it is never an item of unclear group. Exception: a salary sacrifice, packaging or pre-tax line at $0.00 for the period but above $0.00 YTD is still `[Salary sacrifice]` (evidence: both amounts as printed). PAYG `Tax` at $0.00: section 1, sign (7).

**By set.** At step 6 (`references/cross-checks.md` table 1), call once for the whole set:
`guroos_date_check(document_date=<Pay date of the latest payslip>, max_age_days=30, periods=[<period of each payslip>])`
- Do not put reversed periods (start after end) in `periods`, because the tool returns an error for the whole call. Then record "Could not check: continuity: reversed period in <file>".
- The three set-level lines (Over 30 days, Not consecutive, YTD) go only in the latest payslip's block. Other blocks write a Notes line "assessed as a set in the <latest file> block".
- A payslip prints only the period end: do not compute the start yourself; call without `periods` (dropping one period would create a false gap) and record "Could not check: continuity: <file> prints only the period end".
- The set includes that person's payslips already on the deal, not archived or replaced (`references/cross-checks.md`, "Documents already on the deal"): a payslip of the batch whose period directly follows a filed one is consecutive. Only when the whole set, with those, has one payslip: "Could not check: continuity: only one payslip".

Notes only when:
- Superannuation paid by the employer (Superannuation Guarantee): not salary sacrifice.
- Post-tax deductions (union fee, after-tax super, child support…): record name and amount; not Deductions before tax.
- Two payslips for the same period with different figures (may be a supplementary, off-cycle payslip): record both.
- Employer is the profile's entity (SKILL.md section 2): the Applicant is paid by their own company.
- Something this file does not check (not a field, comparison or Notices condition here: a logo, leave balances, the pay account's BSB) that could not be seen or confirmed: at most a Notes line, never "Could not check" (SKILL.md section 7).

## 5. Special notes

- **Payslip set** = every payslip for the same Employee and the same employer (compare ABN; no ABN, compare name) in the batch, including several payslips in one file. Working in two places = two sets, assessed separately.
- **Duplicate files.** Two files with the same content (same period, same figures, same file information): Notes "duplicate of <name>" in both blocks, counted only once in the set. With a CRM, the same pay period and employer as a batch payslip or one on the deal: a likely duplicate (`crm-recording.md` 10.6).
- An `INVALID` payslip does not join the set. The latest payslip's block writes a Notes line "<file> not counted in the set (INVALID)".
- "Facts for cross-checking" include, if printed: Employee · employer, ABN and ABN status per ABN Lookup · period (frequency) · Pay date · Gross · Net pay · YTD Gross · pay account (last 4 digits).

## 6. Example

Fake data. Today 11/10/2026 (per `guroos_date_check`). Applicant: Thi Mai Tran.

**Two consecutive payslips, with salary sacrifice.** Check block of both files: `Creating software: Producer "SamplePay PDF"; Creator empty.`, `Source group: unknown.`, `ID numbers (digits not shown): ABN 1 time (page 1), 1 different number, check digits correct.`, both sign sections "none.", Technical notes `The creating software is not on the known list.` payslip_1.pdf: period 31/08–13/09/2026, Pay date 16/09/2026, YTD Gross $18,000.00. payslip_2.pdf: period 14/09–27/09/2026, Pay date 30/09/2026, Gross $3,000.00, Salary sacrifice super $200.00, Tax $650.00, Net pay $2,150.00, Superannuation $360.00, YTD Gross $21,000.00. Tool: `Document date: 30/09/2026 → 11 days → WITHIN 30 days`, `Merged: continuous, no gaps`. `guroos_abn_lookup(abn=…, name_to_match="Sample Logistics Pty Ltd")`: `Business: SAMPLE LOGISTICS PTY LTD`, `ABN status: Active from 01/07/2015`, `GST: registered from 01/07/2015`, `Name check "Sample Logistics Pty Ltd" (…): MATCH with the entity name "SAMPLE LOGISTICS PTY LTD".`

```
### payslip_2.pdf — Payslip (rule 12) · certain
Conclusion: ACTION NEEDED
Source file check: passed (source: unknown) · rules: references/payslip.md
Record in Fact Find
- Employer ABN: <11 digits as printed> (ABN Lookup 11/10/2026: SAMPLE LOGISTICS PTY LTD, Active from 01/07/2015)
- Employer address: 1 Sample Street, Sampleton VIC 3000
- Employer phone no.: not on the payslip
- Salary Sacrifice / Packaging / Deductions before tax: Salary sacrifice super $200.00
Notices
- [Salary sacrifice] "Salary sacrifice super $200.00" → request a Statement or Employment Letter / Contract from the client.
Could not check
- None
Notes
- Source unknown (Producer "SamplePay PDF"). The creating software is not on the known list.
- $3,000.00 − $200.00 − $650.00 = Net pay $2,150.00: matches.
- Set of 2 payslips: periods 31/08/2026–27/09/2026 continuous; YTD Gross $21,000.00 − $18,000.00 = Gross $3,000.00. Pay date 30/09/2026, today 11/10/2026: WITHIN 30 days (per the tool).
- Superannuation $360.00 paid by the employer, not salary sacrifice.
- ABN Lookup: employer name matches the entity name; GST registered from 01/07/2015.
Facts for cross-checking: Employee Thi Mai Tran · Sample Logistics Pty Ltd, ABN check digits valid, Active (ABN Lookup) · period 14/09–27/09/2026 (fortnightly) · Pay date 30/09/2026 · Gross $3,000.00 · Net pay $2,150.00 · YTD Gross $21,000.00 · pay account …4821
```

payslip_1.pdf has its own block: same Fact Find fields, same `[Salary sacrifice]` line, Notes "assessed as a set in the payslip_2.pdf block".
