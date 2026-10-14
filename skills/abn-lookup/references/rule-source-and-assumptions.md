# Nguồn quy tắc và các điểm bổ sung

Dành cho người bảo trì kỹ năng. Trợ lý không cần đọc tệp này khi tra cứu.

## Nguồn

- Công cụ `guroos_abn_lookup` và `guroos_abn_search` của ứng dụng Guroos (g-workspace-tauri, `host/src/mcp/abn-tools.ts`), đọc dữ liệu ABN Lookup của Australian Business Register (ABR). Các câu báo lỗi, dòng "Trạng thái ABN" và mục "Lưu ý thẩm định" do công cụ tạo; SKILL.md dựa vào đúng các câu đó. Đổi chữ trong công cụ thì xem lại mục "Công cụ" và Bước 1, Bước 2 của SKILL.md.
- Checklist "Documents & Verification" của Guroos chỉ ghi "(ABN lookup)" ở mục payslip; không có quy tắc riêng cho việc tra doanh nghiệp. Mọi quy tắc dưới đây là điểm bổ sung.

## Bổ sung ngoài checklist (chờ Guroos xác nhận)

| # | Điểm bổ sung | Lý do | Nếu Guroos không đồng ý |
|---|---|---|---|
| 1 | Bốn nhãn thông báo: ABN đã huỷ, Không tìm thấy, ABN không hợp lệ, Sai tên doanh nghiệp | ABN đã huỷ thì không được dùng để giao dịch; số sai thường do đọc nhầm | Sửa danh sách ở Bước 2 |
| 2 | So tên doanh nghiệp: bỏ hoa/thường, dấu câu, "The" ở đầu, đuôi loại hình; khớp tên pháp nhân hoặc một tên thương mại; viết tắt là KHÁC | Tên trên payslip, hoá đơn thường là tên thương mại | Sửa đoạn "So tên" |
| 3 | Trust: bỏ "The Trustee for" trước khi so; không so trustee | ABR ghi tên trust dạng "The Trustee for X" và không có tên trustee | Bỏ ngoại lệ trust |
| 4 | Sole trader: so tên pháp nhân như tên người, giống `doc-check-identity` (bỏ thứ tự từ, dấu phẩy; thiếu tên đệm là KHÁC) | ABR ghi tên cá nhân dạng "HỌ, Tên" | So như tên doanh nghiệp |
| 5 | Trạng thái ABN không phải Active hay Cancelled: "Chưa kiểm tra được", không kết luận | Công cụ không phân loại được trạng thái đó | Thêm cách hiểu cho từng trạng thái |
| 6 | Có ACN: luôn ghi trạng thái ASIC vào "Chưa kiểm tra được" | ABR không có trạng thái đăng ký với ASIC; "ABN đang hoạt động" không có nghĩa là công ty còn đăng ký | Chỉ ghi khi người dùng hỏi công ty còn hoạt động không |
| 7 | Active dưới 12 tháng, không đăng ký GST, sole trader: chỉ ghi chú | Mức chấp nhận tuỳ lender và tuỳ hồ sơ; nhân viên quyết định | Đưa thành nhãn thông báo |
| 8 | Bản in / ảnh chụp ABN Lookup: tra lại, bản in chỉ là gợi ý | Bản in có thể cũ hoặc đã bị sửa | Xử lý như giấy tờ, có kiểm tra tệp gốc |
| 9 | Ngày hôm nay lấy theo hệ thống | Giống các kỹ năng `doc-check-*` | Lấy từ công cụ ngày |
| 10 | Không có dòng "Kết luận" (khác các kỹ năng `doc-check-*`) | Kỹ năng để tra cứu, không thẩm định cả hồ sơ; các mục "Cần thông báo", "Chưa kiểm tra được", "Ghi chú" đủ để nhân viên tự quyết định | Thêm Kết luận 4 mức như `doc-check-*` |

## Đồng bộ với các kỹ năng doc-check-*

Hai kỹ năng tự gọi `guroos_abn_lookup` và có bản quy tắc riêng, không đọc tệp này:
- `doc-check-income`, phần A (Payslip): tra ABN in trên payslip; nhãn `[ABN đã huỷ]`, `[ABN không hợp lệ]`, `[Sai tên employer]`.
- `doc-check-entity-credit`, phần B (Company Extract): tra theo ACN trên extract; trạng thái ABN ghi vào Ghi chú.

Điểm đang khác với kỹ năng này (chưa sửa):
- Quy tắc so tên của `doc-check-income` chưa có ngoại lệ trust (điểm 3) và sole trader (điểm 4), và chưa bỏ "The" ở đầu, "Pty. Ltd.".
- `doc-check-income` gộp "không có bản ghi" vào `[ABN không hợp lệ]`; kỹ năng này tách thành `[Không tìm thấy]`.
- Mẫu kết quả của `doc-check-entity-credit` chưa có nhãn `[ABN đã huỷ]` dù phần B yêu cầu thông báo khi ABN đã huỷ.
- Trạng thái ABN không rõ (điểm 5) chưa được nêu ở cả hai kỹ năng.

Khi sửa quy tắc ở đây, xem lại hai chỗ trên.
