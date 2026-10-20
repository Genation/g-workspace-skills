# Trợ cấp và cấp dưỡng (rule 17–18)

## Phạm vi

| Loại | Rule |
|---|---|
| Centrelink Statement: Income Statement, Payment Summary, Statement of benefits, thư xác nhận trợ cấp | 17 |
| Child Support Assessment; Child Support statement (Statement of account, Payment history) | 18 |
| Family Court Order: Orders, Consent Orders | 18 |
| Binding / Limited Child Support Agreement (loại mở rộng) | 18 |

- Đọc trước: trang 1–2 và trang có tổng; trang giữa chỉ khi cần cho kỳ hoặc 2C. Court Order: thêm các order về tiền ("child support", "maintenance", "pay", "$") và trang cuối (dấu toà). Thư, agreement: đọc hết.
- Bản cũ in "Department of Human Services" hoặc "Child Support Agency" vẫn tính.
- Thư trợ cấp của Department of Veterans' Affairs (DVA): xử lý như Centrelink, ghi "chưa chắc: cơ quan DVA".
- Binding / Limited Child Support Agreement: ghi "chưa chắc: Child Support Agreement".
- Ngoài phạm vi: thư Solicitor, thư Family & Community Services (FACS, nay NSW Department of Communities and Justice, hoặc cơ quan tương đương bang khác), kể cả khi thư nói về cấp dưỡng hay trợ cấp; loại dễ nhầm khác ở cột "Dễ nhầm với" (mục 1).

## 1. Dấu hiệu cấu trúc bắt buộc

| Loại | Dấu hiệu bắt buộc | Dễ nhầm với |
|---|---|---|
| Centrelink Statement | (1) Services Australia / Centrelink ở đầu trang; (2) tiêu đề statement hoặc thư xác nhận; (3) tên, địa chỉ người nhận (có CRN); (4) Date of issue hoặc ngày thư; (5) tên từng trợ cấp (Family Tax Benefit, Parenting Payment, JobSeeker…) kèm số tiền và kỳ trả; (6) khoảng ngày hoặc bảng các lần trả | Concession Card, thư báo nợ Centrelink → Ngoài phạm vi |
| Child Support Assessment | (1) Services Australia – Child Support; (2) tiêu đề assessment; (3) bên nhận và bên trả (Receiving / Paying parent, Payee / Payer); (4) số tiền (annual rate, có thể kèm per month); (5) ngày bắt đầu hoặc assessment period; (6) ngày thư | — |
| Child Support statement | (1) Services Australia – Child Support; (2) Statement of account / Payment history; (3) bên nhận và bên trả; (4) bảng ngày và số tiền; (5) khoảng ngày; (6) ngày in | — |
| Family Court Order | (1) tên toà (Federal Circuit and Family Court of Australia, Family Court of Western Australia; cũ: Family Court of Australia, Federal Circuit Court); (2) file number, các bên (Applicant / Respondent); (3) Orders / Consent Orders, "the Court orders"; (4) order đánh số; (5) ngày order, Judge / Registrar; (6) dấu toà (seal) hoặc chữ ký Registrar | Minute of Proposed Consent Orders, Application for Consent Orders, Parenting Plan → Ngoài phạm vi |
| Child Support Agreement | (1) tiêu đề Binding / Limited Child Support Agreement; (2) các bên (cha, mẹ, carer) có tên; (3) khoản cấp dưỡng: số tiền, kỳ, bên trả, bên nhận; (4) chữ ký và ngày ký của các bên | thư Solicitor riêng → Ngoài phạm vi (xác nhận tư vấn pháp lý ký kèm thuộc agreement) |

## 2. Bước 0 của nhóm

### 2A. Nguồn tệp

| Loại | BÁO khi Nhóm nguồn là |
|---|---|
| Centrelink, Child Support, Court Order | công cụ văn phòng; công cụ thiết kế; trình sửa/xử lý PDF; không phải PDF (DOCX…) |
| Child Support Agreement | công cụ thiết kế; trình sửa/xử lý PDF; không phải PDF |

Nguồn khác: GHI CHÚ (myGov, Courts Portal hay in từ trình duyệt; agreement thường soạn bằng Word). Tệp ảnh JPG/PNG: GHI CHÚ, dù khối ảnh ghi nhóm nguồn nào.

### 2B. Dấu hiệu xét theo loại (mọi loại)

