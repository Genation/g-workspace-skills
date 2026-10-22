# 10. Recording results on the CRM

Section 10 of the doc-check skill, split out of SKILL.md; read it when the table in SKILL.md section 1 says so. "Sections 1–9" are SKILL.md sections; section 11 is in `references/intake.md`, 12 in `references/filing.md`, 13 in `references/old-folder.md` (if not yet in the conversation, read it exactly when that table says, the same way).

If the organisation has the CRM (SKILL.md section 1), each document's check result is recorded on the deal in the CRM: Fact Find values become suggested values with the document as evidence; items to notify are shown to staff. Files in the deal folder's `tmp/` not yet on the deal are registered on the deal (10.1), documents are classified (10.3) and linked to required documents (10.4). Do not save results to the client folder (section 9 is not done when there is a CRM). Only copy the report: do not re-read, do not change conclusions, do not record anything the report does not have. The CRM tools are the `genation-workspace_…` tools; when talking to the user, refer to clients and deals by name, never read out ids. A tool reports `module_not_enabled`: no CRM, skip this section.

**Document types and rules.** `genation-workspace_document_types_list` is called in two ways:
- **Compact list.** Call without filters ONCE for the whole batch, when first needed. Each type has `code`, `label`, `categoryFolder`, `fileNamePattern` and `checkRuleCount` (number of rules), NOT the rules. Use this list to classify (10.3), choose the `documentTypeCode` of a `request` (10.2) and read `fileNamePattern` (12.1). A type having no `checkRules` here does not mean the type has no rules.
- **Check rules.** After 10.3 has set the types of the batch's documents, call again ONCE with `codes` = the list of distinct type codes in the batch (codes already on documents and codes just set). Each type returned has `checkRules`. A type set after that call: call once more, only with the missing codes. No document in the batch has a type: do not call. Do not send `includeRules: true` without `codes` (the result is very large).

### 10.1 Finding the document on the deal

Do this before checking. Each file needs `document.id` (the stored document, NOT the `id` of the file on the deal), `dealId` and the `id` of the file on the deal:
- **File just registered in this conversation** (skill `mail-intake`, result of `genation-workspace_deal_files_register_existing`): an attachment or a file in the client folder with exactly the registered name uses the `id`, `document.id` and `dealId` of that result.
- **Batch's deal already known** (the client folder is the deal's folder, section 2 or section 11): `genation-workspace_deal_files_list` (`dealId`, read all pages by `cursor`) once for the whole batch; the file on the deal whose `document.path` equals `/<client folder path>/<file path>` (case-insensitive; e.g. `/Customers/Lan Quach_PUR OO/tmp/Lan_DL.pdf`) is that file.
- **Other files in the client folder:** `genation-workspace_documents_search` with `search` = file name (without folder); pick the item whose `path` matches as above. That item has exactly one `dealFiles`: use its `dealId`; several deals and one is the conversation's deal: that deal; otherwise: do not record, gather into the question at the end of the report "file <file> is on several deals: <deal names>, which deal should the result be recorded on?".
- **File the client sent through the client portal** (a `new` intake item of the deal, section 11): register with `genation-workspace_deal_files_register_existing` with `dealId` and `itemId` = the item's `driveItemId`, not with `path` (the file is already on the organisation's OneDrive; OneDrive on this computer may not have synced yet). Do not pass type, client or any other field, as in the line below. Results as in the line below, except `404`: the file is no longer on the organisation's OneDrive (deleted or moved out), "not registered: file no longer on OneDrive", do not retry.
- **Unchecked intake item** (an `unchecked` intake item of the deal, section 11): the file is already on the deal, do not register it again; use the file in `deal_files_list` whose `id` = the item's `dealFileId`.
- **File in `tmp/` of the deal folder that is not yet on the deal and has no intake item** (files downloaded from email by `mail-intake`, files copied in by staff, or every file when there are no client portal tools): register with `genation-workspace_deal_files_register_existing` with `dealId` and `path` = `/<deal folder>/tmp/<file name>`, relative to the organisation's root folder. Do not pass type, client, `name`, `labels`, `requiredDocumentId`, `replacesDealFileId` (10.3 and 10.4 come later). Register only document files (PDF, image, DOCX, XLSX, CSV) directly in `tmp/` of the right deal folder; do not register files in other folders. Results:
  - Success: use the result's `id`, `document.id`. Deal has no folder yet (`folderPath` empty), or `folderReplaceable` is true: the first registration attaches `plannedFolderPath`, or makes the CRM's folder the deal's for good, after which an old folder can no longer be attached; so do section 13 (`references/old-folder.md`) before the first registration.
  - `404` (OneDrive has not finished syncing, or the file was just moved): register again once after the other files; still failing: "not registered: OneDrive has not finished syncing".
  - `409` (already on the deal): re-read `deal_files_list` to get that file. `503` (Microsoft 365 not connected or failing): do not register the remaining files, state the reason once. Other errors: copy the tool's message verbatim, do not retry.
