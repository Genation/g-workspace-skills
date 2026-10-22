# Trusts, companies and credit reports (rule 9–11)

## Scope

| Type | Rule | Includes |
|---|---|---|
| Trust Deed | 9 | Trust Deed, Deed of Settlement; accompanying deeds: Deed of Variation, Deed of Appointment/Retirement of Trustee |
| Company Extract | 10 | ASIC Current (& Historical) Company Extract, from ASIC or a search service |
| Equifax | 11 | One person's credit report. illion and Experian reports are treated like Equifax, note the bureau name; "Equifax" below covers both |

Out of scope: ABN Lookup result printouts (including "The Trustee for …"), Certificate of Registration, ASIC Connect name search results, apps that only show a credit score.

Read in this order (files in the client folder: `guroos_document_read(customer, file, pages)`):
- **Trust Deed**: pages 1–2 (trust name, date, parties) → Schedule (usually at the end) → signing page → certification line (first, last or every page). If the Schedule does not name beneficiaries, read Definitions.
- **Company Extract**: read all of it.
- **Equifax**: page 1 (report date, summary) → Credit Enquiries → Accounts / Repayment History → Defaults, Court, Insolvency → Directorships.

**Scanned pages** (common in old deeds) arrive as page images (SKILL.md): read signatures and certification stamps on the image like a normal page. Long scanned deed: open pages 1–2 and the last 3 pages first (Schedule, signing page and certification are usually there), open more only if something is still missing, at most 8 page images per deed. Pages with no image yet: see the end of section 4.

## 1. Required structural signs

Every type: (1) plus at least 3 of the other signs is "certain". A missing Schedule or signing page counts as missing pages.

| Type | Required signs |
|---|---|
| Trust Deed | (1) title "Trust Deed" / "Deed of Settlement"; (2) parties include Settlor and Trustee; (3) numbered clauses, definitions of Beneficiaries, Appointor, Vesting Date; (4) Schedule: trust name, Settled Sum, Trustee; (5) signing page "Executed as a deed" with a witness |
| Accompanying deed | (1) title "Deed of Variation" / "Deed of Appointment" / "Deed of Retirement"; (2) parties; (3) reference to the trust name and the original deed; (4) variation, appointment or retirement clauses; (5) as Trust Deed |
| Company Extract | (1) "Extracted from ASIC's database at … on …" or ASIC heading; (2) "Current Company Extract" / "Current & Historical Company Extract"; (3) Organisation details: name, ACN, Type, Registration date, Status; (4) Officeholders with appointment dates; (5) Share structure and Members |
| Equifax | (1) bureau name and report date; (2) details of the person reported on; (3) Credit Enquiries; (4) Accounts with monthly Repayment History; (5) Defaults, Court/Insolvency, Directorships sections (even if they say "None") |

## 2. Step 0 for this group

### 2A. File source

| Source | Trust Deed, accompanying deed | Company Extract, Equifax |
|---|---|---|
| office tool | ACCEPT (lawyers draft in Word) | FLAG |
| design tool | FLAG | FLAG |
| PDF editor/processor | FLAG | FLAG |
| PDF printer | NOTE | FLAG |
| HTML-to-PDF converter | NOTE | ACCEPT |
| image (JPG/PNG) | NOTE | FLAG |
| not a PDF (DOCX…) | FLAG | FLAG |

Apple, browser printing to PDF, unknown: NOTE. Images follow the "image (JPG/PNG)" row; the image check block only adds 5.2 and `[Image edited]` (2B).

### 2B. Signs checked by type

| Sign | Trust Deed, accompanying deed | Company Extract, Equifax |
|---|---|---|
| `[Text covered]` | STOP | STOP |
| `[Content edited]` | FLAG | STOP |
| `[Image edited]` | FLAG | FLAG |
| `[Text as outlines]` | NOTE | FLAG |
| `[Photo/scan]` | NOTE | NOTE |

### 2C. Figure and date checks

