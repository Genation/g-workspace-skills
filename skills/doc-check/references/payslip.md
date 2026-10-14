# Payslip (rule 12)

## Phạm vi

- Payslip (Pay Slip, Pay Advice, Pay Statement, Earnings Statement) từ mọi phần mềm lương hoặc cổng nhân viên, kể cả bản in từ trình duyệt. Checklist rule 12.
- Payslip thường 1–2 trang: đọc hết. Một tệp có thể gộp nhiều payslip: tìm mọi khối `Pay period` ở mọi trang. Mỗi payslip là một phần tử của bộ (mục 5).

## 1. Dấu hiệu cấu trúc bắt buộc

Chín nội dung Fair Work bắt buộc trên payslip.

| Loại | Dấu hiệu bắt buộc | Dễ nhầm với |
|---|---|---|
| Payslip | (1) tên employer ở đầu trang; (2) Employer ABN; (3) tên employee; (4) kỳ lương (`Pay period`, `Period start / end`; có payslip chỉ in ngày cuối: `Period ending`, `Week ending` kèm tần suất); (5) `Pay date` / `Payment date`; (6) bảng thu nhập: các dòng lương (giờ × rate, hoặc salary) và tổng thu nhập (`Gross`, `Gross Pay`, `Gross Earnings`, `Total Gross`, `Total Earnings`); (7) các khoản trừ, có PAYG `Tax` (có thể $0.00 hoặc không in khi kỳ không giữ thuế); (8) `Net pay`; (9) `Superannuation` do employer đóng (số tiền, thường kèm tên quỹ) | timesheet, roster (không có `Pay date` và `Net pay`) → Ngoài phạm vi |

## 2. Bước 0 của nhóm

### 2A. Nguồn tệp

| Nhóm nguồn | Payslip |
|---|---|
| công cụ văn phòng; không phải PDF (DOCX, XLSX…) | BÁO (employer nhỏ hay làm bằng Excel/Word, nhưng tệp sửa được) |
| máy in PDF | BÁO (in lại, không còn tệp gốc) |
| ảnh (JPG/PNG) | BÁO (ảnh chụp payslip) |
| công cụ thiết kế; trình sửa/xử lý PDF | DỪNG `[Nguồn]` (phần mềm lương không xuất payslip qua các công cụ này) |

Nguồn khác: GHI CHÚ (cổng nhân viên hay in từ trình duyệt hoặc xuất qua bộ chuyển HTML sang PDF). Tệp ảnh JPG/PNG: dòng "ảnh (JPG/PNG)", dù khối ảnh ghi nhóm nguồn nào.

### 2B. Dấu hiệu xét theo loại

| Nhãn trong khối | Quyết định |
|---|---|
| `[Sửa nội dung]`, `[Che chữ]` | DỪNG |
| `[Sửa ảnh] Thông tin tệp ghi tên trình sửa ảnh: …` | DỪNG |
| `[Sửa ảnh] Ảnh nhỏ lưu trong EXIF (…) khác tỉ lệ khung với ảnh chính …` | BÁO |
| `[Chữ vẽ bằng nét]`, `[Ảnh chụp/scan]` | BÁO |

Trang scan: đọc số trên ảnh trang gửi kèm ("Trang N: ảnh scan, xem ảnh … gửi kèm"). Trang không có lớp chữ và không có ảnh đọc được ("không có lớp chữ; <lý do>", thường do chữ vẽ bằng nét; "ảnh scan chưa gửi" (SKILL.md mục 2); ảnh mờ) → `KHÔNG ĐỌC ĐƯỢC`; dòng "Nội dung" ghi cần bản PDF tải trực tiếp từ phần mềm lương hoặc cổng nhân viên. Điểm BÁO của Bước 0 (máy in PDF, chữ vẽ bằng nét…) vẫn ghi một dòng `[Tệp gốc]` ở Cần thông báo; Kết luận vẫn là `KHÔNG ĐỌC ĐƯỢC`.

### 2C. Kiểm tra số và ngày

`Gross` ở bảng dưới là nhãn tổng thu nhập ở dấu hiệu (6) của mục 1.

