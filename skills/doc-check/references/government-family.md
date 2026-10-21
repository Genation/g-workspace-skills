# Government benefits and child support (rule 17–18)

## Scope

| Type | Rule |
|---|---|
| Centrelink Statement: Income Statement, Payment Summary, Statement of benefits, benefit confirmation letter | 17 |
| Child Support Assessment; Child Support statement (Statement of account, Payment history) | 18 |
| Family Court Order: Orders, Consent Orders | 18 |
| Binding / Limited Child Support Agreement (extended type) | 18 |

- Read first: pages 1–2 and the page with totals; middle pages only when needed for the period or 2C. Court Order: also the orders about money ("child support", "maintenance", "pay", "$") and the last page (court seal). Letters, agreements: read all.
- Older versions printed "Department of Human Services" or "Child Support Agency" still count.
- Department of Veterans' Affairs (DVA) benefit letters: handle like Centrelink, write "uncertain: agency DVA".
- Binding / Limited Child Support Agreement: write "uncertain: Child Support Agreement".
- Out of scope: Solicitor letters, Family & Community Services letters (FACS, now NSW Department of Communities and Justice, or the equivalent agency in other states), even when the letter is about child support or benefits; other easily confused types in the "Easily confused with" column (section 1).

## 1. Required structural signs

| Type | Required signs | Easily confused with |
|---|---|---|
| Centrelink Statement | (1) Services Australia / Centrelink in the header; (2) statement or confirmation letter heading; (3) recipient's name, address (with CRN); (4) Date of issue or letter date; (5) name of each benefit (Family Tax Benefit, Parenting Payment, JobSeeker…) with amount and payment period; (6) date range or table of payments | Concession Card, Centrelink debt letter → Out of scope |
| Child Support Assessment | (1) Services Australia – Child Support; (2) assessment heading; (3) receiving and paying parties (Receiving / Paying parent, Payee / Payer); (4) amount (annual rate, may include per month); (5) start date or assessment period; (6) letter date | — |
| Child Support statement | (1) Services Australia – Child Support; (2) Statement of account / Payment history; (3) receiving and paying parties; (4) table of dates and amounts; (5) date range; (6) print date | — |
| Family Court Order | (1) court name (Federal Circuit and Family Court of Australia, Family Court of Western Australia; older: Family Court of Australia, Federal Circuit Court); (2) file number, parties (Applicant / Respondent); (3) Orders / Consent Orders, "the Court orders"; (4) numbered orders; (5) order date, Judge / Registrar; (6) court seal or Registrar's signature | Minute of Proposed Consent Orders, Application for Consent Orders, Parenting Plan → Out of scope |
| Child Support Agreement | (1) Binding / Limited Child Support Agreement heading; (2) named parties (father, mother, carer); (3) child support terms: amount, period, paying party, receiving party; (4) parties' signatures and signing dates | separate Solicitor letter → Out of scope (the signed legal advice certificate attached belongs to the agreement) |

## 2. Step 0 for this group

### 2A. File source

| Type | FLAG when Source group is |
|---|---|
| Centrelink, Child Support, Court Order | office tool; design tool; PDF editor/processor; not a PDF (DOCX…) |
| Child Support Agreement | design tool; PDF editor/processor; not a PDF |

Other sources: NOTE (myGov, Courts Portal or printed from a browser; agreements are usually drafted in Word). JPG/PNG image files: NOTE, whatever source group the image block shows.

### 2B. Signs checked by type (all types)

| Tag in the block | Handling |
|---|---|
| `[Text covered]`, `[Content edited]` | STOP. A save made only for signing or attaching a digital signature is under Technical notes, without this tag |
| `[Image edited] The file information names an image editor: …` | STOP |
| `[Image edited] The EXIF thumbnail (…) has a different aspect ratio …` | FLAG |
| `[Photo/scan]`, `[Text as outlines]` | NOTE. Scanned page: read on the attached page image. A page that must be read has no text layer and no readable image ("no text layer; <reason>", "scanned image not sent" that `guroos_attachment_page` cannot render, a file in the client folder for which `guroos_document_read` returns no page image (SKILL.md section 2), blurry image) → `UNREADABLE`, request the PDF downloaded from myGov or a clearer copy |

### 2C. Figure and date checks

**Figures.** Tolerance $1; mismatch → `[Figures mismatch]` per the common template, not STOP. Do not convert the annual rate, do not recalculate benefit rates.
- Centrelink, Child Support statement: sum of the payment lines for one payment = printed total for that payment.
- Assessment, Court Order, Agreement: no figure comparison.

**Dates and periods**: `guroos_date_check(document_date=<Date of issue / letter date / print date>, max_age_days=30, periods=[{start, end}], min_months=3)`; no period: omit `periods`, `min_months`.
- Court Order (order date), Child Support Agreement (signing date): the 30-day rule does NOT apply; ignore "OVER"/"WITHIN" 30 days, check only for a future date.
- Period "(has a date in the future)" (assessment, order applying into the future): Notes only.

How to get the period:
- Printed date range (statement period, assessment period, from – to): exactly that range.
- Only a table of payments: period start of the first payment → period end of the last payment; no periods printed: first payment date → last payment date, note how it was worked out.
- "Receiving since <date>" (receiving since, paid since): <date> → document date.
- Only a financial year printed (`2024–25`, `Year ended 30 June 2025`): 01/07/2024 → 30/06/2025.
- Only an obligation start date ("commencing", "until the child turns 18"): no period → Could not check "Under 3 months: <what the document states>", unless the set has a period from another document (section 5).

## 3. Record in Fact Find

