# 10. Ghi kết quả lên CRM

Mục 10 của kỹ năng doc-check, tách khỏi SKILL.md; đọc khi bảng ở SKILL.md mục 1 nêu. "Mục 1–9" là mục của SKILL.md; mục 11 ở `references/intake.md`, 12 ở `references/filing.md`, 13 ở `references/old-folder.md` (chưa có trong hội thoại thì đọc đúng lúc bảng đó nêu, cùng cách).

Tổ chức có CRM (SKILL.md mục 1) thì kết quả kiểm tra của từng tài liệu được ghi lên deal trên CRM: giá trị Fact Find thành giá trị đề xuất có tài liệu làm bằng chứng, việc cần báo hiện cho nhân viên. Tệp trong `tmp/` của thư mục deal chưa có trên deal được ghi nhận lên deal (10.1), tài liệu được phân loại (10.3) và gắn với giấy tờ yêu cầu (10.4). Không lưu kết quả vào thư mục khách (mục 9 không làm khi có CRM). Chỉ chép lại báo cáo: không đọc lại, không đổi kết luận, không ghi điều báo cáo không có. Công cụ của CRM là các công cụ `genation-workspace_…`; khi nói với người dùng, gọi khách và deal bằng tên, không đọc id. Công cụ báo `module_not_enabled`: không có CRM, bỏ mục này.

**Loại giấy tờ và quy tắc.** `genation-workspace_document_types_list` được gọi theo hai cách:
- **Danh sách gọn.** Gọi không lọc MỘT lần cho cả lô, khi cần lần đầu. Mỗi loại có `code`, `label`, `categoryFolder`, `fileNamePattern` và `checkRuleCount` (số quy tắc), KHÔNG có quy tắc. Danh sách này dùng để phân loại (10.3), chọn `documentTypeCode` của `request` (10.2) và đọc `fileNamePattern` (12.1). Loại không có `checkRules` ở đây không có nghĩa là loại không có quy tắc.
- **Quy tắc kiểm tra.** Sau khi 10.3 đã đặt loại cho các tài liệu của lô, gọi lại MỘT lần với `codes` = danh sách các mã loại khác nhau của lô (mã đã có trên tài liệu và mã vừa đặt). Mỗi loại trả về có `checkRules`. Một loại được đặt sau lần gọi đó: gọi thêm một lần, chỉ với các mã còn thiếu. Lô không có tài liệu nào có loại: không gọi. Không gửi `includeRules: true` khi không có `codes` (kết quả rất lớn).

### 10.1 Tìm tài liệu trên deal

