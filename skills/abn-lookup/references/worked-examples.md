# Worked examples

Business data in examples 2 to 5 is fake. All examples share: today is 12/10/2026.

## 1. ABN active, name matches

User: "Look up ABN 51 824 753 556, the name on the document is Australian Taxation Office."

`guroos_abn_lookup` (abn = "51 824 753 556") returns: Business: AUSTRALIAN TAXATION OFFICE · Entity type: Commonwealth Government Entity · ABN status: Active from 01/07/2000 · GST: registered from 01/07/2000 · ACT 2600 · Business names: ATO.

```
### Australian Taxation Office
Business details (ABN Lookup, checked 12/10/2026)
- Entity name: AUSTRALIAN TAXATION OFFICE
- ABN: 51 824 753 556 · ACN: none
- Entity type: Commonwealth Government Entity
- ABN status: Active from 01/07/2000
- GST: registered from 01/07/2000
- State / postcode: ACT 2600
- Business names: ATO

Notices
- None

Could not check
- None

Notes
- Name on the document "Australian Taxation Office" matches the entity name.
```

## 2. ABN cancelled, name on the payslip is a business name

Payslip shows "Sunrise Cafe · ABN 11 123 456 780". `guroos_abn_lookup` returns: Business: SUNRISE HOLDINGS PTY LTD · ACN 123 456 780 · Australian Private Company · ABN status: CANCELLED from 30/06/2026 · not registered for GST · VIC 3000 · Business names: Sunrise Cafe.

```
### Sunrise Cafe
Business details (ABN Lookup, checked 12/10/2026)
- Entity name: SUNRISE HOLDINGS PTY LTD
- ABN: 11 123 456 780 · ACN: 123 456 780
- Entity type: Australian Private Company
- ABN status: Cancelled from 30/06/2026
- GST: not registered
- State / postcode: VIC 3000
- Business names: Sunrise Cafe

Notices
- [ABN cancelled] ABN 11 123 456 780 cancelled from 30/06/2026 → refer to staff for review.

Could not check
- ASIC company registration status: not in ABR; needs an ASIC Company Extract or a search of ACN 123 456 780 on ASIC Connect.

Notes
- Name on the payslip "Sunrise Cafe" matches a business name.
- Not registered for GST.
```

A cancelled ABN does not mean the company is deregistered; so the ASIC status goes under "Could not check".

## 3. ABN Lookup not configured

`guroos_abn_lookup` reports: "ABN Lookup is not set up for this organisation (no ABR GUID yet). Tell the user that an organisation admin (owner or admin) must add the ABR GUID once in Settings → ABN Lookup…".

```
### ABN 11 123 456 780
Notices
- None

Could not check
- ABN lookup: ABN Lookup isn't set up for your organisation yet. Ask an organisation admin to add the ABR GUID in Settings → ABN Lookup, once for everyone (admins register free at https://abr.business.gov.au/Tools/WebServices). Meanwhile you can look it up yourself at https://abr.business.gov.au.

Notes
- None
```

Do not fill in a name or status from memory, even for a well-known business.

## 4. Trust, name on the document without "The Trustee for"

Payslip shows "Tran Family Trust · ABN 18 123 456 789". `guroos_abn_lookup` returns: Business: The Trustee for TRAN FAMILY TRUST · Entity type: Discretionary Trading Trust · ABN status: Active from 01/07/2018 · GST: registered from 01/07/2018 · NSW 2000 · no business names.

```
### Tran Family Trust
Business details (ABN Lookup, checked 12/10/2026)
- Entity name: The Trustee for TRAN FAMILY TRUST
- ABN: 18 123 456 789 · ACN: none
- Entity type: Discretionary Trading Trust
- ABN status: Active from 01/07/2018
- GST: registered from 01/07/2018
- State / postcode: NSW 2000
- Business names: none

Notices
- None

Could not check
- None

Notes
- Name on the payslip "Tran Family Trust" matches the entity name after dropping "The Trustee for".
- ABR has no trustee name: trustee not compared.
```

## 5. Sole trader, name on the document missing the middle name

Invoice shows "Mai Tran · ABN 80 987 654 321". `guroos_abn_lookup` returns: Business: TRAN, THI MAI · Entity type: Individual/Sole Trader · ABN status: Active from 15/03/2026 · not registered for GST · VIC 3170 · no business names. Due diligence notes: The Active status has applied for only 211 days (under 12 months); Not registered for GST; An individual in business (sole trader).

```
### Mai Tran
Business details (ABN Lookup, checked 12/10/2026)
- Entity name: TRAN, THI MAI
- ABN: 80 987 654 321 · ACN: none
- Entity type: Individual/Sole Trader
- ABN status: Active from 15/03/2026
- GST: not registered
- State / postcode: VIC 3170
- Business names: none

Notices
- [Business name mismatch] Invoice shows "Mai Tran", ABR has "TRAN, THI MAI": middle name "Thi" missing → refer to staff for review.

Could not check
- None

Notes
- Active status in effect from 15/03/2026, under 12 months: may be a new ABN or an old ABN just reactivated; check the history on ABR before concluding.
- Not registered for GST.
- Individual (sole trader): no ACN, not registered with ASIC.
```

An individual's name is compared as a person's name: a different word order is fine, but a missing middle name is DIFFERENT.