| Nhãn trong khối | Xử lý |
|---|---|
| `[Che chữ]`, `[Sửa nội dung]` | DỪNG. Lưu thêm chỉ để ký hay gắn chữ ký số nằm ở Ghi chú kỹ thuật, không mang nhãn này |
| `[Sửa ảnh] Thông tin tệp ghi tên trình sửa ảnh: …` | DỪNG |
| `[Sửa ảnh] Ảnh nhỏ lưu trong EXIF (…) khác tỉ lệ khung …` | BÁO |
| `[Ảnh chụp/scan]`, `[Chữ vẽ bằng nét]` | GHI CHÚ. Trang scan: đọc trên ảnh trang gửi kèm. Trang cần đọc không có lớp chữ và không có ảnh đọc được ("không có lớp chữ; <lý do>", "ảnh scan chưa gửi" mà `guroos_attachment_page` không vẽ được, tệp trong hồ sơ mà `guroos_document_read` không trả ảnh trang (SKILL.md mục 2), ảnh mờ) → `KHÔNG ĐỌC ĐƯỢC`, xin bản PDF tải từ myGov hoặc bản rõ hơn |

### 2C. Kiểm tra số và ngày

**Số.** Sai số $1; lệch → `[Lệch số liệu]` theo mẫu chung, không DỪNG. Không quy đổi annual rate, không tính lại mức trợ cấp.
- Centrelink, Child Support statement: tổng các dòng trả của một khoản = tổng in cho khoản đó.
- Assessment, Court Order, Agreement: không có phép so số.

**Ngày và kỳ**: `guroos_date_check(document_date=<Date of issue / ngày thư / ngày in>, max_age_days=30, periods=[{start, end}], min_months=3)`; không có kỳ thì bỏ `periods`, `min_months`.
- Court Order (ngày order), Child Support Agreement (ngày ký): KHÔNG áp quy tắc 30 ngày; bỏ qua "QUÁ"/"TRONG" 30 ngày, chỉ xét ngày trong tương lai.
- Kỳ "(có ngày trong tương lai)" (assessment, order áp tới sau này): chỉ Ghi chú.

Cách lấy kỳ:
- Khoảng ngày in (statement period, assessment period, from – to): đúng khoảng đó.
- Chỉ có bảng các lần trả: đầu kỳ lần trả đầu → cuối kỳ lần trả cuối; không in kỳ thì ngày trả đầu → ngày trả cuối, ghi chú cách tính.
- "Đang nhận từ <ngày>" (receiving since, paid since): <ngày> → ngày tài liệu.
- Chỉ in năm tài chính (`2024–25`, `Year ended 30 June 2025`): 01/07/2024 → 30/06/2025.
- Chỉ có ngày bắt đầu nghĩa vụ ("commencing", "until the child turns 18"): không có kỳ → Chưa kiểm tra được "Kỳ dưới 3 tháng: <tài liệu chỉ ghi gì>", trừ khi bộ có kỳ từ tài liệu khác (mục 5).

## 3. Ghi vào Fact Find

| Loại | `Income received` | Không có thì ghi |
|---|---|---|
| Centrelink Statement | tên từng trợ cấp, số tiền và kỳ trả, mỗi trợ cấp một dòng; thêm tổng và khoảng ngày nếu có in | không có trên tài liệu |
| Child Support Assessment / statement | số tiền và kỳ như in (annual rate, per month…), bên trả | không có trên tài liệu |
| Family Court Order | số tiền, kỳ, bên trả, số order | Order không có khoản trả tiền |
| Child Support Agreement | số tiền, kỳ, bên trả | không có trên tài liệu |

- Rule 18, Applicant là bên trả: `Income received: không ghi, Applicant là bên trả (khoản chi)`, số tiền và kỳ ghi ở Ghi chú. Không rõ Applicant nhận hay trả: `Income received: chưa ghi, chưa rõ vai trò của Applicant`.
- Không chép thêm: Child Support reference, file number của toà, tên và ngày sinh của con.

## 4. Cần thông báo

| Điều kiện | Nhãn | Bằng chứng an toàn | Việc cần làm |
|---|---|---|---|
| Centrelink, Child Support Assessment hoặc statement mới nhất của bộ: tool trả QUÁ 30 ngày | [Quá 30 ngày] | loại ngày, ngày tài liệu, hôm nay theo tool | báo nhân viên xem xét |
| Đoạn kỳ liền mạch mới nhất của bộ: tool trả CHƯA ĐỦ 3 tháng | [Kỳ dưới 3 tháng] | kỳ đã dùng, các dòng "Khoảng hở" | báo nhân viên xem xét |
| Rule 17: tên người nhận KHÁC mọi Applicant | [Sai tên] | hai tên nguyên văn, khác ở đâu | báo nhân viên xem xét |
| Rule 18: không Applicant nào khớp bên nhận hay bên trả | [Sai tên] | tên các bên và vai trò như in | báo nhân viên xem xét |
| Bước 0 ra BÁO (2A, 2B) | [Tệp gốc] | nhóm nguồn, tên phần mềm, nhãn trong khối | xác minh với nơi phát hành (Services Australia, toà, văn phòng luật) hoặc xin bản gốc |
| Tài liệu in TFN (dòng "Mã số" của khối, trang có `[đã che TFN]` hoặc TFN thấy trên ảnh) | [TFN] | chỉ số trang | che TFN trước khi lưu hoặc gửi đi |