Làm trước khi kiểm tra. Mỗi tệp cần `document.id` (tài liệu đã lưu, KHÔNG phải `id` của tệp trên deal), `dealId` và `id` của tệp trên deal:
- **Tệp vừa ghi nhận trong cuộc trò chuyện này** (skill `mail-intake`, kết quả `genation-workspace_deal_files_register_existing`): tệp đính kèm hoặc tệp trong hồ sơ có đúng tên đã ghi nhận thì dùng `id`, `document.id` và `dealId` của kết quả đó.
- **Đã biết deal của lô** (thư mục hồ sơ là thư mục của deal, mục 2 hay mục 11): `genation-workspace_deal_files_list` (`dealId`, đọc hết các trang theo `cursor`) một lần cho cả lô; tệp trên deal có `document.path` đúng bằng `/<đường dẫn thư mục hồ sơ>/<đường dẫn tệp>` (không phân biệt hoa thường; ví dụ `/Customers/Lan Quach_PUR OO/tmp/Lan_DL.pdf`) là tệp đó.
- **Tệp trong hồ sơ** khác: `genation-workspace_documents_search` với `search` = tên tệp (không kèm thư mục); chọn mục có `path` đúng như trên. Mục đó có đúng một `dealFiles`: dùng `dealId` của nó; có nhiều deal mà một deal là deal của cuộc trò chuyện: deal đó; còn lại: chưa ghi, gom vào câu hỏi cuối báo cáo "tệp <tệp> nằm trên nhiều deal: <tên các deal>, ghi kết quả cho deal nào?".
- **Tệp khách gửi qua cổng khách hàng** (mục intake `new` của deal, mục 11): ghi nhận bằng `genation-workspace_deal_files_register_existing` với `dealId` và `itemId` = `driveItemId` của mục, không bằng `path` (tệp đã nằm trên OneDrive của tổ chức, OneDrive trên máy có thể chưa đồng bộ). Không truyền loại, khách hay trường nào khác, như dòng dưới. Kết quả như dòng dưới, trừ `404`: tệp không còn trên OneDrive của tổ chức (đã bị xoá hay chuyển ra ngoài), "chưa ghi nhận: tệp không còn trên OneDrive", không thử lại.
- **Mục intake chưa kiểm tra** (mục intake `unchecked` của deal, mục 11): tệp đã có trên deal, không ghi nhận lại; dùng tệp có `id` = `dealFileId` của mục trong `deal_files_list`.
- **Tệp trong `tmp/` của thư mục deal mà chưa có trên deal và không có mục intake** (tệp tải từ thư bằng `mail-intake`, tệp nhân viên chép vào, hay mọi tệp khi không có công cụ cổng khách hàng): ghi nhận bằng `genation-workspace_deal_files_register_existing` với `dealId` và `path` = `/<thư mục deal>/tmp/<tên tệp>`, tính từ thư mục gốc của tổ chức. Không truyền loại, khách, `name`, `labels`, `requiredDocumentId`, `replacesDealFileId` (10.3 và 10.4 làm sau). Chỉ ghi nhận tệp giấy tờ (PDF, ảnh, DOCX, XLSX, CSV) nằm ngay trong `tmp/` của đúng thư mục deal; không ghi nhận tệp ở thư mục khác. Kết quả:
  - Thành công: dùng `id`, `document.id` của kết quả. Deal chưa có thư mục (`folderPath` trống): lần ghi nhận đầu gắn `plannedFolderPath` với deal, sau đó không gắn được thư mục cũ nữa; vì vậy làm mục 13 (`references/old-folder.md`) trước lần ghi nhận đầu.
  - `404` (OneDrive chưa đồng bộ xong, hoặc tệp vừa được chuyển đi): ghi nhận lại một lần sau các tệp khác; vẫn lỗi: "chưa ghi nhận: OneDrive chưa đồng bộ xong".
  - `409` (đã có trên deal): đọc lại `deal_files_list` để lấy tệp đó. `503` (Microsoft 365 chưa kết nối hay đang lỗi): không ghi nhận các tệp còn lại, ghi một lần lý do. Lỗi khác: chép nguyên lời công cụ, không thử lại.
- Không tìm được (tệp đính kèm không ghi nhận trong cuộc trò chuyện, tệp ngoài `tmp/` chưa có trên deal nào): tệp đó chưa ghi, lý do "tệp chưa có trên deal".

Kèm theo mỗi tệp: `documentTypeCode` và `subjectContactId` của tài liệu, `assignedContactIds`, `latestCheck`, `checkStatus`, `filingState` của tệp trên deal (có trong kết quả trên). Biết deal trước khi kiểm tra thì lấy Applicant như mục 2.

### 10.2 Ghi từng tài liệu

Gọi `genation-workspace_document_checks_record` MỘT lần cho mỗi tài liệu có dòng `Kết luận:` (dòng "Ngoài phạm vi checklist" không ghi; tệp có nhiều khối `(phần n)` không ghi, lý do "tệp có nhiều tài liệu"):

