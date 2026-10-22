# 12. Filing

Section 12 of the doc-check skill, split out of SKILL.md; read when the table in SKILL.md section 1 says so. "Sections 1–9" are SKILL.md sections; section 10 is in `references/crm-recording.md`, 11 in `references/intake.md`.

Filing means renaming the file and moving it from `tmp/` into the subfolder for its document type (e.g. `3. ID`). The CRM sets the folder and suggests the name by the organisation's naming rule; staff have the final say on the name. Only the CRM moves and renames files (`genation-workspace_deal_files_file`, `genation-workspace_deal_files_rename`), exactly per the plan shown. File, rename, accept and tick only per the approval rule (SKILL.md section 1), never on your own initiative.

Do this when the CRM is present with both tools `genation-workspace_deal_file_filing_get`, `genation-workspace_deal_files_file`: for each batch file already on the deal (including files checked earlier, section 11 step 3) still in `tmp/` (`filingState` = `unfiled`), after the result is recorded (10.2). `filed` or `other` files, files not on the deal: do not file. Batch not via section 11 (attachments, files in the client folder): do this after the lines of section 10.5.

### 12.1 Planning

`deal_file_filing_get` with `id` = the file's `id` on the deal, `facts` = facts read from the document for the placeholders in the type's `fileNamePattern` (compact list of `document_types_list`), per the table below, and `name` only when staff chose a name (12.4). Result: `currentPath`, `targetFolderPath`, `targetName` (the final name, with the extension and any ` (2)`), `suggestedName` (the naming rule's name), `nameChosenByStaff`, `naming`, `latestCheck`, `checkStatus`, `filed`, `blockers`. Remember exactly the `facts` and `name` sent. Plan every file in ONE turn. A plan stays valid until the file changes (a new check, an acceptance, a tick, a name staff give, a filing error of 12.4): without such a change, do not plan that file again; use the plan you have.

| Placeholder in the name pattern | `facts` |
|---|---|
| `{employer}` | `employer`: employer name as printed, including `Pty Ltd` (`"Coastal Freight Pty Ltd"`) |
| `{period}` | `period`: the period printed on the document (payslip: pay period; statement: statement period). Whole-month period (1st to last day of the month): `{"kind": "months", "from": "2026-07", "to": "2026-09"}`, one month `{"kind": "month", "month": "2026-07"}`; other periods: `{"kind": "dates", "from": "2026-10-01", "to": "2026-10-14"}`, one day `{"kind": "date", "date": "2026-10-14"}` |
| `{account}` | `account`: `{"bank": "CBA", "accountNumber": "4821"}`. `bank`: the bank's abbreviation as file names already use it (`CBA`, `WBC`, `NAB`, `ANZ`; the `shortCode` of that bank's lender in `genation-workspace_lenders_list` if any), if unsure the bank name as printed. `accountNumber`: ONLY the last 4 digits |
| `{listing}` | `listing`: `"statement"` (statement issued by the bank) or `"transaction"` (transaction history printed from internet banking) |
| `{year}`, `{quarter}` | `year`: financial year by its ending year, as a number (`2026` for 2025–26); `quarter`: quarter of the financial year, 1–4 |
| `{date}`, `{signedDate}` | `date`: document date; `signedDate`: signing date, only when signed; format `YYYY-MM-DD` |
| `{property}` | `property`: `{"use": "owner_occupied" or "investment", "address": <address as printed>}`; `use` only when certain (rental documents: `investment`), otherwise omit `property` entirely |
| `{liability}` | `liability`: `credit_card`, `overdraft`, `vehicle_loan` or `personal_loan` |
| `{document}` | `document`: short English name of the document (`Rates Notice`, `Water Bill`), only when the CRM reports it missing |
| person or entity (`{client}`, `{owner}`, `{borrower}`, `{company}`, `{trust}`, `{partnership}`, `{business}`), `{lender}`, `{version}`, `{form}`, `{bundle}` | do not send: the CRM takes the person or entity from the document's client (10.3), the lender from the deal; sending one fact about a person makes the CRM drop every fact taken from the client. Exception: document in the name of several of the deal's clients: `parties` = those clients in printed order, each `{"firstName", "familyName", "preferredName"}` as in `contacts` of `deals_get`; the CRM still reports a missing person: re-plan without `parties` |

