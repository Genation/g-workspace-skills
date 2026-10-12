# Sao kê ngân hàng và khoản nợ (rule 19–23)

## Phạm vi

| Mã | Rule | Loại |
|---|---|---|
| A | 19 | Bank Statement: Everyday, Savings, Spending, Salary Credits, Rent Income; tài khoản offset; Transaction history in từ internet banking |
| B | 20 | Home Loan Statement (Mortgage, Loan account statement) |
| C | 21 | Personal Loan, Car Loan, Credit Card Statement (kể cả thẻ cửa hàng) |
| D | 22 | Study loans: HELP (HECS-HELP, FEE-HELP, SA-HELP, OS-HELP), VSL / VET FEE-HELP, SSL, ABSTUDY SSL, TSL / Apprenticeship Support Loan, SFSS; CAN của trường |
| E | 23 | Buy Now Pay Later: Afterpay, Zip, Klarna, humm, PayPal Pay in 4… |

- **Đọc trước** (`guroos_document_read` với `pages`): A, B, C trang 1 (tài khoản, kỳ, số dư, lãi suất, Repayment; lãi suất thẻ thường ở trang cuối), rồi MỌI trang giao dịch đến trang cuối. D, E đọc hết.
- Chưa đọc hết trang giao dịch thì không kết luận "không có giao dịch bất thường" hay "không trả chậm": "Chưa kiểm tra được: <giao dịch bất thường | trả chậm>: chưa đọc trang …".
- Khoản vay học của ngân hàng (không phải ATO) là Personal Loan (C).
- CAN của trường (nợ một kỳ học, không có số dư): "chưa chắc", Ghi chú "cần số dư HELP từ myGov".

## 1. Dấu hiệu cấu trúc bắt buộc

| Loại | Dấu hiệu bắt buộc | Dễ nhầm với |
|---|---|---|
| A | (1) tên ngân hàng; (2) Statement / Transaction history; (3) Account name; (4) BSB, số tài khoản (có thể che); (5) kỳ; (6) Opening, Closing balance; (7) bảng giao dịch Date, Description, Debit, Credit, Balance; không có lãi suất vay | B (có "% p.a.", Loan balance); thẻ tín dụng (Credit limit); thư xác nhận số dư (không kỳ, không giao dịch) → Ngoài phạm vi |
| B | (1) lender; (2) "Home Loan" / "Mortgage" / "Loan account"; (3) người đứng tên, số tài khoản vay; (4) kỳ; (5) "Interest rate … % p.a."; (6) Opening / Closing hoặc Loan balance; (7) giao dịch repayment, "Interest charged"; (8) Repayment amount | sao kê offset (A); Letter of Offer, hợp đồng vay (không kỳ, không giao dịch) → Ngoài phạm vi |
| C · Personal / Car Loan | như B, tiêu đề "Personal Loan", "Car Loan", "Vehicle / Motor finance"; có Repayment và tần suất | hợp đồng vay → Ngoài phạm vi |
| C · Credit Card | (1) tổ chức phát hành; (2) "Credit Card Statement"; (3) chủ thẻ, số thẻ đã che; (4) kỳ hoặc Statement date; (5) Credit limit; (6) Opening / Closing balance; (7) "Minimum payment due", Due date; (8) Purchase rate; (9) giao dịch | sao kê thẻ ghi nợ (A) |
| D | (1) ATO hoặc myGov; (2) tên khoản vay ở mục Phạm vi; (3) tên người vay; (4) số dư (Current balance, Accumulated HELP debt); (5) ngày "as at"; (6) Indexation, Compulsory / Voluntary repayment | — |
| E | (1) nhà cung cấp; (2) chủ tài khoản; (3) Account balance / Amount owing; (4) Spending / Credit limit; (5) lịch trả (Instalments); (6) ngày lập hoặc kỳ | email xác nhận đơn hàng → Ngoài phạm vi; Latitude Gem, 28° là thẻ tín dụng (C) |

- **Sao kê gộp nhiều tài khoản của cùng ngân hàng:** một khối `<tệp> — Home Loan Statement + Bank Statement (rule 20, 19)`; áp quy tắc từng loại cho từng tài khoản, mở đầu mỗi bộ trường Fact Find và mỗi dòng thông báo bằng 4 số cuối; mỗi tài khoản một bộ (mục 5).
- **Một tệp nhiều sao kê của cùng tài khoản** (nhiều tháng): một khối; so số dư từng sao kê; mỗi sao kê một kỳ trong `periods`.

## 2. Bước 0 của nhóm

### 2A. Nguồn tệp