| Phép so | Đạt khi |
|---|---|
| Net pay | `Gross` − `Tax` − các khoản trừ (trước và sau thuế) + khoản cộng sau thuế (reimbursement, allowance không chịu thuế) = `Net pay`. Có `Total deductions` thì dùng dòng đó (đã gồm `Tax` thì không trừ `Tax` lần nữa). `Gross` in sau salary sacrifice (`Taxable gross`) thì không trừ salary sacrifice lần nữa. Superannuation do employer đóng KHÔNG trừ |
| Dòng thu nhập | tổng các dòng = `Gross`; từng dòng giờ × rate = số tiền |
| YTD | YTD Gross, YTD Tax, YTD Net đều ≥ số của kỳ |
| Ngày | ngày đầu kỳ ≤ ngày cuối kỳ; `Pay date` không trước ngày đầu kỳ |

- Phép so không đạt (số tiền lệch quá $1), kể cả Net pay → `[Lệch số liệu]` theo mẫu chung; phép so Ngày ghi các ngày in thay cho số chênh. Không DỪNG `[Số liệu]`: payslip thật có thể có khoản điều chỉnh, back pay in ngoài bảng.
- Không rõ một khoản thuộc nhóm nào → bỏ phép so đó, Ghi chú "chưa đối chiếu được <phép so>: không rõ nhóm của <khoản>".
- Ngày tài liệu của payslip là `Pay date` (không có thì ngày cuối kỳ).
- Chỉ Ghi chú: độ dài kỳ khác tần suất in (weekly 7 ngày, fortnightly 14 ngày, monthly 1 tháng); `Pay date` sau ngày cuối kỳ hơn 31 ngày; ngày cuối kỳ sau hôm nay mà `Pay date` không sau hôm nay (trả lương giữa kỳ).

## 3. Ghi vào Fact Find

| Loại | Trường | Không có thì ghi |
|---|---|---|
| Payslip | Employer ABN: ABN như in, kèm kết quả tra "(ABN Lookup <ngày tra>: <tên pháp nhân>, <trạng thái ABN>)" | "không có trên payslip" (tìm theo tên: "Tra ABN" dưới đây) |
| Payslip | Employer address | "không có trên payslip" |
| Payslip | Employer phone no. | "không có trên payslip" |
| Payslip | Salary Sacrifice / Packaging / Deductions before tax (tên khoản và số tiền của kỳ) | "không có trên payslip" |

Net pay, kỳ, Pay date không vào Fact Find; ghi ở dòng "Dữ kiện để đối chiếu" (mục 5).

**Tra ABN** (ABN Lookup; SKILL.md 5.5). Mỗi employer trong lô tra một lần; các payslip cùng ABN dùng chung kết quả.
- Payslip in ABN: `guroos_abn_lookup(abn=<ABN như in>, name_to_match=<tên employer như in ở đầu trang>)`.
- Không in ABN: `guroos_abn_search(name=<tên employer>)`. Đúng một ứng viên (không tính dòng "tên cũ"): tra ứng viên đó như trên; KHỚP thì Fact Find ghi "<ABN> (không in trên payslip; ABN Lookup theo tên, <ngày tra>: <tên pháp nhân>, <trạng thái ABN>)". Nhiều ứng viên, không có, hoặc KHÁC: Fact Find "không có trên payslip", "Chưa kiểm tra được: Employer ABN: <N> ứng viên trên ABN Lookup, chưa chọn" (không có ứng viên: "không tìm thấy theo tên"); không tự chọn.
- "Trạng thái ABN" không phải Active hay Cancelled: "Chưa kiểm tra được: trạng thái ABN", kèm link ABR tool đưa.
- "Lưu ý thẩm định" của tool (không đăng ký GST; Active có hiệu lực dưới 12 tháng; cá nhân kinh doanh) → Ghi chú, giữ đúng ý tool. ABR chỉ có bang và postcode: địa chỉ, số điện thoại employer lấy từ payslip.

## 4. Cần thông báo

