# Tax and financial statements (rule 13)

## Scope

| Type | Includes |
|---|---|
| Tax Return | Individual, Company, Partnership, Trust returns produced by a tax agent or tax software (including self-lodged via myTax) |
| Notice of Assessment (NOA) | ATO notice of assessment, including `Notice of amended assessment` |
| ATO Income Statement | income statement on myGov / ATO online services |
| Financial Statements | set of financial statements: Profit and Loss, Balance Sheet and accompanying parts (section 1); also a standalone P&L or Balance Sheet, management accounts ("uncertain", section 1) |

Read by page:
- Tax Return: page 1 (title, year, name) → summary page (`Taxable income`, usually with "Taxation estimate") → declaration page (usually at the end).
- Financial Statements: contents → Profit and Loss → Balance Sheet → Notes / declaration / Compilation Report.
- NOA, ATO Income Statement: read in full.

## 1. Required structural signs

| Type | Required signs |
|---|---|
| Tax Return | (1) title `Individual` / `Company` / `Partnership` / `Trust tax return` with the year; (2) items numbered per the ATO form (e.g. `1 Salary or wages`, `D1`…`D10`, `L1`) with letter box labels next to the amounts; (3) summary `Total income or loss`, `Total deductions`, `Taxable income` (or `Taxable income or loss`; entity: `Total income` or `Total business income`, `Total expenses`, `Total profit or loss` or `Net income or loss (from business)`); (4) taxpayer or tax agent declaration, e.g. `Taxpayer's declaration`, `Electronic lodgement declaration`; (5) taxpayer name repeated at the top of the return's pages |
| NOA | (1) title `Notice of assessment` with the ATO name (`Australian Taxation Office`, `ato.gov.au` or ATO address); (2) `Year ended 30 June YYYY` (substitute period: `Year ended` another date); (3) `Date of issue`; (4) tax calculation table: `Taxable income`, `Tax on taxable income`, `Medicare levy`, credits (e.g. PAYG withholding) and the result line, payable or refundable |
| ATO Income Statement | (1) ATO, myGov or ATO online services; (2) title `Income statement`; (3) payer / employer and `Payer ABN` / `Employer ABN/Branch`; (4) gross amount (`Gross payments`, `Total gross amount`), tax withheld (`Total tax withheld`, `Tax withheld`, `PAYGW amount`); (5) financial year and status (e.g. `Tax ready`) |
| Financial Statements | (1) organisation name with ABN/ACN and period (`For the year ended …` or `Year ended …`); (2) `Profit and Loss` (or `Statement of profit or loss`) with a profit/loss line (`Net profit`, `Profit before / after income tax`…); (3) `Balance Sheet` (or `Statement of Financial Position`) with `Total assets`, `Total liabilities`, `Net assets` and Equity; (4) at least one of: `Notes to the financial statements`, Directors / Trustee / Partners declaration, `Compilation Report` |

- The year in the Tax Return title is the financial year ending 30 June of that year (`2025` = 2024–25). Empty date boxes on page 1 (`If not a resident for a full year`, `approved substitute period`) are not a missing sign.
- A required sign missing → STOP `[Structure] Missing <sign>`. Rule 13 does not downgrade to "uncertain", except in the cases just below.
- NOA and ATO Income Statement do not yet have enough samples to fix their signs: STOP only when (1) or (2) is missing; another sign missing → heading "uncertain: missing <sign>", Notes "not enough samples to confirm".
- File with missing pages: a sign on a missing page does not cause STOP; sign (1) and the signs on the pages present must still be complete. A sign on a scanned page not yet readable, including (1), does not cause STOP.
- **Standalone P&L or Balance Sheet**, management accounts (Financial Statements with (1) and at least one of (2), (3), missing the rest or (4)): no STOP `[Structure]`. Heading `<file> — Standalone Profit and Loss` (or `Standalone Balance Sheet`, `Management accounts`) `(rule 13) · uncertain: missing <sign>`; FLAG `[Source file]` (section 4); still write Fact Find (section 3) and do the 2C comparisons for the parts printed. (1) missing, or neither (2) nor (3): STOP `[Structure]`. Step 0 (section 2) still applies as for Financial Statements.
- Sent in place of the main type, so signs are missing, hence STOP `[Structure]`: a standalone "Taxation estimate" or "Lodgement summary" page, a self-typed summary table (instead of a Tax Return).
- "Income statement" within a set of Financial Statements is another name for the P&L, not an ATO Income Statement.
- PAYG payment summary issued by the employer (old form, not from the ATO): one "Out of scope" line.