| Trường | Giá trị |
|---|---|
| `documentId` | `document.id` ở 10.1 |
| `dealId` | deal ở 10.1 |
| `kind` | `deep` (kiểm tra đầy đủ theo checklist) |
| `outcome` | `ĐẠT` → `verified`; `CẦN XỬ LÝ`, `CHƯA ĐỦ THÔNG TIN` → `need_review`; `KHÔNG HỢP LỆ`, `KHÔNG ĐỌC ĐƯỢC` → `not_met` |
| `model` | mã model đang chạy khi hệ thống cho biết; không biết chắc thì bỏ |
| `findings` | theo bảng dưới, tối đa 200 mục |
| `ruleResults` | kết quả từng quy tắc của loại tài liệu, theo "Kết quả từng quy tắc" dưới; chỉ khi tài liệu đã có `documentTypeCode` |

**Phát hiện (`findings`)**, mỗi mục một `kind`:

| Báo cáo | Phát hiện |
|---|---|
| Dòng "Ghi vào Fact Find" có đích ở bảng đích dưới | `{kind: "fact_find", target, value, message, ruleCode, contactId?, location?}` |
| Rule 2: Finance Clause / Loan Approval Date, Settlement Date | `{kind: "deal_date", target, value, message, ruleCode}` (không thêm `fact_find` cho hai dòng này) |
| Dòng "Cần thông báo" `[TFN]` | `{kind: "redact", message: <bằng chứng: trang có TFN>, location?}`; không bao giờ ghi số TFN |
| Dòng "Cần thông báo" khác | `{kind: "notify", message: "[<nhãn>] <bằng chứng> → <việc>", request?}` |
| Dòng "Chưa kiểm tra được" | `{kind: "notify", message: "Chưa kiểm tra được: <mục>: <thiếu gì>"}` |
| Dòng "Ghi vào Broker's Notes" (rule 11) | `{kind: "broker_note", message: <dòng đó>}` |

- **`fact_find` / `deal_date`:** `message` = nguyên văn dòng báo cáo (`<Trường>: <giá trị>`, cả kỳ, nhãn, kết quả tra ABN). `value` = chỉ giá trị, theo dạng của trường: ngày `YYYY-MM-DD` (từ DD/MM/YYYY); tiền là số thập phân không `$`, không dấu phẩy (`"1250.00"`); lãi suất là số phần trăm (`"6.14"`); ABN là 11 chữ số liền; chữ thì như in. Không gửi khi giá trị không phải một giá trị rõ: "không có trên tài liệu", "không áp dụng", "Chưa kiểm tra được", chỉ có tháng/năm, số đã che (`…4821`), nhiều giá trị (khoản vay chia phần, nhiều trợ cấp), hay `KHÔNG HỢP LỆ` / `KHÔNG ĐỌC ĐƯỢC`. `asset.rental_income` là tiền thuê mỗi tháng: chỉ gửi khi tài liệu in theo tháng (per month, calendar month), không tự quy đổi kỳ.
- **`contactId`:** khách trên deal mà báo cáo nói tài liệu thuộc về (tên KHỚP với `contacts` của `deals_get`); `company.*`: khách là pháp nhân trên deal. Không xác định được: bỏ (CRM dùng khách của tài liệu). Không truyền `entityId`.
- **`location`:** trang nếu báo cáo nêu (`trang 2`); không thì bỏ.
- **`request`** (chỉ với `notify`): chỉ khi "việc cần làm" là xin khách một giấy tờ cụ thể (bản còn hạn, bản đủ kỳ, bản có chữ ký hay chứng thực, Statutory Declaration…): `{name: <giấy tờ cần xin, ngắn gọn>, documentTypeCode?}`, `documentTypeCode` chỉ khi đúng một loại trong danh sách gọn của `genation-workspace_document_types_list`. CRM tạo một tài liệu yêu cầu nháp trên deal; nhân viên quyết định gửi khách.
- **Mặt sau** của khối hai tệp `<mặt trước> + <mặt sau>`: ghi cùng `outcome` nhưng bỏ các `fact_find` (đã ghi ở mặt trước).
- **Số nhạy cảm:** chỉ các đích dưới được nhận số đầy đủ như dòng Fact Find (Licence No., Document No. hộ chiếu, Account number khoản vay). Không bao giờ gửi TFN, số thẻ, số Medicare, ngày sinh, CRN, dòng MRZ.