| Điều kiện | Nhãn | Bằng chứng an toàn | Việc cần làm |
|---|---|---|---|
| Tên Employee không khớp Applicant nào | Sai tên | hai tên nguyên văn, khác ở đâu | báo nhân viên xem xét |
| Có Salary Sacrifice, Salary Packaging, khoản trừ trước thuế (pre-tax deduction, RESC), novated lease; kể cả khoản mang tên nhà cung cấp salary packaging, khoản có chữ `Pre Tax` / `Pre-Tax` / `Bef.Tax`, phí packaging trừ trước thuế | Salary sacrifice | tên khoản và số tiền như in | xin khách Statement hoặc Employment Letter / Contract |
| Payslip MỚI NHẤT của bộ quá 30 ngày, tính từ Pay date (không có thì ngày cuối kỳ) | Quá 30 ngày | Pay date và hôm nay theo tool | báo nhân viên xem xét |
| Các payslip trong bộ không liên tiếp | Không liên tiếp | các dòng "Khoảng hở" của tool | báo nhân viên xem xét |
| Hai payslip liền kỳ, cùng năm tài chính, không có payslip xen giữa: YTD Gross sau − YTD Gross trước lệch Gross kỳ sau quá $1 | Lệch số liệu | hai YTD Gross và Gross như in | báo nhân viên xem xét |
| Có điểm BÁO ở Bước 0 | Tệp gốc | nhóm nguồn, tên phần mềm, nhãn trong khối | xác minh với employer hoặc xin bản gốc |
| Payslip in TFN (dòng "Mã số" của khối, trang có `[đã che TFN]` hoặc TFN thấy trên ảnh) | TFN | số trang | che TFN trước khi lưu hoặc gửi đi |
| ABN Lookup: trạng thái ABN của employer là Cancelled | ABN đã huỷ | ABN, ngày huỷ theo tool | báo nhân viên xem xét |
| ABN Lookup: "ABR không có bản ghi" cho ABN in trên payslip | Không tìm thấy | ABN như in | xem lại số ABN trên payslip với khách |
| ABN Lookup vẫn báo ABN không hợp lệ sau khi đọc lại (số đọc từ ảnh, trang scan) | ABN không hợp lệ | ABN như đọc được | xem lại số ABN trên payslip với khách |
| ABN Lookup: "Đối chiếu tên" là KHÁC | Sai tên doanh nghiệp | tên employer trên payslip và tên ABR (pháp nhân, tên thương mại) nguyên văn | báo nhân viên xem xét |

**Theo bộ.** Ở bước 6 (`references/cross-checks.md` bảng 1), gọi một lần cho cả bộ:
`guroos_date_check(document_date=<Pay date payslip mới nhất>, max_age_days=30, periods=[<kỳ của từng payslip>])`
- Kỳ in ngược (ngày đầu sau ngày cuối) không đưa vào `periods`, vì tool trả lỗi cho cả lần gọi. Khi đó ghi "Chưa kiểm tra được: tính liên tiếp: kỳ in ngược ở <tệp>".
- Ba dòng theo bộ (Quá 30 ngày, Không liên tiếp, YTD) chỉ ghi ở khối payslip mới nhất. Khối khác ghi Ghi chú "xét theo bộ ở khối <tệp mới nhất>".
- Có payslip chỉ in ngày cuối kỳ: không tự tính ngày đầu; gọi không có `periods` (bỏ một kỳ sẽ thành khoảng hở giả) và ghi "Chưa kiểm tra được: tính liên tiếp: <tệp> chỉ in ngày cuối kỳ".
- Cả bộ chỉ có một payslip: "Chưa kiểm tra được: tính liên tiếp: chỉ có một payslip".

Chỉ ghi chú khi:
- Superannuation do employer đóng (Superannuation Guarantee): không phải salary sacrifice.
- Khoản trừ sau thuế (union fee, after-tax super, child support…): ghi tên và số tiền; không phải Deductions before tax.
- Hai payslip trùng kỳ, khác số liệu (có thể là payslip bổ sung, off-cycle): ghi cả hai.
- Employer trùng pháp nhân người dùng nêu trong chat: Applicant nhận lương từ công ty của mình.

## 5. Lưu ý riêng

- **Bộ payslip** = mọi payslip cùng Employee và cùng employer (so ABN; không có ABN thì so tên) trong lô, kể cả nhiều payslip trong một tệp. Làm hai nơi = hai bộ, xét riêng.
- **Trùng tệp.** Hai tệp cùng nội dung (cùng kỳ, cùng số liệu, cùng thông tin tệp): Ghi chú "trùng tệp <tên>" ở cả hai khối, chỉ tính một lần trong bộ.
- Payslip `KHÔNG HỢP LỆ` không vào bộ. Khối payslip mới nhất ghi Ghi chú "<tệp> không tính vào bộ (KHÔNG HỢP LỆ)".
- "Dữ kiện để đối chiếu" gồm, nếu có in: Employee · employer, ABN và trạng thái ABN theo ABN Lookup · kỳ (tần suất) · Pay date · Gross · Net pay · YTD Gross · tài khoản nhận lương (4 số cuối).