## 2. Step 0 for this group

Record every STOP reason found. Once there is a STOP reason, no further comparisons are needed; a comparison already done that fails is still recorded.

PDF with no check block, or block "Could not measure the file: …": STOP `[Source] Source file not measured`, `[Source file]` → "resend the exact PDF in the Guroos chat box; if there is still no block, tell the admin to update the app".

### 2A. File source

| Type | STOP when "Source group" is |
|---|---|
| Tax Return, NOA | browser printing to PDF, HTML-to-PDF converter, PDF printer, office tool, design tool, PDF editor/processor, not a PDF (DOCX, XLSX…) |
| ATO Income Statement | office tool, design tool, PDF editor/processor, not a PDF |
| Financial Statements | design tool, PDF editor/processor, not a PDF |

- Image (JPG/PNG): FLAG.
- Other sources: NOTE (e.g. ATO Income Statement printed from myGov; Financial Statements from web accounting software, Word/Excel).
- `pages with text: 0/N` without the suffix "— every page is a scanned image…": has image pages → FLAG; `pages with images: none` → STOP `[Source] File has no text layer`.

### 2B. Signs checked by type

- `[Photo/scan]` (one or every page) → FLAG.
- Every other tag in the "Signs to weigh by document type" section → STOP: `[Content edited]`, `[Text covered]`, `[Text as outlines]`, `[Image edited]` and tags not listed here.
- "Technical notes" → NOTE.

### 2C. Figure and date checks

Difference over $1 → STOP `[Figures] <comparison>: <printed figures> differ by <difference>`. A loss may be printed with `L`, `LOSS`, brackets or a minus sign.

Figures and dates read from an image (image file, page image) or the OCR text layer of a `[Photo/scan]` page do not STOP `[Figures]`: mismatch → `[Figures mismatch]`.

| Type | Comparison |
|---|---|
| Individual Tax Return, NOA | `Total income or loss` − `Total deductions` = `Taxable income` |
| Individual Tax Return, NOA printing `Tax on (your) taxable income` | call `guroos_tax_estimate(financial_year="<financial year printed on the document, as 2024-25>", taxable_income=<printed figure>, entity="individual")`; printed figure = the "Income tax from the tax table" line. Skip the comparison when the tool reports "no tax table for this year yet", or the document shows a non-resident, part-year resident (`Part-year tax-free threshold`), working holiday maker |
| Individual Tax Return, NOA printing all the lines | total tax payable − total credits and offsets = amount refundable or payable |
| Entity Tax Return (company / partnership / trust) | `Total income` − `Total expenses` = `Total profit or loss` (or `Net income or loss`); trust, partnership: `Total business income` − `Total expenses` = `Net income or loss from business` when the Reconciliation item is empty or 0 (has a figure: skip the comparison, Notes). Company: tax on Taxable income equals one of the two rates ("Base rate entity", "Other companies 30%") of `guroos_tax_estimate(…, entity="company")`; skip the comparison when the tool reports "no company tax rate for this year yet" |
| Financial Statements (title year column only) | Gross profit = Sales − Cost of goods sold; profit before tax = Gross profit (+ other income) − total expenses; profit after tax = before tax − Income tax; `Total assets` − `Total liabilities` = `Net assets` = Total equity |
| ATO Income Statement | tax withheld not greater than the gross amount (sign (4)) |

