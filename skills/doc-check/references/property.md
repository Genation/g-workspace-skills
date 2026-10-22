# Property documents (rule 1–3)

## Scope

| Rule | Type | Includes |
|---|---|---|
| 1 | Rates Notice | council Rates (and Charges) Notice |
| 1 | Owners Corporation Notice | Levy / Fee Notice from an Owners Corporation, Strata, Body Corporate; a standalone OC Certificate is also handled as this type |
| 1 | Land Title Certificate | Register Search Statement, Title Search, Certificate of Title |
| 2 | Contract of Sale | Contract of Sale, Contract for Sale, Offer & Acceptance; an accompanying Section 32 / Vendor's Statement belongs to the same set |
| 3 | Building Contract | home building contract (HIA, Master Builders…) |

Out of scope: Water Bill, electricity/gas bills, Land Tax assessment, Valuation Notice, Sales Advice, quotes, builder tenders, standalone variations, drawings, Plan of Subdivision, Property Report, strata meeting minutes and budgets.

**Long documents.** Rule 1 is usually 1–4 pages: read all. A contract can run to hundreds of pages: read pages 1–3 first (files in the client folder: `guroos_document_read` with `pages`), use the table of contents if any, then look only for:
1. Front section: Particulars of Sale (VIC; SA "Contract for the Sale and Purchase of Land"), Reference Schedule (QLD "Contract for Houses and Residential Land"), Particulars / Schedule of the Standard Form Contract (TAS), the Offer and Acceptance form and its Annexures (WA; general conditions printed separately as "Joint Form of General Conditions"), the cover page of the NSW form "Contract for the sale and purchase of land"; for a Building Contract, the Schedule. Look for: parties, price, deposit, settlement, conveyancer.
2. Finance condition: the Loan / Finance item, Special Conditions or Annexure.
3. Signing pages of every party.

Do not read General Conditions, Section 32, drawings unless needed to find the three parts above.

**The contract set is ONE rule 2 document.** Section 32 / Vendor's Statement (VIC), Form 1 and Form R3 (SA), annexures, disclosures (WA, QLD, TAS) and every attached appendix (title search, rates, water, planning, drainage plan, property/land tax clearance certificate, environmental report, checklist) inside the contract file belong to the Contract of Sale block: do not split into separate blocks, do not split out an out-of-scope line; the appendix names may go in Notes. Split into `(part n)` only when the file also holds a completely different client document (e.g. a statement).

**Scanned pages** arrive as page images (SKILL.md): read parties, price, signatures, signing dates on the image like a normal page. Signing page without an image: see "Signatures" in section 5.

**Image pages in an e-signing envelope.** Technical notes "Page … has an image covering almost the whole page, with the text on top of it" where the page text is only the e-signing envelope ID ("Docusign Envelope ID…") or loose unlabelled values: the page content is in an image Guroos has not sent: view that page with `guroos_attachment_page` (SKILL.md section 2), then read it on the image. Tool cannot render it: treat the page as unreadable: "Could not check", or `UNREADABLE` when the front section (item 1 above) and the signing pages are all like this; the block still writes `Source file check: … · rules: references/property.md`. Do not assign loose values to Price, Deposit, Purchaser or any other field.

## 1. Required structural signs

| Type | Required signs |
|---|---|
| Rates Notice | (1) issued by a council; (2) rates heading with the rates year; (3) Assessment No. and property address; (4) valuation (CIV, Site / Land Value); (5) charges table with total, due date or instalments, payment methods |
| Owners Corporation Notice | (1) OC / Strata / Body Corporate name with plan number; (2) Lot number and unit address; (3) levies by fund (Administrative, Maintenance / Capital Works / Sinking Fund); (4) amount payable, due date |
| Land Title Certificate | (1) heading of the state land registry; (2) Volume/Folio, Folio Identifier or Title Reference; (3) land description (Lot … on Plan …); (4) Registered Proprietor; (5) Encumbrances / Dealings; (6) search date or edition |
| Contract of Sale | (1) name of the sale contract form; (2) named Vendor and Purchaser (Seller, Buyer); (3) property; (4) Price, Deposit; (5) settlement terms; (6) signing section for both parties |
| Building Contract | (1) name of the building contract form; (2) Owner and Builder (with licence, ABN); (3) site address; (4) Contract price; (5) progress payments table; (6) signing section for Owner and Builder |