**Kết quả từng quy tắc (`ruleResults`).** Quy tắc kiểm tra của loại tài liệu là `checkRules` của loại, đọc bằng lần gọi `genation-workspace_document_types_list` với `codes` ("Loại giấy tờ và quy tắc", đầu mục 10). Mỗi quy tắc có `id`, `code`, `kind`, `targetField`, `message`. Đây là các tiêu chí nhân viên tick; tệp thành **Đạt yêu cầu** ("Satisfied") trên CRM khi mọi quy tắc của loại là `met` ở lần kiểm tra mới nhất. Với mỗi quy tắc của loại, một mục `{ruleId: <id>, outcome, note?}` (không có `id`: `{ruleCode: <code>, outcome, note?}`), chỉ chép lại báo cáo:
- `fact_find`, `deal_date`: `met` khi khối có dòng "Ghi vào Fact Find" cho đích đó (bảng đích dưới) với giá trị rõ và `verified`; `not_checked` khi chưa đọc được, giá trị không rõ, hay đích không có dòng nào.
- `redact`: `not_met` khi có dòng `[TFN]` (`note` = trang có TFN, không ghi số); `met` khi đã đọc hết các trang mà không thấy TFN; còn lại `not_checked`.
- `notify`, `broker_note`: `not_met` khi có dòng "Cần thông báo" đúng điều quy tắc nêu (`note` = `[<nhãn>] <bằng chứng> → <việc>`); `met` khi đã kiểm tra điều đó và không có vấn đề; `not_checked` khi điều đó nằm trong "Chưa kiểm tra được" hoặc báo cáo không nói đến.
- Khối `KHÔNG HỢP LỆ` hay `KHÔNG ĐỌC ĐƯỢC`: mọi quy tắc `not_checked`, trừ quy tắc của điều làm tệp không hợp lệ là `not_met`. Không chắc quy tắc ứng với dòng nào: `not_checked`. Mỗi quy tắc một mục, không lặp; không thêm quy tắc của loại khác.
- Tài liệu chưa có loại: phân loại trước (mục 10.3) rồi mới ghi kèm `ruleResults`; không phân loại được thì ghi không kèm `ruleResults`. Công cụ từ chối vì quy tắc (`document_type_required`, `unknown_check_rule`, `check_rule_ambiguous`, `listed_twice`): gọi lại một lần không kèm `ruleResults`, để kết quả kiểm tra vẫn được ghi.

**Đích (`target`) và `ruleCode` theo rule và trường Fact Find** (đích của gói `lending` và hồ sơ CRM; trường không có ở đây thì không gửi `fact_find`):

| Rule | Trường báo cáo → `target` (`ruleCode`) |
|---|---|
| 2 | Finance Clause / Loan Approval Date → `deal.finance_due_date` (`finance_clause_date`) · Settlement Date → `deal.estimated_settlement_date` (`settlement_date`) |
| 4 | Licence No. → `person.drivers_license_number` (`licence_number`) · Name on document → `person.drivers_license_name_on_document` (`name_on_document`) · Expiry Date → `person.drivers_license_expiry_date` (`expiry_date`) |
| 5, 6 | Document No. → `person.passport_number` (`document_number`) · Name on document → `person.passport_name_on_document` (`name_on_document`) · Expiry Date → `person.passport_expiry_date` (`expiry_date`) |
| 7 | Name on document → `person.medicare_name_on_card` (`name_on_document`) · Expiry Date → `person.medicare_expiry_date` (`expiry_date`) |
| 8 | Active Visa subclass → `person.visa_subclass` (`visa_subclass`) · Visa type → `person.visa_type` (`visa_type`) · Name on document → `person.visa_name_on_document` (`name_on_document`) |
| 9 | Trust Name → `company.trust_name` (`trust_name`) · Trustee Name → `company.name` (`trustee_name`) |
| 12 | Employer ABN → `employment.employer_abn` (`employer_abn`) · Employer address → `employment.employer_address` (`employer_address`) · Employer phone no. → `employment.employer_phone` (`employer_phone`) |
| 14, 15, 16 | Rent amount → `asset.rental_income` (`rent_amount`) |
| 17, 18 | Income received → `income.gross_value` (`income_received`) |
| 20, 21 | Lender → `liability.lender` (`lender`) · Account name → `liability.name` (`account_name`) · Account number → `liability.account_number` (`account_number`) · Interest rate → `liability.interest_rate` (`interest_rate`) · Repayment → `liability.repayment` (`repayment`) · Loan Expiry date → `liability.end_date` (`expiry_date`) |
| 22 | Current balance → `liability.balance` (`current_balance`) · Repayments → `liability.repayment` (`repayments`) |
| 23 | Account balance → `liability.balance` (`account_balance`) · Limit → `liability.limit` (`limit`) |

