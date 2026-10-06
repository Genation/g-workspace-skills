# Ví dụ đã làm sẵn

Dữ liệu trong các ví dụ là giả. Cả hai ví dụ dùng chung:

- Hôm nay: 06/10/2026
- Applicant Name: Thi Mai Tran

## 1. Rates Notice có nợ và có đồng sở hữu không phải Applicant

Nội dung đọc được: "Maribyrnong City Council · Rates Notice · Assessment No. 123456 · Owner: Thi Mai TRAN & Van An LE · Property: 3/12 Station Street Footscray · Arrears $420.50 · Current instalment $612.00 due 30/11/2026".

```
### rates.pdf — Rates Notice (chắc chắn)
Kết luận: CẦN XỬ LÝ

Ghi vào Fact Find
- Không có

Cần thông báo
- [Nợ quá hạn] Tài liệu ghi "Arrears $420.50" → xin khách bằng chứng đã thanh toán.
- [Sai tên] Owner "Van An LE" không khớp Applicant nào (Fact Find chỉ có "Thi Mai Tran") → xin khách xác nhận quyền sở hữu bất động sản.

Chưa kiểm tra được
- Không có

Ghi chú
- Owner "Thi Mai TRAN" khớp Applicant.
- Kỳ hiện tại $612.00, hạn 30/11/2026, chưa tới hạn.
```

## 2. Contract of Sale: vendor thiếu ngày ký, settlement viết dạng tương đối

Nội dung đọc được ở trang đầu, Special Conditions và trang ký: "Contract of Sale of Land · Vendor: John SMITH · Purchaser: Thi Mai TRAN · Settlement: 60 days from the day of sale · Special Condition 3: subject to finance, approval date 20/10/2026 · Purchaser's conveyancer: ABC Conveyancing, 03 9000 0000, info@abcconveyancing.example · Purchaser signed 01/10/2026 · Vendor signed, date blank".

```
### contract.pdf — Contract of Sale (chắc chắn)
Kết luận: CẦN XỬ LÝ

Ghi vào Fact Find
- Finance Clause / Loan Approval Date: 20/10/2026 (cũng ghi cột Monday)
- Settlement Date: "60 days from the day of sale" (cũng ghi cột Monday)
- Conveyancer / Legal Practitioner: bên mua - ABC Conveyancing, 03 9000 0000, info@abcconveyancing.example

Cần thông báo
- [Chưa ký] Vendor John SMITH đã ký nhưng thiếu ngày ký → báo nhân viên.

Chưa kiểm tra được
- Không có

Ghi chú
- Purchaser "Thi Mai TRAN" khớp Applicant.
- Settlement Date viết dạng tương đối; chưa có ngày bán (day of sale) nên chưa có ngày cụ thể.
```

Dòng tổng cho cả hai: "2 tài liệu: 2 cần xử lý."
