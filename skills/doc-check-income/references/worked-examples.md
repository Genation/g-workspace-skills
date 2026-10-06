# Ví dụ đã làm sẵn

Dữ liệu trong các ví dụ là giả. Cả ba ví dụ dùng chung:

- Hôm nay: 06/10/2026
- Applicant Name: Thi Mai Tran

## 1. Hai payslip liên tiếp, có salary sacrifice

- payslip_1.pdf: "ABC Pty Ltd · ABN 12 345 678 901 · 100 Collins Street Melbourne VIC 3000 · Pay Advice · Employee: Thi Mai Tran · Pay period 31/08/2026 - 13/09/2026 · Pay date 15/09/2026 · Gross $3,000.00 · Salary sacrifice super $200.00 · Tax $650.00 · Net pay $2,150.00"
- payslip_2.pdf: giống trên, Pay period 14/09/2026 - 27/09/2026, Pay date 29/09/2026.

Kỳ sau bắt đầu 14/09, ngay sau ngày cuối kỳ trước 13/09: liên tiếp. Payslip mới nhất có Pay date 29/09/2026; 29/09 + 30 ngày = 29/10/2026, sau hôm nay: chưa quá 30 ngày.

```
### payslip_2.pdf — Payslip (chắc chắn)
Kết luận: CẦN XỬ LÝ

Ghi vào Fact Find
- Employer ABN: 12 345 678 901
- Employer address: 100 Collins Street Melbourne VIC 3000
- Employer phone no.: không có trên payslip
- Salary Sacrifice / Packaging / Deductions before tax: Salary sacrifice super $200.00

Cần thông báo
- [Salary sacrifice] "Salary sacrifice super $200.00" → xin khách Statement hoặc Employment Letter / Contract.

Chưa kiểm tra được
- Không có

Ghi chú
- Net pay $2,150.00, kỳ 14/09/2026 - 27/09/2026, Pay date 29/09/2026.
- Payslip mới nhất: Pay date 29/09/2026, hôm nay 06/10/2026, chưa quá 30 ngày.
- Liên tiếp với payslip_1.pdf (kỳ 31/08/2026 - 13/09/2026). Tên khớp Applicant.
```

payslip_1.pdf có khối riêng, cùng các trường và cùng thông báo Salary sacrifice. Quy tắc 30 ngày chỉ xét payslip mới nhất.

## 2. Notice of Assessment có in TFN

Nội dung đọc được (trang 1): "Australian Taxation Office · Notice of assessment · Year ended 30 June 2026 · Thi Mai Tran · Tax file number 000 000 000 · Your taxable income $85,000 · Date of issue 20/08/2026".

```
### noa.pdf — Notice of Assessment (chắc chắn)
Kết luận: CẦN XỬ LÝ

Ghi vào Fact Find
- Không có

Cần thông báo
- [TFN] Trang 1 có in Tax File Number → che TFN (redact) trước khi lưu hoặc gửi đi.

Chưa kiểm tra được
- Không có

Ghi chú
- Taxable income $85,000, năm tài chính kết thúc 30/06/2026.
- Tên "Thi Mai Tran" khớp Applicant.
```

Báo cáo không chép số TFN. Tài liệu thuế cá nhân không cần đối chiếu với Financial Statements.

## 3. Centrelink Statement có kỳ dưới 3 tháng

Nội dung đọc được: "Services Australia · Centrelink · Income Statement · Thi Mai Tran · Family Tax Benefit Part A $180.00 per fortnight · Statement period 01/08/2026 - 30/09/2026 · Date of issue 02/10/2026".

```
### centrelink.pdf — Centrelink Statement (chắc chắn)
Kết luận: CẦN XỬ LÝ

Ghi vào Fact Find
- Income received: Family Tax Benefit Part A, $180.00 per fortnight

Cần thông báo
- [Kỳ dưới 3 tháng] Kỳ 01/08/2026 - 30/09/2026 chỉ 2 tháng → báo nhân viên xem xét.

Chưa kiểm tra được
- Không có

Ghi chú
- Date of issue 02/10/2026, hôm nay 06/10/2026, chưa quá 30 ngày. Tên khớp Applicant.
```
