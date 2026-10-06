# Ví dụ đã làm sẵn

Dữ liệu trong các ví dụ là giả. Cả hai ví dụ dùng chung:

- Hôm nay: 06/10/2026
- Applicant Name: Thi Mai Tran

## 1. Company Extract có director và shareholder không phải Applicant

Nội dung đọc được: "ASIC · Current & Historical Company Extract · MAI TRAN PTY LTD · ACN 000 111 222 · Status: Registered · Directors: Thi Mai TRAN (appointed 01/07/2020), Van An LE (appointed 01/07/2020) · Former director: Quoc Bao PHAM (ceased 30/06/2022) · Members: Thi Mai TRAN 50 ORD, Van An LE 50 ORD".

```
### extract.pdf — Company Extract (chắc chắn)
Kết luận: CẦN XỬ LÝ

Ghi vào Fact Find
- ACN: 000 111 222
- Director Name: Thi Mai TRAN; Van An LE
- Shareholder Name: Thi Mai TRAN; Van An LE

Cần thông báo
- [Sai tên] "Van An LE" (Director và Shareholder) không khớp Applicant nào → báo nhân viên xem xét.

Chưa kiểm tra được
- Không có

Ghi chú
- "Thi Mai TRAN" khớp Applicant. Status: Registered.
```

"Quoc Bao PHAM" là director cũ (Former) nên không lấy.

## 2. Equifax: enquiry trong 6 tháng, đang là director, một tháng trả chậm

Nội dung đọc được: "Equifax Credit Report · Report date 01/10/2026 · Thi Mai TRAN · Credit Enquiries: 15/08/2026 ABC Bank, credit card, $10,000; 02/02/2026 XYZ Finance, personal loan, $20,000 · Defaults: none · Repayment History, ABC Bank credit card: 05/2026 = 1, các tháng khác = 0 · Current directorships: MAI TRAN PTY LTD".

Mốc 6 tháng: báo cáo lập 01/10/2026 nên lấy enquiry từ 01/04/2026. Enquiry 02/02/2026 nằm ngoài.

```
### equifax.pdf — Equifax Credit Report (chắc chắn)
Kết luận: CẦN XỬ LÝ

Ghi vào Fact Find
- Không có

Ghi vào Broker's Notes
- Ngày lập báo cáo: 01/10/2026.
- Credit Enquiry trong 6 tháng: 15/08/2026, ABC Bank, credit card, $10,000.
- Trả chậm: ABC Bank credit card, tháng 05/2026, mã 1. Default: không có.

Cần thông báo
- [Directorship] Current director của MAI TRAN PTY LTD → xin khách Accountant Letter nếu không dùng thu nhập đó để tính khả năng trả nợ.
- [Tín dụng xấu] ABC Bank credit card trả chậm tháng 05/2026 (mã 1) → báo nhân viên.

Chưa kiểm tra được
- Không có

Ghi chú
- Không có
```
