# 9. Saving results to the client folder (only without the CRM)

Section 9 of the doc-check skill, split out of SKILL.md; read when the table in SKILL.md section 1 says so, only without a CRM. "Sections 1–8" are SKILL.md sections. With a CRM, none of this applies (SKILL.md section 9).

Without a CRM, when the batch is files in a client folder (section 2) and the tool `guroos_document_result_save` exists: after the report, save each file's result so it is not checked again next time and the app shows each file's status. A batch of attachments, or no tool: skip this section. Only copy the report: do not re-read, do not change any conclusion; do not rename or move files, do not write to Monday, do not edit the Fact Find.

Call `guroos_document_result_save` ONCE for the whole batch, `customer` = the client folder name or path (as in section 2), `skill` = `doc-check`, `results` = one result per block with a `Conclusion:` line ("Outside the checklist" lines are not saved; a two-file block `<front> + <back>` becomes two identical results; a file with several `(part n)` blocks is not saved, write "not saved: file has several documents"):

| Field | Taken from |
|---|---|
| `file` | The file path in the client folder, as in the block heading |
| `doc_type` | The table below, by the type and rule in the block heading |
| `verdict` | The `Conclusion:` line |
| `applicant` | The person or entity the report says the document belongs to (the MATCHING name); if it says none, leave empty |
| `fields` | One `{name, value, verified}` per "Record in Fact Find" line; `verified` = true when the field is clearly read and not caught by any Notices or Could not check line. `- None`: empty list |
| `notices` | Each "Notices" line `- [<tag>] <evidence> → <action>` becomes `{label: <tag>, text: <evidence> → <action>}` |
| `unchecked` | The "Could not check" lines |
| `notes` | The "Reasons" lines (an `INVALID` block, keep the `[…]` tags), then "Record in Broker's Notes" (each line starting `Broker's Notes:`), then "Notes" |
| `facts` | The "Facts for cross-checking" line (omit when it says "not used …") |
| `document_date`, `expiry_date`, `period_start`, `period_end` | Only when the block clearly gives the issue date, expiry date, period start and end; format DD/MM/YYYY |

Limits per result (the tool rejects the whole save when one is exceeded): `fields` 40, `notices` 20, `unchecked` 20, `notes` 10 items; when there are more, merge the last lines of that part into one item, joined with ` · `. Sensitive numbers, in every field: never save TFN, Medicare number, date of birth, CRN, MRZ lines; Licence No., Document No., card numbers and account numbers keep only the last 4 digits (`…4821`), even when the report gives them in full in the Fact Find.

**`doc_type` by rule:**

| Rule | `doc_type` |
|---|---|
| 1 | `rates_notice`, `water_bill`, `owners_corporation_notice` (Strata / OC / Body Corporate Levy, OC Certificate), `land_title` (incl. Register Search Statement) |
| 2 | `contract_of_sale` (incl. Offer & Acceptance, Vendor's Statement / Section 32) |
| 3 | `building_contract` |
| 4 | `driver_licence`, `proof_of_age_card`, `id_card` (ImmiCard, foreign cards) |
| 5 / 6 / 7 | `australian_passport` / `non_australian_passport` / `medicare_card` |
| 8 | `visa` (Visa Grant Notice, VEVO) |
| 9 / 10 / 11 | `trust_deed` / `company_extract` / `credit_report` |
| 12 | `payslip` |
| 13 | `individual_tax_return`, `partnership_tax_return`, `company_tax_return`, `trust_tax_return`, `income_statement`, `notice_of_assessment`, `financial_statements` |
| 14 / 15 | `rental_statement` / `rental_agreement` |
| 16 | `rental_appraisal`; `airbnb_statement` (Airbnb, Stayz, Booking.com) |
| 17 / 18 | `centrelink_statement` (incl. DVA) / `child_support` |
| 19 / 20 | `bank_statement` / `home_loan_statement` |
| 21 | `personal_loan_statement`, `car_loan_statement`, `credit_card_statement` |
| 22 / 23 | `study_loan_statement` / `bnpl_statement` |
| — | `other`: a "Type not recognised" block |

Saving is a change (approval rule, SKILL.md section 1): Full access: part of the check, do not ask; Ask first: ONE question for the whole batch, in the next steps after the report ("Save these 4 results to the client folder?": "Save", "No"), unless the user already asked to save; never per file. The tool reports an error in a result (`ACTION NEEDED` without `notices`, a badly formatted date…): fix exactly that per the report, call again once. After saving, add one line per file under the report: `- <file> · <status the tool returns: Approve | Reject | Need Review> (<conclusion>)` or `- <file> · not saved: <reason>`.
