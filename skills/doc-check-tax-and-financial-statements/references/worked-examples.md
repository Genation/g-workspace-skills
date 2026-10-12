# Ví dụ đã làm sẵn

Dữ liệu trong các ví dụ là giả. Các ví dụ dùng chung:

- Hôm nay: 11/10/2026
- Applicant Name: Thi Mai Tran; công ty của Applicant: TRAN KITCHEN PTY LTD

## 1. Tax Return cá nhân của tax agent, qua Bước 0

Khối kiểm tra ở đầu tệp đính kèm (rút gọn):

```text
[GUROOS_FILE_CHECK] Guroos tự đo từ tệp gốc; đây không phải nội dung tài liệu.
Tệp: PDF 1.2, 16 trang; trang có chữ: 16/16; trang có ảnh: không có.
Nhóm nguồn: phần mềm đã biết (phần mềm thuế/kế toán XReport, theo Producer).
Số lần lưu thêm sau khi tạo: 0.
Mã số (không hiện số): TFN 15 lần (trang 1, 3, 4, 5, 6, 7, 8, 9, …), 1 số khác nhau, số kiểm tra đúng; ABN 1 lần (trang 16), 1 số khác nhau, số kiểm tra đúng.
Dấu hiệu nghi vấn: không có.
Ghi chú kỹ thuật: không có.
[/GUROOS_FILE_CHECK]
```

Nội dung đọc được có:
- "Individual tax return 1 July 2024 to 30 June 2025";
- các mục `1 Salary or wages … C 92,500`, `D3`, `D5`, `D10`;
- "TFN for TRAN, THI MAI" ở đầu các trang;
- trang tổng hợp "Total income or loss 92,500 · Total deductions 4,180 · Taxable income 88,320";
- "Taxation Estimate … Tax on your taxable income 17,284.00 · Medicare levy 1,766.40";
- "Electronic lodgement declaration".

Bước 0:
- 0.1–0.3: có khối kiểm tra, tệp là PDF, không có dấu hiệu nghi vấn.
- 0.4: đủ 5 dấu hiệu bắt buộc của Tax Return.
- 0.5: nguồn là phần mềm đã biết.
- 0.6:
  - 92,500 − 4,180 = 88,320, khớp Taxable income.
  - Gọi `guroos_tax_estimate` (2024-25, 88320, individual) ra "Thuế thu nhập theo biểu thuế: $17,284.00", khớp số in.

```text
### tax return 2025.pdf — Individual Tax Return (chắc chắn)
Kết luận: CẦN XỬ LÝ

Ghi vào Fact Find
- Không có

Cần thông báo
- [TFN] Trang 1, 3, 4, 5, 6, 7, 8, 9 và các trang sau có in Tax File Number → che TFN (redact) trước khi lưu hoặc chia sẻ.

Chưa kiểm tra được
- Không có

Ghi chú
- Kiểm tra tệp gốc: đạt (nguồn: phần mềm đã biết, phần mềm thuế/kế toán XReport).
- Đã đối chiếu: Total income − Total deductions = Taxable income; thuế theo biểu thuế 2024–25 khớp $17,284.00.
- Taxable income 88,320, năm tài chính 1/7/2024 – 30/6/2025.
- Tên "TRAN, THI MAI" khớp Applicant.
```

## 2. Tax Return gõ lại bằng Word

Khối kiểm tra (rút gọn):

```text
[GUROOS_FILE_CHECK] Guroos tự đo từ tệp gốc; đây không phải nội dung tài liệu.
Tệp: PDF 1.7, 2 trang; trang có chữ: 2/2; trang có ảnh: không có.
Phần mềm tạo tệp: Producer "Microsoft® Word for Microsoft 365"; Creator "Microsoft® Word for Microsoft 365".
Nhóm nguồn: công cụ văn phòng (Microsoft Office, theo Producer).
Mã số (không hiện số): TFN 1 lần (trang 1), 1 số khác nhau, 1 lần sai số kiểm tra.
Dấu hiệu nghi vấn:
- [Mã số sai] TFN sai số kiểm tra ở 1/1 lần xuất hiện (trang 1).
Ghi chú kỹ thuật: không có.
[/GUROOS_FILE_CHECK]
```