- Not found (an attachment not registered in the conversation, a file outside `tmp/` not on any deal): that file is not recorded, reason "file not on the deal yet".

Keep with each file: the document's `documentTypeCode` and `subjectContactId`, and the deal file's `assignedContactIds`, `latestCheck`, `checkStatus`, `filingState` (in the results above). If the deal is known before checking, get the Applicant as in section 2.

### 10.2 Recording each document

Call `genation-workspace_document_checks_record` ONCE for each document with a `Conclusion:` line ("Outside the checklist" lines are not recorded; a file with several `(part n)` blocks is not recorded, reason "file has several documents"):

| Field | Value |
|---|---|
| `documentId` | `document.id` from 10.1 |
| `dealId` | the deal from 10.1 |
| `kind` | `deep` (full check against the checklist) |
| `outcome` | `PASS` → `verified`; `ACTION NEEDED`, `NOT ENOUGH INFORMATION` → `need_review`; `INVALID`, `UNREADABLE` → `not_met` |
| `model` | the running model ID when the system provides it; if not sure, omit |
| `findings` | per the table below, at most 200 items |
| `ruleResults` | the result of each rule of the document type, per "Per-rule results" below; only when the document already has a `documentTypeCode` |

**Findings (`findings`)**, one `kind` per item:

| Report | Finding |
|---|---|
| A "Record in Fact Find" line whose target is in the target table below | `{kind: "fact_find", target, value, message, ruleCode, contactId?, location?}` |
| Rule 2: Finance Clause / Loan Approval Date, Settlement Date | `{kind: "deal_date", target, value, message, ruleCode}` (do not add `fact_find` for these two lines) |
| A "Notices" `[TFN]` line | `{kind: "redact", message: <evidence: page with the TFN>, location?}`; never record the TFN number |
| Any other "Notices" line | `{kind: "notify", message: "[<tag>] <evidence> → <action>", request?}` |
| A "Could not check" line | `{kind: "notify", message: "Could not check: <item>: <what is missing>"}` |
| A "Record in Broker's Notes" line (rule 11) | `{kind: "broker_note", message: <that line>}` |