### 10.3 Phân loại tài liệu và khách của tài liệu

Mỗi tài liệu có dòng `Kết luận:` mà khối đã nhận ra loại, trước khi ghi kết quả của nó ở 10.2 (để kết quả kèm được `ruleResults` theo quy tắc của loại vừa đặt): MỘT lần `genation-workspace_deal_files_update` với `id` = `id` của tệp trên deal và chỉ các trường cần đổi (không có trường nào thì không gọi):
- `documentTypeCode`: chỉ khi tài liệu chưa có loại; mã theo bảng dưới, chỉ khi mã đó có trong danh sách gọn của `genation-workspace_document_types_list` ("Loại giấy tờ và quy tắc", đầu mục 10). Không sửa loại đã có.
- `subjectContactId`: khách của deal mà tài liệu thuộc về, trong `contacts` của `deals_get`: khách có tên KHỚP; không có thì khách duy nhất cùng họ và cùng tên hay preferred name (thiếu hoặc viết tắt tên đệm vẫn tính; dòng `[Sai tên]` của báo cáo giữ nguyên); pháp nhân: khách là pháp nhân đó. Đặt khi tài liệu chưa có khách, hoặc khi khách đang gắn không phải người đó (ví dụ `mail-intake` gắn người gửi thư). Tài liệu đứng tên nhiều khách của deal (tài khoản chung): khách đứng tên đầu tiên. Không xác định được đúng một khách: không đặt, gom vào câu hỏi cuối "tài liệu <tệp> của khách nào?".

Tệp đã có khách mà `assignedContactIds` trống: `genation-workspace_deal_files_assign` (`id`, `contactIds` = khách của tài liệu, cùng các khách cùng đứng tên) để tệp hiện dưới đúng khách ("Assign to"); không thay danh sách đã có. Bước này không đổi tên, không chuyển tệp (việc đó chỉ ở mục 12). Khối "Chưa nhận ra loại", Airbnb và loại không có mã: không đặt loại.

| Rule | `documentTypeCode` |
|---|---|
| 1 / 2 / 3 | `proof_of_ownership` / `contract_of_sale` / `building_contract` |
| 4 / 5 / 6 / 7 / 8 | `drivers_licence` / `australian_passport` / `foreign_passport` / `medicare_card` / `visa` |
| 9 / 10 / 11 / 12 | `trust_deed` / `company_extract` / `credit_report` / `payslip` |
| 13 | `individual_tax_return`, `partnership_tax_return`, `company_tax_return`, `trust_tax_return`, `income_statement`, `notice_of_assessment`, `financial_statements` (theo `doc_type` của mục 9) |
| 14 / 15 / 16 | `rental_statement` / `rental_agreement` / `rental_appraisal` (không gồm Airbnb) |
| 17 / 18 | `centrelink_statement` / `child_support` |
| 19 | theo mục đích của sao kê: `bank_statement_salary` (lương vào đều đặn từ employer), `bank_statement_business` (tài khoản đứng tên doanh nghiệp, giao dịch kinh doanh), `bank_statement_rental` (tiền thuê vào đều đặn), `bank_statement_expenses` (tài khoản chi tiêu, không có lương hay tiền thuê vào) |
| 20 / 21 / 22 / 23 | `home_loan_statement` / `liability_statement` / `study_loan_statement` / `bnpl_statement` |

