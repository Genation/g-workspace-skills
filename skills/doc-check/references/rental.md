# Thuê nhà: Rental Statement, Rental Agreement, Rental Appraisal, Airbnb (rule 14–16)

## Phạm vi

| Loại | Rule | Đọc trước (`guroos_document_read` với `pages`) |
|---|---|---|
| Rental Statement: Owner / Ownership / Rental Statement, EOFY statement của agency | 14 | Trang 1 (đầu trang, kỳ, bảng tổng). Trang chi tiết chỉ khi cần cho 2C. |
| Rental Agreement: Residential Tenancy / Rental Agreement, Lease | 15 | Trang 1–3 (các bên, địa chỉ, thời hạn, tiền thuê), rồi 1–2 trang cuối (chữ ký). Chưa thấy tiền thuê hay các bên thì đọc phần Schedule / Item. |
| Rental Appraisal / Rental Estimate của agency | 16 | Trang 1. |
| Airbnb Rental Statement: Earnings, Transaction history, Payouts | 16 | Trang có tổng (đầu hoặc cuối), danh sách payout khi cần cho 2C. |

Stayz, Booking.com: xử lý như Airbnb, ghi "chưa chắc: nền tảng <tên>".

**Trang scan** đến dạng ảnh trang (SKILL.md): đọc các bên, tiền thuê, chữ ký trên ảnh như trang thường. Vài trang chưa có ảnh ("ảnh scan chưa gửi", "không có lớp chữ; <lý do>"): các trang đó vào "Chưa kiểm tra được", không kết luận dòng ký để trống.

Ngoài phạm vi: Tenant ledger (lịch sử trả tiền của người thuê, không có phí và số trả owner); Management Agreement / Agency Authority (không có Tenant); Rental application; Bond lodgement form; Sales appraisal, CMA (giá bán); ước tính trên website không có đầu trang agency; biên nhận đặt phòng mà Applicant là khách.

## 1. Dấu hiệu cấu trúc bắt buộc

| Loại | Dấu hiệu bắt buộc |
|---|---|
| Rental Statement | (1) đầu trang agency quản lý nhà (tên, địa chỉ hoặc ABN / licence); (2) tiêu đề statement kèm kỳ hoặc statement date; (3) tên owner và địa chỉ nhà cho thuê; (4) bảng tiền có Rent received, phí (Management fee, Letting fee…) và số trả owner (Paid / EFT / Net to owner) |
| Rental Agreement | (1) tiêu đề hợp đồng thuê; (2) các bên: Landlord / Lessor / Rental provider và Tenant / Lessee / Renter; (3) địa chỉ nhà thuê; (4) thời hạn: ngày bắt đầu, ngày kết thúc hoặc periodic; (5) tiền thuê kèm kỳ trả; (6) điều khoản đánh số và phần ký |
| Rental Appraisal | (1) đầu trang agency; (2) tiêu đề Rental Appraisal / Estimate / Market rent; (3) địa chỉ nhà; (4) giá thuê ước tính (một mức hoặc khoảng) kèm kỳ; (5) ngày và tên property manager / agent |
| Airbnb Rental Statement | (1) Airbnb; (2) tiêu đề Earnings / Transaction history / Payouts; (3) Host và khoảng ngày; (4) bảng đặt phòng hoặc payout có số tiền, Host service fee và tổng (Total paid out, Gross earnings) |

## 2. Bước 0 của nhóm

### 2A. Nguồn tệp

| Loại | BÁO khi Nhóm nguồn là | Lý do |
|---|---|---|
| Rental Statement | công cụ thiết kế; trình sửa/xử lý PDF; không phải PDF (DOCX, XLSX…) | statement do phần mềm quản lý nhà xuất, không làm bằng công cụ thiết kế |
| Rental Agreement, Rental Appraisal | trình sửa/xử lý PDF; không phải PDF | agency hay soạn hợp đồng bằng Word, appraisal bằng Canva |
| Airbnb Rental Statement | công cụ văn phòng; công cụ thiết kế; trình sửa/xử lý PDF; không phải PDF | Airbnb không phát hành bằng Word/Canva |

