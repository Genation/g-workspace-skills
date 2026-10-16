---
name: genation-workspace-tracking
description: Lưu lịch sử làm việc của trợ lý cho một bộ hồ sơ (lượt làm việc, tài liệu và thư đã xử lý cùng trạng thái) lên máy chủ của ứng dụng, ghi một lần khi xong việc, không ghi trùng và không gọi công cụ thừa. Dùng khi kỹ năng mail-intake hoặc doc-check tới bước ghi lịch sử, hoặc khi người dùng nhờ lưu lại việc đã làm với một hồ sơ.
---

# Lưu lịch sử làm việc

Lịch sử làm việc giúp người dùng theo dõi trong ứng dụng trợ lý đã xử lý tài liệu, thư nào của hồ sơ nào và kết quả ra sao. Lịch sử chỉ lưu tên thư mục, đường dẫn, loại, tiêu đề và trạng thái; không có nội dung tệp hay thư.

Máy chủ không tự chống trùng: mỗi lần tạo là thêm một bản ghi mới, và không có cách xoá. Vì vậy luôn xem đã có gì trước khi tạo, và chỉ ghi những gì còn thiếu.

## Công cụ

- Đọc (không hỏi người dùng): `genation-workspace_documents_list`, `genation-workspace_mail_list`.
- Ghi (ứng dụng hỏi người dùng một lần cho cả cuộc trò chuyện):
  - `genation-workspace_processing_start`: mở một lượt làm việc, trả về bản ghi có `id` (là `runId`).
  - `genation-workspace_processing_update_status`: đóng lượt.
  - `genation-workspace_documents_record`: ghi nhận một tài liệu, trạng thái `pending`.
  - `genation-workspace_documents_update_status`: đổi trạng thái một tài liệu.
  - `genation-workspace_mail_record`: ghi nhận một thư.

Không dùng `processing_list`, `*_get` hay `mail_update_status` trong kỹ năng này. Kết quả của lệnh tạo đã là bản ghi đầy đủ: không gọi `*_get` để xem lại.

Không có công cụ `genation-workspace_…` nào: trợ lý chưa kết nối tới máy chủ lịch sử. Thêm một dòng nhờ người dùng kết nối trong ứng dụng rồi dừng; không tự tìm cách lưu khác.

## Khi nào ghi

Chỉ ghi khi cả ba điều sau đúng:
1. Kỹ năng đang chạy (mail-intake, doc-check) tới bước ghi lịch sử, hoặc người dùng nhờ lưu.
2. Việc đã xong và có kết quả cho tài liệu hay thư cụ thể.
3. Biết chắc ĐÚNG MỘT thư mục hồ sơ, theo một trong các cách:
   - tên thư mục `guroos_customers` trả về (mail-intake, Bước 3);
   - tên thư mục đã dùng ở bước trước trong cùng cuộc trò chuyện;
   - tên thư mục người dùng gõ đúng.

   Tên người vay, tên Deal hay tên tệp không phải tên thư mục.

Không biết chắc thư mục: không ghi, không hỏi thêm; thêm một dòng "Chưa lưu lịch sử làm việc: chưa biết thư mục hồ sơ".

Không ghi lịch sử cho:
- câu hỏi, tra cứu (ví dụ tra ABN), xem trước thư;
- lần tìm không ra kết quả;
- thư chung, thư "Chưa rõ", thư chưa xác định được hồ sơ.

Chỉ ghi khi kết quả chính của kỹ năng đã chốt; không ghi trước rồi sửa lại. Ghi lịch sử lỗi hay bị từ chối không làm đổi kết quả chính, chỉ thêm một dòng ở cuối báo cáo.

## Quy ước dữ liệu

| Trường | Ghi gì |
|---|---|
| `customerFolder` | Đúng nguyên văn tên thư mục hồ sơ, cả dấu cách, dấu `&`, hoa/thường. Mọi lần ghi cho hồ sơ đó dùng cùng một chuỗi. |
| `path` | Đường dẫn trong thư mục hồ sơ như công cụ lưu hay liệt kê in ra, ví dụ `tmp/payslip.pdf`. Tệp chỉ có trong chat: tên tệp đính kèm, bỏ số thứ tự đầu tên. |
| `documentType` | Tên loại theo doc-check, ví dụ `Payslip (rule 12)`. Tệp mới lưu, chưa kiểm tra: `chưa phân loại`. |
| `input` (lượt) | Một câu tóm tắt yêu cầu, ví dụ "Tiếp nhận thư mới" hay "Kiểm tra 2 giấy tờ". |
| `output` (lượt) | 1–3 dòng đếm kết quả, ví dụ "2 tệp đã lưu vào tmp/; 1 thư khách hàng". |
| `subject` (thư) | Nguyên văn tiêu đề thư. |
| `emailType` (thư) | `customer`. |

Không đưa TFN, ngày sinh, số giấy tờ, số tài khoản hay nội dung thư vào bất kỳ trường nào.

## Trạng thái

| Việc | Trạng thái |
|---|---|
| Tệp vừa lưu vào hồ sơ, chưa kiểm tra (mail-intake) | để nguyên `pending` |
| doc-check đã kết luận (`ĐẠT`, `CẦN XỬ LÝ`, `CHƯA ĐỦ THÔNG TIN`, `KHÔNG HỢP LỆ`) | `processed` |
| doc-check `KHÔNG ĐỌC ĐƯỢC`, tệp hỏng, tệp có mật khẩu | `failed`, kèm `reason` ngắn |
| Thư khách hàng đã lưu tệp hoặc ghi định danh (mail-intake) | thư `inbound`, `processed` |

