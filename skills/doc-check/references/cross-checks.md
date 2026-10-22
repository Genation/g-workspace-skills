# Cross-checks (multiple documents)

## When to use

Step 6 of SKILL.md: ONCE for the whole batch of one client, after steps 1–5 of every document.

- **Who takes part:** documents that passed Step 0 and are readable; INVALID, UNREADABLE count as absent. A document with `[Source file]` or "uncertain" still takes part; state that in the evidence. Exception: readable out-of-scope name-linking documents (Marriage, Change of Name, Birth Certificate) are still used in the last row of table 3.
- **Documents already on the deal** (CRM, the batch's deal known): the sets (table 1) and pairs (tables 2, 3) also take in the same person's documents already on the deal, so a partial upload is checked against what came before (payslip 2 after payslip 1, filed in an earlier run): files of `deal_files_list` (10.1, already read) with the same client (`document.subjectContactId`), a type of the set or pair, `archivedAt` and `replacedByDealFileId` empty (archived or superseded files never count) and a latest check that is not `not_met`. Their facts: the file name when the naming rule put them there unambiguously (period `14-27Sep26`, employer, account …4821), their latest check (`document_checks_list`, `dealFileId`, `limit` 1: Fact Find findings such as Employer ABN); a figure the rule needs that neither gives (a period not in the name, YTD Gross, a closing balance): read that page with `guroos_document_read` (`cloud` from the file's `document`). They are not checked or recorded again: name them in the evidence and in `periods` as "<file name> (already on the deal)"; the set lines go in the newest block of the batch. A batch file that is a likely duplicate of one of them (`crm-recording.md` 10.6) takes no part: the file on the deal does. Without a CRM or a known deal: the batch only.
- **Figures** come from "Facts for cross-checking"; if missing, re-read the exact page.
- **Pair only the same subject:** same person (names on the two documents MATCH, even when there is no Applicant yet), same entity (legal name; ABN/ACN if both print it), same account (institution and last 4 digits), same property address, same financial year (compare in the form 2024–25: `Company tax return 2025`, `Year ended 30 June 2025`, `For the year ended 30 June 2025` are all 2024–25).
- **Write in block A**, do not repeat in block B. Set rules are written ONCE in the newest block of the set; older blocks get a Notes line "checked as a set in block <file>".
- **Mismatch** → Notices `[<Tag>] <figure/date on A> · <figure/date on B> (<file B>) · differs by <difference> → refer to staff for review` (unless the table states another action). **Match** → Notes "compared <what> with <file B>: match". A difference of no more than $1 is a match. A mismatch never makes any document INVALID.

## Cross-check pairs

### 1. Same-source sets: combined periods

Call the tool ONCE per set (a one-document set reuses the step 4 result):
`guroos_date_check(document_date=<date of the newest document>, max_age_days=30, periods=[<{start, end} of each document>], min_months=<N>)`
Only the newest document is checked against 30 days; the number of months is checked on the continuous span containing it. This table replaces each document's 30-day and period rules.

| Set (receiving block: newest) | Same set when | Check | Tag |
|---|---|---|---|
| Payslip (12) | same Employee, same employer (compare ABN; if absent, compare name) | 30 days from Pay date (if absent, period end); consecutive periods, do not pass `min_months`. Each pair of adjacent periods in the same financial year: later YTD Gross − earlier YTD Gross = later period's Gross | Over 30 days · Not consecutive · Figures mismatch |
| Statements rule 19, 20, 21 | same account | 30 days; `min_months` 3 (19, 21) or 6 (20). Adjacent statements: earlier period's Closing = later period's Opening, exact match | Over 30 days · Under 3 months · Under 6 months · Figures mismatch |
| Centrelink (17), child support (18) | same Applicant, same payment, same payer; a set 18 may include Assessment, statement, Court Order, Child Support Agreement | `min_months=3`; 30 days counted from the newest document the 30-day rule applies to (Court Order, Child Support Agreement: note the date only). A gap before a span that is already "COVERS 3 months": Notes | Over 30 days · Under 3 months |
| Rental Statement (14), Airbnb (16) | 14: same property address; 16: same Host and listing | 30 days, period not checked. Rental Appraisal checked per document | Over 30 days |

### 2. Cross-group pairs per the checklist

| A (receiving block) | B | Compare what (difference > $1: write both figures) | Tag |
|---|---|---|---|
| Bank Statement (19) with pay credits | Payslip (12) of the same person | Pay credit = description has the employer name or "SALARY", "WAGES", "PAY", "PAYROLL"; pair with the payslip whose Pay date is the same day or up to 3 days earlier; if it cannot be paired, do not compare. Amount credited ↔ `Net pay` (payslip split across several accounts: the part paid into this account) | Pay mismatch |
| Bank Statement (19) with rent credits, Applicant is Landlord | Rental Agreement (15), Rental Statement (14) if any, same address | Tenant pays directly: amount credited = `Rent amount` for the same period (multiply only by whole weeks). Agency pays: amount credited = Paid / Net to owner on that period's statement; weekly rent on the statement = `Rent amount`; no statement: compare with `Rent amount`, add "agency payment may be net of management fees" | Rent mismatch |
| Non-Australian Passport (6) | Visa Grant Notice / VEVO (8); Australian Passport (5) | Same person = names MATCH, or the last 4 characters of the passport number printed on the visa are the same. No usable visa and no Australian passport of that same person → request the current visa from the client | Visa |
| Tax Return company / partnership / trust (13) | Financial Statements (13) of the same entity, same year | `Total income` ↔ total income on the Profit and Loss; `Total profit or loss` / `Net income or loss` ↔ pre-tax `Net profit / loss`. Do not compare `Taxable income` with Net profit | Figures mismatch |
| Individual Tax Return (13) | Notice of Assessment (13) of the same person, same year | `Taxable income`; if different, add Notes "the ATO may have adjusted it when assessing" | Figures mismatch |

Rule 6, passport block when the batch has a visa or an Australian passport of the same person (names MATCH but the passport number on the visa differs: still counts, Notes "visa linked to passport …<last 4 characters>"):
- Visa in effect → no `[Visa]`; Notes "visa included (<file>)".
- Visa no longer in effect (status other than "In Effect", or EXPIRED per the tool): the visa block already flags `[Visa]`; here Notes "included visa no longer in effect, see block <file>".
- Australian Passport present, even if expired → no `[Visa]`; Notes "has an Australian passport (<file>)".

### 3. Notes-only pairs

One Notes line in block A; existing tags stay unchanged.

| A ↔ B | Compare what → Notes state |
|---|---|
| Equifax (11) with Current Directorship ↔ Company Extract (10), profile entity (SKILL.md section 2: `guroos_case_profile` or what the user states in chat) | company name → whether it matches the profile entity or has an extract in the batch |
| Equifax (11) ↔ liability statements (20–23) | Credit Enquiry within `guroos_date_check(window_months=6, reference_date=<report date>)` → enquiries with no liability statement from the same lender, of the same type |
| Trust Deed (9), Trustee is a company ↔ Company Extract (10) | Trustee name ↔ company name → whether the trustee's extract is present (name the file) or not |
| Bank Statement (19) with regular repayments ↔ liability statement (20–21) from the same lender | amount debited ↔ `Repayment` (different frequency: do not convert) → match or mismatch, with both figures; or a repayment with no statement yet |
| Bank Statement (19) ↔ Contract of Sale (2) | large transfer out ↔ `Deposit` → equal (±$1): add "matches Deposit on <file>" to the `[Unusual transactions]` evidence |
| Bank Statement (19) ↔ Centrelink (17), child support (18) | credit ↔ per-period amount of `Income received` → match or mismatch, with both figures |
| Rental (14–16), Applicant is Landlord ↔ Rates Notice, Land Title (1) | rental property address → whether the batch has property documents for that address |
| Land Title (1) with a mortgage ↔ Home Loan Statement (20) | mortgagee ↔ `Lender` → different lender, or no statement from that mortgagee yet |
| Payslip (12) ↔ latest ATO Income Statement (13) | employer (ABN) → not in the Income Statement (may be a new job) |
| Medicare (7) blue, yellow ↔ Visa / VEVO (8) of the same person | residency status → the batch has no visa for that person, or the visa is Permanent but the card has not been changed |
| Document with `[Name mismatch]` ↔ change of name, marriage, birth certificate, ID document in that name | document linking the two names → add its file name to the `[Name mismatch]` evidence |

## Missing counterpart document

"Missing" = the batch has no B, B belongs to another person, account or year, or B is INVALID / UNREADABLE (add "<file B> INVALID, not used for cross-check"). Write in block A:
- Pay credits, no usable payslip → Could not check "compare pay with Net pay: no payslip in the batch"; payslips present but no credit pairs by Pay date → "compare pay: no pay credit matching a payslip period", Notes the Net pay and the nearest pay credit.
- Rent credits, no Rental Agreement for the address → Could not check "compare rent: no Rental Agreement in the batch"; period differs from the agreement or the statement prints only a monthly total → "compare rent: different period, not converted", Notes both figures.
- Entity Tax Return or Financial Statements without the other document for the same year → Could not check "cross-check Tax Return with Financial Statements: missing <document>".
- Individual Tax Return without a NOA for the same year, or the reverse → Notes "batch has no <type> for the same year to compare".

User gave the figure in chat: compare with that figure; evidence says "per the user, no document". Do not open files outside the batch yourself, except documents already on the deal ("When to use"); another file in `guroos_customer_files` may be B: name it in the "Could not check" line, ask at the end of the report (attached batch: ask for B to be attached).

## Example

Fake data. Today 11/10/2026. Applicant: Thi Mai Tran. Batch: payslip_1.pdf, payslip_2.pdf (Sample Logistics Pty Ltd, Pay date 16/09 and 30/09/2026, Net pay $2,150.00 on both); lease.pdf (Rent $620.00 per week, Applicant is Landlord, 12 Sample Street, Sampleton VIC 3000); rental_aug.pdf (same address, Paid to owner $2,289.04); everyday_q3.pdf (…4821).

Payslip set: `guroos_date_check(document_date=30/09/2026, max_age_days=30, periods=[{start: 31/08/2026, end: 13/09/2026}, {start: 14/09/2026, end: 27/09/2026}])` → `Document date: 30/09/2026 → 11 days → WITHIN 30 days`, `Merged: continuous, no gaps`.

```text
### everyday_q3.pdf — Bank Statement (rule 19) · certain
Conclusion: ACTION NEEDED
Source file check: passed (source: unknown) · rules: references/bank-liabilities.md
Record in Fact Find
- None
Notices
- [Pay mismatch] 30/09/2026 SAMPLE LOGISTICS PAY $2,000.00 · Net pay $2,150.00 (payslip_2.pdf, Pay date 30/09/2026) · differs by $150.00 → refer to staff for review
Could not check
- None
Notes
- Period 01/07/2026–30/09/2026 COVERS 3 months; Statement date 01/10/2026, today 11/10/2026: WITHIN 30 days (per the tool).
- Compared pay 16/09/2026 $2,150.00 with payslip_1.pdf: match.
- Compared rent 05/09/2026 $2,289.04 with Paid to owner on rental_aug.pdf: match; $620.00 per week matches Rent amount on lease.pdf.
- SAMPLE AUTO FINANCE repayment $412.00 monthly: the batch has no statement for this loan yet.
Facts for cross-checking: …4821 · period 01/07–30/09/2026 · pay 16/09 $2,150.00, 30/09 $2,000.00 · rent 05/09 $2,289.04 · repayment $412.00 monthly
```
