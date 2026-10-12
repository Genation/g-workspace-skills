# Thuế và báo cáo tài chính (rule 13)

## Phạm vi

Checklist rule 13: Individual / Partnership / Company / Trust Tax Return, Income Statement, Notice of Assessment, kèm Profit & Loss và Balance Sheet.

| Loại | Gồm |
|---|---|
| Tax Return | tờ khai Individual, Company, Partnership, Trust do tax agent hoặc phần mềm thuế xuất ra (cả bản tự nộp qua myTax) |
| Notice of Assessment (NOA) | thông báo tính thuế của ATO, kể cả `Notice of amended assessment` |
| ATO Income Statement | income statement trên myGov / ATO online services |
| Financial Statements | bộ báo cáo tài chính: Profit and Loss, Balance Sheet, kèm Notes, declaration hoặc Compilation Report |

Rule 13 có Bước 0 chặt nhất: chỉ nhận bản PDF gốc tải từ myGov/ATO, hoặc do phần mềm thuế/kế toán xuất ra.

Đọc theo trang bằng `guroos_document_read` (dòng "Tệp:" của khối cho biết số trang):
- Tax Return: trang 1 (tiêu đề, kỳ, tên) → trang tổng hợp (`Taxable income`, thường kèm "Taxation estimate") → trang declaration (thường ở cuối).
- Financial Statements: mục lục → Profit and Loss → Balance Sheet → Notes / declaration / Compilation Report.
- NOA, ATO Income Statement: đọc hết.

## 1. Dấu hiệu cấu trúc bắt buộc

| Loại | Dấu hiệu bắt buộc |
|---|---|
| Tax Return | (1) tiêu đề `Individual` / `Company` / `Partnership` / `Trust tax return` kèm năm và kỳ `1 July YYYY to 30 June YYYY` (hoặc kỳ thay thế in rõ); (2) các mục đánh số theo mẫu ATO (ví dụ `1 Salary or wages`, `D1`…`D10`, `L1`) có nhãn ô chữ cái cạnh số tiền; (3) phần tổng hợp `Total income or loss`, `Total deductions`, `Taxable income` (hoặc `Taxable income or loss`); (4) phần khai báo của người nộp thuế hoặc tax agent, ví dụ `Taxpayer's declaration`, `Electronic lodgement declaration`; (5) tên người nộp thuế lặp ở đầu các trang của tờ khai |
| NOA | (1) tiêu đề `Notice of assessment` kèm tên ATO (`Australian Taxation Office`, `ato.gov.au` hoặc địa chỉ ATO); (2) `Year ended 30 June YYYY`; (3) `Date of issue`; (4) bảng tính thuế: `Taxable income`, `Tax on taxable income`, `Medicare levy`, các khoản credit (ví dụ PAYG withholding) và dòng kết quả phải trả hoặc được hoàn |
| ATO Income Statement | (1) ATO, myGov hoặc ATO online services; (2) tiêu đề `Income statement`; (3) payer name và Payer ABN; (4) `Gross payments` và `Total tax withheld` (hoặc `Tax withheld`); (5) kỳ 1 July–30 June và trạng thái (ví dụ `Tax ready`) |
| Financial Statements | (1) tên tổ chức kèm ABN/ACN và kỳ `For the year ended …`; (2) `Profit and Loss` (hoặc `Statement of profit or loss`) có dòng lãi/lỗ (`Net profit`, `Profit before / after income tax`…); (3) `Balance Sheet` (hoặc `Statement of Financial Position`) có `Total assets`, `Total liabilities`, `Net assets` và Equity; (4) ít nhất một trong: `Notes to the financial statements`, declaration của Directors / Trustee / Partners, `Compilation Report` |

- Thiếu một dấu hiệu bắt buộc → DỪNG `[Cấu trúc] Thiếu <dấu hiệu>`. Rule 13 không hạ xuống "chưa chắc", trừ hai trường hợp ngay dưới.
- NOA và ATO Income Statement chưa có mẫu thật để chốt dấu hiệu: chỉ DỪNG khi thiếu (1) hoặc (2). Thiếu dấu hiệu khác → tiêu đề "chưa chắc: thiếu <dấu hiệu>", Ghi chú "thiếu <dấu hiệu> (chưa có mẫu để chốt)".
- Tệp thiếu trang: dấu hiệu nằm ở trang thiếu không làm DỪNG; dấu hiệu (1) và dấu hiệu ở các trang có mặt vẫn phải đủ.
- Gửi thay cho loại chính thì thiếu dấu hiệu, nên DỪNG `[Cấu trúc]`: trang "Taxation estimate" hoặc "Lodgement summary" đứng riêng, bảng tóm tắt tự gõ (thay Tax Return); P&L hoặc Balance Sheet rời, management accounts (thay Financial Statements, thiếu (3) hoặc (4)).
- "Income statement" trong bộ Financial Statements là tên khác của P&L, không phải ATO Income Statement.
- PAYG payment summary do employer phát hành (mẫu cũ, không phải của ATO): một dòng "Ngoài phạm vi".

