# Ví dụ đã làm sẵn

Dữ liệu trong các ví dụ là giả. Cả bốn ví dụ dùng chung:

- Hôm nay: 06/10/2026
- Applicant Name: Thi Mai Tran
- Applicant's Address: 3/12 Station Street, Footscray VIC 3011

## 1. Bằng lái hết hạn, thiếu tên đệm, địa chỉ khớp

Nội dung đọc được: "Driver Licence · Victoria · TRAN, Mai · Licence No. 012345678 · Unit 3, 12 Station St, FOOTSCRAY VIC 3011 · Expiry 03-02-2026 · Licence type C".

```
### licence-front.jpg — Driver Licence (chắc chắn)
Kết luận: CẦN XỬ LÝ

Ghi vào Fact Find
- Licence No.: 012345678
- Name on document: TRAN, Mai
- Expiry Date: 03/02/2026

Cần thông báo
- [Hết hạn] Expiry Date 03/02/2026, hôm nay 06/10/2026 → xin khách giấy tờ còn hạn hoặc giấy tờ thay thế.
- [Sai tên] Giấy tờ ghi "TRAN, Mai", Fact Find ghi "Thi Mai Tran": thiếu tên đệm "Thi" → chuẩn bị Statutory Declaration / Name Change Certificate.

Chưa kiểm tra được
- Không có

Ghi chú
- Địa chỉ khớp Fact Find ("Unit 3, 12 Station St" = "3/12 Station Street").
```

## 2. Hộ chiếu Úc hết hạn chưa quá 2 năm

Nội dung đọc được: "AUSTRALIA · PASSPORT · Document No. PA1234567 · TRAN · THI MAI · Date of expiry 15 AUG 2025 · P<AUSTRAN<<THI<MAI…".

Mốc 2 năm: 15/08/2025 + 2 năm = 15/08/2027, sau hôm nay, nên không thông báo.

```
### passport.pdf — Australian Passport (chắc chắn)
Kết luận: ĐẠT

Ghi vào Fact Find
- Document No.: PA1234567
- Name on document: TRAN, THI MAI
- Expiry Date: 15/08/2025

Cần thông báo
- Không có

Chưa kiểm tra được
- Không có

Ghi chú
- Hộ chiếu hết hạn từ 15/08/2025; chưa quá 2 năm (mốc 15/08/2027), hôm nay 06/10/2026.
```

## 3. Hộ chiếu nước ngoài gửi kèm VEVO (visa tạm thời)

Một thư có hai tệp của cùng một người.

```
### vn-passport.jpg — Non-Australian Passport (chắc chắn)
Kết luận: ĐẠT

Ghi vào Fact Find
- Document No.: C1234567
- Name on document: TRAN THI MAI
- Expiry Date: 20/11/2031

Cần thông báo
- Không có

Chưa kiểm tra được
- Không có

Ghi chú
- Đã có visa kèm theo (vevo.pdf), không cần xin thêm visa.

### vevo.pdf — VEVO (chắc chắn)
Kết luận: CẦN XỬ LÝ

Ghi vào Fact Find
- Active Visa subclass: 485
- Visa type: Temporary Graduate - Temporary
- Name on document: TRAN, Thi Mai

Cần thông báo
- [Visa] Visa Temporary (subclass 485, Visa expiry date 12/03/2028, hôm nay 06/10/2026) → kiểm tra lender có chấp nhận loại visa này không.

Chưa kiểm tra được
- Không có

Ghi chú
- Visa status: In Effect.
```

Dòng tổng: "2 giấy tờ: 1 đạt, 1 cần xử lý."

## 4. Chưa có thông tin người vay

Người dùng chỉ nói "kiểm tra thẻ Medicare này", chưa cho biết Applicant Name. Thẻ ghi hai người.

```
### medicare.png — Medicare Card (chắc chắn)
Kết luận: CHƯA ĐỦ THÔNG TIN

Ghi vào Fact Find
- Name on document: chưa xác định (thẻ ghi 2 người: "1 THI MAI TRAN", "2 VAN AN LE")
- Expiry Date: 08/2027 (còn hạn đến hết 31/08/2027; hôm nay 06/10/2026)

Cần thông báo
- Không có

Chưa kiểm tra được
- Tên: chưa có Applicant Name trên Fact Find để chọn đúng dòng và đối chiếu.

Ghi chú
- Không có
```

Câu hỏi cuối: "Người vay trong hồ sơ này tên gì trên Fact Find?"
