# Giấy tờ tùy thân (rule 4–8)

## Phạm vi

| Mã | Rule | Loại |
|---|---|---|
| A | 4 | Driver Licence (cả bằng lái điện tử chụp màn hình), Proof of Age Card, Photo Card, ID card khác |
| B | 5 | Australian Passport |
| C | 6 | Non-Australian Passport |
| D | 7 | Medicare Card (xanh lá; xanh dương "Reciprocal"; vàng "Interim") |
| E | 8 | Visa Grant Notice, VEVO |

Đọc trước: hộ chiếu trang thông tin (ảnh, MRZ); Visa Grant Notice trang 1 rồi trang có hạn visa.

## 1. Dấu hiệu cấu trúc bắt buộc

| Loại | Dấu hiệu bắt buộc |
|---|---|
| A · Driver Licence | Tên bang + "Driver Licence" (Learner, Probationary); ảnh; "Licence No."/"Licence Number"; hạng bằng (C, LR, MR, HR, HC, MC, R…); ngày hết hạn |
| A · Proof of Age / Photo Card / ID card | Cơ quan cấp (Service NSW, VicRoads, TMR, Australia Post "Keypass"…) + tiêu đề thẻ; ảnh; số thẻ; ngày hết hạn |
| B · Australian Passport | "AUSTRALIA" + "PASSPORT"; Type P, Code AUS; Passport No.; Surname, Given names; Date of expiry; 2 dòng MRZ 44 ký tự, dòng 1 bắt đầu `P<AUS` |
| C · Non-Australian Passport | Như B, mã nước khác AUS (`P<VNM`, `P<CHN`, `P<NZL`…) |
| D · Medicare | Chữ "medicare"; số thẻ 10 chữ số; dòng tên đánh số 1, 2, 3…; "VALID TO" |
| E · Visa Grant Notice | Thư Department of Home Affairs (tên cũ DIBP); "Visa grant notice"; "Visa grant number"; "Date of grant"; visa class/subclass; tên người giữ visa |
| E · VEVO | "Visa Entitlement Verification Online"/"VEVO"; "Visa class / subclass"; "Visa status"; "Visa expiry date" hoặc "Period of stay"; quyền làm việc hoặc điều kiện visa |

Chỉ có bìa hộ chiếu, chỉ có mặt sau thẻ, VEVO mất trang có hạn: trường thiếu vào "Chưa kiểm tra được".

Gần giống:
- Ngoài phạm vi: thẻ WWCC, security, white card, bằng tàu thuyền, thẻ sinh viên, thẻ nhân viên, Citizenship Certificate, Birth Certificate (cả bản dịch), Marriage, Change of Name Certificate, thẻ bảo hiểm tư, Health Care Card, Pensioner Concession Card, thẻ DVA.
- Thẻ không có hạng bằng là Photo Card. Thẻ căn cước nước ngoài, ImmiCard (MRZ 3 dòng bắt đầu `I`): A, "chưa chắc: không phải thẻ của bang Úc". Document of Identity: B, "chưa chắc".
- Bản sao chứng thực (trang dán ảnh giấy tờ, lời "certify … true copy"): mỗi giấy tờ một phần; lời chứng thực chỉ ghi Ghi chú "bản sao có chứng thực", không chép người chứng thực. Không có ảnh giấy tờ gửi kèm: `KHÔNG ĐỌC ĐƯỢC` (cần ảnh hoặc bản scan riêng), không ghi Ngoài phạm vi. Ảnh khách cầm giấy tờ (cuộc gọi video): không tách phần, chỉ Ghi chú.
- E "chưa chắc": "Acknowledgement of valid application received" (chỉ xác nhận nộp đơn, không phải visa: mục 4); bản tóm tắt visa tự gõ, không có các nhãn VEVO.

## 2. Bước 0 của nhóm

Nhóm này không có DỪNG ngoài SKILL.md mục 5.2; cao nhất là BÁO.

### 2A. Nguồn tệp