- **ACN** (extract, or Trustee is a company): rely on the block's "ID numbers (digits not shown)" line, do not compute check digits yourself. "check digits correct" → record "ACN check digit valid" in Facts for cross-checking; failures that did not become `[Invalid number]` → Notes; block does not count the ACN (image, scanned page) → Notes "ACN read from image, check digit not verified". ABN and ACN of the same company: the last 9 digits of the ABN must equal the ACN.
- **Shares**: for each class, the total shares held by Members must equal the number issued in Share structure, exactly.
- **Equifax 6-month mark**: `guroos_date_check(window_months=6, reference_date=<report date>)`; take enquiries from the first date of the "6-month window: …" line onwards.
- **Equifax internal consistency**: an enquiry or late-payment month after the report date is a mismatch; default or enquiry counts in the summary that differ from the number of detail lines (all pages read) are a mismatch.
- This group has no document age limit; do not tag `[Over 30 days]`.

## 3. Record in Fact Find

| Type | Field | If absent, write |
|---|---|---|
| Trust Deed | Trust Name; Trustee Name (company: write the company name) | Could not check |
| Trust Deed | Beneficiary Name: only people named specifically (Primary, Specified, Named) | "No specifically named beneficiary"; general classes ("spouse, children") go in Notes |
| Company Extract | ACN; Director Name (every current director); Shareholder Name (every current member) | Could not check |
| Equifax | (none) | "- None" |

"Current & Historical" extract: ignore the Former, Ceased, Previous sections.

**ACN lookup** (Company Extract; ABN Lookup, SKILL.md 5.5): `guroos_abn_lookup(acn=<ACN as printed>, name_to_match=<company name as printed in Organisation details>)`.
- Fact Find ACN: ACN as printed, plus "(ABN Lookup <lookup date>: ABN <ABN returned by the tool>, <ABN status>)".
- ABR only has the ABN status; ASIC registration status (Status), directors and shareholders still come from the extract. Do not record the tool's "The company's ASIC registration status … is not in ABR" line, because the extract already prints Status.
- "ABR has no record" for the ACN: Notes "ABN Lookup has no ABN for this ACN (the company may not have registered an ABN)", no tag. ACN read from an image and the tool still says invalid after re-reading: "Could not check: ACN lookup: ACN read from image is invalid".
- The tool's other "Due diligence notes" (not registered for GST; Active for less than 12 months) → Notes, keeping the tool's meaning.

**Record in Broker's Notes** (Equifax only):
- Report date.
- Every Credit Enquiry (consumer and commercial) in 6 months: date, organisation, type, amount. None → "No enquiries in 6 months".
- Every Default and late-payment month: organisation, account type, last 4 digits if any, month, code. None → "No defaults, no late-payment months".

Late payment = code 1–6 or X in Repayment History, or "Worst repayment status" other than "Current". Code 0 is on time; other letter codes (C, R, P…) are account statuses.

## 4. Notices

| Condition | Tag | Safe evidence | Action |
|---|---|---|---|
| Deed: a specifically named Beneficiary does not match any Applicant | Name mismatch | name, page | refer to staff for review |
| Deed: a signing party (Settlor, Trustee; accompanying deed: every party) is missing a signature or signing date | Not signed | which party is missing what, page | refer to staff for review |
| Deed: no certification ("Certified true copy" with signature, name, title, date) | Not certified | pages viewed | request a certified copy from the client |
| Extract: a current Director or Shareholder does not match any Applicant | Name mismatch | name, role | refer to staff for review |
| Extract: Status other than "Registered" | Company status | status verbatim | refer to staff for review |
| Extract: ABN Lookup, the company's ABN status is Cancelled | ABN cancelled | ABN, cancellation date per the tool | refer to staff for review |
| Extract: ABN Lookup, "Name check" is NO MATCH | Business name mismatch | name on the extract and ABR name verbatim | refer to staff for review |
| Trust or company name different from the profile entity (SKILL.md section 2: `guroos_case_profile` or what the user said in chat) | Name mismatch | both names | refer to staff for review |
| Equifax: has a Current Directorship | Directorship | company name | request an Accountant Letter from the client if income from that company is not used in the servicing calculation |
| Equifax: has a Default, late-payment month, Court Judgement, Personal Insolvency or Serious Credit Infringement | Adverse credit | organisation, type, month, code | refer to staff for review |
| Mismatch per 2C | Figures mismatch | comparison, printed figure, difference, page | refer to staff for review |