Standalone Section 32: a sale contract with missing pages.

## 2. Step 0 for this group

### 2A. File source

| Type | FLAG when Source group is |
|---|---|
| Rates Notice, Land Title | office tool; PDF printer; PDF editor/processor; design tool; not a PDF (DOCX…) |
| Owners Corporation Notice | PDF printer; PDF editor/processor; design tool; not a PDF |
| Contract of Sale, Building Contract | design tool; not a PDF |

Image (JPG/PNG): NOTE; the image check block only adds 5.2 and `[Image edited]` (2B).

Reason: small stratas often prepare levies in Word; contracts are usually drafted in Word, merged and signed in Acrobat.

### 2B. Signs checked by type

| Tag | Handling |
|---|---|
| [Text covered] | STOP |
| [Content edited] | FLAG, contracts included. A save made only for signing is shown by the block under Technical notes ("to add annotations (markup, hand signatures…)", "to attach a digital signature") |
| [Image edited] | FLAG |
| [Text as outlines] | as "PDF printer" in 2A: rule 1 FLAG, contracts NOTE |
| [Photo/scan] | NOTE |

### 2C. Figure and date checks

Tolerance $1.
- Rule 1: printed items (arrears, current charges, less payments) = total payable.
- Contract of Sale: Price − Deposit = Balance (when printed).
- Building Contract: sum of progress payments = Contract price (or 100%). Mismatch: Notes only (printed figures, difference), no `[Figures mismatch]`.

Dates, compared with `guroos_date_check`:
- Rule 1 Due date, Finance approval date, a specific Settlement Date: `expiry_date=<date>`. EXPIRED → Notes "passed", do not notify.
- Issue date, signing date: `document_date=<date>`, check only for a future date. This group has no 30-day rule: ignore "OVER"/"WITHIN" 30 days.
- Relative dates ("60 days from the day of sale"): write verbatim, do not calculate.

## 3. Record in Fact Find

| Type | Field | If absent, write |
|---|---|---|
| Rates, OC, Land Title, Building Contract | none | - None |
| Contract of Sale | Finance Clause / Loan Approval Date (also written to the Monday column): date verbatim with the clause | "none" when not subject to finance, the finance box is blank or struck out; not readable → Could not check |
| Contract of Sale | Settlement Date (also written to the Monday column): date, or verbatim if relative | Could not check |
| Contract of Sale | Conveyancer / Legal Practitioner: name, firm, phone, email; state whether purchaser's or vendor's, if both, write both | "not printed on the contract" |

Do not copy the Assessment number or BPAY codes.

## 4. Notices

| Condition | Tag | Safe evidence | Action |
|---|---|---|---|
| Rule 1 shows prior debt > 0 (Arrears, Overdue, Past due, unpaid Balance brought forward, Interest on arrears) | [Arrears] | label and amount as printed | request proof of payment from the client |
| Rule 1: an Owner / Registered Proprietor / Lot owner does not match any Applicant or entity | [Name mismatch] | both names verbatim, where they differ | request confirmation of property ownership from the client |
| Contract of Sale: a Purchaser / Buyer does not match | [Name mismatch] | as above | ask the Conveyancer to prepare an Amendment / Nomination Form |
| Building Contract: an Owner does not match | [Name mismatch] | as above | request an Amendment from the client |
| Contract missing a signature or signing date of any party (every Purchaser, Vendor; every Owner, Builder) | [Not signed] | which party, what is missing, page | refer to staff for review |
| Step 0 gives FLAG (2A, 2B) | [Source file] | source, tag, page | verify with the issuer or request the original |
| 2C figure mismatch for rule 1, Contract of Sale | [Figures mismatch] | printed figures, difference | refer to staff for review |

Notes only:
- Current-period amount (Amount due), even when the due date has passed: not arrears.
- Building Contract: progress payments differ from Contract price (2C).
- An Applicant is not named on the document, while everyone named on the document matches an Applicant.
- "and/or nominee" after the purchaser's name.
- Electronic signature, signing by an attorney, director, executor or administrator of an estate: counts as signed.
- Land Title with a mortgage or caveat: write the mortgagee's or caveator's name.
- Something this file does not check (not a field, comparison or Notices condition here: a logo, payment slip or BPAY details, General Conditions or appendix pages not needed under "Long documents", whether a signature is genuine (only whether each party signed is checked)) that could not be seen or confirmed: at most a Notes line, never "Could not check" (SKILL.md section 7).