| Type | `Income received` | If absent, write |
|---|---|---|
| Centrelink Statement | name of each benefit, amount and payment period, one line per benefit; add total and date range if printed | not on the document |
| Child Support Assessment / statement | amount and period as printed (annual rate, per month…), paying party | not on the document |
| Family Court Order | amount, period, paying party, order number | Order has no payment |
| Child Support Agreement | amount, period, paying party | not on the document |

- Rule 18, Applicant is the paying party: `Income received: not recorded, Applicant is the paying party (an expense)`, amount and period go in Notes. Unclear whether the Applicant receives or pays: `Income received: not yet recorded, Applicant's role unclear`.
- Do not also copy: Child Support reference, court file number, children's names and dates of birth.

## 4. Notices

| Condition | Tag | Safe evidence | Action |
|---|---|---|---|
| The set's latest Centrelink, Child Support Assessment or statement: tool returns OVER 30 days | [Over 30 days] | date type, document date, today per the tool | refer to staff for review |
| The set's latest continuous stretch of periods: tool returns SHORT OF 3 months | [Under 3 months] | period used, the "Gap" lines | refer to staff for review |
| Rule 17: recipient name DIFFERENT from every Applicant | [Name mismatch] | both names verbatim, where they differ | refer to staff for review |
| Rule 18: no Applicant matches the receiving or paying party | [Name mismatch] | party names and roles as printed | refer to staff for review |
| Step 0 gives FLAG (2A, 2B) | [Source file] | source group, software name, tag in the block | verify with the issuer (Services Australia, court, law firm) or request the original |
| Document shows a TFN (the block's "ID numbers" line, a page with `[TFN hidden]` or a TFN visible in an image) | [TFN] | page numbers only | mask the TFN before saving or sending |

Notes only: Court Order order date, Child Support Agreement signing date; gaps before a latest stretch that already covers 3 months; paying party in arrears (arrears, amount owing) or a payment that has stopped (cancelled, ceased), amounts and dates as printed; Child Support "Private Collect" (Services Australia does not collect).

Could not check: period (2C); rule 18 unclear whether the Applicant receives or pays → "Applicant's role".

## 5. Special notes

- **Roles (rule 18):** receiving party = Receiving parent = Payee = carer; paying party = Paying parent = Payer = liable parent. In a Court Order, "Applicant" / "Respondent" are the parties in court, not the profile's Applicant. "The Father pay to the Mother": link to names via the front of the order; cannot link → "Could not check".
- **Several Applicants:** compare each person; one Applicant in the right role is enough. The other party not being an Applicant is normal, do not notify.
- **Set:** same Applicant, same payment (same benefit name; or child support / maintenance for the same child), same paying party; may include Assessment, statement, Court Order, Child Support Agreement. Step 6 (cross-checks.md table 1): 3 months checked on the latest continuous stretch, 30 days on the latest document the 30-day rule applies to; these two lines are written ONCE in that document's block (set with only Court Order, Child Support Agreement: the latest block), other blocks write "checked as a set in the block for <file>".
- **Facts for cross-checking:** recipient · paying party · payment name · amount and payment period · document period · document date · whether the Applicant receives or pays · receiving account (…NNNN) if any.

## 6. Example

Fake data. Today 11/10/2026 (per `guroos_date_check`). Applicant: Thi Mai Tran.

**Court Order and Payment history with the same paying party.** court_orders.pdf: Federal Circuit and Family Court of Australia, Consent Orders, Applicant: Thi Mai Tran, Respondent: Daniel Sample, Orders made 14/02/2025; Order 9 "The Respondent pay to the Applicant child maintenance of $250.00 per week commencing 01/03/2025"; sealed. Check block: `Source group: PDF editor/processor (Adobe Acrobat, from Producer).`, Technical notes `The file has a digital signature (Guroos has not verified the signature).` Tool: `Document date: 14/02/2025 → 604 days → OVER 30 days` (Court Order: ignore). cs_payments.pdf (Payment history, Payee THI MAI TRAN, Payer DANIEL SAMPLE, Period 01/07/2026 – 30/09/2026, Date printed 05/10/2026) is the set's latest document. Step 6: `guroos_date_check(document_date=05/10/2026, max_age_days=30, periods=[{start: 01/07/2026, end: 30/09/2026}], min_months=3)` → `Document date: 05/10/2026 → 6 days → WITHIN 30 days`, `Period 01/07/2026–30/09/2026 → COVERS 3 months`; the cs_payments.pdf block (PASS) writes "Set with court_orders.pdf: period 01/07/2026–30/09/2026 COVERS 3 months; Date printed 05/10/2026, today 11/10/2026: WITHIN 30 days (per the tool)".

```
### court_orders.pdf — Family Court Order (rule 18) · certain
Conclusion: ACTION NEEDED
Source file check: passed (source: PDF editor/processor (Adobe Acrobat, from Producer)) · rules: references/government-family.md
Record in Fact Find
- Income received: child maintenance $250.00 per week (order 9), paying party Daniel Sample
Notices
- [Source file] Source group: PDF editor/processor (Adobe Acrobat, from Producer) → verify with the court or request the original.
Could not check
- None
Notes
- "Applicant" in the order is the party in court; name matches the profile's Applicant: receiving party.
- Orders made 14/02/2025: the 30-day rule does not apply to a Court Order.
- Order only states "commencing 01/03/2025": period checked as a set in the block for cs_payments.pdf.
- The file has a digital signature (Guroos has not verified the signature).
Facts for cross-checking: Recipient Thi Mai Tran · paying party Daniel Sample · child maintenance $250.00 per week from 01/03/2025 · order date 14/02/2025 · Applicant is the receiving party
```