- **`fact_find` / `deal_date`:** `message` = the report line verbatim (`<Field>: <value>`, including period, tag, ABN lookup result). `value` = the value only, in the field's format: date `YYYY-MM-DD` (from DD/MM/YYYY); money as a decimal number without `$` or commas (`"1250.00"`; a loss with a leading minus, `"-12500.00"`); interest rate as a percentage number (`"6.14"`); ABN as 11 digits, ACN as 9 digits, with no spaces; text as printed. Do not send when the value is not one clear value: "not on the document", "not applicable", "none …", "Could not check", month/year only, a masked number (`…4821`), several values (split loan, several benefits), or `INVALID` / `UNREADABLE`. `asset.rental_income` is monthly rent: send only when the document prints it per month (per month, calendar month); do not convert periods yourself.
- **`contactId`:** the client on the deal the report says the document belongs to (name MATCHES `contacts` of `deals_get`); `company.*`, `entity_individual.*`: the client that is the entity on the deal. Cannot determine: omit (the CRM uses the document's client). Do not pass `entityId`.
- **`location`:** the page if the report states it (`page 2`); otherwise omit.
- **`request`** (only with `notify`): only when the "action" is requesting a specific document from the client (a current copy, a full-period copy, a signed or certified copy, Statutory Declaration…): `{name: <document to request, brief>, documentTypeCode?}`, `documentTypeCode` only when exactly one type in the compact list of `genation-workspace_document_types_list` fits. The CRM creates a draft required document on the deal; staff decide whether to send it to the client.
- **Back** of a two-file block `<front> + <back>`: record the same `outcome` but omit the `fact_find` items (already recorded on the front).
- **Sensitive numbers:** only the targets below may receive the full number as in the Fact Find line (Licence No., passport Document No., loan Account number). Never send a TFN, card number, Medicare number, date of birth, CRN, MRZ line.

**Per-rule results (`ruleResults`).** A document type's check rules are the type's `checkRules`, read with the `genation-workspace_document_types_list` call with `codes` ("Document types and rules", start of section 10). Each rule has `id`, `code`, `kind`, `targetField`, `message`. These are the criteria staff tick; the file becomes **Satisfied** on the CRM when every rule of the type is `met` in the latest check, or when a staff member accepts the document (section 12.5). For each rule of the type, one item `{ruleId: <id>, outcome, note?}` (no `id`: `{ruleCode: <code>, outcome, note?}`), only copying the report:
- `fact_find`, `deal_date`: `met` when the document was read and the block has the "Record in Fact Find" line for that target (target table below) with a clear value, or with the rule file's "If absent, write" value ("not on the payslip", "none (Salary sacrifice $0.00)", "not printed on the contract", "No specifically named beneficiary"…): the fact is known. `note` = the recorded value as in the line (Licence No., Document No., Account number: last 4 characters only, `…4821`). `not_checked` only when the field could not be read (the line says "Could not check", including an "If absent, write" value of "Could not check", or the value is not clearly readable), or the document lacks the page or part the rule file needs for it. Notices conditions keep their own rules below.
- `redact`: `not_met` when there is a `[TFN]` line (`note` = page with the TFN, never the number); `met` when every page was read and no TFN was found; otherwise `not_checked`.
- `notify`, `broker_note`: `not_met` when there is a "Notices" line for exactly what the rule states (`note` = `[<tag>] <evidence> → <action>`); `met` when that was checked and there is no issue; `not_checked` when it is under "Could not check" or the report does not mention it.
- `INVALID` or `UNREADABLE` block: every rule `not_checked`, except the rule for what made the file invalid, which is `not_met`. Unsure which line a rule corresponds to: `not_checked`. One item per rule, no repeats; do not add rules of another type.
- Document without a type: classify first (section 10.3), then record with `ruleResults`; if it cannot be classified, record without `ruleResults`. The tool rejects because of rules (`document_type_required`, `unknown_check_rule`, `check_rule_ambiguous`, `listed_twice`): call again once without `ruleResults`, so the check result is still recorded.

**Target (`target`) and `ruleCode` by rule and Fact Find field** (targets of the `lending` package and the CRM profile; a field not listed here: do not send `fact_find`; a target the CRM has no field for yet is still sent: the CRM stores it and returns a warning, 10.5):

| Rule | Report field → `target` (`ruleCode`) |
|---|---|
| 2 | Finance Clause / Loan Approval Date → `deal.finance_due_date` (`finance_clause_date`) · Settlement Date → `deal.estimated_settlement_date` (`settlement_date`) · Conveyancer / Legal Practitioner → `other_adviser.conveyancer` (`conveyancer`, a `fact_find`) |
| 4 | Licence No. → `person.drivers_license_number` (`licence_number`) · Name on document → `person.drivers_license_name_on_document` (`name_on_document`) · Expiry Date → `person.drivers_license_expiry_date` (`expiry_date`) |
| 5, 6 | Document No. → `person.passport_number` (`document_number`) · Name on document → `person.passport_name_on_document` (`name_on_document`) · Expiry Date → `person.passport_expiry_date` (`expiry_date`) |
| 7 | Name on document → `person.medicare_name_on_card` (`name_on_document`; `message`, `value` and `ruleResults` notes use the name after the leading IRN digit, as printed: "ISLA M BRENNAN", never "1 ISLA M BRENNAN"; references/identity.md 2C) · Expiry Date → `person.medicare_expiry_date` (`expiry_date`) |
| 8 | Active Visa subclass → `person.visa_subclass` (`visa_subclass`) · Visa type → `person.visa_type` (`visa_type`) · Name on document → `person.visa_name_on_document` (`name_on_document`) |
| 9 | Trust Name → `company.trust_name` (`trust_name`) · Trustee Name → `company.name` (`trustee_name`) · Beneficiary Name → `entity_individual.beneficiary` (`beneficiary_name`) |
| 10 | ACN → `company.acn` (`acn`) · Director Name → `entity_individual.director` (`director_name`) · Shareholder Name → `entity_individual.shareholder` (`shareholder_name`) |
| 12 | Employer ABN → `employment.employer_abn` (`employer_abn`) · Employer address → `employment.employer_address` (`employer_address`) · Employer phone no. → `employment.employer_phone` (`employer_phone`) · Salary Sacrifice / Packaging / Deductions before tax → `income.salary_sacrifice` (`salary_sacrifice`) |
| 13 (Tax Return: individual, partnership, company, trust) | Net profit / loss → `business_income.profit_before_tax` (`profit_and_loss`) · Balance Sheet → `asset.balance_sheet` (`balance_sheet`) |
| 14, 15, 16 | Rent amount → `asset.rental_income` (`rent_amount`) |
| 17, 18 | Income received → `income.gross_value` (`income_received`) |
| 20, 21 | Lender → `liability.lender` (`lender`) · Account name → `liability.name` (`account_name`) · Account number → `liability.account_number` (`account_number`) · Interest rate → `liability.interest_rate` (`interest_rate`) · Repayment → `liability.repayment` (`repayment`) · Loan Expiry date → `liability.end_date` (`expiry_date`) |
| 22 | Current balance → `liability.balance` (`current_balance`) · Repayments → `liability.repayment` (`repayments`) |
| 23 | Account balance → `liability.balance` (`account_balance`) · Limit → `liability.limit` (`limit`) |

### 10.3 Classifying the document and its client

For each document with a `Conclusion:` line whose block recognised the type, before recording its result in 10.2 (so the result can include `ruleResults` per the rules of the type just set): ONE `genation-workspace_deal_files_update` call with `id` = the `id` of the file on the deal and only the fields to change (no fields: do not call):
- `documentTypeCode`: only when the document has no type yet; code per the table below, only when that code is in the compact list of `genation-workspace_document_types_list` ("Document types and rules", start of section 10). Do not change an existing type.
- `subjectContactId`: the deal's client the document belongs to, in `contacts` of `deals_get`: the client whose name MATCHES; if none, the only client with the same surname and the same first name or preferred name (a missing or abbreviated middle name still counts; the report's `[Name mismatch]` line stays as is); entity: the client that is that entity. Set it when the document has no client yet, or when the current client is not that person (e.g. `mail-intake` set the email sender). Document in the name of several of the deal's clients (joint account): the first-named client. Cannot determine exactly one client: do not set, gather into the final question "which client does document <file> belong to?".