| Nguồn | A–D | E |
|---|---|---|
| công cụ thiết kế | BÁO | BÁO |
| công cụ văn phòng; trình sửa/xử lý PDF; không phải PDF (DOCX…) | GHI CHÚ | BÁO |

CHẤP NHẬN: ảnh (JPG/PNG) với A–D, có khối kiểm tra ảnh hay chưa (nhóm nguồn của khối ảnh không xét ở 2A); trình duyệt in ra PDF và bộ chuyển HTML sang PDF với E (in từ VEVO, ImmiAccount). Nguồn khác, kể cả ảnh với E: GHI CHÚ.

### 2B. Dấu hiệu xét theo loại (A–E)

| Dấu hiệu | Xử lý |
|---|---|
| `[Sửa ảnh]`, `[Sửa nội dung]` | BÁO |
| `[Che chữ]` | BÁO; trường cần ghi bị che → "Chưa kiểm tra được" |
| `[Ảnh chụp/scan]`, `[Chữ vẽ bằng nét]` | GHI CHÚ |

### 2C. Ngày và mã số

| Việc | Gọi tool | Kết quả |
|---|---|---|
| Hạn A, C, D, E (E: "Visa expiry date" hoặc ngày cuối "Period of stay") | `guroos_date_check(expiry_date=…)` | HẾT HẠN → `[Hết hạn]`; E → `[Visa]` |
| Hạn B | `guroos_date_check(expiry_date=…, expiry_grace_years=2)` | "HẾT HẠN (quá 2 năm)" → `[Hết hạn]` |
| Ngày kiểm tra VEVO | `guroos_date_check(document_date=…, max_age_days=30)` | QUÁ 30 ngày → Ghi chú |
| Giấy tờ có MRZ (B, C; ImmiCard, thẻ căn cước nước ngoài, thẻ hay nhãn visa có MRZ) | `guroos_identity_check(mrz=…, printed={surname, given_names, birth_date, expiry_date, nationality, sex, document_number})`; B, C thêm `passport={number, country}` | Đọc kết quả như dưới |
| D | `guroos_identity_check(medicare={number, irn})`, `irn` = số dòng của Applicant; chưa có Applicant mà thẻ chỉ có 1 dòng tên: `irn` = 1 | Như trên |
| A · bằng lái | `guroos_identity_check(licence={number, state})` | Chỉ định dạng (không có số kiểm tra) |

- Hộ chiếu "15 AUG 2025" = 15/08/2025. Hạn chỉ in tháng/năm (Medicare "VALID TO 08/2027", Keypass "EXPIRY 08-27"): còn hạn hết tháng, gửi tool 31/08/2027.
- `mrz`: mọi dòng MRZ như đọc trên ảnh, mỗi dòng một hàng, đủ từng chữ và số, giữ `<` giữa các phần (như `<<` giữa họ và tên); không sửa cho "đúng". Dãy `<` dài (cuối dòng tên, ô số cá nhân trống) không cần đếm đúng: tool tự đếm lại và xác nhận bằng chữ in; ghi chú "đếm lệch dấu <" không có `[Cần đọc lại]` thì không gọi lại tool. Không chạy lệnh (shell, python) để tạo, đếm hay sửa dòng MRZ. `printed`: chép như in; trường không in thì bỏ; giấy tờ không in tách họ, tên thì dùng `name`. Mọi phần của một giấy tờ gửi trong một lần gọi. Không tự tính số kiểm tra.
- Hạn chỉ lấy từ `guroos_date_check` với ngày in; bỏ dòng `[Hết hạn]` "Theo MRZ" của `guroos_identity_check` (hạn MRZ lệch hạn in thì đã có `[Lệch MRZ]`).
- So tên với Applicant bằng tên in, không bằng tên trong MRZ (viết hoa, không dấu, có thể bị cắt).

