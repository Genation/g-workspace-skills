# Rental: Rental Statement, Rental Agreement, Rental Appraisal, Airbnb (rule 14–16)

## Scope

| Type | Rule | Read first (files in the client folder: `guroos_document_read` with `pages`) |
|---|---|---|
| Rental Statement: Owner / Ownership / Rental Statement, agency EOFY statement | 14 | Page 1 (header, period, summary table). Detail pages only when needed for 2C. |
| Rental Agreement: Residential Tenancy / Rental Agreement, Lease | 15 | Pages 1–3 (parties, address, term, rent), then the last 1–2 pages (signatures). Rent or parties not found: read the Schedule / Item section. |
| Agency Rental Appraisal / Rental Estimate | 16 | Page 1. |
| Airbnb Rental Statement: Earnings, Transaction history, Payouts | 16 | The page with totals (first or last), the payout list when needed for 2C. |

Stayz, Booking.com: handle like Airbnb, write "uncertain: platform <name>".

**Scanned pages** arrive as page images (SKILL.md): read parties, rent, signatures on the image like a normal page. Signing page with a text layer, or a "scanned image not sent" page: view with `guroos_attachment_page` (attachments) or keep reading with `guroos_document_read` with `pages` (files in the client folder; SKILL.md section 2). Pages still without a readable image ("no text layer; <reason>", tool cannot render): those pages go to "Could not check", do not conclude a signature line is blank.

Out of scope: Tenant ledger (tenant's payment history, no fees and no amount paid to owner); Management Agreement / Agency Authority (no Tenant); Rental application; Bond lodgement form; Sales appraisal, CMA (sale price); website estimates without an agency header; booking receipts where the Applicant is the guest.

## 1. Required structural signs

| Type | Required signs |
|---|---|
| Rental Statement | (1) header of the property management agency (name, address or ABN / licence); (2) statement heading with period or statement date; (3) owner name and rental property address; (4) money table with Rent received, fees (Management fee, Letting fee…) and amount paid to owner (Paid / EFT / Net to owner) |
| Rental Agreement | (1) tenancy agreement heading; (2) parties: Landlord / Lessor / Rental provider and Tenant / Lessee / Renter; (3) rental property address; (4) term: start date, end date or periodic; (5) rent with payment period; (6) numbered clauses and signing section |
| Rental Appraisal | (1) agency header; (2) Rental Appraisal / Estimate / Market rent heading; (3) property address; (4) estimated rent (one figure or a range) with period; (5) date and property manager / agent name |
| Airbnb Rental Statement | (1) Airbnb; (2) Earnings / Transaction history / Payouts heading; (3) Host and date range; (4) booking or payout table with amounts, Host service fee and total (Total paid out, Gross earnings) |

## 2. Step 0 for this group

### 2A. File source

| Type | FLAG when Source group is | Reason |
|---|---|---|
| Rental Statement | design tool; PDF editor/processor; not a PDF (DOCX, XLSX…) | statements are exported by property management software, not made with design tools |
| Rental Agreement, Rental Appraisal | PDF editor/processor; not a PDF | agencies often draft agreements in Word, appraisals in Canva |
| Airbnb Rental Statement | office tool; design tool; PDF editor/processor; not a PDF | Airbnb does not issue in Word/Canva |

Image (JPG/PNG): NOTE; the image check block only adds 5.2 and `[Image edited]` (2B).

### 2B. Signs checked by type (all four types)

| Tag | Handling |
|---|---|
| [Text covered] | STOP |
| [Content edited], [Image edited] | FLAG. A save made only for a handwritten signature, digital signature or highlight is a "Technical notes" line, without this tag |
| [Photo/scan], [Text as outlines] | NOTE |

### 2C. Figure and date checks

Tolerance $1; mismatch: `[Figures mismatch]`. Do not recalculate fee % or GST.
- **Rental Statement:** sum of rent lines = printed total income; total income − total fees and expenses = amount paid to owner; with Opening and Closing balance: Opening + income − expenses − paid to owner = Closing.
- **Airbnb:** sum of payouts = printed total; Gross earnings − Host service fee − adjustments printed on the document = Total paid out.
- **Dates** (`guroos_date_check`):
  - Statement, Appraisal, Airbnb: `document_date=<statement date / Date of issue / date prepared; if none, the period end (EOFY printed as FY2026 or 2025–26: 30/06/2026)>`, `max_age_days=30`.
  - Agreement: `document_date=<signing date>` only to check for a future date, ignore "OVER"/"WITHIN" 30 days (Agreement has no 30-day rule); `expiry_date=<end date>` for notes only. A tenancy start date after today is normal.

## 3. Record in Fact Find

| Type | `Rent amount` |
|---|---|
| Rental Statement | Rent received (before fees) and the statement period; add the rent rate if printed (e.g. "$620.00 per week") |
| Rental Agreement | amount and payment period (per week / fortnight / month / calendar month) |
| Rental Appraisal | estimated figure or range and period |
| Airbnb Rental Statement | total payout / earnings and date range |

Not printed: write "not on the document". Statement covering several properties: one line per address.

## 4. Notices

| Condition | Tag | Safe evidence | Action |
|---|---|---|---|
| Statement, Airbnb: the set's latest document is OVER 30 days. Appraisal: check each document | [Over 30 days] | date type, document date, today | refer to staff for review |
| Agreement: name on the Applicant's side DIFFERENT from the Applicant | [Name mismatch] | both names verbatim, where they differ | refer to staff for review |
| Agreement: no Applicant on the Landlord or Tenant side | [Name mismatch] | names of the parties on the agreement | refer to staff for review |
| Appraisal: landlord / owner DIFFERENT from the Applicant; Airbnb: Host DIFFERENT from the Applicant | [Name mismatch] | both names verbatim | refer to staff for review |
| Step 0 gives FLAG (2A, 2B) | [Source file] | the block's line | verify with the issuer (agency, Airbnb) or request the original |

**Set** = Rental Statements for the same property address; Airbnb with the same Host and listing. The set's 30-day rule checks only the latest document and is written ONCE in its block; older blocks write the Note "checked as a set in the block for <file>".

Notes only:
- Rental Statement with an owner name different from the Applicant (rule 14 has no name row): write both names.
- Agreement: whether the Applicant is Landlord or Tenant; do not compare the other party's name. Applicant is Tenant: Rent amount is the rent payable.
- Agreement EXPIRED per the tool (may have rolled over to periodic).
- Agreement has a blank signature line.

Write "Could not check":
- Agreement where the Applicant's side is unclear (e.g. only "c/- <agency> as agent for the landlord" printed) → "Applicant's side".
- Appraisal does not print the landlord's name → "landlord name: not printed on the document".

## 5. Special notes

- **Roles:** Landlord = Lessor = Rental provider (VIC) = Owner; Tenant = Lessee = Renter (VIC). Managing agent / Landlord's agent is not the Landlord.
- **Applicant's side:** the party whose name matches or nearly matches an Applicant (same surname, a shared given name), or the side the profile indicates (Applicant's property rented out → Landlord). Do not guess.
- **Several people:** compare each Applicant. One Applicant on the right side is enough; another Applicant not named, or a co-named person who is not an Applicant → Notes. Party is a company / trust ("<name> Pty Ltd ATF <name> Trust"): compare the legal name with the profile's entity.
- **Property being purchased:** the appraisal may be addressed to the vendor or to no one. Still follow section 4, note "may be the property being purchased".
- **Facts for cross-checking** (for `references/cross-checks.md`): rent rate and period, property address, whether the Applicant is Landlord or Tenant, statement period, total income, amount paid to owner, Host.