## 2. Bước 0 của nhóm

Rule 13 không có mức BÁO. Ghi mọi lý do DỪNG đã thấy. Đã có lý do DỪNG thì không cần làm thêm phép so; phép so đã làm mà lệch vẫn ghi.

PDF không có khối, hoặc khối ghi "Không đo được tệp: …" (DỪNG `[Nguồn] Chưa đo được tệp gốc`): dòng `[Tệp gốc]` ghi việc cần làm "gửi lại đúng tệp PDF trong ô chat của Guroos; vẫn không có khối thì báo người quản trị cập nhật ứng dụng".

### 2A. Nguồn tệp

| Loại | DỪNG khi "Nhóm nguồn" là |
|---|---|
| Tax Return, NOA | trình duyệt in ra PDF, bộ chuyển HTML sang PDF, máy in PDF, công cụ văn phòng, công cụ thiết kế, trình sửa/xử lý PDF, ảnh (JPG/PNG), không phải PDF (DOCX, XLSX…) |
| ATO Income Statement | công cụ văn phòng, công cụ thiết kế, trình sửa/xử lý PDF, ảnh (JPG/PNG), không phải PDF |
| Financial Statements | công cụ thiết kế, trình sửa/xử lý PDF, ảnh (JPG/PNG), không phải PDF |

- Nguồn khác: GHI CHÚ (ví dụ ATO Income Statement in từ myGov; Financial Statements từ phần mềm kế toán trên web, hoặc kế toán nhỏ soạn bằng Word/Excel).
- Tệp ảnh JPG/PNG: DỪNG `[Nguồn] ảnh (JPG/PNG)`, dù khối ảnh ghi nhóm nguồn nào.
- Dòng "Tệp:" ghi `trang có chữ: 0/N` → DỪNG `[Nguồn] Tệp không có lớp chữ`.

### 2B. Dấu hiệu xét theo loại

- Mọi nhãn ở mục "Dấu hiệu xét theo loại tài liệu" → DỪNG: `[Sửa nội dung]`, `[Che chữ]`, `[Ảnh chụp/scan]` (dù chỉ một trang, dù có ảnh trang gửi kèm), `[Chữ vẽ bằng nét]`, `[Sửa ảnh]` và nhãn chưa nêu ở đây.
- Mọi dòng "Ghi chú kỹ thuật" → GHI CHÚ (ví dụ lưu thêm để gắn chữ ký số, chú thích chỉ che số TFN).

### 2C. Kiểm tra số và ngày

Lệch quá $1 → DỪNG `[Số liệu] <phép so>: <các số in> lệch <số chênh>`. Loss có thể in kèm `L`, `LOSS`, dấu ngoặc hoặc dấu trừ.

| Loại | Phép so |
|---|---|
| Tax Return cá nhân, NOA | `Total income or loss` − `Total deductions` = `Taxable income` |
| Tax Return cá nhân, NOA có in `Tax on (your) taxable income` | gọi `guroos_tax_estimate(financial_year="<năm tài chính in trên tài liệu, dạng 2024-25>", taxable_income=<số in>, entity="individual")`; số in = dòng "Thuế thu nhập theo biểu thuế". Bỏ phép so khi tool báo "chưa có biểu thuế cho năm này", hoặc tài liệu cho thấy người không cư trú, cư trú một phần năm (`Part-year tax-free threshold`), working holiday maker |
| Tax Return cá nhân, NOA in đủ các dòng | tổng thuế phải trả − tổng credit và offset = số được hoàn hoặc phải trả |
| Tax Return pháp nhân (company / partnership / trust) | `Total income` − `Total expenses` = `Total profit or loss` (hoặc `Net income or loss`). Company: thuế trên Taxable income bằng một trong hai mức ("Base rate entity", "Công ty khác 30%") của `guroos_tax_estimate(…, entity="company")`; bỏ phép so khi tool báo "chưa có thuế suất công ty cho năm này" |
| Financial Statements (chỉ cột năm của tiêu đề) | Gross profit = Sales − Cost of goods sold; lợi nhuận trước thuế = Gross profit (+ thu nhập khác) − tổng chi phí; lợi nhuận sau thuế = trước thuế − Income tax; `Total assets` − `Total liabilities` = `Net assets` = Total equity |
| ATO Income Statement | `Tax withheld` không lớn hơn `Gross payments` |

