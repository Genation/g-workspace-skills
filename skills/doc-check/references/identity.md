# Identity documents (rule 4–8)

## Scope

| Code | Rule | Type |
|---|---|---|
| A | 4 | Driver Licence (including screenshots of digital licences), Proof of Age Card, Photo Card, other ID card |
| B | 5 | Australian Passport |
| C | 6 | Non-Australian Passport |
| D | 7 | Medicare Card (green; blue "Reciprocal"; yellow "Interim") |
| E | 8 | Visa Grant Notice, VEVO |

Read first: passport information page (photo, MRZ); Visa Grant Notice page 1, then the page with the visa expiry.

## 1. Required structural signs

| Type | Required signs |
|---|---|
| A · Driver Licence | State name + "Driver Licence" (Learner, Probationary); photo; "Licence No."/"Licence Number"; licence class (C, LR, MR, HR, HC, MC, R…); expiry date |
| A · Proof of Age / Photo Card / ID card | Issuing agency (Service NSW, VicRoads, TMR, Australia Post "Keypass"…) + card title; photo; card number; expiry date |
| B · Australian Passport | "AUSTRALIA" + "PASSPORT"; Type P, Code AUS; Passport No.; Surname, Given names; Date of expiry; 2 MRZ lines of 44 characters, line 1 starts with `P<AUS` |
| C · Non-Australian Passport | As B, country code other than AUS (`P<VNM`, `P<CHN`, `P<NZL`…) |
| D · Medicare | The word "medicare"; 10-digit card number (printed 4-5-1); name lines numbered 1, 2, 3… (that number is the IRN); "VALID TO" |
| E · Visa Grant Notice | Department of Home Affairs letter (formerly DIBP); "Visa grant notice"; "Visa grant number"; "Date of grant"; visa class/subclass; visa holder's name |
| E · VEVO | "Visa Entitlement Verification Online"/"VEVO"; "Visa class / subclass"; "Visa status"; "Visa expiry date" or "Period of stay"; work rights or visa conditions |

Only the passport cover, only the back of the card, VEVO missing the expiry page: missing fields go to "Could not check".

Similar:
- Out of scope: WWCC card, security card, white card, boat licence, student card, employee card, Citizenship Certificate, Birth Certificate (including translations), Marriage, Change of Name Certificate, private health insurance card, Health Care Card, Pensioner Concession Card, DVA card.
- A card without a licence class is a Photo Card. Foreign ID card, ImmiCard (3-line MRZ starting with `I`): A, "uncertain: not an Australian state card". Document of Identity: B, "uncertain".
- Certified copy (page with images of documents pasted on, wording "certify … true copy"): one part per document; for the certification only a Notes line "certified copy", do not copy the certifier. No document image attached: `UNREADABLE` (needs a photo or a separate scan), do not write Out of scope. Photo of the client holding the document (video call): no separate part, Notes only.
- E "uncertain": "Acknowledgement of valid application received" (only confirms the application was lodged, not a visa: section 4); a self-typed visa summary without the VEVO labels.

## 2. Step 0 for this group

This group has no STOP other than SKILL.md section 5.2; the highest level is FLAG.

### 2A. File source

| Source | A–D | E |
|---|---|---|
| design tool | FLAG | FLAG |
| office tool; PDF editor/processor; not a PDF (DOCX…) | NOTE | FLAG |

