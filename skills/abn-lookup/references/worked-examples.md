# Ví dụ đã làm sẵn

Dữ liệu doanh nghiệp trong ví dụ 2 đến 5 là giả. Mọi ví dụ dùng chung: hôm nay 12/10/2026.

## 1. ABN đang hoạt động, tên khớp

Người dùng: "Tra cứu ABN 51 824 753 556, tên trên tài liệu là Australian Taxation Office."

`guroos_abn_lookup` (abn = "51 824 753 556") trả về: Doanh nghiệp AUSTRALIAN TAXATION OFFICE · Loại hình Commonwealth Government Entity · Trạng thái ABN: Đang hoạt động (Active) từ 01/07/2000 · GST đăng ký từ 01/07/2000 · ACT 2600 · Tên thương mại: ATO.

```
### Australian Taxation Office
Thông tin doanh nghiệp (ABN Lookup, tra ngày 12/10/2026)
- Tên pháp nhân: AUSTRALIAN TAXATION OFFICE
- ABN: 51 824 753 556 · ACN: không có
- Loại hình: Commonwealth Government Entity
- Trạng thái ABN: Đang hoạt động từ 01/07/2000
- GST: đăng ký từ 01/07/2000
- Bang / postcode: ACT 2600
- Tên thương mại: ATO

Cần thông báo
- Không có

Chưa kiểm tra được
- Không có

Ghi chú
- Tên trên tài liệu "Australian Taxation Office" khớp tên pháp nhân.
```

## 2. ABN đã huỷ, tên trên payslip là tên thương mại

Payslip in "Sunrise Cafe · ABN 11 123 456 780". `guroos_abn_lookup` trả về: Doanh nghiệp SUNRISE HOLDINGS PTY LTD · ACN 123 456 780 · Australian Private Company · Trạng thái ABN: ĐÃ HUỶ (Cancelled) từ 30/06/2026 · không đăng ký GST · VIC 3000 · Tên thương mại: Sunrise Cafe.

```
### Sunrise Cafe
Thông tin doanh nghiệp (ABN Lookup, tra ngày 12/10/2026)
- Tên pháp nhân: SUNRISE HOLDINGS PTY LTD
- ABN: 11 123 456 780 · ACN: 123 456 780
- Loại hình: Australian Private Company
- Trạng thái ABN: Đã huỷ từ 30/06/2026
- GST: không đăng ký
- Bang / postcode: VIC 3000
- Tên thương mại: Sunrise Cafe

Cần thông báo
- [ABN đã huỷ] ABN 11 123 456 780 bị huỷ từ 30/06/2026 → báo nhân viên xem xét.

Chưa kiểm tra được
- Trạng thái đăng ký công ty với ASIC: ABR không có; cần ASIC Company Extract hoặc tra ACN 123 456 780 trên ASIC Connect.

Ghi chú
- Tên trên payslip "Sunrise Cafe" khớp tên thương mại.
- Không đăng ký GST.
```

ABN đã huỷ không có nghĩa là công ty đã giải thể; vì vậy trạng thái ASIC nằm ở "Chưa kiểm tra được".

## 3. Chưa cấu hình ABN Lookup

`guroos_abn_lookup` báo: "Chưa cấu hình ABN Lookup trên máy này (chưa có GUID của ABR). Hướng dẫn người dùng đăng ký miễn phí tại https://abr.business.gov.au/Tools/WebServices…".

```
### ABN 11 123 456 780
Cần thông báo
- Không có

Chưa kiểm tra được
- Tra ABN: chưa có GUID ABN Lookup. Đăng ký miễn phí tại https://abr.business.gov.au/Tools/WebServices, ABR gửi GUID qua email, rồi nhập ở Cài đặt → Tra cứu ABN (chỉ một lần). Trong lúc chờ có thể tự tra tại https://abr.business.gov.au.

Ghi chú
- Không có
```

Không điền tên hay trạng thái từ trí nhớ, kể cả với doanh nghiệp nổi tiếng.

## 4. Trust, tên trên tài liệu không có "The Trustee for"

Payslip in "Tran Family Trust · ABN 18 123 456 789". `guroos_abn_lookup` trả về: Doanh nghiệp The Trustee for TRAN FAMILY TRUST · Loại hình Discretionary Trading Trust · Trạng thái ABN: Đang hoạt động (Active) từ 01/07/2018 · GST đăng ký từ 01/07/2018 · NSW 2000 · không có tên thương mại.

```
### Tran Family Trust
Thông tin doanh nghiệp (ABN Lookup, tra ngày 12/10/2026)
- Tên pháp nhân: The Trustee for TRAN FAMILY TRUST
- ABN: 18 123 456 789 · ACN: không có
- Loại hình: Discretionary Trading Trust
- Trạng thái ABN: Đang hoạt động từ 01/07/2018
- GST: đăng ký từ 01/07/2018
- Bang / postcode: NSW 2000
- Tên thương mại: không có

Cần thông báo
- Không có

Chưa kiểm tra được
- Không có

Ghi chú
- Tên trên payslip "Tran Family Trust" khớp tên pháp nhân sau khi bỏ "The Trustee for".
- ABR không có tên trustee: chưa so được trustee.
```

## 5. Sole trader, tên trên tài liệu thiếu tên đệm

Hoá đơn in "Mai Tran · ABN 80 987 654 321". `guroos_abn_lookup` trả về: Doanh nghiệp TRAN, THI MAI · Loại hình Individual/Sole Trader · Trạng thái ABN: Đang hoạt động (Active) từ 15/03/2026 · không đăng ký GST · VIC 3170 · không có tên thương mại. Lưu ý thẩm định: Trạng thái Active mới có hiệu lực 211 ngày (dưới 12 tháng); Không đăng ký GST; Là cá nhân kinh doanh (sole trader).

```
### Mai Tran
Thông tin doanh nghiệp (ABN Lookup, tra ngày 12/10/2026)
- Tên pháp nhân: TRAN, THI MAI
- ABN: 80 987 654 321 · ACN: không có
- Loại hình: Individual/Sole Trader
- Trạng thái ABN: Đang hoạt động từ 15/03/2026
- GST: không đăng ký
- Bang / postcode: VIC 3170
- Tên thương mại: không có

Cần thông báo
- [Sai tên doanh nghiệp] Hoá đơn in "Mai Tran", ABR ghi "TRAN, THI MAI": thiếu tên đệm "Thi" → báo nhân viên xem xét.

Chưa kiểm tra được
- Không có

Ghi chú
- Trạng thái Active có hiệu lực từ 15/03/2026, dưới 12 tháng: có thể là ABN mới hoặc ABN cũ vừa hoạt động lại; xem lịch sử trên ABR trước khi kết luận.
- Không đăng ký GST.
- Cá nhân kinh doanh (sole trader): không có ACN, không đăng ký với ASIC.
```

Tên cá nhân so như tên người: đổi thứ tự từ không sao, nhưng thiếu tên đệm là KHÁC.
