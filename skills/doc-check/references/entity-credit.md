# Trust, công ty và báo cáo tín dụng (rule 9–11)

## Phạm vi

| Loại | Rule | Gồm |
|---|---|---|
| Trust Deed | 9 | Trust Deed, Deed of Settlement; deed đi kèm: Deed of Variation, Deed of Appointment/Retirement of Trustee |
| Company Extract | 10 | ASIC Current (& Historical) Company Extract, từ ASIC hoặc dịch vụ tra cứu |
| Equifax | 11 | Báo cáo tín dụng của một người. Báo cáo illion, Experian áp như Equifax, ghi chú tên bureau; chữ "Equifax" dưới đây gồm cả hai |

Ngoài phạm vi: bản in kết quả ABN Lookup (kể cả "The Trustee for …"), Certificate of Registration, kết quả tìm tên trên ASIC Connect, ứng dụng chỉ hiện điểm tín dụng.

Đọc theo thứ tự:
- **Trust Deed**: trang 1–2 (tên trust, ngày, các bên) → Schedule (thường ở cuối) → trang ký → dòng chứng thực (đầu, cuối hoặc mọi trang). Schedule không nêu beneficiary thì đọc Definitions.
- **Company Extract**: đọc hết.
- **Equifax**: trang 1 (ngày lập, tóm tắt) → Credit Enquiries → Accounts / Repayment History → Defaults, Court, Insolvency → Directorships.

**Trang scan** (hay gặp ở deed cũ) đến dạng ảnh trang (SKILL.md): đọc chữ ký, dấu chứng thực trên ảnh như trang thường. Deed scan dài: mở trang 1–2 và 3 trang cuối trước (Schedule, trang ký, chứng thực thường ở đó), chỉ mở thêm khi còn thiếu, tối đa 8 trang ảnh cho một deed. Trang chưa có ảnh: xem cuối mục 4.

## 1. Dấu hiệu cấu trúc bắt buộc

Mọi loại: có (1) và ít nhất 3 dấu hiệu còn lại là "chắc chắn". Mất Schedule hay trang ký tính là thiếu trang.

| Loại | Dấu hiệu bắt buộc |
|---|---|
| Trust Deed | (1) tiêu đề "Trust Deed" / "Deed of Settlement"; (2) các bên gồm Settlor và Trustee; (3) điều khoản đánh số, định nghĩa Beneficiaries, Appointor, Vesting Date; (4) Schedule: tên trust, Settled Sum, Trustee; (5) trang ký "Executed as a deed" có người làm chứng |
| Deed đi kèm | (1) tiêu đề "Deed of Variation" / "Deed of Appointment" / "Deed of Retirement"; (2) các bên; (3) dẫn chiếu tên trust và deed gốc; (4) điều khoản sửa đổi, bổ nhiệm hoặc rút lui; (5) như Trust Deed |
| Company Extract | (1) "Extracted from ASIC's database at … on …" hoặc tiêu đề ASIC; (2) "Current Company Extract" / "Current & Historical Company Extract"; (3) Organisation details: tên, ACN, Type, Registration date, Status; (4) Officeholders có ngày bổ nhiệm; (5) Share structure và Members |
| Equifax | (1) tên bureau và ngày lập báo cáo; (2) thông tin người được báo cáo; (3) Credit Enquiries; (4) Accounts có Repayment History theo tháng; (5) mục Defaults, Court/Insolvency, Directorships (kể cả ghi "None") |

## 2. Bước 0 của nhóm

### 2A. Nguồn tệp

| Nguồn | Trust Deed, deed đi kèm | Company Extract, Equifax |
|---|---|---|
| công cụ văn phòng | CHẤP NHẬN (luật sư soạn bằng Word) | BÁO |
| công cụ thiết kế | BÁO | BÁO |
| trình sửa/xử lý PDF | BÁO | BÁO |
| máy in PDF | GHI CHÚ | BÁO |
| bộ chuyển HTML sang PDF | GHI CHÚ | CHẤP NHẬN |
| ảnh (JPG/PNG) | GHI CHÚ | BÁO |
| không phải PDF (DOCX…) | BÁO | BÁO |

Apple, trình duyệt in ra PDF, chưa biết: GHI CHÚ. Ảnh theo dòng "ảnh (JPG/PNG)"; khối kiểm tra ảnh chỉ thêm 5.2 và `[Sửa ảnh]` (2B).

### 2B. Dấu hiệu xét theo loại

| Dấu hiệu | Trust Deed, deed đi kèm | Company Extract, Equifax |
|---|---|---|
| `[Che chữ]` | DỪNG | DỪNG |
| `[Sửa nội dung]` | BÁO | DỪNG |
| `[Sửa ảnh]` | BÁO | BÁO |
| `[Chữ vẽ bằng nét]` | GHI CHÚ | BÁO |
| `[Ảnh chụp/scan]` | GHI CHÚ | GHI CHÚ |

### 2C. Kiểm tra số và ngày

