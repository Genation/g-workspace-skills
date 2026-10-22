# Bank statements and liabilities (rule 19–23)

## Scope

| Code | Rule | Type |
|---|---|---|
| A | 19 | Bank Statement: Everyday, Savings, Spending, Salary Credits, Rent Income; offset account; Transaction history printed from internet banking |
| B | 20 | Home Loan Statement (Mortgage, Loan account statement) |
| C | 21 | Personal Loan, Car Loan, Credit Card Statement (including store cards) |
| D | 22 | Study loans: HELP (HECS-HELP, FEE-HELP, SA-HELP, OS-HELP), VSL / VET FEE-HELP, SSL, ABSTUDY SSL, TSL / Apprenticeship Support Loan, SFSS; the institution's CAN |
| E | 23 | Buy Now Pay Later: Afterpay, Zip, Klarna, humm, PayPal Pay in 4… |

- **Read first:** A, B, C page 1 (account, period, balance, interest rate, Repayment; card interest rates are usually on the last page), then EVERY transaction page to the last page. D, E read in full.
- Transaction pages not all read: do not conclude "no unusual transactions" or "no late payments": "Could not check: <unusual transactions | late payments>: page … not read".
- A study loan from a bank (not the ATO) is a Personal Loan (C).
- The institution's CAN (debt for one study period, no balance): "uncertain", Notes "HELP balance from myGov needed".

## 1. Required structural signs

| Type | Required signs | Easily confused with |
|---|---|---|
| A | (1) bank name; (2) Statement / Transaction history; (3) Account name; (4) BSB, account number (may be masked); (5) period; (6) Opening, Closing balance (Transaction history: Balance column or "Balance B/F"); (7) transaction table Date, Description, Debit, Credit (or Amount column with +/−), Balance; no loan interest rate | B (has "% p.a.", Loan balance); credit card (Credit limit); balance confirmation letter (no period, no transactions) → Out of scope |
| B | (1) lender; (2) "Home Loan" / "Mortgage" / "Loan account"; (3) account holder(s), loan account number; (4) period; (5) "Interest rate … % p.a."; (6) Opening / Closing or Loan balance; (7) repayment transactions, "Interest charged"; (8) Repayment amount | offset statement (A); Letter of Offer, loan contract (no period, no transactions) → Out of scope |
| C · Personal / Car Loan | as B, title "Personal Loan", "Car Loan", "Vehicle / Motor finance"; has Repayment and frequency | loan contract → Out of scope |
| C · Credit Card | (1) issuer; (2) "Credit Card Statement"; (3) cardholder, masked card number; (4) period or Statement date; (5) Credit limit; (6) Opening / Closing balance; (7) "Minimum payment due", Due date; (8) Purchase rate (or `Annual percentage rate` for Purchases); (9) transactions | debit card statement (A) |
| D | (1) ATO or myGov; (2) loan name from the Scope section; (3) borrower name; (4) balance (Current balance, Accumulated HELP debt); (5) balance date ("as at", "Balance at", print date); (6) Indexation, Compulsory / Voluntary repayment lines that have occurred (a new debt may have none yet) | — |
| E | (1) provider; (2) account holder; (3) Account balance / Amount owing; (4) Spending / Credit limit; (5) payment schedule (Instalments); (6) issue date or period | order confirmation email → Out of scope; Latitude Gem, 28° are credit cards (C) |

- **Combined statement of several accounts at the same bank:** one block `<file> — Home Loan Statement + Bank Statement (rule 20, 19)`; apply each type's rules to each account, start each Fact Find field set and each notify line with the last 4 digits; each account is its own set (section 5).
- **Transaction history** with no printed period: period = first → last transaction date, note how it was worked out; no account holder name printed: "uncertain: missing (3)", name comparison goes to "Could not check".
- **One file with several statements of the same account** (several months): one block; check the balances of each statement; each statement is one period in `periods`.

## 2. Step 0 for this group

### 2A. File source

| Source group | A (19) | B–E (20–23) |
|---|---|---|
| PDF printer | FLAG | FLAG |
| image (JPG/PNG), whatever source the image block shows | FLAG | NOTE (screenshot of a BNPL app) |
| office tool; design tool; PDF editor/processor; not a PDF (DOCX, XLSX, CSV…) | STOP `[Source]` | FLAG |

Other sources: NOTE, including browser printing to PDF, HTML-to-PDF converter, Apple (printed from internet banking, ATO online, myGov). Column A is only for account statements (rule 19); loan, card, HELP, BNPL statements (rule 20–23) use column B–E: office tool is FLAG, not STOP.

### 2B. Signs checked by type

| Tag in the block | A (19) | B–E (20–23) |
|---|---|---|
| `[Content edited]`, `[Text covered]` | STOP | STOP |
| `[Image edited] The file information names an image editor: …` | STOP | FLAG |
| `[Image edited] The EXIF thumbnail (…) has a different aspect ratio from the main image …` | FLAG | FLAG |
| `[Photo/scan]`, `[Text as outlines]` (whatever scan/image-merge software created the file) | FLAG | NOTE |