Electronic signatures (DocuSign…) count as signed. Signatures and certification stamps on pages with a text layer are usually images or drawn strokes: view the signing and certification pages with `guroos_attachment_page` (SKILL.md section 2) before concluding. Relevant part not fully read (the tool cannot render the page): do not conclude "not signed", "not certified", "no defaults"; record it under "Could not check".

Notes only when:
- An Applicant's name is absent from the deed or extract (a named person who matches no Applicant is still `[Name mismatch]`).
- Name on the Equifax report differs from the Applicant; names of Settlor, Appointor, individual Trustee, Secretary (the checklist does not compare these names).
- Previous Directorships; enquiries before the 6-month mark.
- Profile has no entity yet: record the trust or company name.
- Something this file does not check (not a field, comparison or Notices condition here: deed clauses or pages not needed under "Read in this order", the credit score, old addresses, whether a signature or stamp is genuine (only whether it is there is checked)) that could not be seen or confirmed: at most a Notes line, never "Could not check" (SKILL.md section 7).

## 5. Special notes

- **Several people.** Compare each beneficiary, director and shareholder with each Applicant.
- **Entity name.** The "ATF …" part is the trust name, compared separately. A trading name is not the legal name.
- **Accompanying deeds.** One block per document (rule 9); check signatures, signing dates and certification as for a deed. Fact Find records only the fields that document states (Deed of Appointment: Trust Name, new Trustee Name). The Trust Deed block takes `Trustee Name` from the latest document in the batch, noting the document name and date.
- **Equifax.** One report per person, one block. Do not copy old addresses.
- **Cross-check**: table 3 of `references/cross-checks.md` (Trustee is a company, Current Directorship, 6-month enquiries); the results are Notes of this block.

## 6. Example

Fake data. Today 11/10/2026. User said in chat: Applicant "Thi Mai Tran"; entity Mai Tran Pty Ltd (company). The batch has no Company Extract and no liability statements.

File `equifax-thi-mai-tran.pdf`. Block: "Source group: browser printing to PDF (browser (Chrome/Edge), from Producer).", no signs. Prepared 01/10/2026; `guroos_date_check(window_months=6, reference_date="01/10/2026")` returns "6-month window: 01/04/2026–01/10/2026 (counted back from 01/10/2026)". Enquiries: 15/08/2026 ABC Bank, Credit Card, $10,000; 02/02/2026 XYZ Finance, Personal Loan, $20,000. ABC Bank card (…4821): 05/2026 code 1, other months code 0. Defaults, Court, Insolvency: None. Current Directorships: MAI TRAN PTY LTD.

```
### equifax-thi-mai-tran.pdf — Equifax Credit Report (rule 11) · certain
Conclusion: ACTION NEEDED
Source file check: passed (source: browser printing to PDF (browser (Chrome/Edge), from Producer)) · rules: references/entity-credit.md
Record in Fact Find
- None
Record in Broker's Notes
- Report date: 01/10/2026.
- Credit Enquiry in 6 months (from 01/04/2026): 15/08/2026, ABC Bank, Credit Card, $10,000.
- Late payment: ABC Bank Credit Card (…4821), 05/2026, code 1. Default: none.
Notices
- [Directorship] Current Directorship: MAI TRAN PTY LTD → request an Accountant Letter from the client if income from this company is not used in the servicing calculation.
- [Adverse credit] ABC Bank Credit Card (…4821) late payment 05/2026, code 1 → refer to staff for review.
Could not check
- None
Notes
- Source browser printing to PDF (browser (Chrome/Edge)).
- Enquiry 02/02/2026 (XYZ Finance) is before the 6-month mark, so not recorded.
- MAI TRAN PTY LTD is the profile's entity; the batch has no Company Extract for this company yet.
- Enquiry 15/08/2026 ABC Bank Credit Card: the batch has no ABC Bank card statement yet.
Facts for cross-checking: prepared 01/10/2026 · Current Directorship MAI TRAN PTY LTD · enquiry 15/08/2026 ABC Bank Credit Card $10,000 · late payment 05/2026 card …4821 · default: none
```