**Dates.** Use the date printed on the page: `Date of issue`, declaration signing date, lodgement date or file export date; not the period dates (`30 June YYYY`, `as at …`).
- Tax Return, NOA, Financial Statements: compare that date directly with the financial year end date: `Year ended …` if printed, otherwise 30 June of the title year; substitute period only when its box has a date. Same as or before the end date → STOP `[Figures] <date label> <date> not after financial year end <end date>`.
- Every type: call `guroos_date_check(document_date="<date>")` only to check for a future date; ignore "OVER" / "WITHIN" 30 days.
- ATO Income Statement for the current year (not yet `Tax ready`) is still valid; record the status in Notes.
- Standalone P&L, Balance Sheet: the end date is the printed period end ("to …", "as at …"), not 30 June. Exported before that date (report for a running period) does not STOP; Notes "period not ended at export, figures provisional".
- Period printed in the body (`1 July … to 30 June …`, substitute period box with a date, `Year ended …`) in a different financial year from the title → STOP `[Figures]`; empty date boxes, a shorter period within the same year, prior-year columns do not count. No date to compare → Notes.

## 3. Record in Fact Find

| Type | Field | If absent, write |
|---|---|---|
| Individual Tax Return, NOA | Taxable income (or loss, as printed) with the financial year, e.g. "88,320 (2024–25)" | "not on the document" |
| Individual Tax Return | Net profit / loss (figure of `Net income or loss from business`, business and professional items), printed label and financial year in brackets | "no business income on the return" |
| Entity Tax Return (company, partnership, trust) | Total income (figure of `Total income` or `Total business income`); Total expenses; Net profit / loss (figure of `Total profit or loss` or `Net income or loss`); keep field names exactly as in this column, printed label and financial year in brackets | "not on the document" |
| Tax Return (individual, partnership, company, trust) | Balance Sheet: `Total assets` and `Total liabilities` as printed on the return, printed labels and financial year in brackets | "not on the tax return" |
| Financial Statements — Profit and Loss (including standalone P&L, management accounts) | Total income; Total expenses; Net profit / loss | "not on the document" |
| Financial Statements — Balance Sheet (including standalone Balance Sheet) | Total assets; Total liabilities; Net assets | "not on the document" |
| ATO Income Statement | no Fact Find field | — |

- Add the printed label when it differs from the field name (e.g. "Total revenue"); with a prior-year column, take only the title year column. Standalone P&L, Balance Sheet: add the printed period ("1 July 2025 to 31 March 2026", "as at 31 March 2026"); write only the fields of the parts printed, no line for absent parts.

## 4. Notices

| Condition | Tag | Safe evidence | Action |
|---|---|---|---|
| TFN printed: pages on the block's "ID numbers" line, pages with `[TFN hidden]` or TFN visible on an image. An annotation that only covers the TFN does not remove it from the file, so still record | TFN | page numbers only; if the block lists "…", write "pages 1, 3, … and following pages" | redact the TFN before saving or sharing |
| Taxpayer name differs from the Applicant; entity document: legal name differs from the profile's entity (SKILL.md section 2) | Name mismatch | both names verbatim, where they differ | refer to staff for review |
| Profit and Loss with negative Net profit | Loss | profit/loss line verbatim and year | refer to staff for review |
| Step 6 difference over $1: entity Tax Return vs Financial Statements; individual Tax Return vs NOA | Figures mismatch | per `cross-checks.md` | refer to staff for review |
| A FLAG point in Step 0 (section 2) | Source file | source, or tag and page as in the block | verify with the issuer or request the original PDF |
| Standalone P&L or Balance Sheet, management accounts (section 1) | Source file | "standalone <type>, missing <sign>"; if the same block has a FLAG point in Step 0, merge into one line | request from the client the full set of Financial Statements prepared by the accountant (with Notes, declaration or Compilation Report), or verify the figures with the accountant |