**Rule 19:** deal có đúng một giấy tờ yêu cầu còn mở (10.4) thuộc một trong bốn loại sao kê, giao cho khách của tài liệu hoặc không giao ai: loại đó. Không có: theo "Dữ kiện để đối chiếu" của khối, khi chỉ thấy đúng MỘT mục đích. Nhiều mục đích (lương và tiền thuê cùng vào) hay không rõ: không đặt loại, gom vào câu hỏi cuối "sao kê <tệp> dùng chứng minh lương, kinh doanh, tiền thuê hay chi tiêu?".

### 10.4 Gắn với giấy tờ yêu cầu

Có công cụ `genation-workspace_required_documents_list` và `genation-workspace_required_documents_complete`: gọi `required_documents_list` (`dealId`, đọc hết các trang) một lần cho cả lô. Với mỗi tài liệu đã có loại, Kết luận không phải `KHÔNG HỢP LỆ` hay `KHÔNG ĐỌC ĐƯỢC`, và chưa hoàn tất giấy tờ yêu cầu nào (không mục nào có `fulfilledByDealFileId` = `id` của tệp):
- Ứng viên: giấy tờ yêu cầu ở trạng thái `draft`, `requested` hoặc `rejected`, cùng `documentTypeCode` với tài liệu, `assignedContactIds` trống hoặc có khách của tài liệu. Nhiều ứng viên: giữ các mục giao đúng khách của tài liệu.
- Đúng một: `required_documents_complete` với `id` = giấy tờ yêu cầu, `dealFileId` = `id` của tệp. Mỗi giấy tờ yêu cầu chỉ gắn một tệp của lô.
- Không có: bỏ qua ("không có giấy tờ yêu cầu"). Vẫn nhiều: chưa gắn, gom vào câu hỏi cuối (nêu `name` các mục).

Không tạo, sửa, từ chối hay lưu trữ giấy tờ yêu cầu. Công cụ báo `required_document_state`: ghi "chưa gắn: <tên> đã hoàn tất".

### 10.5 Sau khi ghi

Ứng dụng hỏi người dùng ở lần ghi đầu tiên của cuộc trò chuyện; từ chối thì không thử lại, các tệp còn lại ghi "chưa ghi lên CRM: người dùng từ chối". Công cụ báo lỗi tham số (`Invalid arguments: …`): sửa đúng chỗ đó theo báo cáo, gọi lại một lần. Lỗi khác (`404` tài liệu không có trên deal…): ghi nguyên lời công cụ, không thử lại. Kết quả có `warnings` (đích chưa có chỗ ghi, khách không có bản ghi tương ứng…) là bình thường: chỉ đếm, không liệt kê.

Thêm dưới báo cáo một dòng mỗi tệp: `- <tệp> · CRM: đã ghi (<kết luận>)` (vừa ghi nhận lên deal thì thêm `, vừa ghi nhận`; vừa đặt loại hay khách thì thêm `, <nhãn loại> · <tên khách>`; vừa gắn giấy tờ yêu cầu thì thêm `, gắn <tên giấy tờ yêu cầu>`; có `ruleResults` thì thêm `, <số met>/<số quy tắc> tiêu chí đạt`; có cảnh báo thì thêm `, <n> phát hiện chưa áp dụng`; có `requiredDocumentIds` thì thêm `, <n> giấy tờ cần xin (nháp)`) hoặc `- <tệp> · CRM: chưa ghi: <lý do>`. Lô theo mục 11: dùng phần tóm tắt của mục 11 thay cho các dòng này.