## 5. Special notes

- **Whose names are compared.** Each person ON the document against the profile's Applicants and entity (SKILL.md section 2). A co-owner or co-purchaser who is not an Applicant is also `[Name mismatch]`. Vendor, Builder: no name comparison, only signatures checked.
- **Initials.** Rule 1 bills often print "T M TRAN": an abbreviated first name is still DIFFERENT; only an abbreviated or missing middle name ("THI M TRAN", "THI TRAN" for Thi Mai Tran) is a match (SKILL.md section 6), no note. Ignore the "C/- <managing agent>" part.
- **Signatures.** Signing page could not be viewed (tool cannot render the page): write "Could not check", do not conclude "Not signed". A signature on the Section 32 does not replace the contract signature. A form with only one shared date box: that date counts for every party. A counterpart signed by one party only: still `[Not signed]`, note that it may be a counterpart.
- **Signing page with a text layer only.** Handwritten or electronic signatures are usually images or drawn strokes, not in the text layer. A signature in the text layer ("DocuSigned by…", "Signed by…") means signed, no need to view the image. Otherwise: view the signing page with `guroos_attachment_page` (SKILL.md section 2), check each party's signature on the image. Write `[Not signed]` when the image shows a party's signature box empty, or that party's signing date box left blank (missing signing date). Tool cannot render: "Could not check: signature on page <n> (text layer only)", do not conclude `[Not signed]` just because the text layer has no signature. Pre-typed names and dates are not signatures.
- **Cross-check.** Write in "Facts for cross-checking" what `references/cross-checks.md` uses: property address, mortgagee (Land Title), Deposit (Contract of Sale).

## 6. Example

Fake data. Today 11/10/2026; Applicant: Thi Mai Tran; no entity.

40-page contract, pages 1–3 and 20 read. Check block: "Source group: PDF editor/processor (Adobe Acrobat, from original Producer).", under "Signs to weigh by document type:" there is "- [Photo/scan] Page 20 is an image of the whole page, with no text layer from the original file.", Technical notes "- The file was saved 1 more time to attach a digital signature." and "- The file has a digital signature (Guroos has not verified the signature).". Content: "Vendor: Alex SAMPLE · Purchaser: Thi Mai TRAN and Van An LE and/or nominee · 8 Sample Street, Sampleton VIC 3000 · Price $650,000 · Deposit $65,000 · Balance $585,000 · Settlement: 60 days from the day of sale · Special Condition 3: approval date 20/10/2026 · Purchaser's legal practitioner: Sample Conveyancing, 03 5550 0123 · page 3: both Purchasers signed digitally on 01/10/2026 · page 20 (scanned picture, see the attached picture of page 20): Vendor signed, date box blank".

```
### contract.pdf — Contract of Sale (rule 2) · certain
Conclusion: ACTION NEEDED
Source file check: passed (source: PDF editor/processor (Adobe Acrobat, from original Producer)) · rules: references/property.md
Record in Fact Find
- Finance Clause / Loan Approval Date: 20/10/2026, Special Condition 3 (also written to the Monday column)
- Settlement Date: "60 days from the day of sale" (also written to the Monday column)
- Conveyancer / Legal Practitioner: purchaser's - Sample Conveyancing, 03 5550 0123
Notices
- [Name mismatch] Purchaser "Van An LE" does not match any Applicant → ask the Conveyancer to prepare an Amendment / Nomination Form.
- [Not signed] Vendor Alex SAMPLE missing signing date (page 20) → refer to staff for review.
Could not check
- None
Notes
- Source PDF editor/processor (Adobe Acrobat).
- [Photo/scan] Page 20 is a scanned image; Vendor signature read on the page image.
- The file was saved 1 more time to attach a digital signature.
- The file has a digital signature (Guroos has not verified the signature).
- Purchaser "Thi Mai TRAN" matches Applicant; "and/or nominee" present.
Facts for cross-checking: 8 Sample Street, Sampleton VIC 3000 · Deposit $65,000
```