`INVALID` block (except when there is no check block, see section 2): `[Source file] <summary of reasons> → ask the client to send the original PDF downloaded directly from myGov/ATO, or have the accountant/tax agent send it directly to the office`. If the reasons include `[Content edited]`, `[Text covered]`, `[Invalid number]` or `[Figures]`, add "; verify directly with the accountant/tax agent or the ATO before using the client's figures".

Notes only:
- Tax Return showing negative Taxable income or a business loss (`[Loss]` is only for Profit and Loss).
- Medicare levy other than 2% of Taxable income (may be reduced or exempt); NOA is an amended assessment.
- The comparisons done and their results.
- Something this file does not check (not a field, comparison or Notices condition here: the tax agent's or accountant's details, schedules or notes pages not needed under "Read by page") that could not be seen or confirmed: at most a Notes line, never "Could not check" (SKILL.md section 7).

## 5. Special notes

- **Entity:** partners, trustees, beneficiaries printed on the return are not compared with the Applicant.
- **File with several documents** (accountant's pack, NOAs for several years): one block `<file> (part n)` per part; recognise the type and check the structure per part. The check block covers the whole file: a STOP point in 2A (the row of any type in the file) or 2B makes every part `INVALID`. `[TFN]` goes in the part containing the page with the TFN.
- **Facts for cross-checking** by type:
  - Individual Tax Return: `<name> · year … · Total income … · Taxable income …`
  - Entity Tax Return: `<entity name> · year … · Total income … · Total profit or loss …`
  - NOA: `<name> · year … · Taxable income … · Date of issue …`
  - ATO Income Statement: `<name> · year … · payer <name>, ABN check digits valid · Gross payments … · Tax withheld …`
  - Financial Statements: `<entity name> · year ended … · Total income … · Net profit / loss … · Net assets …` (standalone P&L, Balance Sheet: printed period instead of year, only the parts printed)

## 6. Example

Fake data. Today 11/10/2026. The user states in chat: Applicant "Thi Mai Tran". The batch has only this file.

**Individual Tax Return from a tax agent.** Check block: "Source group: known software (XReport tax/accounting software, from Producer).", "ID numbers (digits not shown): TFN 15 times (pages 1, 3, 4, 5, 6, 7, 8, 9, …), 1 different number, check digits correct.", the sign sections and Technical notes all "none.". Content: "Individual tax return 1 July 2024 to 30 June 2025"; items `1 Salary or wages … C 92,500`, `D3`, `D5`; "TRAN, THI MAI" at the top of each page; "Total income or loss 92,500 · Total deductions 4,180 · Taxable income 88,320"; Taxation estimate "Tax on your taxable income 17,284.00 · Medicare levy 1,766.40 · PAYG credits 19,200.00 · Refund 149.60"; "Electronic lodgement declaration" signed 14/08/2025.

```
### tax return 2025.pdf — Individual Tax Return (rule 13) · certain
Conclusion: ACTION NEEDED
Source file check: passed (source: known software (XReport tax/accounting software, from Producer)) · rules: references/tax-financials.md
Record in Fact Find
- Taxable income: 88,320 (2024–25)
- Net profit / loss: no business income on the return
- Balance Sheet: not on the tax return
Notices
- [TFN] Pages 1, 3, 4, 5, 6, 7, 8, 9 and following pages show a TFN → redact the TFN before saving or sharing.
Could not check
- None
Notes
- Name "TRAN, THI MAI" matches Applicant Thi Mai Tran, different word order.
- Compared: Total income − Total deductions = Taxable income; tax − PAYG credits = Refund; tax per the 2024–25 tax table matches $17,284.00; declaration date 14/08/2025 after 30 June 2025.
- The batch has no Notice of Assessment for the same year to compare.
Facts for cross-checking: Thi Mai Tran · year 2024–25 · Total income 92,500 · Taxable income 88,320
```