| Nhóm nguồn | A (19) | B–E (20–23) |
|---|---|---|
| máy in PDF | BÁO | BÁO |
| ảnh (JPG/PNG) | BÁO | GHI CHÚ (ảnh chụp app BNPL) |
| công cụ văn phòng; công cụ thiết kế; trình sửa/xử lý PDF; không phải PDF (DOCX, XLSX, CSV…) | DỪNG `[Nguồn]` | BÁO |

Nguồn khác: GHI CHÚ, gồm trình duyệt in ra PDF, bộ chuyển HTML sang PDF, Apple (in từ internet banking, ATO online, myGov). Cột A chỉ dành cho sao kê tài khoản (rule 19); sao kê khoản vay, thẻ tín dụng, HELP, BNPL (rule 20–23) dùng cột B–E: công cụ văn phòng ở đó là BÁO, không DỪNG. Tệp ảnh JPG/PNG: dòng "ảnh (JPG/PNG)", dù khối ảnh ghi nhóm nguồn nào.

### 2B. Dấu hiệu xét theo loại

| Nhãn trong khối | A (19) | B–E (20–23) |
|---|---|---|
| `[Sửa nội dung]`, `[Che chữ]` | DỪNG | DỪNG |
| `[Sửa ảnh] Thông tin tệp ghi tên trình sửa ảnh: …` | DỪNG | BÁO |
| `[Sửa ảnh] Ảnh nhỏ lưu trong EXIF (…) khác tỉ lệ khung với ảnh chính …` | BÁO | BÁO |
| `[Ảnh chụp/scan]`, `[Chữ vẽ bằng nét]` (dù phần mềm scan/gộp ảnh nào tạo tệp) | BÁO | GHI CHÚ |

Trang scan: đọc trên ảnh trang gửi kèm. Trang không có lớp chữ và không có ảnh đọc được ("không có lớp chữ; <lý do>", "ảnh scan chưa gửi" mà không đọc lại được trong kho (SKILL.md mục 2), ảnh mờ): mục cần trang đó vào "Chưa kiểm tra được"; không đọc được trang nào → `KHÔNG ĐỌC ĐƯỢC`.

### 2C. Kiểm tra số và ngày

| Phép so (khi in đủ số; lệch tối đa $1) | Đạt khi |
|---|---|
| Số dư A | Opening + Total credits − Total debits = Closing. Chỉ khi sao kê IN tổng; không tự cộng danh sách giao dịch |
| Số dư B, C | Opening + tổng ghi nợ (lãi, phí, chi tiêu) − tổng ghi có (trả nợ) = Closing, khi có in tổng; giữ dấu như in |
| Chuyển trang | "Balance carried forward" = "brought forward" ở trang sau, khớp đúng |

- **Không đạt sau khi đọc lại:** Số dư A, Chuyển trang của A, đọc từ lớp chữ → DỪNG `[Số liệu] <phép so>: <các số in> lệch <số chênh>`. Còn lại (A đọc từ ảnh trang; B, C) → `[Lệch số liệu]` theo mẫu chung, không DỪNG.
- **Ngày tài liệu** = Statement date; không có (bản in Transaction history) → ngày cuối kỳ; ngày in chỉ ghi chú.
- A, B, C: 30 ngày và kỳ xét theo bộ (mục 5); một tệp lẻ cũng là một bộ.
- D, E: không xét kỳ và 30 ngày; `guroos_date_check(document_date=<ngày "as at" hoặc ngày lập>)` chỉ để xét ngày ở tương lai, bỏ qua "QUÁ"/"TRONG".

## 3. Ghi vào Fact Find

| Loại | Trường |
|---|---|
| A | (không có): "- Không có" |
| B, C | `Lender` · `Account name` (mọi người đứng tên) · `Account number` (4 số cuối: "…7310 (số đầy đủ ở trang 1)") · `Interest rate` (số và nhãn; Comparison rate không phải Interest rate) · `Repayment` (số tiền, tần suất) · `Loan Expiry date` (Loan end / maturity / Final repayment date; chỉ in thời hạn còn lại thì chép nguyên văn, không tự tính) |
| D | `Current balance` (kèm nhãn, ngày "as at") · `Repayments` (Compulsory / Voluntary repayment của năm tài chính gần nhất có in) |
| E | `Account balance` · `Limit` ("Available to spend" không phải Limit) |