Ảnh (JPG/PNG): GHI CHÚ; khối kiểm tra ảnh chỉ thêm 5.2 và `[Sửa ảnh]` (2B).

### 2B. Dấu hiệu xét theo loại (cả bốn loại)

| Nhãn | Xử lý |
|---|---|
| [Che chữ] | DỪNG |
| [Sửa nội dung], [Sửa ảnh] | BÁO. Lưu thêm chỉ để ký tay, ký số hay highlight là dòng "Ghi chú kỹ thuật", không mang nhãn này |
| [Ảnh chụp/scan], [Chữ vẽ bằng nét] | GHI CHÚ |

### 2C. Kiểm tra số và ngày

Sai số $1; lệch thì `[Lệch số liệu]`. Không tự tính lại % phí hay GST.
- **Rental Statement:** tổng các dòng tiền thuê = tổng thu in; tổng thu − tổng phí và chi = số trả owner; có Opening và Closing balance thì Opening + thu − chi − trả owner = Closing.
- **Airbnb:** tổng các payout = tổng in; Gross earnings − Host service fee − điều chỉnh in trên tài liệu = Total paid out.
- **Ngày** (`guroos_date_check`):
  - Statement, Appraisal, Airbnb: `document_date=<statement date / Date of issue / ngày lập; không có thì ngày cuối kỳ>`, `max_age_days=30`.
  - Agreement: `document_date=<ngày ký>` chỉ để xét ngày trong tương lai, bỏ qua "QUÁ"/"TRONG" 30 ngày (Agreement không có quy tắc 30 ngày); `expiry_date=<ngày kết thúc>` chỉ để ghi chú. Ngày bắt đầu thuê sau hôm nay là bình thường.

## 3. Ghi vào Fact Find

| Loại | `Rent amount` |
|---|---|
| Rental Statement | Rent received (trước phí) và kỳ statement; thêm mức thuê nếu có in (ví dụ "$620.00 per week") |
| Rental Agreement | số tiền và kỳ trả (per week / fortnight / month / calendar month) |
| Rental Appraisal | mức hoặc khoảng ước tính và kỳ |
| Airbnb Rental Statement | tổng payout / earnings và khoảng ngày |

Không in thì ghi "không có trên tài liệu". Statement nhiều nhà: một dòng cho mỗi địa chỉ.

## 4. Cần thông báo

| Điều kiện | Nhãn | Bằng chứng an toàn | Việc cần làm |
|---|---|---|---|
| Statement, Airbnb: tài liệu mới nhất của bộ QUÁ 30 ngày. Appraisal: xét từng tài liệu | [Quá 30 ngày] | loại ngày, ngày tài liệu, hôm nay | báo nhân viên xem xét |
| Agreement: tên ở bên của Applicant KHÁC Applicant | [Sai tên] | hai tên nguyên văn, khác ở đâu | báo nhân viên xem xét |
| Agreement: không Applicant nào ở bên Landlord hay Tenant | [Sai tên] | tên các bên trên hợp đồng | báo nhân viên xem xét |
| Appraisal: chủ nhà / owner KHÁC Applicant; Airbnb: Host KHÁC Applicant | [Sai tên] | hai tên nguyên văn | báo nhân viên xem xét |
| Bước 0 ra BÁO (2A, 2B) | [Tệp gốc] | dòng của khối | xác minh với nơi phát hành (agency, Airbnb) hoặc xin bản gốc |

**Bộ** = Rental Statement cùng địa chỉ nhà; Airbnb cùng Host và listing. Quy tắc 30 ngày của bộ chỉ xét tài liệu mới nhất và ghi MỘT lần ở khối của nó; khối cũ hơn ghi Ghi chú "xét theo bộ ở khối <tệp>".

Chỉ ghi chú:
- Rental Statement có tên owner khác Applicant (rule 14 không có dòng về tên): ghi hai tên.
- Agreement: Applicant là Landlord hay Tenant; không so tên bên còn lại. Applicant là Tenant thì Rent amount là tiền thuê phải trả.
- Agreement HẾT HẠN theo tool (có thể đã chuyển periodic).
- Agreement có dòng ký để trống.

