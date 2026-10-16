# Ví dụ đã làm sẵn

Dữ liệu giả. Ba ví dụ nối tiếp nhau, cùng hồ sơ có thư mục `Hai Vo & Linh Le_REFI INV (Higgs St)_Move Bank`, viết tắt là `<HS>` dưới đây; khi gọi công cụ luôn dùng nguyên văn tên thư mục. Tên công cụ viết gọn, bỏ tiền tố `genation-workspace_`.

## 1. mail-intake lưu 2 tệp từ 1 thư

mail-intake đã lưu `payslip_sep.pdf` và `licence.jpg` vào `tmp/` của `<HS>` từ thư "Payslips and ID" của Hai Vo, và đã ghi định danh.

Câu nói trước khi ghi: "Tôi sẽ lưu lại lịch sử làm việc: 2 tệp và 1 thư của hồ sơ Hai Vo & Linh Le."

| # | Lệnh gọi | Ghi chú |
|---|---|---|
| 1 | `documents_list(customerFolder=<HS>, limit=100)` | trả về rỗng |
| 2 | `mail_list(customerFolder=<HS>, limit=100)` | trả về rỗng |
| 3 | `processing_start(customerFolder=<HS>, input="Tiếp nhận thư mới")` | ứng dụng hỏi người dùng, người dùng đồng ý; nhận `id` = R1 |
| 4 | `documents_record(runId=R1, customerFolder=<HS>, path="tmp/payslip_sep.pdf", documentType="chưa phân loại")` | để `pending` |
| 5 | `documents_record(runId=R1, customerFolder=<HS>, path="tmp/licence.jpg", documentType="chưa phân loại")` | để `pending` |
| 6 | `mail_record(runId=R1, customerFolder=<HS>, subject="Payslips and ID", direction="inbound", emailType="customer", status="processed")` | |
| 7 | `processing_update_status(id=R1, status="completed", output="2 tệp đã lưu vào tmp/; 1 thư khách hàng")` | |

7 lệnh gọi. Không gọi `documents_update_status`, vì tệp chưa kiểm tra vẫn là `pending`.

Dòng cuối báo cáo: "Lịch sử làm việc: đã lưu 2 tài liệu, 1 thư."

## 2. doc-check kiểm tra 2 tệp đó trong cùng cuộc trò chuyện

Người dùng đính kèm `1. payslip_sep.pdf` và `2. licence.jpg` từ `tmp/` và nhờ kiểm tra. doc-check kết luận payslip `CẦN XỬ LÝ` (rule 12). Ảnh bằng lái mờ, không đọc được: `KHÔNG ĐỌC ĐƯỢC`. Thư mục `<HS>` đã biết từ ví dụ 1, trong cùng cuộc trò chuyện.

Không gọi lại `documents_list`: đã xem ở ví dụ 1 và biết 2 bản ghi `pending` vừa tạo (D1 cho payslip, D2 cho bằng lái). Bỏ số thứ tự đầu tên tệp đính kèm thì khớp tên với 2 bản ghi đó. Không có thư cần ghi, nên không gọi `mail_list`.

| # | Lệnh gọi | Ghi chú |
|---|---|---|
| 1 | `processing_start(customerFolder=<HS>, input="Kiểm tra 2 giấy tờ")` | không hỏi lại: đã đồng ý cho cả cuộc trò chuyện; nhận R2 |
| 2 | `documents_update_status(id=D1, status="processed")` | `CẦN XỬ LÝ` vẫn là `processed` |
| 3 | `documents_update_status(id=D2, status="failed", reason="Ảnh mờ, không đọc được; cần bản rõ hơn")` | gửi thông báo cho người dùng |
| 4 | `processing_update_status(id=R2, status="completed", output="1 tài liệu đã kiểm tra (cần xử lý); 1 tài liệu không đọc được")` | |

4 lệnh gọi, không tạo bản ghi tài liệu mới. Lượt R2 không gắn với D1, D2 (bản ghi tạo ở lượt R1); đây là giới hạn của máy chủ, không cần ghi bù.

Dòng cuối báo cáo: "Lịch sử làm việc: đã lưu kết quả 2 tài liệu."

## 3. Cuộc trò chuyện mới, kiểm tra lại payslip

Hôm sau, ở cuộc trò chuyện khác, người dùng gõ tên thư mục `<HS>` và nhờ kiểm tra lại `payslip_sep.pdf`. Kết luận vẫn `CẦN XỬ LÝ`.

| # | Lệnh gọi | Ghi chú |
|---|---|---|
| 1 | `documents_list(customerFolder=<HS>, limit=100)` | thấy `tmp/payslip_sep.pdf` đã `processed` |

Cùng trạng thái: không mở lượt, không ghi gì. 1 lệnh gọi.

Dòng cuối báo cáo: "Lịch sử làm việc: đã có sẵn."

## Không ghi

- Người dùng chỉ đính kèm payslip và nhờ kiểm tra, không nêu thư mục, và cuộc trò chuyện chưa có thư mục nào: không gọi công cụ nào. Dòng cuối: "Chưa lưu lịch sử làm việc: chưa biết thư mục hồ sơ."
- mail-intake chỉ thấy thư chung, hoặc thư chưa xác định được hồ sơ: không ghi.
- Người dùng bấm "Không lưu" ở lệnh ghi đầu tiên. Dòng cuối: "Chưa lưu lịch sử làm việc: người dùng không đồng ý."