Đọc kết quả `guroos_identity_check` (kết quả 2C, không phải khối kiểm tra tệp: không xét theo SKILL.md 5.2, 2A, 2B, kể cả `[Mã số sai]`):
- Dòng dưới "Mã số sai hoặc không khớp" (`[MRZ sai số kiểm tra]`, `[MRZ sai]`, `[Lệch MRZ]`, `[Mã số sai]`, `[Sai định dạng]`), `[Định dạng bằng lái]`, chữ "LỆCH" ở dòng "Đối chiếu MRZ với chữ in": đọc lại ảnh một lần, gọi lại. Vẫn còn → BÁO (dòng `[Tệp gốc]`, mục 4), không tự thành `KHÔNG HỢP LỆ`.
- `[Cần đọc lại]`, hoặc ảnh không đọc ra MRZ hay số: đọc lại (nhìn lại ảnh đã có trong hội thoại), gọi lại tool kiểm; vẫn vậy → "Chưa kiểm tra được: <ô>, ảnh chưa đủ rõ". Ghi chú kỹ thuật khác (cả "chưa so được" không kèm `[Cần đọc lại]`): chép dòng liên quan vào Ghi chú.
- Bằng chứng: tên dấu hiệu bỏ ngoặc vuông, ô và dòng MRZ như tool in, "vẫn vậy sau khi đọc lại"; không chép câu nhận định thật/giả của tool. Không chép dòng MRZ, số Medicare; số bằng lái chỉ ghi ở trường Licence No.; số khác chỉ ghi đuôi như tool in.

## 3. Ghi vào Fact Find

Trường không đọc rõ: "Chưa kiểm tra được".

| Loại | Trường | Cách ghi |
|---|---|---|
| A | Licence No. | Chép đủ số như in, bỏ khoảng trắng; đúng số đã gửi `guroos_identity_check`. Photo Card: số thẻ. Card No. in riêng trên bằng lái không phải Licence No. Còn ký tự đọc không chắc sau khi đọc lại → "Chưa kiểm tra được", không đoán |
| A, B, C | Name on document | Nguyên văn như in; hộ chiếu lấy "Surname, Given names" trên trang in, không lấy từ MRZ |
| A, B, C | Expiry Date | DD/MM/YYYY; thẻ chỉ in tháng/năm: MM/YYYY |
| B, C | Document No. | Ô "Passport No." trên trang in, không lấy từ MRZ |
| D | Name on document | Dòng của Applicant, kèm số dòng; không có → "không có dòng tên của <Applicant>", báo `[Sai tên]`. Chưa có Applicant: mục 5 |
| D | Expiry Date | Như in: MM/YYYY (thẻ xanh lá) hoặc DD/MM/YYYY |
| E | Active Visa subclass | Subclass của visa "In Effect" |
| E | Visa type | Tên visa như in + nhóm |
| E | Name on document | Nguyên văn |

Xếp nhóm Visa type theo chữ trên giấy tờ, không đoán từ subclass; không xếp được → "Chưa kiểm tra được":
- **Bridging**: ghi "Bridging", hoặc subclass 010, 020, 030, 040, 050, 051.
- **Temporary**: ghi "Temporary"/"Provisional", hoặc hạn visa/"Period of stay" là một ngày cụ thể. Special Category (subclass 444, công dân New Zealand) là Temporary dù ghi "Indefinite".
- **Permanent**: ghi "Permanent", hoặc "Period of stay: Indefinite".
- "Must not arrive after" là hạn nhập cảnh lại, không phải hạn visa.

Ngoài danh sách của SKILL.md, không chép thêm: Visa grant number; số hộ chiếu in trong Visa/VEVO (chỉ dùng 4 ký tự cuối để đối chiếu); tên người khác trên cùng thẻ.

## 4. Cần thông báo

So tên theo SKILL.md mục 6. **Tên đệm:** tên và họ khớp mà tên đệm chỉ in chữ cái đầu đúng, hay thiếu ở một bên (Medicare thường chỉ in chữ cái đầu: "ISLA M BRENNAN" = Isla Margaret Brennan; "ISLA BRENNAN" cũng vậy) là KHỚP: không `[Sai tên]`, không xin Statutory Declaration. Chỉ A, B, C (giấy tờ lender dùng xác minh danh tính, tên trên đơn vay theo tên in đầy đủ) thêm Ghi chú `tên đệm khác hồ sơ: "<tên in>" / "<tên hồ sơ>"`; D, E không ghi gì. Chữ cái đầu sai, tên đệm khác chữ, viết tắt tên (first name) hay họ vẫn là KHÁC.