- **ACN** (extract, hoặc Trustee là công ty): dựa vào dòng "Mã số (không hiện số)" của khối, không tự tính số kiểm tra. "số kiểm tra đúng" → ghi "ACN đúng số kiểm tra" vào Dữ kiện; có lần sai mà không thành `[Mã số sai]` → Ghi chú; khối không đếm ACN (ảnh, trang scan) → Ghi chú "ACN đọc từ ảnh, chưa kiểm số kiểm tra". ABN và ACN của cùng công ty: 9 số cuối ABN phải trùng ACN.
- **Cổ phần**: tổng số cổ phần Members đang giữ theo từng class phải bằng số đã phát hành ở Share structure, khớp đúng.
- **Mốc 6 tháng Equifax**: `guroos_date_check(window_months=6, reference_date=<ngày lập báo cáo>)`; lấy enquiry từ ngày đầu của dòng "Cửa sổ 6 tháng: …" trở đi.
- **Equifax tự khớp**: enquiry hay tháng trả chậm sau ngày lập báo cáo là lệch; số default, enquiry ở phần tóm tắt khác số dòng chi tiết (đã đọc hết các trang) là lệch.
- Nhóm này không có hạn tuổi tài liệu, không gắn `[Quá 30 ngày]`.

## 3. Ghi vào Fact Find

| Loại | Trường | Không có thì ghi |
|---|---|---|
| Trust Deed | Trust Name; Trustee Name (công ty thì ghi tên công ty) | Chưa kiểm tra được |
| Trust Deed | Beneficiary Name: chỉ người nêu đích danh (Primary, Specified, Named) | "Không có beneficiary nêu đích danh"; nhóm chung ("spouse, children") ghi vào Ghi chú |
| Company Extract | ACN; Director Name (mọi director hiện tại); Shareholder Name (mọi member hiện tại) | Chưa kiểm tra được |
| Equifax | (không có) | "- Không có" |

Extract "Current & Historical": bỏ qua mục Former, Ceased, Previous.

**Tra ACN** (Company Extract; ABN Lookup, SKILL.md 5.5): `guroos_abn_lookup(acn=<ACN như in>, name_to_match=<tên công ty như in ở Organisation details>)`.
- Fact Find ACN: ACN như in, kèm "(ABN Lookup <ngày tra>: ABN <ABN tool trả>, <trạng thái ABN>)".
- ABR chỉ có trạng thái ABN; trạng thái đăng ký với ASIC (Status), director, shareholder vẫn lấy từ extract. Dòng "Trạng thái đăng ký công ty với ASIC … không có trong ABR" của tool không ghi lại, vì extract đã in Status.
- "ABR không có bản ghi" cho ACN: Ghi chú "ABN Lookup không có ABN cho ACN này (công ty có thể chưa đăng ký ABN)", không gắn nhãn. ACN đọc từ ảnh mà tool vẫn báo không hợp lệ sau khi đọc lại: "Chưa kiểm tra được: tra ACN: ACN đọc từ ảnh không hợp lệ".
- "Lưu ý thẩm định" khác của tool (không đăng ký GST; Active có hiệu lực dưới 12 tháng) → Ghi chú, giữ đúng ý tool.

**Ghi vào Broker's Notes** (chỉ Equifax):
- Ngày lập báo cáo.
- Mọi Credit Enquiry (consumer và commercial) trong 6 tháng: ngày, tổ chức, loại, số tiền. Không có → "Không có enquiry trong 6 tháng".
- Mọi Default và tháng trả chậm: tổ chức, loại tài khoản, 4 số cuối nếu có, tháng, mã. Không có → "Không có default, không có tháng trả chậm".

Trả chậm = mã 1–6 hoặc X trong Repayment History, hoặc "Worst repayment status" khác "Current". Mã 0 là đúng hạn; mã chữ khác (C, R, P…) là trạng thái tài khoản.

## 4. Cần thông báo

| Điều kiện | Nhãn | Bằng chứng an toàn | Việc cần làm |
|---|---|---|---|
| Deed: Beneficiary nêu đích danh không khớp Applicant nào | Sai tên | tên, trang | báo nhân viên xem xét |
| Deed: bên ký nào (Settlor, Trustee; deed đi kèm: mọi bên) thiếu chữ ký hoặc ngày ký | Chưa ký | bên nào thiếu gì, trang | báo nhân viên xem xét |
| Deed: không có dấu chứng thực ("Certified true copy" kèm chữ ký, tên, chức danh, ngày) | Chưa chứng thực | các trang đã xem | xin khách chứng thực (certify) bản sao |
| Extract: Director hoặc Shareholder hiện tại không khớp Applicant nào | Sai tên | tên, vai trò | báo nhân viên xem xét |
| Extract: Status khác "Registered" | Trạng thái công ty | status nguyên văn | báo nhân viên xem xét |
| Extract: ABN Lookup, trạng thái ABN của công ty là Cancelled | ABN đã huỷ | ABN, ngày huỷ theo tool | báo nhân viên xem xét |
| Extract: ABN Lookup, "Đối chiếu tên" là KHÁC | Sai tên doanh nghiệp | tên trên extract và tên ABR nguyên văn | báo nhân viên xem xét |
| Tên trust hay công ty khác entity người dùng nêu trong chat | Sai tên | hai tên | báo nhân viên xem xét |
| Equifax: có Current Directorship | Directorship | tên công ty | xin khách Accountant Letter nếu không dùng thu nhập từ công ty đó để tính khả năng trả nợ (servicing) |
| Equifax: có Default, tháng trả chậm, Court Judgement, Personal Insolvency hoặc Serious Credit Infringement | Tín dụng xấu | tổ chức, loại, tháng, mã | báo nhân viên xem xét |
| Lệch theo 2C | Lệch số liệu | phép so, số in, số chênh, trang | báo nhân viên xem xét |

