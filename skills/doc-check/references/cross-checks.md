# Đối chiếu chéo (nhiều tài liệu)

## Khi nào dùng

Bước 6 của SKILL.md: MỘT lần cho cả lô của một khách, sau bước 1–5 của mọi tài liệu.

- **Ai tham gia:** tài liệu đã qua Bước 0 và đọc được; KHÔNG HỢP LỆ, KHÔNG ĐỌC ĐƯỢC coi như không có. Tài liệu có `[Tệp gốc]` hoặc "chưa chắc" vẫn tham gia, nêu điều đó trong bằng chứng. Ngoại lệ: giấy nối tên ngoài phạm vi (Marriage, Change of Name, Birth Certificate) đọc được vẫn dùng ở dòng cuối bảng 3.
- **Số liệu** lấy từ "Dữ kiện để đối chiếu"; thiếu thì đọc lại đúng trang.
- **Chỉ ghép cùng chủ thể:** cùng người (tên trên hai tài liệu KHỚP, kể cả khi chưa có Applicant), cùng pháp nhân (tên pháp lý; ABN/ACN nếu cả hai cùng in), cùng tài khoản (tổ chức và 4 số cuối), cùng địa chỉ nhà, cùng năm tài chính (so theo dạng 2024–25: `Company tax return 2025`, `Year ended 30 June 2025`, `For the year ended 30 June 2025` cùng là 2024–25).
- **Ghi ở khối A**, không lặp ở khối B. Quy tắc theo bộ ghi MỘT lần ở khối mới nhất của bộ; khối cũ hơn ghi Ghi chú "xét theo bộ ở khối <tệp>".
- **Lệch** → Cần thông báo `[<Nhãn>] <số/ngày trên A> · <số/ngày trên B> (<tệp B>) · lệch <số chênh> → báo nhân viên xem xét` (trừ khi bảng nêu việc khác). **Khớp** → Ghi chú "đã đối chiếu <gì> với <tệp B>: khớp". Lệch không quá $1 là khớp. Lệch không làm tài liệu nào KHÔNG HỢP LỆ.

## Các cặp đối chiếu

### 1. Bộ cùng nguồn: gộp kỳ

Mỗi bộ gọi tool MỘT lần (bộ một tài liệu dùng lại kết quả bước 4):
`guroos_date_check(document_date=<ngày tài liệu mới nhất>, max_age_days=30, periods=[<{start, end} của từng tài liệu>], min_months=<N>)`
Chỉ tài liệu mới nhất xét 30 ngày; số tháng xét trên đoạn liền mạch chứa nó. Bảng này thay quy tắc 30 ngày và kỳ của từng tài liệu.

| Bộ (khối nhận: mới nhất) | Cùng bộ khi | Xét | Nhãn |
|---|---|---|---|
| Payslip (12) | cùng Employee, cùng employer (so ABN; không có thì so tên) | 30 ngày từ Pay date (không có thì ngày cuối kỳ); kỳ liên tiếp, không truyền `min_months`. Từng cặp liền kỳ cùng năm tài chính: YTD Gross sau − YTD Gross trước = Gross kỳ sau | Quá 30 ngày · Không liên tiếp · Lệch số liệu |
| Sao kê rule 19, 20, 21 | cùng tài khoản | 30 ngày; `min_months` 3 (19, 21) hoặc 6 (20). Sao kê liền kỳ: Closing kỳ trước = Opening kỳ sau, khớp đúng | Quá 30 ngày · Kỳ dưới 3 tháng · Kỳ dưới 6 tháng · Lệch số liệu |
| Centrelink (17), cấp dưỡng (18) | cùng Applicant, cùng khoản, cùng bên trả; bộ 18 có thể gồm Assessment, statement, Court Order, Child Support Agreement | `min_months=3`; 30 ngày tính từ tài liệu mới nhất mà quy tắc 30 ngày áp dụng (Court Order, Child Support Agreement: chỉ ghi chú ngày). Khoảng hở trước đoạn đã ĐỦ 3 tháng: Ghi chú | Quá 30 ngày · Kỳ dưới 3 tháng |
| Rental Statement (14), Airbnb (16) | 14: cùng địa chỉ nhà; 16: cùng Host và listing | 30 ngày, không xét kỳ. Rental Appraisal xét từng tài liệu | Quá 30 ngày |

### 2. Cặp khác nhóm theo checklist

