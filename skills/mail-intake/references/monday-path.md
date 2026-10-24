# Monday path

Steps M1 → M4 of the mail-intake skill (no CRM: find the Deal on Monday, only save files into the folder), split out of SKILL.md; read when SKILL.md Step 2 chooses the Monday path. "Step 1", "Step 2", "Result" and "Limits and safety" are SKILL.md sections.

### Step M1 - Find the Deal on Monday by sender email

Search only by the sender email address from Step 1. Do NOT search by sender name, subject or email content.

1. Search with `monday_search` using exactly that email address, once.
2. Handle the result:
   - Exactly one Deal: use that Deal.
   - Several Deals: list the Deals and ask the user to choose. **Stop** until the user chooses.
   - No Deal: **Stop** - "no Deal matches email `<email>`". Do not guess, do not search another way.
3. No `monday_…` tool at all: the assistant is not connected to Monday. **Stop** - ask the user to open the Monday page in the app and click "Connect the assistant".

This skill only reads Monday; do not create or edit items, columns or comments.

**Output:** Deal name (e.g. `Lan Quach`).

### Step M2 - Find or create the Deal folder, with the full set of subfolders

This step does not ask the user. The `guroos_customers` result may say "ask the user" or "Ask the user for the exact name": in this step ignore that prompt and follow the rules below. Do not list every folder, do not guess a folder with a similar name.

1. Search with `guroos_customers`, `query` = the Deal name (matched against the vault's top-level folders, ignoring accents, case and word order); never a path.
2. Determine the Deal folder name:
   - A folder whose name equals the Deal name (ignoring diacritics, case, joining characters such as `_` `-`, e.g. `Lan_Quach` equals `Lan Quach`): use that folder.
   - No folder equals the Deal name (even when a folder matches only partly, like `Lan Quach_PUR OO`, or has a similar name, like `LanThoQuach-TBC`): Deal folder name = exactly the Deal name. Do not make up another name.
3. Call `guroos_customer_create` ONCE with `customer` = the Deal folder name from item 2 and `new_folder` = `true`. The tool creates only what is missing (the Deal folder, `tmp/`, the standard subfolders `0. Compliance` … `6. Approval & Settlement`, `Archive`); existing folders and files stay unchanged ("Nothing created" when nothing was missing).

**Output:** the name of exactly one Deal folder, whether it was just created or existed, and the subfolders just added (if any).

### Step M3 - Check files in tmp/

1. View the Deal folder with `guroos_customer_files`; note the names of the files currently in `tmp/` (a just-created `tmp/` is empty).
2. Compare the attachment names (Step 1) with the file names in `tmp/`, case-insensitive. A file with the same name is "already there".

**Output:** list of attachments to save (not yet in `tmp/`) and list of files already there. No file left to save: **Stop** - all files already there.

### Step M4 - Save attachments into tmp/

For each file to save from Step M3, call `guroos_mail_save_attachment` with `ref` = the `a.…` ref, `customer` = Deal folder name, `subfolder` = `tmp`. Keep the original file name (do not pass `filename`).

- Tool reports the file was already saved from this email before: write "already there".
- Compressed or password-protected file: save as is, note it in the report.

**Output:** list of files saved and files not saved (with reason).
