# 11. New client files (tmp/)

Section 11 of the doc-check skill, split out of SKILL.md; read when the table in SKILL.md section 1 says so. "Sections 1–9" are SKILL.md sections; section 10 is in `references/crm-recording.md`, 12 in `references/filing.md`, 13 in `references/old-folder.md`: read each file exactly at the step below that names it (if not yet in the conversation, read it, the same way).

When the user asks whether any client has sent new documents or files ("any new documents from clients?"), or asks to process or check new files or new documents a client sent, for one deal ("process the new files the client sent in the tmp of deal Whitmore", "check Whitmore's new documents") or without naming a deal ("process the new client files"). Client files sit as-is in `<deal folder>/tmp/`, not yet on the deal, not yet named. Needs the CRM (SKILL.md section 1); without the CRM: check the files in `tmp/` like files in the client folder (sections 1–9), do not register, do not file. Each turn handles only ONE deal.

Two sources of new files:
- **Intake items (main source).** Files the client uploads to the client portal: the backend saves them in `<deal folder>/tmp/` and records an intake item (`dealId`, `dealTitle`, `contactName`, `fileName`, `path`, `driveItemId`, `uploadedAt`, `status`). `status` is `new` until the file is registered on the deal (10.1), then becomes `processed` automatically with `dealFileId`; `processed` only means registered, not yet checked or filed. The item's `checkStatus` is the check status of the file on the deal (`null` while still `new`). Filter `status` = `unchecked`: items registered but never checked (e.g. OneDrive on this computer had not synced at the previous run), still waiting for check and filing. Read with `genation-workspace_deal_intakes_list` (read all pages by `cursor`). No such tool (the organisation has not enabled the `client_portal` module), or the tool reports `module_not_enabled`: use the fallback source only.
- **`tmp/` folder (fallback).** Files that reach `tmp/` without the portal (downloaded from email by `mail-intake`, copied in by staff) have no intake item. View with `guroos_customer_files`.
- **No duplicates.** A file is only one item: same `driveItemId` (file on the deal: `document.driveItemId`) or same path (intake item: `path`; file on the deal: `document.path`; file in the vault: `/<deal folder>/tmp/<file name>`; case-insensitive) means the same file.

0. **No deal named** (the conversation has not named one either): with `deal_intakes_list`, call it twice, no deal filter: `status` = `new` (new files, not registered) and `status` = `unchecked` (registered, not checked). Group by `dealId`: deal name (`dealTitle`), number of new files, number of unchecked files, client name (`contactName`), latest upload date; the deal with the latest upload first. With `genation-workspace_deals_list`: call it ONE more time with `unassigned` = `true` (read all pages) to flag deals nobody has claimed. List, then ask which deal to process, end the turn, even when there is only one deal (the deal may belong to another staff member) or the user asks to process all:

   ```
   Files clients sent through the client portal, not yet processed:
   1. <deal name> · <n> new files · <m> files not checked · <client name> · sent <DD/MM/YYYY> · unassigned
   2. <deal name> · <n> new files · <client name> · sent <DD/MM/YYYY>
   Which deal would you like to process?
   ```

   Drop any part whose count is 0. No items: "No new or unchecked files from clients through the client portal." In both cases add one line: files sent by email or copied into `tmp/` are not in this list; ask to "process new files for deal <name>" to see that deal's `tmp/`. No `deal_intakes_list`: ask the user which deal, stop. Do not scan the vault for `tmp/` yourself.