**Ngày.** Lấy ngày phát hành (`Date of issue`), ngày ký declaration, ngày lodgement hoặc ngày in trên tài liệu.
- Tax Return, NOA, Financial Statements: so trực tiếp ngày đó với ngày kết thúc năm tài chính in ở tiêu đề (`30 June YYYY`, hoặc ngày cuối của kỳ thay thế in rõ). Trùng hoặc trước ngày kết thúc → DỪNG `[Số liệu] <nhãn ngày> <ngày> không sau ngày kết thúc năm tài chính <ngày in>`.
- Mọi loại: gọi `guroos_date_check(document_date="<ngày>")` chỉ để xét ngày trong tương lai; bỏ qua "QUÁ" / "TRONG" 30 ngày.
- ATO Income Statement của năm đang chạy (chưa `Tax ready`) vẫn hợp lệ; ghi trạng thái vào Ghi chú.
- Năm tài chính ở tiêu đề khác kỳ trong thân tài liệu → DỪNG `[Số liệu]`. Không có ngày nào để so → Ghi chú.

## 3. Ghi vào Fact Find

| Loại | Trường | Không có thì ghi |
|---|---|---|
| Financial Statements — Profit and Loss | Total income; Total expenses; Net profit / loss | "không có trên tài liệu" |
| Financial Statements — Balance Sheet | Total assets; Total liabilities; Net assets | "không có trên tài liệu" |
| Tax Return, NOA, ATO Income Statement | không có trường Fact Find. Tax Return và NOA ghi `Taxable income` (hoặc loss) và năm tài chính vào Ghi chú | — |

- Kèm nhãn in trên tài liệu khi khác tên trường (ví dụ "Total revenue").
- Báo cáo có cột năm trước để so sánh: chỉ lấy cột năm của tiêu đề.

## 4. Cần thông báo

| Điều kiện | Nhãn | Bằng chứng an toàn | Việc cần làm |
|---|---|---|---|
| Có in TFN: trang ở dòng "Mã số" của khối, trang có `[đã che TFN]` hoặc TFN thấy trên ảnh. Chú thích chỉ che số TFN không xóa số khỏi tệp, nên vẫn ghi | TFN | chỉ số trang; khối liệt kê "…" thì viết "trang 1, 3, … và các trang sau" | che TFN (redact) trước khi lưu hoặc chia sẻ |
| Tên người nộp thuế khác Applicant; tài liệu của pháp nhân: tên pháp lý khác pháp nhân trong `guroos_case_profile` | Sai tên | hai tên nguyên văn, khác ở đâu | báo nhân viên xem xét |
| Profit and Loss có Net profit âm | Loss | dòng lãi/lỗ nguyên văn và năm | báo nhân viên xem xét |
| Bước 6 lệch quá $1: Tax Return pháp nhân với Financial Statements; Tax Return cá nhân với NOA | Lệch số liệu | theo `cross-checks.md` | báo nhân viên xem xét |

Khối `KHÔNG HỢP LỆ` (trừ khi không có khối, xem mục 2): `[Tệp gốc] <tóm tắt lý do> → yêu cầu khách gửi bản PDF gốc tải trực tiếp từ myGov/ATO, hoặc nhờ kế toán/tax agent gửi trực tiếp cho văn phòng`. Lý do có `[Sửa nội dung]`, `[Che chữ]`, `[Mã số sai]` hoặc `[Số liệu]` thì thêm "; đối chiếu trực tiếp với kế toán/tax agent hoặc ATO trước khi dùng số liệu của khách".

Chỉ ghi chú:
- Tax Return in Taxable income âm hoặc lỗ kinh doanh (`[Loss]` chỉ dành cho Profit and Loss).
- Medicare levy khác 2% Taxable income (có thể được giảm hoặc miễn); NOA là bản sửa đổi (amended).
- Các phép so đã làm và kết quả.

## 5. Lưu ý riêng