Scanned pages: read from the attached page images. Pages with no text layer and no readable image ("no text layer; <reason>", "scanned image not sent" that `guroos_attachment_page` cannot render, files in the client folder for which `guroos_document_read` returns no page image (SKILL.md section 2), blurry images): items needing that page go to "Could not check"; no page readable → `UNREADABLE`.

### 2C. Figure and date checks

| Comparison (when all figures are printed; max difference $1) | Passes when |
|---|---|
| Balance A | Opening + Total credits − Total debits = Closing. Only when the statement PRINTS the totals; do not add up the transaction list yourself |
| Balance B, C | Opening + total debits (interest, fees, spending) − total credits (repayments) = Closing, when totals are printed; keep signs as printed |
| Page carry-over | "Balance carried forward" = "brought forward" on the next page, exact match |

- **Fails after re-reading:** Balance A, Page carry-over of A, read from the original text layer → STOP `[Figures] <comparison>: <printed figures> differ by <difference>`. Otherwise (A read from an image or the OCR text layer of a `[Photo/scan]` page; B, C) → `[Figures mismatch]` per the common template, no STOP.
- **Document date** = Statement date; none (Transaction history printout) → period end date; print date in Notes only.
- A, B, C: 30 days and period checked per set (section 5); a single file is also a set.
- D, E: no period or 30-day check; `guroos_date_check(document_date=<"as at" date or issue date>)` only to check for a future date, ignore "OVER"/"WITHIN".

## 3. Record in Fact Find

| Type | Field |
|---|---|
| A | (none): "- None" |
| B, C | `Lender` · `Account name` (every account holder) · `Account number` (loan: in full as printed; if the printed number is partly masked, copy exactly the printed part; Credit card: below the table) · `Interest rate` (figure and label; Comparison rate is not Interest rate) · `Repayment` (amount, frequency) · `Loan Expiry date` (Loan end / maturity / Final repayment date; if only the remaining term is printed, copy it verbatim, do not calculate) |
| D | `Current balance` (with label, "as at" date) · `Repayments` (Compulsory / Voluntary repayment for the most recent financial year printed) |
| E | `Account balance` · `Limit` ("Available to spend" is not Limit) |

- Field not printed on the document: "not on the document".
- **Credit card:** `Account number` = the account number if the statement prints it separately from the card number ("Account number", "Account No."), in full as printed; only a card number: last 4 digits with "(card number)", e.g. "…4821 (card number)", never copy the full card number even if the statement prints it in full. `Repayment` = "Minimum payment due" (with Due date); `Loan Expiry date` = "not applicable"; `Interest rate` = Purchase rate (sign (8)); Credit limit goes in Notes.
- Split loan: a field set for each split, starting with the last 4 digits. Fixed rate expiry, Interest-only end date are not `Loan Expiry date` (Notes).

## 4. Notices

| Condition | Rule | Tag | Safe evidence |
|---|---|---|---|
| Account holder matches no Applicant (joint account: check each person, including co-owners who are not Applicants; only the middle name differs: matches, SKILL.md section 6, no note). Applicant not named on the account: Notes only | 19–23 | Name mismatch | both names verbatim, where they differ |
| Latest continuous period span of the set is UNDER 3 months | 19, 21 | Under 3 months | the tool's "Period …" and "Gap" lines |
| As above, UNDER 6 months | 20 | Under 6 months | as above |
| Latest statement of the set is OVER 30 days old | 19–21 | Over 30 days | date type, document date, today per the tool |
| Unusual transactions (4A) | 19 | Unusual transactions | one line per group: date, description, amount |
| Pay credited differs from Payslip Net pay; rent credited differs from Rent amount (`cross-checks.md` table 2) | 19 | Pay mismatch; Rent mismatch | per the template in `cross-checks.md` |
| "Late payment fee", "Dishonour fee", "Payment reversal", "Missed payment" | 20, 21 | Late payments | date, description, amount |
| "Arrears", "Overdue", "Past due" with an amount greater than $0 | 20, 21 | Arrears | date, amount |
| The block's "ID numbers" line has a TFN, pages with `[TFN hidden]` or TFN visible on an image | 22 | TFN | page numbers only |

Action for `[TFN]`: "redact the TFN before saving or sending".

### 4A. Unusual transactions (rule 19)

| Group | Recognised by | Record |
|---|---|---|
| Large transfers | not pay, rent, regular loan repayments or transfers between accounts in the Applicant's own name; and from $5,000, or larger than the largest regular pay credit on the statement | each one |
| Overseas | foreign currency (USD, VND…), "Foreign transaction fee", "International transfer", "Telegraphic transfer", SWIFT, Western Union, MoneyGram, Wise, Remitly, WorldRemit, OFX, Ria | each transfer; card purchases: the 5 largest and "N others" |
| Cash deposits | "Cash deposit", "ATM deposit"; each from $1,000, or 3 or more times in the period | each one |
| Gambling | TAB, Sportsbet, Ladbrokes, bet365, Neds, PointsBet, Betfair, Unibet, BlueBet, casino, Crown, The Star, The Lott, Lotterywest, Tatts, Lottoland, Keno, pokies, gaming | every one, including small amounts and winnings |