Every fact in exactly the format above, no other format mixed in. Not clearly readable or not printed on the document: do not send, do not invent.

### 12.2 Blockers

`blockers` (each item `code`, `message` in English; restate in plain words):

| `code` | Action |
|---|---|
| `document_type_missing`, `subject_contact_missing` | 10.3 could not set it: ask staff for the document type or the document's client |
| `naming_facts_missing` | re-read the document for the facts in `naming.missingFacts`, then re-plan; still missing: ask staff for the value, or for a name of their own (12.4; with `name` this blocker does not apply) |
| `check_missing` | record the result (10.2), then re-plan |
| `check_not_satisfied` | staff decide: 12.5 |
| `file_locked` | staff unlock the file; do not unlock it yourself |
| `deal_folder_missing`, `not_in_deal_folder`, `category_folder_missing`, `file_archived` | do not file, give the reason: deal has no folder; file is outside the deal folder; document type has no subfolder (configured by an admin); file is archived |

Re-plan each file at most twice after handling things yourself. `filed` = true: "already in place", do not file.

### 12.3 Proposal

Files with no blockers left, then files whose only blocker is `check_not_satisfied` (12.5, marked `· open check items`): list and number them, with the suggested name and the folder:

```
File into <deal folder> (out of tmp/, named by the naming rule; keep each name or give your own):
1. tmp/IMG_20261018_DL.pdf → 3. ID/Lachlan_DL.pdf
2. tmp/Payslip Oct 2026.pdf → 4. Income & Expenses/Lachlan_Coastal Freight Pty Ltd_Payslip_01-14Oct26.pdf
3. tmp/Passport scan.jpg → 3. ID/Lachlan_Passport.jpg · open check items
```

Paths relative to the deal folder: left `currentPath`, right `targetFolderPath` and `targetName`, copied exactly from the plan. Then per the approval rule (files with open check items: only per 12.5):
- The user already asked to file (a clear instruction earlier in this chat, such as "process and file"): file (12.4) without asking; in Full access no list is needed, the lines after filing are the report.
- Otherwise, in both modes: the filing question goes into the next steps (SKILL.md section 7), in the reply that has the report, the summary and this list, after them; for example "File these 2 as listed?" with the options "File all 2", "Change…" (other numbers or names), "No".

### 12.4 File