## 6. Ví dụ

Dữ liệu giả. Hôm nay 11/10/2026 (theo `guroos_date_check`). Applicant: Thi Mai Tran.

**Hai payslip liên tiếp, có salary sacrifice.** Khối kiểm tra của cả hai tệp: `Phần mềm tạo tệp: Producer "SamplePay PDF"; Creator trống.`, `Nhóm nguồn: chưa biết.`, `Mã số (không hiện số): ABN 1 lần (trang 1), 1 số khác nhau, số kiểm tra đúng.`, hai mục dấu hiệu "không có.", Ghi chú kỹ thuật `Phần mềm tạo tệp chưa có trong danh sách đã biết.` payslip_1.pdf: kỳ 31/08–13/09/2026, Pay date 16/09/2026, YTD Gross $18,000.00. payslip_2.pdf: kỳ 14/09–27/09/2026, Pay date 30/09/2026, Gross $3,000.00, Salary sacrifice super $200.00, Tax $650.00, Net pay $2,150.00, Superannuation $360.00, YTD Gross $21,000.00. Tool: `Ngày tài liệu: 30/09/2026 → 11 ngày → TRONG 30 ngày`, `Gộp: liền mạch, không có khoảng hở`. `guroos_abn_lookup(abn=…, name_to_match="Sample Logistics Pty Ltd")`: `Doanh nghiệp: SAMPLE LOGISTICS PTY LTD`, `Trạng thái ABN: Đang hoạt động (Active) từ 01/07/2015`, `GST: đăng ký từ 01/07/2015`, `Đối chiếu tên "Sample Logistics Pty Ltd" (…): KHỚP tên pháp nhân "SAMPLE LOGISTICS PTY LTD".`

```
### payslip_2.pdf — Payslip (rule 12) · chắc chắn
Kết luận: CẦN XỬ LÝ
Kiểm tra tệp gốc: đạt (nguồn: chưa biết) · quy tắc: references/payslip.md
Ghi vào Fact Find
- Employer ABN: <11 số như in> (ABN Lookup 11/10/2026: SAMPLE LOGISTICS PTY LTD, đang hoạt động từ 01/07/2015)
- Employer address: 1 Sample Street, Sampleton VIC 3000
- Employer phone no.: không có trên payslip
- Salary Sacrifice / Packaging / Deductions before tax: Salary sacrifice super $200.00
Cần thông báo
- [Salary sacrifice] "Salary sacrifice super $200.00" → xin khách Statement hoặc Employment Letter / Contract.
Chưa kiểm tra được
- Không có
Ghi chú
- Nguồn chưa biết (Producer "SamplePay PDF"). Phần mềm tạo tệp chưa có trong danh sách đã biết.
- $3,000.00 − $200.00 − $650.00 = Net pay $2,150.00: khớp.
- Bộ 2 payslip: kỳ 31/08/2026–27/09/2026 liền mạch; YTD Gross $21,000.00 − $18,000.00 = Gross $3,000.00. Pay date 30/09/2026, hôm nay 11/10/2026: TRONG 30 ngày (theo tool).
- Superannuation $360.00 do employer đóng, không phải salary sacrifice.
- ABN Lookup: tên employer khớp tên pháp nhân; GST đăng ký từ 01/07/2015.
Dữ kiện để đối chiếu: Employee Thi Mai Tran · Sample Logistics Pty Ltd, ABN đúng số kiểm tra, đang hoạt động (ABN Lookup) · kỳ 14/09–27/09/2026 (fortnightly) · Pay date 30/09/2026 · Gross $3,000.00 · Net pay $2,150.00 · YTD Gross $21,000.00 · tài khoản nhận …4821
```

payslip_1.pdf có khối riêng: cùng trường Fact Find, cùng dòng `[Salary sacrifice]`, Ghi chú "xét theo bộ ở khối payslip_2.pdf".