Copy only the transactions to notify.

**Notes only when:**
- Transfers between accounts in the Applicant's own name; crypto asset transactions (CoinSpot, Binance…) below the large transfer threshold.
- Type A account with "Dishonour fee", "Overdrawn fee".
- Credit card: Credit limit, "Overlimit fee", "Cash advance". Home loan: Fixed rate expiry, offset, redraw.
- BNPL with late fees (rule 23 checks the name only).
- Something this file does not check (not a field, comparison or Notices condition here: a logo, a masked BSB, card artwork) that could not be seen or confirmed: at most a Notes line, never "Could not check" (SKILL.md section 7).

## 5. Special notes

- **Statement set** = every statement of the SAME account (same institution and last 4 digits; if fully masked, same account name and product) in the batch. Step 6 calls once per set:
  `guroos_date_check(document_date=<document date of the latest statement>, max_age_days=30, periods=[<period of each statement>], min_months=3)` (rule 20: `min_months=6`).
  - Latest continuous span "SHORT OF N months" → `[Under 3 months]` / `[Under 6 months]`, state the spans and "Gap". A gap before a span that is already "COVERS": note only.
  - Consecutive statements: Closing of the earlier period = Opening of the next, exact match. Mismatch → `[Figures mismatch]` in the latest block, no STOP.
- An `INVALID` statement is not in the set; the latest block has the note "<file> not counted in the set (INVALID)".
- **Facts for cross-checking.** A: …NNNN (institution, type) · account holder · period · Opening / Closing · pay, rent, Centrelink credited (payer, amount, frequency, dates) · regular loan repayments out (name, amount). B, C: lender · …NNNN (last 4 digits of the Account number, even when the label is Contract / Loan / Card Number; even if Fact Find has it in full, here still only the last 4 digits) · account holder · Repayment · Closing balance and date · Credit limit. D: Current balance and date. E: provider · Account balance · Limit.

## 6. Example

Fake data. Today 11/10/2026 (per `guroos_date_check`). Applicant: Thi Mai Tran.

**Bank Statement, pay differs from payslip.** everyday_q3.pdf, 8 pages. Block: `Source group: unknown.`, both sign sections "none.", Technical notes has only `The creating software is not on the known list.` Statement date 01/10/2026; Total credits $15,350.00, Total debits $14,604.30. Tool: `Document date: 01/10/2026 → 10 days → WITHIN 30 days`, `Period 01/07/2026–30/09/2026 → COVERS 3 months`. The batch has payslip_2.pdf (Pay date 30/09/2026, Net pay $2,150.00), no other payslip and no liability statement.

```
### everyday_q3.pdf — Bank Statement (rule 19) · certain
Conclusion: ACTION NEEDED
Source file check: passed (source: unknown) · rules: references/bank-liabilities.md
Record in Fact Find
- None
Notices
- [Unusual transactions] Gambling: 12/08/2026 SPORTSBET $200.00; 25/08/2026 SPORTSBET $300.00 → refer to staff for review
- [Unusual transactions] Cash: 14/08/2026 CASH DEPOSIT $1,350.00 → refer to staff for review
- [Unusual transactions] Overseas: 03/09/2026 WISE INTL TRANSFER $1,500.00 → refer to staff for review
- [Pay mismatch] 30/09/2026 SAMPLE LOGISTICS PAY $2,000.00 · Net pay $2,150.00 (payslip_2.pdf, Pay date 30/09/2026) · difference $150.00 → refer to staff for review
Could not check
- None
Notes
- Read all 8 pages. Source unknown (the creating software is not on the known list).
- $3,210.55 + $15,350.00 − $14,604.30 = Closing $3,956.25: matches.
- Set has only this statement: period 01/07/2026–30/09/2026 COVERS 3 months; Statement date 01/10/2026, today 11/10/2026: WITHIN 30 days (per the tool). Name "THI MAI TRAN" matches Applicant.
- Pay before 30/09/2026: the batch has no payslip for the same period, not compared.
- Repayment "SAMPLE AUTO FINANCE" $412.00 monthly: the batch has no statement for this liability yet.
Facts for cross-checking: …4821 (Sample Mutual Bank, Everyday) · THI MAI TRAN · period 01/07–30/09/2026 · Opening $3,210.55 · Closing $3,956.25 · pay "SAMPLE LOGISTICS PAY" $2,000.00 every 14 days (7 times, 08/07–30/09/2026) · repayment "SAMPLE AUTO FINANCE" $412.00 on the 15th of each month · no rent, Centrelink credited
```