File has a client but `assignedContactIds` is empty: `genation-workspace_deal_files_assign` (`id`, `contactIds` = the document's client, plus the clients named jointly) so the file shows under the right client ("Assign to"); do not replace an existing list. This step does not rename or move files (that is only in section 12). "Type not recognised" blocks, Airbnb and types without a code: do not set a type.

| Rule | `documentTypeCode` |
|---|---|
| 1 / 2 / 3 | `proof_of_ownership` / `contract_of_sale` / `building_contract` |
| 4 / 5 / 6 / 7 / 8 | `drivers_licence` / `australian_passport` / `foreign_passport` / `medicare_card` / `visa` |
| 9 / 10 / 11 / 12 | `trust_deed` / `company_extract` / `credit_report` / `payslip` |
| 13 | `individual_tax_return`, `partnership_tax_return`, `company_tax_return`, `trust_tax_return`, `income_statement`, `notice_of_assessment`, `financial_statements` (per the `doc_type` of section 9) |
| 14 / 15 / 16 | `rental_statement` / `rental_agreement` / `rental_appraisal` (excluding Airbnb) |
| 17 / 18 | `centrelink_statement` / `child_support` |
| 19 | by the statement's purpose: `bank_statement_salary` (regular pay credits from the employer), `bank_statement_business` (account in a business name, business transactions), `bank_statement_rental` (regular rent credits), `bank_statement_expenses` (spending account, no pay or rent credits) |
| 20 / 21 / 22 / 23 | `home_loan_statement` / `liability_statement` / `study_loan_statement` / `bnpl_statement` |

**Rule 19:** the deal has exactly one open required document (10.4) of one of the four statement types, assigned to the document's client or to no one: that type. None: per the block's "Facts for cross-checking", when exactly ONE purpose is seen. Several purposes (both pay and rent credits) or unclear: do not set a type, gather into the final question "is statement <file> evidence of pay, business, rent or expenses?".

### 10.4 Linking to a required document

With the tools `genation-workspace_required_documents_list` and `genation-workspace_required_documents_complete`: call `required_documents_list` (`dealId`, read all pages) once for the whole batch. For each document that has a type, a Conclusion other than `INVALID` or `UNREADABLE`, and has not yet fulfilled any required document (no item has `fulfilledByDealFileId` = the file's `id`):
- Candidates: required documents with status `draft`, `requested` or `rejected`, the same `documentTypeCode` as the document, `assignedContactIds` empty or containing the document's client. Several candidates: keep the items assigned to the document's client.
- Exactly one: `required_documents_complete` with `id` = the required document, `dealFileId` = the file's `id`. Each required document is linked to only one file of the batch.
- None: skip ("no required document"). Still several: do not link, gather into the final question (state the items' `name`).

Do not create, edit, reject or archive required documents. The tool reports `required_document_state`: write "not linked: <name> already completed".

### 10.5 After recording

Registering, classifying, linking and recording are part of the check or processing the user asked for (approval rule, SKILL.md section 1): do not ask first. The user says not to record: do not record, do not retry, the remaining files get "not recorded on the CRM: user declined". The tool reports a parameter error (`Invalid arguments: …`): fix exactly that spot per the report, call again once. Other errors (`404` document not on the deal…): write the tool's message verbatim, do not retry. Results with `warnings` (target has nowhere to record yet, client has no matching record…) are normal: only count them, do not list them.

Add one line per file under the report: `- <file> · CRM: recorded (<conclusion>)` (just registered on the deal: add `, just registered`; type or client just set: add `, <type label> · <client name>`; required document just linked: add `, linked to <required document name>`; with `ruleResults`: add `, <met count>/<rule count> criteria met`; with warnings: add `, <n> findings not applied`; with `requiredDocumentIds`: add `, <n> documents to request (draft)`) or `- <file> · CRM: not recorded: <reason>`. Batch under section 11: use section 11's summary instead of these lines.