For each file approved (the whole list, the numbers stated, or the user's request), every file in ONE turn: `deal_files_file` with `id`, `checkId` = `latestCheck.id`, `expectedName` = `targetName`, `expectedFolderPath` = `targetFolderPath` of exactly the plan shown, exactly the `facts` sent, and the same `name` when staff chose one. Files not approved: leave in `tmp/`.
- **A name staff give** ("call no. 2 Lachlan payslip October"): re-plan that file (12.1) with `name` = their name as given (the CRM keeps the file's extension) and the same `facts`; show `tmp/<file> → <subfolder>/<targetName>`, then file it with that `name` and `expectedName` = this plan's `targetName`: their answer is the approval. `targetName` has a version suffix (` (2)`: another file in the folder already has that name): say so; in Ask first, ask once more (`question`: "File as <targetName>", "Change…", "No") before filing.
- `[file_name_invalid]` (plan or filing): the name cannot be used. Say why in plain words from the message (a character SharePoint refuses, such as `/ : * ? " < > |`, a reserved name, or too long) and ask for another name; you may offer a corrected name as an option, never use a name staff did not choose.
- Success: `moved` = true means filed; `moved` = false means already in place.
- `[filing_blocked]`, `[check_not_latest]`, `[filing_changed]`, `[name_taken]`, `[item_changed]`: the plan has changed (a new check, a criterion just ticked or a document just accepted, the name just taken by another file, the file just changed). Re-plan that file (12.1, same `facts` and `name`), show the new plan; Ask first: ask again before filing; Full access: file per the new plan when it has no blockers.
- User says no: leave in `tmp/`, "not filed: user declined", do not retry. Other errors: quote the tool's message verbatim, do not retry.

After filing, one line per file: `- tmp/<file name> → <subfolder>/<new name> · <filed | already in place | not filed: reason>` (`<new name>` = the result's final name; add `, name chosen by staff` when it was). OneDrive on this computer updates after a few minutes; meanwhile the file may still show in `tmp/`.

### 12.5 Open check items (`check_not_satisfied`)

Staff decide, in both modes; never accept or tick on your own judgement, not even when the user asked to "file everything".
- **Explain** in plain words what is open: the `not_met` or `not_checked` criteria of the latest check (`ruleResults` just recorded, or `document_checks_list` with `dealFileId`, `limit` 1), each in the rule's words (`condition`, otherwise `subject`) from the `checkRules` read with `codes`; file type not in that read (file checked earlier): `document_types_list` with `codes` = the missing types, once for all such files. Type without rules: the report's Notices and Could not check lines.
- **Offer**, in the next steps (SKILL.md section 7), one question per file: "Accept as is and file (type your reason)" (only when `check_not_satisfied` is its only blocker; the plan is in the 12.3 list), "Accept only (type your reason)", "Tick specific criteria", "Request a new one" (only when the action is a new document from the client), "Leave it". For example: "No. 3, the passport, is not certified: accept it as is and file it as listed (type your reason), accept only, request a new one, or leave it?"
- **Accept as is** (and file, or only): only when a staff member says in the chat that they accept the document (one of these options, or their own words): `genation-workspace_document_checks_accept` with `documentId` = `document.id`, `dealId`, `note` = their reason in their own words. They picked the option without typing a reason: act at once all the same (a clear answer, SKILL.md section 1 "Answers"), `note` = "Accepted as is by staff in the chat, no reason given: <the open items, in plain words>"; never write a reason of your own. It ticks every criterion of the type and also works for a type without rules. `[document_type_required]`: classify first (10.3; type unknown: ask staff); `[file_archived]`: not accepted, say why.
- **Tick specific criteria:** only the criteria staff name, of the file they name: `genation-workspace_document_check_rules_mark` with `dealFileId`, `ruleId` (or `ruleCode`), `outcome` = `met` (or what they say), `note` = their words.
- **Request a new one:** nothing is accepted, the file stays in `tmp/`; the draft request the check put on the deal (10.2 `request`), if any, is there for staff to send.
- **Leave it:** the file stays in `tmp/`, nothing recorded.

**Accept and file in one answer.** A staff member's "Accept as is and file" (or "accept it and file it") approves both the acceptance and the filing: do not ask again; the same when they accept a file after asking to file ("process and file"). Accept (every such file in ONE turn, with the `deal_files_file` of the other files the same answers approved), then in the next turn file each per 12.4 with `checkId` = the id of the check the accept returned, `expectedName` = `targetName`, `expectedFolderPath` = `targetFolderPath`, the same `facts` and `name`, of the plan already shown, without planning again (no plan for that file yet: plan it, 12.1, in the turn of the accept; its check blockers do not count). `[check_not_latest]`, `[filing_changed]`, `[filing_blocked]`: as in 12.4. The same after a tick that returns `checkStatus` = `satisfied`, with that check, when the user asked to file. "Accept only", or a tick with no request to file: do not file; say the file is now ready to file. Line: `- <file> · accepted by staff: <note>` or `- <file> · ticked: <criteria>`.

### 12.6 Renaming a filed file

Staff ask to rename a file on the deal that is not in `tmp/` (filed, or staying where it is): their request is the approval; otherwise only propose a rename as a next step. `genation-workspace_deal_files_rename` with `id` = the file's `id` on the deal (`deal_files_list`), `name` = the name staff gave. The file keeps its folder and extension; a taken name gets a version suffix (` (2)`); the result's `document.name` is the final name: `- <old name> → <new name> · renamed`. A file still in `tmp/`: file it with `name` (12.4) instead. `[file_name_invalid]`: as in 12.4; `[file_locked]`: staff unlock the file first; `[file_archived]`: not renamed; `[item_changed]`: OneDrive just changed the file, call again once. No such tool: say renaming is not available yet.