So địa chỉ (chỉ A): bỏ qua hoa/thường, dấu câu, viết tắt (St = Street, VIC = Victoria, "Unit 3, 12" = "3/12"); khác số căn, số nhà, tên đường, suburb hoặc postcode là KHÁC. Địa chỉ dán hoặc in ở mặt sau thẻ là địa chỉ mới nhất.

| Điều kiện | Nhãn | Bằng chứng | Việc cần làm |
|---|---|---|---|
| A, B: tên KHÁC Applicant (chỉ khác tên đệm như trên: không tính) | Sai tên | Hai tên nguyên văn, khác ở đâu | chuẩn bị Statutory Declaration / Name Change Certificate |
| C, D, E: tên KHÁC (như trên) | Sai tên | Như trên | chuẩn bị Statutory Declaration |
| A: địa chỉ KHÁC hồ sơ | Sai địa chỉ | Hai địa chỉ, khác ở phần nào | xin khách địa chỉ cập nhật |
| A, C, D: hết hạn; B: hết hạn quá 2 năm | Hết hạn | Expiry Date, hôm nay (B thêm mốc 2 năm) | xin khách giấy tờ còn hạn hoặc giấy tờ thay thế |
| C: luôn luôn, trừ khi lô có Visa/VEVO hợp lệ hoặc hộ chiếu Úc của chính người đó | Visa | Mã nước; lô không có visa hay hộ chiếu Úc của người này | xin khách visa hiện tại |
| E: Temporary hoặc Bridging | Visa | Visa type, subclass, hạn visa | kiểm tra lender có chấp nhận loại visa này không |
| E: "Visa status" khác "In Effect", hoặc qua hạn visa | Visa | Status nguyên văn, hoặc hạn visa và hôm nay | visa không còn hiệu lực, xin khách visa hiện tại |
| E: chỉ có "Acknowledgement of valid application received" | Visa | "thư xác nhận nộp đơn, không phải visa" | xin khách VEVO hoặc Bridging visa grant notice |
| Bước 0 ra BÁO (2A, 2B, mã số ở 2C) | Tệp gốc | Nguồn, hoặc nhãn và dòng của khối; mã số theo 2C | xin khách ảnh rõ của giấy tờ gốc hoặc xác minh với nơi phát hành |

Chỉ ghi chú:
- Địa chỉ khớp sau khi bỏ viết tắt; thẻ không in địa chỉ ("không có địa chỉ để đối chiếu").
- B hết hạn chưa quá 2 năm: Expiry Date, mốc 2 năm, hôm nay.
- D thẻ xanh dương hoặc vàng: "người giữ thẻ chưa là thường trú; xem visa".
- Bằng lái điện tử chụp màn hình: "một số lender yêu cầu thẻ thật".
- VEVO quá 30 ngày; Visa Grant Notice không cho biết trạng thái hiện tại.

## 5. Lưu ý riêng

- **Medicare nhiều người.** Mỗi Applicant lấy dòng có tên giống người đó nhất để so, ghi một dòng "Name on document". Dòng của người ngoài hồ sơ: "thẻ có N dòng tên khác, bỏ qua", không chép tên. Chưa có Applicant: thẻ chỉ có 1 dòng tên → "Name on document" chép tên đó nguyên văn kèm "(dòng 1)", phần so tên "Chưa kiểm tra được", hỏi người dùng; từ 2 dòng tên → "chưa xác định (thẻ có N dòng tên)", không chép tên nào, hỏi người dùng.
- **Nhiều Applicant, không ai KHỚP:** `[Sai tên]` so với người gần nhất; không chọn được → "Chưa kiểm tra được: tên".
- **Dữ kiện để đối chiếu**: A tên · địa chỉ · hạn; B, C mã nước · tên · 4 ký tự cuối số hộ chiếu · hạn; D màu thẻ · tên dòng Applicant (chưa có Applicant, thẻ 1 dòng: tên dòng 1) · hạn; E subclass · nhóm · status · hạn · tên · 4 ký tự cuối số hộ chiếu.

