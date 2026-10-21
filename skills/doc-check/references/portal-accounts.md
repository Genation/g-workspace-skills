# 14. Chuyển tài khoản cổng khách hàng sang liên hệ có sẵn

Mục 14 của kỹ năng doc-check, tách khỏi SKILL.md; đọc khi bảng ở SKILL.md mục 1 nêu.

Khách tự kích hoạt cổng khách hàng (gọi là "kích hoạt cổng khách hàng", không nói "đăng ký": tài khoản Genation do Genation Auth quản lý) thì CRM có thêm một liên hệ mới, nguồn `portal`. Khách cũ đã có liên hệ từ trước: chủ sở hữu hay quản trị viên chuyển tài khoản sang liên hệ có sẵn, thường ngay trong ứng dụng. Trợ lý chỉ làm khi nhân viên nhờ, không tự đề xuất trong lúc kiểm tra giấy tờ; cần công cụ `genation-workspace_portal_accounts_link`, làm đúng như mô tả của công cụ:
1. **Tài khoản:** `id` của tài khoản trong `genation-workspace_portal_accounts_list` (`contactId` = liên hệ khách tự kích hoạt mà nhân viên nêu; tìm bằng `genation-workspace_contacts_list` với `source` = `portal`, nhiều liên hệ khớp thì hỏi).
2. **Liên hệ có sẵn:** hỏi nhân viên liên hệ nào là của khách; nhân viên phải chỉ ra đúng liên hệ. Không tự đoán hay chọn theo tên, email, kể cả khi chỉ một liên hệ trùng tên; được liệt kê kết quả tìm để nhân viên chọn.
3. **Cảnh báo, xin đồng ý,** rồi dừng lượt: "Chuyển tài khoản cổng khách hàng <email> từ liên hệ <tên liên hệ tạm> sang <tên liên hệ có sẵn>? Liên hệ tạm sẽ được lưu trữ, lời mời còn chờ của <tên liên hệ có sẵn> bị huỷ, và từ lần truy cập sau khách thấy các deal của <tên liên hệ có sẵn>. Sau đó không chuyển lại bằng thao tác này được."
4. **Chuyển:** chỉ khi nhân viên đồng ý rõ ràng trong chat với đúng tài khoản và đúng liên hệ: `portal_accounts_link` với `id` = id của tài khoản, `contactId` = liên hệ có sẵn, `note` = lý do nhân viên nêu (nếu có). Lỗi: nói lại bằng lời thường theo mô tả của công cụ, không thử lại; `403 forbidden`: chỉ chủ sở hữu hay quản trị viên của tổ chức làm được.