| A (khối nhận) | B | So gì (lệch > $1: ghi hai số) | Nhãn |
|---|---|---|---|
| Bank Statement (19) có lương vào | Payslip (12) cùng người | Khoản lương = mô tả có tên employer hoặc "SALARY", "WAGES", "PAY", "PAYROLL"; ghép payslip có Pay date trùng ngày hoặc trước tối đa 3 ngày; không ghép được thì không so. Số vào ↔ `Net pay` (payslip chia nhiều tài khoản: phần vào tài khoản này) | Lệch lương |
| Bank Statement (19) có tiền thuê vào, Applicant là Landlord | Rental Agreement (15), Rental Statement (14) nếu có, cùng địa chỉ | Tenant trả thẳng: số vào = `Rent amount` cùng kỳ (chỉ nhân số tuần nguyên). Agency trả: số vào = Paid / Net to owner của statement kỳ đó; tiền thuê mỗi tuần trên statement = `Rent amount`; không có statement thì so với `Rent amount`, thêm "khoản từ agency có thể đã trừ phí quản lý" | Lệch tiền thuê |
| Non-Australian Passport (6) | Visa Grant Notice / VEVO (8); Australian Passport (5) | Cùng người = tên KHỚP, hoặc trùng 4 ký tự cuối số hộ chiếu in trên visa. Không có visa dùng được và không có hộ chiếu Úc của chính người đó → xin khách visa hiện tại | Visa |
| Tax Return company / partnership / trust (13) | Financial Statements (13) cùng pháp nhân, cùng năm | `Total income` ↔ tổng thu nhập trên Profit and Loss; `Total profit or loss` / `Net income or loss` ↔ `Net profit / loss` trước thuế. Không so `Taxable income` với Net profit | Lệch số liệu |
| Individual Tax Return (13) | Notice of Assessment (13) cùng người, cùng năm | `Taxable income`; lệch thì thêm Ghi chú "ATO có thể đã điều chỉnh khi tính thuế" | Lệch số liệu |

Rule 6, khối hộ chiếu khi lô có visa hoặc hộ chiếu Úc của cùng người (tên KHỚP, số hộ chiếu trên visa khác: vẫn tính, Ghi chú "visa gắn với hộ chiếu …<4 ký tự cuối>"):
- Visa còn hiệu lực → không `[Visa]`; Ghi chú "đã có visa kèm theo (<tệp>)".
- Visa hết hiệu lực (status khác "In Effect", hoặc HẾT HẠN theo tool): khối visa đã báo `[Visa]`; ở đây Ghi chú "visa kèm theo không còn hiệu lực, xem khối <tệp>".
- Có Australian Passport, kể cả hết hạn → không `[Visa]`; Ghi chú "có hộ chiếu Úc (<tệp>)".

### 3. Cặp chỉ ghi chú

Một dòng Ghi chú ở khối A; nhãn sẵn có giữ nguyên.

| A ↔ B | So gì → Ghi chú nêu |
|---|---|
| Equifax (11) có Current Directorship ↔ Company Extract (10), entity người dùng nêu trong chat | tên công ty → trùng entity hồ sơ hay có extract trong lô không |
| Equifax (11) ↔ sao kê khoản nợ (20–23) | Credit Enquiry trong `guroos_date_check(window_months=6, reference_date=<ngày lập báo cáo>)` → enquiry chưa có sao kê khoản nợ cùng lender, cùng loại |
| Trust Deed (9), Trustee là công ty ↔ Company Extract (10) | tên Trustee ↔ tên công ty → có extract của trustee (nêu tệp) hay chưa |
| Bank Statement (19) có trả nợ định kỳ ↔ sao kê khoản nợ (20–21) cùng lender | số tiền ra ↔ `Repayment` (khác tần suất: không quy đổi) → khớp hay lệch, kèm hai số; hoặc khoản trả nợ chưa có sao kê |
| Bank Statement (19) ↔ Contract of Sale (2) | khoản chuyển ra lớn ↔ `Deposit` → trùng (±$1): thêm "trùng Deposit trên <tệp>" vào bằng chứng `[Giao dịch bất thường]` |
| Bank Statement (19) ↔ Centrelink (17), cấp dưỡng (18) | khoản vào ↔ số mỗi kỳ của `Income received` → khớp hay lệch, kèm hai số |
| Rental (14–16), Applicant là Landlord ↔ Rates Notice, Land Title (1) | địa chỉ nhà cho thuê → lô có giấy tờ nhà đất của địa chỉ đó chưa |
| Land Title (1) có mortgage ↔ Home Loan Statement (20) | bên nhận mortgage ↔ `Lender` → khác lender, hoặc chưa có sao kê của bên đó |
| Payslip (12) ↔ ATO Income Statement (13) gần nhất | employer (ABN) → không có trong Income Statement (có thể là việc mới) |
| Medicare (7) xanh dương, vàng ↔ Visa / VEVO (8) cùng người | tình trạng cư trú → lô không có visa của người đó, hoặc visa Permanent mà thẻ chưa đổi |
| Tài liệu có `[Sai tên]` ↔ giấy đổi tên, kết hôn, khai sinh, giấy tờ tùy thân mang tên đó | giấy nối hai tên → thêm tên tệp vào bằng chứng `[Sai tên]` |