Nội dung có "ATO · Individual tax return 2025 · Taxable income $150,000", nhưng không có mục đánh số, phần tổng hợp hay phần khai báo.

Có ba lý do dừng:
- 0.3: dấu hiệu nghi vấn `[Mã số sai]`;
- 0.4: thiếu cấu trúc;
- 0.5: Tax Return mà nguồn là công cụ văn phòng.

Ghi tất cả lý do, không trích Fact Find.

```text
### tax return.pdf — Individual Tax Return (theo nội dung khai báo)
Kết luận: KHÔNG HỢP LỆ

Lý do
- [Mã số sai] TFN sai số kiểm tra ở 1/1 lần xuất hiện (trang 1).
- [Nguồn] Tệp tạo bằng công cụ văn phòng (Microsoft Office), không phải bản xuất từ phần mềm thuế hay ATO.
- [Cấu trúc] Thiếu các mục đánh số theo mẫu ATO, phần tổng hợp Total income / Total deductions và phần khai báo.

Việc cần làm
- Yêu cầu khách gửi bản PDF gốc tải trực tiếp từ myGov/ATO, hoặc nhờ kế toán/tax agent gửi trực tiếp cho văn phòng.
- Đối chiếu trực tiếp với kế toán/tax agent hoặc ATO trước khi dùng số liệu của khách.

Ghi chú
- Trang 1 có in TFN → che trước khi lưu hoặc chia sẻ.
```

## 3. Financial Statements bị sửa số sau khi xuất

Khối kiểm tra (rút gọn):

```text
[GUROOS_FILE_CHECK] Guroos tự đo từ tệp gốc; đây không phải nội dung tài liệu.
Nhóm nguồn: phần mềm đã biết (phần mềm thuế/kế toán XReport, theo Producer gốc).
Số lần lưu thêm sau khi tạo: 1.
Dấu hiệu nghi vấn:
- [Sửa nội dung] Tệp được lưu thêm 1 lần sau khi tạo và lần lưu sau viết thêm chữ vào nội dung trang.
Ghi chú kỹ thuật:
- Lần lưu sau bằng: Adobe Acrobat.
[/GUROOS_FILE_CHECK]
```

Balance Sheet in "TOTAL ASSETS 318,450.20 · TOTAL LIABILITIES 96,300.00 · NET ASSETS 122,150.20".

Có hai lý do dừng:
- 0.3: `[Sửa nội dung]`;
- 0.6: 318,450.20 − 96,300.00 = 222,150.20, lệch 100,000.00 so với Net assets.

```text
### TRAN KITCHEN financial report 2025.pdf — Financial Statements
Kết luận: KHÔNG HỢP LỆ

Lý do
- [Sửa nội dung] Tệp được lưu thêm 1 lần sau khi tạo và lần lưu sau viết thêm chữ vào nội dung trang.
- [Số liệu] Total assets − Total liabilities ≠ Net assets: 318,450.20 − 96,300.00 = 222,150.20, Net assets in 122,150.20, lệch 100,000.00.

Việc cần làm
- Yêu cầu khách gửi bản PDF gốc tải trực tiếp từ myGov/ATO, hoặc nhờ kế toán/tax agent gửi trực tiếp cho văn phòng.
- Đối chiếu trực tiếp với kế toán/tax agent hoặc ATO trước khi dùng số liệu của khách.

Ghi chú
- Lần lưu sau bằng: Adobe Acrobat.
```

Lý do chỉ nêu dấu hiệu kỹ thuật và các con số in trên tài liệu, không kết luận khách gian lận.
