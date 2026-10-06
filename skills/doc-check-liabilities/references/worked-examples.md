# Ví dụ đã làm sẵn

Dữ liệu trong các ví dụ là giả. Cả hai ví dụ dùng chung:

- Hôm nay: 06/10/2026
- Applicant Name: Thi Mai Tran

## 1. Bank Statement có cá cược và lương lệch với payslip

Nội dung đọc được (đã xem hết các trang): "Commonwealth Bank · Smart Access · Statement · Account name: Thi Mai Tran · BSB 063-000 · Account number 1234 5678 · Statement period 01/07/2026 - 30/09/2026 · 12/08 SPORTSBET $200.00 DR · 25/08 SPORTSBET $300.00 DR · 15/09 ABC PTY LTD SALARY $2,000.00 CR · 29/09 ABC PTY LTD SALARY $2,000.00 CR". Cùng lượt này có payslip ghi Net pay $2,150.00.

Kỳ 01/07 - 30/09 là đủ 3 tháng. Không có statement date nên lấy ngày cuối kỳ 30/09/2026; 30/09 + 30 ngày = 30/10/2026, sau hôm nay: chưa quá 30 ngày.

```
### cba_statement.pdf — Bank Statement (chắc chắn)
Kết luận: CẦN XỬ LÝ

Ghi vào Fact Find
- Không có

Cần thông báo
- [Giao dịch bất thường] Cá cược: 12/08/2026 SPORTSBET $200.00; 25/08/2026 SPORTSBET $300.00 → báo nhân viên xem xét.
- [Lệch lương] Lương vào ngày 15/09/2026 và 29/09/2026 là $2,000.00; Net pay trên Payslip là $2,150.00 → báo nhân viên xem xét.

Chưa kiểm tra được
- Không có

Ghi chú
- Tài khoản …5678, tên "Thi Mai Tran" khớp Applicant.
- Kỳ 01/07/2026 - 30/09/2026 (đủ 3 tháng); ngày cuối kỳ 30/09/2026, hôm nay 06/10/2026, chưa quá 30 ngày.
```

## 2. Credit Card Statement chỉ một tháng, có phí trả chậm

Nội dung đọc được: "ABC Bank · Low Rate Credit Card · Statement · Thi Mai Tran · Account number 4000 12XX XXXX 9010 · Statement period 01/09/2026 - 30/09/2026 · Credit limit $8,000 · Purchase rate 13.99% p.a. · Closing balance $1,250.40 · Minimum payment due $45.00 · 18/09 LATE PAYMENT FEE $20.00".

```
### card.pdf — Credit Card Statement (chắc chắn)
Kết luận: CẦN XỬ LÝ

Ghi vào Fact Find
- Lender: ABC Bank
- Account name: Thi Mai Tran
- Account number: 4000 12XX XXXX 9010
- Interest rate: 13.99% p.a. (Purchase rate)
- Repayment: Minimum payment due $45.00
- Loan Expiry date: không áp dụng

Cần thông báo
- [Kỳ ngắn] Kỳ 01/09/2026 - 30/09/2026 chỉ 1 tháng, cần đủ 3 tháng → báo nhân viên xem xét.
- [Trả chậm] 18/09/2026 LATE PAYMENT FEE $20.00 → báo nhân viên xem xét.

Chưa kiểm tra được
- Không có

Ghi chú
- Credit limit $8,000.
- Ngày cuối kỳ 30/09/2026, hôm nay 06/10/2026, chưa quá 30 ngày. Tên khớp Applicant.
```

Dòng tổng cho cả hai: "2 tài liệu: 2 cần xử lý."