Chỉ ghi chú: ngày order của Court Order, ngày ký của Child Support Agreement; khoảng hở nằm trước đoạn mới nhất đã đủ 3 tháng; bên trả còn nợ (arrears, amount owing) hoặc khoản đã dừng (cancelled, ceased), số và ngày như in; Child Support "Private Collect" (Services Australia không thu hộ).

Chưa kiểm tra được: kỳ (2C); rule 18 không rõ Applicant nhận hay trả → "vai trò của Applicant".

## 5. Lưu ý riêng

- **Vai trò (rule 18):** bên nhận = Receiving parent = Payee = carer; bên trả = Paying parent = Payer = liable parent. Trong Court Order, "Applicant" / "Respondent" là bên tại toà, không phải Applicant của hồ sơ. "The Father pay to the Mother": nối với tên qua phần đầu order; không nối được → "Chưa kiểm tra được".
- **Nhiều Applicant:** so từng người; một Applicant đúng vai trò là đủ. Bên còn lại không phải Applicant là bình thường, không báo.
- **Bộ:** cùng Applicant, cùng khoản (cùng tên trợ cấp; hoặc child support / maintenance cho cùng con), cùng bên trả; có thể gồm Assessment, statement, Court Order, Child Support Agreement. Bước 6 (cross-checks.md bảng 1): 3 tháng xét trên đoạn liền mạch mới nhất, 30 ngày ở tài liệu mới nhất mà quy tắc 30 ngày áp dụng; hai dòng này ghi MỘT LẦN ở khối tài liệu đó (bộ chỉ có Court Order, Child Support Agreement: khối mới nhất), khối khác ghi "xét theo bộ ở khối <tệp>".
- **Dữ kiện để đối chiếu:** người nhận · bên trả · tên khoản · số tiền và kỳ trả · kỳ tài liệu · ngày tài liệu · Applicant nhận hay trả · tài khoản nhận (…NNNN) nếu có.

## 6. Ví dụ

Dữ liệu giả. Hôm nay 11/10/2026 (theo `guroos_date_check`). Applicant: Thi Mai Tran.

**Court Order và Payment history cùng bên trả.** court_orders.pdf: Federal Circuit and Family Court of Australia, Consent Orders, Applicant: Thi Mai Tran, Respondent: Daniel Sample, Orders made 14/02/2025; Order 9 "The Respondent pay to the Applicant child maintenance of $250.00 per week commencing 01/03/2025"; có seal. Khối: `Nhóm nguồn: trình sửa/xử lý PDF (Adobe Acrobat, theo Producer).`, Ghi chú kỹ thuật `Tệp có chữ ký số (Guroos chưa xác minh chữ ký).` Tool: `Ngày tài liệu: 14/02/2025 → 604 ngày → QUÁ 30 ngày` (Court Order: bỏ qua). cs_payments.pdf (Payment history, Payee THI MAI TRAN, Payer DANIEL SAMPLE, Period 01/07/2026 – 30/09/2026, Date printed 05/10/2026) là tài liệu mới nhất của bộ. Bước 6: `guroos_date_check(document_date=05/10/2026, max_age_days=30, periods=[{start: 01/07/2026, end: 30/09/2026}], min_months=3)` → `Ngày tài liệu: 05/10/2026 → 6 ngày → TRONG 30 ngày`, `Kỳ 01/07/2026–30/09/2026 → ĐỦ 3 tháng`; khối cs_payments.pdf (ĐẠT) ghi "Bộ với court_orders.pdf: kỳ 01/07/2026–30/09/2026 ĐỦ 3 tháng; Date printed 05/10/2026, hôm nay 11/10/2026: TRONG 30 ngày (theo tool)".

```
### court_orders.pdf — Family Court Order (rule 18) · chắc chắn
Kết luận: CẦN XỬ LÝ
Kiểm tra tệp gốc: đạt (nguồn: trình sửa/xử lý PDF (Adobe Acrobat, theo Producer)) · quy tắc: references/government-family.md
Ghi vào Fact Find
- Income received: child maintenance $250.00 per week (order 9), bên trả Daniel Sample
Cần thông báo
- [Tệp gốc] Nhóm nguồn: trình sửa/xử lý PDF (Adobe Acrobat, theo Producer) → xác minh với toà hoặc xin bản gốc.
Chưa kiểm tra được
- Không có
Ghi chú
- "Applicant" trong order là bên tại toà; tên khớp Applicant hồ sơ: bên nhận.
- Orders made 14/02/2025: quy tắc 30 ngày không áp dụng cho Court Order.
- Order chỉ ghi "commencing 01/03/2025": kỳ xét theo bộ ở khối cs_payments.pdf.
- Tệp có chữ ký số (Guroos chưa xác minh chữ ký).
Dữ kiện để đối chiếu: Người nhận Thi Mai Tran · bên trả Daniel Sample · child maintenance $250.00 per week từ 01/03/2025 · ngày order 14/02/2025 · Applicant là bên nhận
```