ACCEPT: images (JPG/PNG) for A–D, with or without an image check block (the image block's source group is not assessed in 2A); browser printing to PDF and HTML-to-PDF converter for E (printed from VEVO, ImmiAccount). Other sources, including images for E: NOTE.

### 2B. Signs checked by type (A–E)

| Sign | Handling |
|---|---|
| `[Image edited]`, `[Content edited]` | FLAG |
| `[Text covered]` | FLAG; a field to record that is covered → "Could not check" |
| `[Photo/scan]`, `[Text as outlines]` | NOTE |

### 2C. Dates and ID numbers

| Check | Tool call | Result |
|---|---|---|
| Expiry A, C, D, E (E: "Visa expiry date" or the last day of "Period of stay") | `guroos_date_check(expiry_date=…)` | EXPIRED → `[Expired]`; E → `[Visa]` |
| Expiry B | `guroos_date_check(expiry_date=…, expiry_grace_years=2)` | "EXPIRED (more than 2 years ago)" → `[Expired]` |
| VEVO check date | `guroos_date_check(document_date=…, max_age_days=30)` | OVER 30 days → Notes |
| Documents with an MRZ (B, C; ImmiCard, foreign ID card, card or visa label with an MRZ) | `guroos_identity_check(mrz=…, printed={surname, given_names, birth_date, expiry_date, nationality, sex, document_number})`; B, C add `passport={number, country}` | Read the result as below |
| D | `guroos_identity_check(medicare={number, irn})`: `number` all 10 digits, `irn` the digit next to the name (**Medicare** item below the table) | As above |
| A · licence | `guroos_identity_check(licence={number, state})` | Format only (no check digit) |

- Passport "15 AUG 2025" = 15/08/2025. Expiry printed only as month/year (Medicare "VALID TO 08/2027", Keypass "EXPIRY 08-27"): current until the end of that month, send the tool 31/08/2027.
- **Medicare.** The card number has 10 digits, usually printed in three groups 4-5-1 (`2123 45670 1`). The last digit (the one-digit group) is the issue number and is part of the card number: `number` = all 10 digits as printed (`"2123 45670 1"`), do not split off the last digit as the IRN. The IRN is the digit printed next to each person's name (at the start of the name line: "1 ISLA M BRENNAN" has IRN 1): `irn` = the digit next to the Applicant's name line (no Applicant yet and the card has only 1 name line: that line), read on the name line, not taken from the card number. Cannot tell which line: omit `irn`, do not use the last digit of the card number instead.
- `mrz`: every MRZ line as read on the image, one line per row, every letter and digit, keep `<` between parts (such as `<<` between surname and given names); do not correct it to be "right". Long runs of `<` (end of the name line, empty personal number field) need not be counted exactly: the tool recounts and confirms against the printed text; a note "miscount of <" without `[Re-read needed]`: do not call the tool again. Do not run commands (shell, python) to build, count or fix MRZ lines. `printed`: copy as printed; omit fields not printed; document does not print surname and given names separately: use `name`. Send every part of one document in one call. Do not compute check digits yourself.
- Take the expiry only from `guroos_date_check` with the printed date; ignore the `[Expired]` "According to the MRZ" line of `guroos_identity_check` (an MRZ expiry that differs from the printed expiry already gives `[MRZ mismatch]`).
- Compare the name with the Applicant using the printed name, not the MRZ name (upper case, no diacritics, may be truncated).

Reading the `guroos_identity_check` result (a 2C result, not a file check block: not assessed under SKILL.md 5.2, 2A, 2B, including `[Invalid number]`):
- Lines under "Wrong or mismatched numbers" (`[MRZ check digit wrong]`, `[MRZ invalid]`, `[MRZ mismatch]`, `[Invalid number]`, `[Wrong format]`), `[Licence format]`, the word "MISMATCH" in the "MRZ against the printed text" line: re-read the image once, call again. Still there → FLAG (`[Source file]` line, section 4), does not by itself become `INVALID`.
- Medicare `[Invalid number]` about length ("has N characters; it needs 10 digits"): on that re-read, look at the card again and check the 4-5-1 grouping: `number` must include the last digit (issue number), `irn` comes from the name line; fix and call again. Record `[Source file]` as above only if the length is still wrong.
- `[Re-read needed]`, or no MRZ or number can be read from the image: re-read (look again at the image already in the conversation), call the check tool again; still the same → "Could not check: <field>, image not clear enough". Other technical notes (including "could not compare" without `[Re-read needed]`): copy the relevant line into Notes.
- Evidence: the sign name without square brackets, the field and MRZ line as the tool prints them, "unchanged after re-reading"; do not copy the tool's genuine/fake assessment sentence. Do not copy MRZ lines or Medicare numbers; licence number only in the Licence No. field; other numbers only the ending as the tool prints it.

## 3. Record in Fact Find

Field not clearly readable: "Could not check".

| Type | Field | How to write |
|---|---|---|
| A | Licence No. | Copy the full number as printed, without spaces; exactly the number sent to `guroos_identity_check`. Photo Card: the card number. A Card No. printed separately on a licence is not the Licence No. Characters still uncertain after re-reading → "Could not check", do not guess |
| A, B, C | Name on document | Verbatim as printed; passports use "Surname, Given names" on the printed page, not the MRZ |
| A, B, C | Expiry Date | DD/MM/YYYY; card printing only month/year: MM/YYYY |
| B, C | Document No. | The "Passport No." field on the printed page, not the MRZ |
| D | Name on document | The Applicant's line, with its line number (IRN); none → "no name line for <Applicant>", raise `[Name mismatch]`. No Applicant yet: section 5 |
| D | Expiry Date | As printed: MM/YYYY (green card) or DD/MM/YYYY |
| E | Active Visa subclass | Subclass of the "In Effect" visa |
| E | Visa type | Visa name as printed + group |
| E | Name on document | Verbatim |

Assign the Visa type group from the wording on the document, do not infer it from the subclass; cannot assign → "Could not check":
- **Bridging**: says "Bridging", or subclass 010, 020, 030, 040, 050, 051.
- **Temporary**: says "Temporary"/"Provisional", or the visa expiry/"Period of stay" is a specific date. Special Category (subclass 444, New Zealand citizens) is Temporary even if it says "Indefinite".
- **Permanent**: says "Permanent", or "Period of stay: Indefinite".
- "Must not arrive after" is the re-entry deadline, not the visa expiry.

Beyond the SKILL.md list, do not copy: Visa grant number; passport number printed on the Visa/VEVO (use only the last 4 characters for comparison); other people's names on the same card.

## 4. Notices

Compare names per SKILL.md section 6. **Middle name:** given name and surname match and the middle name is only printed as the correct initial, or is missing on one side (Medicare often prints only the initial: "ISLA M BRENNAN" = Isla Margaret Brennan; "ISLA BRENNAN" likewise) is a MATCH: no `[Name mismatch]`, no Statutory Declaration request. Only A, B, C (documents the lender uses to verify identity; the name on the loan application follows the full printed name) add a Notes line `middle name differs from profile: "<printed name>" / "<profile name>"`; D, E record nothing. A wrong initial, a different middle name, an abbreviated given name (first name) or surname is still DIFFERENT.

Compare addresses (A only): ignore case, punctuation, abbreviations (St = Street, VIC = Victoria, "Unit 3, 12" = "3/12"); a different unit number, street number, street name, suburb or postcode is DIFFERENT. An address stuck on or printed on the back of the card is the latest address.

| Condition | Tag | Evidence | Action |
|---|---|---|---|
| A, B: name DIFFERENT from the Applicant (a middle-name-only difference as above: does not count) | Name mismatch | Both names verbatim, where they differ | prepare a Statutory Declaration / Name Change Certificate |
| C, D, E: name DIFFERENT (as above) | Name mismatch | As above | prepare a Statutory Declaration |
| A: address DIFFERENT from profile | Address mismatch | Both addresses, which part differs | request an updated address from the client |
| A, C, D: expired; B: expired more than 2 years | Expired | Expiry Date, today (B adds the 2-year mark) | request a current document or a replacement document from the client |
| C: always, unless the batch has a valid Visa/VEVO or that person's own Australian passport | Visa | Country code; batch has no visa or Australian passport for this person | request the current visa from the client |
| E: Temporary or Bridging | Visa | Visa type, subclass, visa expiry | check whether the lender accepts this visa type |
| E: "Visa status" other than "In Effect", or visa expiry passed | Visa | Status verbatim, or visa expiry and today | visa no longer in effect, request the current visa from the client |
| E: only "Acknowledgement of valid application received" | Visa | "application acknowledgement letter, not a visa" | request a VEVO or Bridging visa grant notice from the client |
| Step 0 gives FLAG (2A, 2B, ID numbers in 2C) | Source file | Source, or the block's tag and line; ID numbers per 2C | request a clear photo of the original document from the client or verify with the issuer |

Notes only:
- Address matches after expanding abbreviations; card does not print an address ("no address to compare").
- B expired not more than 2 years: Expiry Date, 2-year mark, today.
- D blue or yellow card: "card holder is not yet a permanent resident; see visa".
- Screenshot of a digital licence: "some lenders require the physical card".
- VEVO over 30 days old; Visa Grant Notice does not show the current status.

## 5. Special notes

- **Medicare with several people.** For each Applicant take the line whose name is closest to that person to compare, record one "Name on document" line. Lines of people not in the profile: "card has N other name lines, ignored", do not copy the names. No Applicant yet: card has only 1 name line → "Name on document" copies that name verbatim with "(line 1)", name comparison "Could not check", ask the user; 2 or more name lines → "not determined (card has N name lines)", copy no name, ask the user.
- **Several Applicants, none MATCH:** `[Name mismatch]` against the closest person; cannot choose → "Could not check: name".
- **Facts for cross-checking**: A name · address · expiry; B, C country code · name · last 4 characters of passport number · expiry; D card colour · name on the Applicant line (no Applicant yet, 1-line card: line 1 name) · expiry; E subclass · group · status · expiry · name · last 4 characters of passport number.

## 6. Example

Fake data. Today 11/10/2026. Applicant: Thi Mai Tran, 3/12 Sample Street, Sampleton VIC 3000. The batch has only `id-scan.pdf` (chat attachment, 2 scanned pages, with page images). The check block says "Source group: unknown — every page is a scanned image, so this is not the issuer." and "[Photo/scan] Pages 1, 2 are images of the whole page, with no text layer from the original file."

Page 1: Victorian driver licence, address "UNIT 3, 12 SAMPLE ST, SAMPLETON VIC 3000", Expiry "03-02-2026"; `guroos_date_check` returns "Expiry: 03/02/2026 → EXPIRED (250 days ago)"; `guroos_identity_check(licence={number: "012345678", state: "VIC"})` has no error lines. Page 2: Vietnamese passport, current; `guroos_identity_check(mrz=…, printed={…}, passport={…, country: "VNM"})` returns "[MRZ check digit wrong] document number (MRZ line 2)…", other fields match the printed text; image re-read, called again, still the same.

```
### id-scan.pdf (part 1) — Driver Licence (rule 4) · certain
Conclusion: ACTION NEEDED
Source file check: passed (source: unknown — every page is a scanned image, so this is not the issuer) · rules: references/identity.md
Record in Fact Find
- Licence No.: 012345678
- Name on document: TRAN, Mai
- Expiry Date: 03/02/2026
Notices
- [Expired] Expiry Date 03/02/2026, today 11/10/2026 → request a current document or a replacement document from the client
- [Name mismatch] Document shows "TRAN, Mai", profile shows "Thi Mai Tran": name "Thi" missing → prepare a Statutory Declaration / Name Change Certificate
Could not check
- None
Notes
- This part is on page 1; the page is a scan
- Address matches profile ("Unit 3, 12 Sample St" = "3/12 Sample Street")
- Licence number matches the VIC format (format check only)
Facts for cross-checking: TRAN, Mai · 3/12 Sample St, Sampleton VIC 3000 · expiry 03/02/2026

### id-scan.pdf (part 2) — Non-Australian Passport (rule 6) · certain
Conclusion: ACTION NEEDED
Source file check: passed (source: unknown — every page is a scanned image, so this is not the issuer) · rules: references/identity.md
Record in Fact Find
- Document No.: C1234567
- Name on document: TRAN, THI MAI
- Expiry Date: 20/11/2031
Notices
- [Visa] Passport country code VNM; batch has no Visa/VEVO or Australian passport for Thi Mai Tran → request the current visa from the client
- [Source file] MRZ check digit wrong in document number (MRZ line 2), unchanged after re-reading → request a clear photo of the original document from the client or verify with the issuer
Could not check
- None
Notes
- This part is on page 2; the page is a scan
- Name matches the Applicant (surname printed first); every MRZ field matches the printed text
Facts for cross-checking: VNM · TRAN, THI MAI · passport number …4567 · expiry 20/11/2031
```