## Thiếu tài liệu đối ứng

"Thiếu" = lô không có B, B thuộc người, tài khoản, năm khác, hoặc B KHÔNG HỢP LỆ / KHÔNG ĐỌC ĐƯỢC (thêm "<tệp B> KHÔNG HỢP LỆ, không dùng để đối chiếu"). Ghi ở khối A:
- Lương vào, không có payslip dùng được → Chưa kiểm tra được "so lương với Net pay: lô chưa có payslip"; có payslip mà không khoản nào ghép được theo Pay date → "so lương: không có khoản lương trùng kỳ payslip", Ghi chú Net pay và khoản lương gần nhất.
- Tiền thuê vào, không có Rental Agreement của địa chỉ → Chưa kiểm tra được "so tiền thuê: lô chưa có Rental Agreement"; khác kỳ với hợp đồng hoặc statement chỉ in tổng tháng → "so tiền thuê: khác kỳ, không quy đổi", Ghi chú hai số.
- Tax Return hoặc Financial Statements pháp nhân thiếu tài liệu còn lại cùng năm → Chưa kiểm tra được "đối chiếu Tax Return với Financial Statements: thiếu <tài liệu>".
- Individual Tax Return không có NOA cùng năm, hoặc ngược lại → Ghi chú "lô chưa có <loại> cùng năm để đối chiếu".

Người dùng đã cho số trong chat: so với số đó, bằng chứng ghi "theo người dùng, không có tài liệu". Không tự tìm hay mở tệp ngoài lô; cần B thì ghi ở dòng "Chưa kiểm tra được", xin đính kèm ở cuối báo cáo.

## Ví dụ

Dữ liệu giả. Hôm nay 11/10/2026. Applicant: Thi Mai Tran. Lô: payslip_1.pdf, payslip_2.pdf (Sample Logistics Pty Ltd, Pay date 16/09 và 30/09/2026, Net pay đều $2,150.00); lease.pdf (Rent $620.00 per week, Applicant là Landlord, 12 Sample Street, Sampleton VIC 3000); rental_aug.pdf (cùng địa chỉ, Paid to owner $2,289.04); everyday_q3.pdf (…4821).

Bộ payslip: `guroos_date_check(document_date=30/09/2026, max_age_days=30, periods=[{start: 31/08/2026, end: 13/09/2026}, {start: 14/09/2026, end: 27/09/2026}])` → `Ngày tài liệu: 30/09/2026 → 11 ngày → TRONG 30 ngày`, `Gộp: liền mạch, không có khoảng hở`.

```text
### everyday_q3.pdf — Bank Statement (rule 19) · chắc chắn
Kết luận: CẦN XỬ LÝ
Kiểm tra tệp gốc: đạt (nguồn: chưa biết) · quy tắc: references/bank-liabilities.md
Ghi vào Fact Find
- Không có
Cần thông báo
- [Lệch lương] 30/09/2026 SAMPLE LOGISTICS PAY $2,000.00 · Net pay $2,150.00 (payslip_2.pdf, Pay date 30/09/2026) · lệch $150.00 → báo nhân viên xem xét
Chưa kiểm tra được
- Không có
Ghi chú
- Kỳ 01/07/2026–30/09/2026 ĐỦ 3 tháng; Statement date 01/10/2026, hôm nay 11/10/2026: TRONG 30 ngày (theo tool).
- Đã đối chiếu lương 16/09/2026 $2,150.00 với payslip_1.pdf: khớp.
- Đã đối chiếu tiền thuê 05/09/2026 $2,289.04 với Paid to owner của rental_aug.pdf: khớp; $620.00 mỗi tuần khớp Rent amount của lease.pdf.
- Trả nợ SAMPLE AUTO FINANCE $412.00 hàng tháng: lô chưa có sao kê khoản vay này.
Dữ kiện để đối chiếu: …4821 · kỳ 01/07–30/09/2026 · lương 16/09 $2,150.00, 30/09 $2,000.00 · tiền thuê 05/09 $2,289.04 · trả nợ $412.00 hàng tháng
```