1. **Deal:** the deal the user chose at step 0 (that group's `dealId`), the deal being discussed in the conversation, or `genation-workspace_deals_list` (`search` = the name the user gave, deals not archived). Exactly ONE deal: use it. Several deals: list the names (`title`) and ask, stop. None: say so and ask, stop. The user names or chooses several deals: ask which deal first, stop. Call `genation-workspace_deals_get` to get the deal's clients (Applicant, section 2), folder and owner. `ownerId` empty: nobody has claimed the deal (usually a deal the client created on the portal); still process it, mention it in the summary (step 6), do not claim the deal yourself. Only when the user asks to claim it ("claim this deal"): `genation-workspace_deals_update` with `id` and `claim` = `true`; error `deal_already_owned`: say someone else has already claimed the deal.
2. **Intake items and folder:**
   - With `deal_intakes_list`: call it with `dealId`, once `status` = `new` (not registered) and once `status` = `unchecked` (registered, not checked). `unchecked` items are already on the deal: do not register them again, go straight to classify and check (steps 3, 4).
   - Deal folder = `folderPath`. No `folderPath`: do section 13 first (the client's old folder: read `references/old-folder.md`); attached: deal folder = the `folderPath` just attached; no candidate or staff do not attach: `plannedFolderPath`; both empty: say the deal has no folder yet, stop. Drop the leading `/`; view with `guroos_customer_files` (`customer` = that path).
   - New or unchecked intake items exist, or `tmp/` has files: continue (intake items can still be registered when OneDrive on this computer does not have the file yet).
   - No intake items, and the folder or `tmp/` does not exist, or `tmp/` is empty: deal without `folderPath`: section 13 has already searched, do not search again: say "no new files in `<deal folder>/tmp/`", stop. Deal already has `folderPath`: find candidate folders with `guroos_customers` (`query` = deal name: top-level folders) and `guroos_customer_files` on the parent of the deal folder (usually `Customers`: deal folders with the same client name); files sent before the deal had a folder may sit in another folder (`…_PUR OO` instead of `…_PUR OO_WBC`, because `plannedFolderPath` changes with loan purpose, OO/INV and lender). Leave out every folder that is another deal's folder (equal to, inside or containing the `folderPath` of a deal returned by `genation-workspace_deals_list` with `includeArchived` = `true`, all pages, once with `contactId` = each client's `contactId` and once with `search` = each client's family name; case-insensitive, without the leading `/`): its `tmp/` files belong to that deal. List the remaining folders with files in `tmp/` whose name contains the deal's client name (with file count), say that files are only registered and filed when they are in `<deal folder>/tmp/`: staff move the files there, then ask again. Stop: do not choose yourself, do not register files in another folder, do not move or rename anything. No candidate: say "no new files in `<deal folder>/tmp/`", stop.
3. **Register and batch:** read `references/crm-recording.md` (section 10), then follow 10.1, in this order:
   - register each new intake item by `itemId`; unchecked intake items (`unchecked`) are not registered again;
   - `deal_files_list` (read all pages) once;
   - files in the vault's `tmp/` that match no file on the deal and no intake item (including items that could not be registered): register by `path` (fallback).

   Batch = files in `tmp/` just registered or already on the deal but not checked (`latestCheck` empty), plus the files of every unchecked intake item (the file on the deal with `id` = `dealFileId`); the user asks for a re-check: every document file in `tmp/`. Files in `tmp/` already checked: do not check again, only plan filing (section 12). Read files on the deal with `guroos_document_read` with `customer` = deal folder, `file` = `document.path` relative to the deal folder (`tmp/<file name>`). Files registered but not yet in `guroos_customer_files` (OneDrive on this computer has not finished syncing): not checked, not filed; the next time the user asks, the file is still in the batch because `latestCheck` is still empty.
4. **Each file:** read and check per sections 3–8 (not section 9: CRM present). Then do section 10 in this order:
   - 10.3 (type, client) for every file in the batch;
   - read the rules of the types in the batch, ONCE with `codes` ("Document types and rules", start of section 10);
   - then for each file: 10.4 (required document), 10.2 (result with `ruleResults`).
5. **Filing** per section 12 (read `references/filing.md`), for every file of the deal still in `tmp/`.
6. **Summary** after the report (section 7), one block for the whole `tmp/`:

```
### New files · <deal name> · <deal folder>/tmp/
Deal has no owner: click "Claim deal" in the app, or ask the assistant to "claim this deal".
Just attached the client's old folder to the deal: <deal folder>.
- <file name> · <client sent via portal: <client name>, <DD/MM/YYYY> | in tmp/>
  - On the deal: <just registered | already there | not registered: reason>
  - Type · client: <type label> · <client name> | not classified: <reason>
  - Required document: <name> (<just linked | already linked>) | none | not linked: <reason>
  - Check: <Conclusion> · <satisfied | needs attention | incomplete | not checked> (<met count>/<rule count> criteria) | not checked: <reason>
  - Filing: <awaiting approval (no. n below) | filed in <subfolder>/<new name> | already in place | left in tmp/: <reason>>
Portal files from the client still new: <file name> (<reason>), … | none left
Portal files from the client still not checked: <file name> (<reason>), … | none left
```

- The "Deal has no owner" line only when the deal's `ownerId` is empty. The "Just attached the client's old folder" line only when this turn attached a folder per section 13. The two lines "still new", "still not checked" only with `deal_intakes_list`: intake items registered (including `409`) have become `processed`; items not registered stay `new`, with the reason; items registered but whose check result could not be recorded (10.2) stay `unchecked`, with the reason.
- Each new or unchecked intake item gets one `- <file name>` entry (`fileName`), even when not registered; files already in `tmp/` beforehand say "in tmp/".
- Some files not checked because OneDrive on this computer has not synced: add the line "Ask again to "process new files for deal <deal name>" in a few minutes to check the remaining files."

Check status by the file's `checkStatus`: `satisfied` satisfied, `needs_attention` needs attention, `incomplete` incomplete (criteria not yet met), `unchecked` not checked. Non-document file: one line `- <file name> · not a document, left in tmp/`. After the block: the approval list of section 12.3 (if any), then ONE final question combining the approval question with everything staff need to decide (the final question of section 7, of 10.3, 10.4, 12.2).
