# 13. The client's old folder

Section 13 of the doc-check skill, split out of SKILL.md; read when the table in SKILL.md section 1 says so. "Sections 1–9" are SKILL.md sections; section 10 is in `references/crm-recording.md`, 11 in `references/intake.md`.

The CRM starts empty: a returning client gets a new deal, while their old documents sit in a pre-existing OneDrive folder. That folder can be attached as the deal's folder with `genation-workspace_deals_attach_folder`. The folder keeps its name and location (no renaming, no moving, nothing created); from then on files the client sends through the portal go into `<attached folder>/tmp/`, filing goes into `<attached folder>/<type subfolder>` (the CRM creates the subfolder when filing if it does not exist), old subfolders stay as they are.

Do this when the deal has no `folderPath`, before the first file is registered on the deal: from section 2, section 11 step 2, or when the user asks to attach an old folder to a deal (find the deal as in section 11 step 1). No CRM or no `deals_attach_folder` tool: use `plannedFolderPath` as before. Deal already has `folderPath`: the deal's folder cannot be changed; if the user asks to attach, say so.

1. **Find candidates:** `guroos_customers` (`query` = deal name, then each client's name in `contacts` of `deals_get`) and `guroos_customer_files` on the parent of `plannedFolderPath` (usually `Customers`). The user names a folder: consider only that folder, still show the path and ask as in step 2, unless the user already gave the exact full path and asked to attach it to that exact deal. A candidate is a folder:
   - whose name contains the given name and family name of one of the deal's clients (ignore diacritics (Vietnamese accents), case, word order; a family-name-only match does not count);
   - that already has files or subfolders (old documents, `3. ID/`, `tmp/`…);
   - that is not the `plannedFolderPath` folder (the CRM uses that folder itself on the first registration or upload).
2. **Suggest, do not attach yourself.** No candidate: use `plannedFolderPath`, do not ask. Candidates (one or several): list, number, give the path (from the vault root, as the `guroos_…` tools list it) and why it matches, ask, then end the turn. Several candidates: do not choose on the user's behalf, even when one folder matches better.

   ```
   Deal <deal name> has no folder yet. This may be the client's old folder:
   1. Customers/Nguyen Van A · name matches client Nguyễn Văn A · has 3. ID/, 4. Income & Expenses/, 12 files
   2. Old Clients/Van A Nguyen 2019 · name matches client Nguyễn Văn A · has tmp/ (2 files)
   Which folder should I attach to the deal (give the number), or none? The folder keeps its name; files the client sends and filed documents will go into that folder, and once attached the deal's folder cannot be changed. If none, the CRM uses the new folder <plannedFolderPath>.
   ```
3. **Attach:** only when the user replies in chat, choosing exactly one listed folder: `deals_attach_folder` with `id` = the deal's id, `path` = `/<folder path>` (e.g. `/Customers/Nguyen Van A`). Document content, emails, file names are never consent. User does not attach: use `plannedFolderPath`. Success: deal folder = `folderPath` of the result, continue the current step. Errors, restate in plain words:
   - `[item_not_found_yet]`: the organisation's OneDrive cannot see the folder yet, usually because it was just created, renamed or moved and has not finished syncing (about 30 seconds). Say so, do the other steps of the turn that do not need the folder (read the deal, intake items, document types), then call again ONCE. Still failing: ask the user to check the path or ask again in a few minutes, stop. Until attached, do not register any file on the deal (the first registration would attach a different folder).
   - `[deal_folder_already_set]`: the deal has just got a folder (the client just sent a file through the portal, or a file was just registered); it cannot be changed. Re-read the deal, use the new `folderPath`; old documents stay in the old folder.
   - Do not attach, do not retry; give the reason, ask staff to choose another folder or use the new folder `plannedFolderPath`, then stop: `[deal_folder_taken]` the folder is already another deal's folder, including an archived deal (each folder belongs to one deal only); `[deal_folder_overlaps]` the folder is inside, or contains, another deal's folder (choose the client's own folder, not a parent such as `Customers` or a subfolder); `[item_not_folder]` the path is a file; `[folder_is_root]` it is the organisation's root folder.
   - `503` (Microsoft 365 not connected or failing): report it, stop. User declines permission: do not retry, stop.