- Kết quả thẩm định xấu (`KHÔNG HỢP LỆ`, `CẦN XỬ LÝ`) vẫn là `processed`: trợ lý đã xử lý xong tệp đó.
- `failed` gửi thông báo cho người dùng mỗi lần đặt. Chỉ đặt khi chắc chắn không xử lý được, và không đặt lại cho tài liệu đã `failed`.
- Không đặt các trạng thái trung gian (`running`, `processing`): chỉ ghi trạng thái cuối.

## Quy trình

Làm cho từng thư mục hồ sơ, một lần sau khi xong việc.

1. **Xem đã có gì.** Gọi `genation-workspace_documents_list` với `customerFolder` và `limit` = 100. Có thư cần ghi thì gọi thêm `genation-workspace_mail_list` cũng như vậy. Mỗi thư mục chỉ xem một lần trong cuộc trò chuyện; lần ghi sau cho cùng thư mục dùng lại kết quả đã xem, cộng với những gì chính mình vừa ghi.
2. **Lọc trùng.** Với từng tài liệu sẽ ghi, tìm bản ghi cùng tên tệp (so phần sau dấu `/` cuối, bỏ qua hoa/thường):
   - Không có: ghi mới ở bước 4.
   - Có, cùng trạng thái: bỏ qua.
   - Có, khác trạng thái: chỉ đổi trạng thái bản ghi đó ở bước 4, không ghi mới.
   - Nhiều bản ghi cùng tên: dùng bản mới nhất (đứng đầu danh sách).

   Với từng thư: đã có bản ghi cùng tiêu đề và cùng chiều (`inbound`): bỏ qua.

   Không còn gì để ghi hay đổi: dừng, không mở lượt; ghi "lịch sử đã có sẵn".
3. **Mở lượt.** Gọi `genation-workspace_processing_start` một lần cho việc này (`customerFolder`, `input`). Giữ `id` trả về làm `runId` đến hết bước 5. Mỗi việc một lượt; không mở lượt thứ hai cho cùng việc trong cuộc trò chuyện.
4. **Ghi.**
   - Tài liệu mới: `genation-workspace_documents_record` (`runId`, `customerFolder`, `path`, `documentType`). Trạng thái cần ghi khác `pending`: gọi tiếp `genation-workspace_documents_update_status` với `id` vừa nhận.
   - Tài liệu đã có, khác trạng thái: `genation-workspace_documents_update_status` với `id` của bản ghi đó.
   - Thư mới: `genation-workspace_mail_record` (`runId`, `customerFolder`, `subject`, `direction` = `inbound`, `emailType` = `customer`, `status` = `processed`).
5. **Đóng lượt.** `genation-workspace_processing_update_status` với `id` = `runId`, `status` = `completed`, `output` như quy ước. Không gọi bước `running`.

Giới hạn mỗi lượt: tối đa 30 tài liệu và 20 thư. Nhiều hơn thì ghi phần đầu, ghi số còn lại vào `output` và báo người dùng. Danh sách ở bước 1 đủ 100 mục mà chưa thấy tệp cần so: xem thêm một trang bằng `cursor`, không hơn.

## Lỗi

| Công cụ báo | Làm gì |
|---|---|
| "Invalid arguments: …" | Sửa đúng trường bị báo, gọi lại một lần. Vẫn lỗi: dừng ghi lịch sử. |
| "Internal error (requestId: …)" ở lệnh tạo | Lệnh có thể đã ghi xong. Không gọi lại ngay: xem lại bằng `*_list` một lần; chưa có thì gọi lại một lần. |
| "Internal error (requestId: …)" ở lệnh đổi trạng thái | Gọi lại một lần. |
| "… not found" | Bỏ bản ghi đó, làm tiếp các bản ghi khác. |
| Người dùng không đồng ý lưu | Ghi "chưa lưu lịch sử làm việc: người dùng không đồng ý". |

Mở lượt được mà ghi tài liệu lỗi giữa chừng: vẫn đóng lượt ở bước 5, `output` nêu số đã ghi và số chưa ghi.

## Nói với người dùng

Cách báo trước khi lưu, việc ứng dụng tự hỏi đồng ý, khi người dùng từ chối, và cách gọi tên lịch sử làm việc: theo hướng dẫn chung của ứng dụng về lịch sử làm việc. Kỹ năng này chỉ thêm:
- Cuối báo cáo một dòng: "Lịch sử làm việc: đã lưu 2 tài liệu, 1 thư" / "đã có sẵn" / "chưa lưu: <lý do>".
- Nói trạng thái bằng lời thường ("đã kiểm tra", "không đọc được"), không dùng tên trạng thái tiếng Anh.

## Giới hạn và an toàn

- Chỉ ghi cho thư mục hồ sơ của việc vừa làm; không ghi bù cho việc cũ hay hồ sơ khác.
- Kỹ năng này không đổi tệp, thư, Monday hay kết quả thẩm định đã lưu.

Chưa chắc chuỗi lệnh gọi: đọc `references/worked-examples.md`.