Chữ ký điện tử (DocuSign…) tính là đã ký. Chưa đọc hết phần liên quan (kể cả trang scan chưa có ảnh trang) thì không kết luận "chưa ký", "chưa chứng thực", "không có default"; ghi vào "Chưa kiểm tra được".

Chỉ ghi chú khi:
- Một Applicant vắng tên trên deed hay extract (người có tên mà không khớp Applicant nào vẫn là `[Sai tên]`).
- Tên trên Equifax khác Applicant; tên Settlor, Appointor, Trustee cá nhân, Secretary (checklist không so các tên này).
- Previous Directorships; enquiry trước mốc 6 tháng.
- Hồ sơ chưa có entity: ghi tên trust hoặc công ty.

## 5. Lưu ý riêng

- **Nhiều người.** So từng beneficiary, director, shareholder với từng Applicant.
- **Tên entity.** Phần "ATF …" là tên trust, so riêng. Tên thương mại không phải tên pháp lý.
- **Deed đi kèm.** Mỗi văn bản một khối (rule 9), kiểm tra chữ ký, ngày ký, chứng thực như deed. Fact Find chỉ ghi trường văn bản đó nêu (Deed of Appointment: Trust Name, Trustee Name mới). Khối Trust Deed lấy `Trustee Name` theo văn bản mới nhất trong lô, ghi chú tên văn bản và ngày.
- **Equifax.** Mỗi người một báo cáo, một khối. Không chép địa chỉ cũ.
- **Đối chiếu chéo**: bảng 3 của `references/cross-checks.md` (Trustee là công ty, Current Directorship, enquiry 6 tháng); kết quả là Ghi chú của khối này.

## 6. Ví dụ

Dữ liệu giả. Hôm nay 11/10/2026. Người dùng nêu trong chat: Applicant "Thi Mai Tran"; pháp nhân Mai Tran Pty Ltd (công ty). Lô không có Company Extract, không có sao kê khoản nợ.

Tệp `equifax-thi-mai-tran.pdf`. Khối: "Nhóm nguồn: trình duyệt in ra PDF (trình duyệt (Chrome/Edge), theo Producer).", không có dấu hiệu. Lập 01/10/2026; `guroos_date_check(window_months=6, reference_date="01/10/2026")` trả "Cửa sổ 6 tháng: 01/04/2026–01/10/2026 (tính lùi từ 01/10/2026)". Enquiry: 15/08/2026 ABC Bank, Credit Card, $10,000; 02/02/2026 XYZ Finance, Personal Loan, $20,000. Thẻ ABC Bank (…4821): 05/2026 mã 1, tháng khác mã 0. Defaults, Court, Insolvency: None. Current Directorships: MAI TRAN PTY LTD.

```
### equifax-thi-mai-tran.pdf — Equifax Credit Report (rule 11) · chắc chắn
Kết luận: CẦN XỬ LÝ
Kiểm tra tệp gốc: đạt (nguồn: trình duyệt in ra PDF (trình duyệt (Chrome/Edge), theo Producer)) · quy tắc: references/entity-credit.md
Ghi vào Fact Find
- Không có
Ghi vào Broker's Notes
- Ngày lập báo cáo: 01/10/2026.
- Credit Enquiry trong 6 tháng (từ 01/04/2026): 15/08/2026, ABC Bank, Credit Card, $10,000.
- Trả chậm: ABC Bank Credit Card (…4821), 05/2026, mã 1. Default: không có.
Cần thông báo
- [Directorship] Current Directorship: MAI TRAN PTY LTD → xin khách Accountant Letter nếu không dùng thu nhập từ công ty này để tính khả năng trả nợ.
- [Tín dụng xấu] ABC Bank Credit Card (…4821) trả chậm 05/2026, mã 1 → báo nhân viên xem xét.
Chưa kiểm tra được
- Không có
Ghi chú
- Nguồn trình duyệt in ra PDF (trình duyệt (Chrome/Edge)).
- Enquiry 02/02/2026 (XYZ Finance) trước mốc 6 tháng nên không ghi.
- MAI TRAN PTY LTD trùng entity của hồ sơ; lô chưa có Company Extract của công ty này.
- Enquiry 15/08/2026 ABC Bank Credit Card: lô chưa có sao kê thẻ ABC Bank.
Dữ kiện để đối chiếu: lập 01/10/2026 · Current Directorship MAI TRAN PTY LTD · enquiry 15/08/2026 ABC Bank Credit Card $10,000 · trả chậm 05/2026 thẻ …4821 · default: không
```