- **Pháp nhân:** partner, trustee, beneficiary in trên tờ khai không so với Applicant. Chỉ so tên pháp lý của partnership / trust / company với hồ sơ.
- **Tệp có nhiều tài liệu** (bộ hồ sơ kế toán gồm Financial Statements và Tax Return, hoặc NOA nhiều năm): mỗi phần một khối `<tệp> (phần n)`, nhận loại và xét cấu trúc theo phần đó. Khối kiểm tra là của cả tệp: điểm DỪNG ở 2A (theo cột của bất kỳ loại nào có trong tệp) hoặc ở 2B làm mọi phần `KHÔNG HỢP LỆ`. Dòng `[TFN]` ghi ở phần chứa trang có TFN.
- **Dữ kiện để đối chiếu** theo loại:
  - Tax Return cá nhân: `<tên> · năm … · Total income … · Taxable income …`
  - Tax Return pháp nhân: `<tên pháp nhân> · năm … · Total income … · Total profit or loss …`
  - NOA: `<tên> · năm … · Taxable income … · Date of issue …`
  - ATO Income Statement: `<tên> · năm … · payer <tên>, ABN đúng số kiểm tra · Gross payments … · Tax withheld …`
  - Financial Statements: `<tên pháp nhân> · năm kết thúc … · Total income … · Net profit / loss … · Net assets …`

## 6. Ví dụ

Dữ liệu giả. Hôm nay 11/10/2026. `guroos_case_profile`: "Applicant 1: Thi Mai Tran". Lô chỉ có tệp này.

**Tax Return cá nhân của tax agent.** Khối kiểm tra: "Nhóm nguồn: phần mềm đã biết (phần mềm thuế/kế toán XReport, theo Producer).", "Mã số (không hiện số): TFN 15 lần (trang 1, 3, 4, 5, 6, 7, 8, 9, …), 1 số khác nhau, số kiểm tra đúng.", các mục dấu hiệu và ghi chú kỹ thuật đều "không có.". Nội dung: "Individual tax return 1 July 2024 to 30 June 2025"; mục `1 Salary or wages … C 92,500`, `D3`, `D5`; "TRAN, THI MAI" đầu mỗi trang; "Total income or loss 92,500 · Total deductions 4,180 · Taxable income 88,320"; Taxation estimate "Tax on your taxable income 17,284.00 · Medicare levy 1,766.40 · PAYG credits 19,200.00 · Refund 149.60"; "Electronic lodgement declaration" ký 14/08/2025.

Bước 0:
- Đủ 5 dấu hiệu, nguồn CHẤP NHẬN.
- 92,500 − 4,180 = 88,320. 17,284.00 + 1,766.40 − 19,200.00 = −149.60, khớp Refund 149.60.
- `guroos_tax_estimate(financial_year="2024-25", taxable_income=88320, entity="individual")` → "- Thuế thu nhập theo biểu thuế: $17,284.00", khớp.
- 14/08/2025 sau 30 June 2025 ở tiêu đề. `guroos_date_check(document_date="14/08/2025")` → "Ngày tài liệu: 14/08/2025 → 423 ngày → QUÁ 30 ngày": không ở tương lai; bỏ qua QUÁ 30 ngày.

```
### tax return 2025.pdf — Individual Tax Return (rule 13) · chắc chắn
Kết luận: CẦN XỬ LÝ
Kiểm tra tệp gốc: đạt (nguồn: phần mềm đã biết (phần mềm thuế/kế toán XReport, theo Producer)) · quy tắc: references/tax-financials.md
Ghi vào Fact Find
- Không có
Cần thông báo
- [TFN] Trang 1, 3, 4, 5, 6, 7, 8, 9 và các trang sau có in TFN → che TFN (redact) trước khi lưu hoặc chia sẻ.
Chưa kiểm tra được
- Không có
Ghi chú
- Tên "TRAN, THI MAI" khớp Applicant Thi Mai Tran, khác thứ tự từ.
- Đã đối chiếu: Total income − Total deductions = Taxable income; thuế − PAYG credits = Refund; thuế theo biểu thuế 2024–25 khớp $17,284.00; ngày declaration 14/08/2025 sau 30 June 2025.
- Lô chưa có Notice of Assessment cùng năm để đối chiếu.
- Taxable income 88,320, năm tài chính 2024–25.
Dữ kiện để đối chiếu: Thi Mai Tran · năm 2024–25 · Total income 92,500 · Taxable income 88,320
```