- Trường không in trên tài liệu: "không có trên tài liệu".
- **Credit card:** `Repayment` = "Minimum payment due" (kèm Due date); `Loan Expiry date` = "không áp dụng"; `Interest rate` = Purchase rate; Credit limit ghi vào Ghi chú.
- Khoản vay chia phần (split): bộ trường cho từng phần, mở đầu bằng 4 số cuối. Fixed rate expiry, Interest-only end date không phải `Loan Expiry date` (Ghi chú).

## 4. Cần thông báo

| Điều kiện | Rule | Nhãn | Bằng chứng an toàn |
|---|---|---|---|
| Người đứng tên không khớp Applicant nào (tài khoản chung: xét từng người, kể cả đồng sở hữu không phải Applicant). Applicant vắng tên trên tài khoản: chỉ Ghi chú | 19–23 | Sai tên | hai tên nguyên văn, khác ở đâu |
| Đoạn kỳ liền mạch mới nhất của bộ CHƯA ĐỦ 3 tháng | 19, 21 | Kỳ dưới 3 tháng | các dòng "Kỳ …" và "Khoảng hở" của tool |
| Như trên, CHƯA ĐỦ 6 tháng | 20 | Kỳ dưới 6 tháng | như trên |
| Sao kê mới nhất của bộ QUÁ 30 ngày | 19–21 | Quá 30 ngày | loại ngày, ngày tài liệu, hôm nay theo tool |
| Giao dịch bất thường (4A) | 19 | Giao dịch bất thường | mỗi nhóm một dòng: ngày, mô tả, số tiền |
| Lương vào khác Net pay của Payslip; tiền thuê vào khác Rent amount (`cross-checks.md` bảng 2) | 19 | Lệch lương; Lệch tiền thuê | theo mẫu ở `cross-checks.md` |
| "Late payment fee", "Dishonour fee", "Payment reversal", "Missed payment" | 20, 21 | Trả chậm | ngày, mô tả, số tiền |
| "Arrears", "Overdue", "Past due" với số tiền lớn hơn $0 | 20, 21 | Nợ quá hạn | ngày, số tiền |
| Dòng "Mã số" của khối có TFN, trang có `[đã che TFN]` hoặc TFN thấy trên ảnh | 22 | TFN | chỉ số trang |

Việc cần làm của `[TFN]`: "che TFN trước khi lưu hoặc gửi đi".

### 4A. Giao dịch bất thường (rule 19)

| Nhóm | Nhận ra bằng | Ghi |
|---|---|---|
| Chuyển tiền lớn | không phải lương, tiền thuê, trả nợ định kỳ hay chuyển giữa tài khoản cùng tên Applicant; và từ $5,000, hoặc lớn hơn khoản lương đều đặn lớn nhất của sao kê | từng khoản |
| Nước ngoài | ngoại tệ (USD, VND…), "Foreign transaction fee", "International transfer", "Telegraphic transfer", SWIFT, Western Union, MoneyGram, Wise, Remitly, WorldRemit, OFX, Ria | từng khoản chuyển tiền; mua hàng bằng thẻ: 5 khoản lớn nhất và "N khoản khác" |
| Tiền mặt nộp vào | "Cash deposit", "ATM deposit"; mỗi khoản từ $1,000, hoặc từ 3 lần trong kỳ | từng khoản |
| Cờ bạc | TAB, Sportsbet, Ladbrokes, bet365, Neds, PointsBet, Betfair, Unibet, BlueBet, casino, Crown, The Star, The Lott, Lotterywest, Tatts, Lottoland, Keno, pokies, gaming | mọi khoản, kể cả số nhỏ và tiền thắng |

Chỉ chép giao dịch cần thông báo.

**Chỉ ghi chú khi:**
- Chuyển giữa tài khoản cùng tên Applicant; giao dịch tài sản mã hóa (CoinSpot, Binance…) dưới ngưỡng chuyển tiền lớn.
- Tài khoản A có "Dishonour fee", "Overdrawn fee".
- Credit card: Credit limit, "Overlimit fee", "Cash advance". Home loan: Fixed rate expiry, offset, redraw.
- BNPL có phí trả chậm (rule 23 chỉ xét tên).

## 5. Lưu ý riêng

- **Bộ sao kê** = mọi sao kê của CÙNG tài khoản (cùng tổ chức và 4 số cuối; số che hết thì cùng tên tài khoản và sản phẩm) trong lô. Bước 6 gọi một lần mỗi bộ:
  `guroos_date_check(document_date=<ngày tài liệu của sao kê mới nhất>, max_age_days=30, periods=[<kỳ của từng sao kê>], min_months=3)` (rule 20: `min_months=6`).
  - Đoạn liền mạch mới nhất "CHƯA ĐỦ N tháng" → `[Kỳ dưới 3 tháng]` / `[Kỳ dưới 6 tháng]`, nêu các đoạn và "Khoảng hở". Khoảng hở trước đoạn đã ĐỦ: chỉ ghi chú.
  - Sao kê liền kỳ: Closing kỳ trước = Opening kỳ sau, khớp đúng. Lệch → `[Lệch số liệu]` ở khối mới nhất, không DỪNG.
