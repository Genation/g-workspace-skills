# Nguồn quy tắc và các điểm bổ sung

Dành cho người bảo trì kỹ năng. Trợ lý không cần đọc tệp này khi kiểm tra giấy tờ.

## Nguồn

"Checklist - Documents & Verification" của Guroos:

| Mục trong checklist | Phần trong SKILL.md |
|---|---|
| 4) Driver Licence, Proof of Age Card, ID card | A |
| 5) Australia Passport | B |
| 6) Non-Australia Passport | C |
| 7) Medicare | D |
| 8) Visa, VEVO | E |

Mọi dòng "Ghi vào Fact Find" và "Thông báo khi" lấy nguyên từ checklist, trừ các điểm dưới đây.

## Bổ sung ngoài checklist (chờ Guroos xác nhận)

| # | Điểm bổ sung | Lý do | Nếu Guroos không đồng ý |
|---|---|---|---|
| 1 | Dấu hiệu nhận diện từng loại (Bước 1) | Checklist chỉ nói làm gì khi đã biết loại, không nói cách nhận ra loại | Sửa bảng ở Bước 1 |
| 2 | So tên chặt: thiếu tên đệm, viết tắt cũng là "khác"; chỉ bỏ qua hoa/thường, dấu, thứ tự, và viết liền/rời/gạch nối (WEIJIE = Wei Jie) | Checklist chỉ ghi "different" | Nới hoặc siết quy tắc ở "Quy tắc đối chiếu" |
| 3 | So địa chỉ: bỏ qua viết tắt và dấu câu | Checklist chỉ ghi "different" | Sửa "Quy tắc đối chiếu" |
| 4 | Hộ chiếu Úc hết hạn chưa quá 2 năm: ghi chú, không thông báo | Checklist chỉ nói trường hợp quá 2 năm | Đổi thành thông báo |
| 5 | Hộ chiếu nước ngoài: không xin visa nếu Visa/VEVO đã gửi kèm cùng lượt | Checklist ghi "xin visa" vô điều kiện; xin lại thứ khách vừa gửi là thừa | Bỏ ngoại lệ ở phần C |
| 6 | Visa không còn "In Effect" hoặc đã qua hạn: thông báo | Checklist ghi "Active Visa" nhưng không nói khi visa hết hiệu lực | Bỏ dòng thông báo ở phần E |
| 7 | Cách xếp Bridging / Temporary / Permanent theo chữ trên giấy tờ | Checklist không định nghĩa "Temporary or Bridging" | Thay bằng danh sách subclass của Guroos |
| 8 | Medicare "VALID TO MM/YYYY" tính đến hết tháng; thẻ nhiều người lấy dòng của Applicant | Checklist không nói | Sửa phần D |
| 9 | Bốn mức Kết luận (ĐẠT / CẦN XỬ LÝ / CHƯA ĐỦ THÔNG TIN / KHÔNG ĐỌC ĐƯỢC) | Checklist chỉ nhắc trạng thái "rejected" | Đổi tên theo trạng thái của Document module |
| 10 | Không chép ngày sinh, số Medicare, dòng máy đọc vào báo cáo | Checklist không yêu cầu các trường này; giảm dữ liệu cá nhân lộ ra | Thêm trường vào Bước 2 |

## Khi nối với Document module và Noti module

Hiện kỹ năng chỉ báo cáo trong cuộc trò chuyện. Khi có công cụ ghi tài liệu và thông báo:

- "Kết luận" → `status` của tài liệu; "Cần thông báo" → nội dung thông báo; "Ghi vào Fact Find" → dữ liệu trích.
- Thêm vào mục "Giới hạn và an toàn" của SKILL.md tên công cụ và thời điểm được gọi.