Ghi "Chưa kiểm tra được":
- Agreement không rõ Applicant ở bên nào (ví dụ chỉ in "c/- <agency> as agent for the landlord") → "bên của Applicant".
- Appraisal không in tên chủ nhà → "tên chủ nhà: tài liệu không in".

## 5. Lưu ý riêng

- **Vai trò:** Landlord = Lessor = Rental provider (VIC) = Owner; Tenant = Lessee = Renter (VIC). Managing agent / Landlord's agent không phải Landlord.
- **Bên của Applicant:** bên có tên trùng hoặc gần trùng một Applicant (cùng họ, có tên chung), hay bên mà hồ sơ cho biết (nhà của Applicant cho thuê → Landlord). Không đoán.
- **Nhiều người:** so từng Applicant. Một Applicant ở đúng bên là đủ; Applicant khác vắng tên, hay người cùng đứng tên không phải Applicant → Ghi chú. Bên là company / trust ("<tên> Pty Ltd ATF <tên> Trust"): so tên pháp lý với entity của hồ sơ.
- **Nhà đang mua:** appraisal có thể gửi cho người bán hoặc không gửi ai. Vẫn theo mục 4, ghi chú "có thể là nhà đang mua".
- **Dữ kiện để đối chiếu** (cho `references/cross-checks.md`): mức thuê và kỳ, địa chỉ nhà, Applicant là Landlord hay Tenant, kỳ statement, tổng thu, số trả owner, Host.

## 6. Ví dụ

Dữ liệu giả. Hôm nay 11/10/2026; Applicant: Thi Mai Tran.

lease.pdf 14 trang, đọc trang 1–3 và 13–14. Khối: "Nhóm nguồn: công cụ văn phòng (Microsoft Office, theo Creator gốc).", dưới "Dấu hiệu xét theo loại tài liệu:" có "- [Sửa nội dung] Tệp được lưu thêm 1 lần sau khi tạo và lần lưu sau viết thêm chữ vào nội dung trang.", Ghi chú kỹ thuật "- 2 nét vẽ/chú thích thêm ở chỗ trống (Ink) trang 14, ví dụ chữ ký tay.". Nội dung: "Residential Rental Agreement · Rental provider: Mai Tran, c/- Sample Realty · Renter: Jordan Sample · 12 Sample Street, Sampleton VIC 3000 · Rent $620.00 per week · 01/11/2025 to 31/10/2026 · trang 14: hai bên ký ngày 20/10/2025". `guroos_date_check(document_date=20/10/2025, expiry_date=31/10/2026)` → "Hạn: 31/10/2026 → CÒN HẠN (còn 20 ngày)"; ngày ký không ở tương lai.

```
### lease.pdf — Rental Agreement (rule 15) · chắc chắn
Kết luận: CẦN XỬ LÝ
Kiểm tra tệp gốc: đạt (nguồn: công cụ văn phòng (Microsoft Office, theo Creator gốc)) · quy tắc: references/rental.md
Ghi vào Fact Find
- Rent amount: $620.00 per week
Cần thông báo
- [Tệp gốc] [Sửa nội dung] Tệp được lưu thêm 1 lần sau khi tạo và lần lưu sau viết thêm chữ vào nội dung trang. → xác minh với Sample Realty hoặc xin bản gốc.
- [Sai tên] Rental provider "Mai Tran", Applicant "Thi Mai Tran": thiếu tên "Thi" → báo nhân viên xem xét.
Chưa kiểm tra được
- Không có
Ghi chú
- Nguồn công cụ văn phòng (Microsoft Office).
- 2 nét vẽ/chú thích thêm ở chỗ trống (Ink) trang 14, ví dụ chữ ký tay.
- Applicant ở bên Rental provider (Landlord): cùng họ, có tên chung; không so tên Renter.
- Hợp đồng đến 31/10/2026, còn hạn theo tool.
Dữ kiện để đối chiếu: Rent $620.00 per week · Applicant là Landlord · thời hạn 01/11/2025–31/10/2026 · 12 Sample Street, Sampleton VIC 3000
```