## 6. Ví dụ

Dữ liệu giả. Hôm nay 11/10/2026. Applicant: Thi Mai Tran, 3/12 Sample Street, Sampleton VIC 3000. Lô chỉ có `id-scan.pdf` (đính kèm chat, 2 trang scan, có ảnh trang). Khối kiểm tra ghi "Nhóm nguồn: chưa biết — mọi trang là ảnh scan, đây không phải nơi phát hành." và "[Ảnh chụp/scan] Trang 1, 2 là ảnh của cả trang, không có lớp chữ của tệp gốc."

Trang 1: bằng lái Victoria, địa chỉ "UNIT 3, 12 SAMPLE ST, SAMPLETON VIC 3000", Expiry "03-02-2026"; `guroos_date_check` trả "Hạn: 03/02/2026 → HẾT HẠN (quá 250 ngày)"; `guroos_identity_check(licence={number: "012345678", state: "VIC"})` không có dòng sai. Trang 2: hộ chiếu Việt Nam còn hạn; `guroos_identity_check(mrz=…, printed={…}, passport={…, country: "VNM"})` trả "[MRZ sai số kiểm tra] số hộ chiếu (dòng MRZ 2)…", các ô khác khớp chữ in; đọc lại ảnh, gọi lại vẫn vậy.

```
### id-scan.pdf (phần 1) — Driver Licence (rule 4) · chắc chắn
Kết luận: CẦN XỬ LÝ
Kiểm tra tệp gốc: đạt (nguồn: chưa biết — mọi trang là ảnh scan, đây không phải nơi phát hành) · quy tắc: references/identity.md
Ghi vào Fact Find
- Licence No.: 012345678
- Name on document: TRAN, Mai
- Expiry Date: 03/02/2026
Cần thông báo
- [Hết hạn] Expiry Date 03/02/2026, hôm nay 11/10/2026 → xin khách giấy tờ còn hạn hoặc giấy tờ thay thế
- [Sai tên] Giấy tờ ghi "TRAN, Mai", hồ sơ ghi "Thi Mai Tran": thiếu tên "Thi" → chuẩn bị Statutory Declaration / Name Change Certificate
Chưa kiểm tra được
- Không có
Ghi chú
- Phần này ở trang 1; trang là ảnh scan
- Địa chỉ khớp hồ sơ ("Unit 3, 12 Sample St" = "3/12 Sample Street")
- Số bằng lái đúng định dạng VIC (chỉ kiểm định dạng)
Dữ kiện để đối chiếu: TRAN, Mai · 3/12 Sample St, Sampleton VIC 3000 · hết hạn 03/02/2026

### id-scan.pdf (phần 2) — Non-Australian Passport (rule 6) · chắc chắn
Kết luận: CẦN XỬ LÝ
Kiểm tra tệp gốc: đạt (nguồn: chưa biết — mọi trang là ảnh scan, đây không phải nơi phát hành) · quy tắc: references/identity.md
Ghi vào Fact Find
- Document No.: C1234567
- Name on document: TRAN, THI MAI
- Expiry Date: 20/11/2031
Cần thông báo
- [Visa] Hộ chiếu mã nước VNM; lô không có Visa/VEVO hay hộ chiếu Úc của Thi Mai Tran → xin khách visa hiện tại
- [Tệp gốc] MRZ sai số kiểm tra ở số hộ chiếu (dòng MRZ 2), vẫn vậy sau khi đọc lại → xin khách ảnh rõ của giấy tờ gốc hoặc xác minh với nơi phát hành
Chưa kiểm tra được
- Không có
Ghi chú
- Phần này ở trang 2; trang là ảnh scan
- Tên khớp Applicant (in họ trước); mọi ô MRZ khớp chữ in
Dữ kiện để đối chiếu: VNM · TRAN, THI MAI · số hộ chiếu …4567 · hết hạn 20/11/2031
```