- Sao kê `KHÔNG HỢP LỆ` không vào bộ; khối mới nhất ghi Ghi chú "<tệp> không tính vào bộ (KHÔNG HỢP LỆ)".
- **Đối chiếu chéo** theo `references/cross-checks.md`: lương, tiền thuê, trả nợ định kỳ (↔ Repayment rule 20–21), Centrelink, cấp dưỡng, Deposit.
- **Dữ kiện để đối chiếu.** A: …NNNN (tổ chức, loại) · người đứng tên · kỳ · Opening / Closing · lương, tiền thuê, Centrelink vào (người trả, số tiền, nhịp, ngày) · trả nợ định kỳ ra (tên, số tiền). B, C: lender · …NNNN · người đứng tên · Repayment · Closing balance và ngày · Credit limit. D: Current balance và ngày. E: nhà cung cấp · Account balance · Limit.

## 6. Ví dụ

Dữ liệu giả. Hôm nay 11/10/2026 (theo `guroos_date_check`). Applicant: Thi Mai Tran.

**Bank Statement, lương lệch payslip.** everyday_q3.pdf, 8 trang. Khối: `Nhóm nguồn: chưa biết.`, hai mục dấu hiệu "không có.", Ghi chú kỹ thuật chỉ có `Phần mềm tạo tệp chưa có trong danh sách đã biết.` Statement date 01/10/2026; Total credits $15,350.00, Total debits $14,604.30. Tool: `Ngày tài liệu: 01/10/2026 → 10 ngày → TRONG 30 ngày`, `Kỳ 01/07/2026–30/09/2026 → ĐỦ 3 tháng`. Lô có payslip_2.pdf (Pay date 30/09/2026, Net pay $2,150.00), không có payslip khác hay sao kê khoản nợ.

```
### everyday_q3.pdf — Bank Statement (rule 19) · chắc chắn
Kết luận: CẦN XỬ LÝ
Kiểm tra tệp gốc: đạt (nguồn: chưa biết) · quy tắc: references/bank-liabilities.md
Ghi vào Fact Find
- Không có
Cần thông báo
- [Giao dịch bất thường] Cờ bạc: 12/08/2026 SPORTSBET $200.00; 25/08/2026 SPORTSBET $300.00 → báo nhân viên xem xét
- [Giao dịch bất thường] Tiền mặt: 14/08/2026 CASH DEPOSIT $1,350.00 → báo nhân viên xem xét
- [Giao dịch bất thường] Nước ngoài: 03/09/2026 WISE INTL TRANSFER $1,500.00 → báo nhân viên xem xét
- [Lệch lương] 30/09/2026 SAMPLE LOGISTICS PAY $2,000.00 · Net pay $2,150.00 (payslip_2.pdf, Pay date 30/09/2026) · lệch $150.00 → báo nhân viên xem xét
Chưa kiểm tra được
- Không có
Ghi chú
- Đã đọc hết 8 trang. Nguồn chưa biết (phần mềm tạo tệp chưa có trong danh sách đã biết).
- $3,210.55 + $15,350.00 − $14,604.30 = Closing $3,956.25: khớp.
- Bộ chỉ có sao kê này: kỳ 01/07/2026–30/09/2026 ĐỦ 3 tháng; Statement date 01/10/2026, hôm nay 11/10/2026: TRONG 30 ngày (theo tool). Tên "THI MAI TRAN" khớp Applicant.
- Lương trước 30/09/2026: lô không có payslip trùng kỳ, không so.
- Trả nợ "SAMPLE AUTO FINANCE" $412.00 hàng tháng: lô chưa có sao kê khoản nợ này.
Dữ kiện để đối chiếu: …4821 (Sample Mutual Bank, Everyday) · THI MAI TRAN · kỳ 01/07–30/09/2026 · Opening $3,210.55 · Closing $3,956.25 · lương "SAMPLE LOGISTICS PAY" $2,000.00 mỗi 14 ngày (7 lần, 08/07–30/09/2026) · trả nợ "SAMPLE AUTO FINANCE" $412.00 ngày 15 hàng tháng · không có tiền thuê, Centrelink vào
```
