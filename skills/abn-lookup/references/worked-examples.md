# Ví dụ đã làm sẵn

Dữ liệu doanh nghiệp trong ví dụ 2 và 3 là giả. Cả ba ví dụ dùng chung: hôm nay 12/10/2026.

## 1. ABN đang hoạt động, tên khớp

Người dùng: "Tra cứu ABN 51 824 753 556, tên trên tài liệu là Australian Taxation Office."

`guroos_abn_lookup` (abn = "51 824 753 556") trả về: Doanh nghiệp AUSTRALIAN TAXATION OFFICE · Loại hình Commonwealth Government Entity · Trạng thái ABN: Đang hoạt động (Active) từ 01/07/2000 · GST đăng ký từ 01/07/2000 · ACT 2600 · Tên thương mại: ATO.

```
### Australian Taxation Office
Kết luận: ĐẠT

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
Kết luận: CẦN XỬ LÝ

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

`guroos_abn_lookup` báo: "Chưa cấu hình ABN Lookup trên máy này (thiếu GUID của ABR)…".

```
### ABN 11 123 456 780
Kết luận: CHƯA ĐỦ THÔNG TIN

Cần thông báo
- Không có

Chưa kiểm tra được
- Tra ABN: ABN Lookup chưa được cấu hình trên máy này. Người dùng có thể tự tra tại https://abr.business.gov.au, hoặc nhờ người cài đặt ứng dụng cấu hình.

Ghi chú
- Không có
```

Không điền tên hay trạng thái từ trí nhớ, kể cả với doanh nghiệp nổi tiếng.