## 6. Example

Fake data. Today 11/10/2026; Applicant: Thi Mai Tran.

lease.pdf, 14 pages, pages 1–3 and 13–14 read. Check block: "Source group: office tool (Microsoft Office, from original Creator).", under "Signs to weigh by document type:" there is "- [Content edited] The file was saved 1 more time after it was made, and a later save wrote new text into the page content.", Technical notes "- 2 drawings or annotations added in empty space (Ink) on page 14, for example a hand signature.". Content: "Residential Rental Agreement · Rental provider: Mai Tran, c/- Sample Realty · Renter: Jordan Sample · 12 Sample Street, Sampleton VIC 3000 · Rent $620.00 per week · 01/11/2025 to 31/10/2026 · page 14: both parties signed on 20/10/2025". `guroos_date_check(document_date=20/10/2025, expiry_date=31/10/2026)` → "Expiry: 31/10/2026 → CURRENT (20 days left)"; signing date not in the future.

```
### lease.pdf — Rental Agreement (rule 15) · certain
Conclusion: ACTION NEEDED
Source file check: passed (source: office tool (Microsoft Office, from original Creator)) · rules: references/rental.md
Record in Fact Find
- Rent amount: $620.00 per week
Notices
- [Source file] [Content edited] The file was saved 1 more time after it was made, and a later save wrote new text into the page content. → verify with Sample Realty or request the original.
- [Name mismatch] Rental provider "Mai Tran", Applicant "Thi Mai Tran": first name "Thi" missing → refer to staff for review.
Could not check
- None
Notes
- Source office tool (Microsoft Office).
- 2 drawings or annotations added in empty space (Ink) on page 14, for example a hand signature.
- Applicant is on the Rental provider (Landlord) side: same surname, shared given name; Renter name not compared.
- Agreement runs to 31/10/2026, current per the tool.
Facts for cross-checking: Rent $620.00 per week · Applicant is Landlord · term 01/11/2025–31/10/2026 · 12 Sample Street, Sampleton VIC 3000
```
