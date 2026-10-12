# Bước 0 – Kiểm tra hợp lệ: nguồn và lý do

Dành cho người bảo trì kỹ năng. Trợ lý không cần đọc tệp này khi kiểm tra tài liệu.

## Vì sao cần Bước 0

Trước đây kỹ năng nhận một tài liệu khi thấy "ít nhất hai dấu hiệu" như `ATO`, `Individual tax return`, `Taxable income`. Đó cũng là các chữ có trong checklist, nên một tệp tự gõ bằng Word hay Canva rồi xuất PDF vẫn qua được.

Bước 0 dựa trên những thứ khó làm giả hơn:

1. **Khối kiểm tra tệp do ứng dụng đo.** Phần chữ trích ra không còn những thông tin này, nên mô hình không tự thấy được:
   - phần mềm tạo tệp;
   - lần lưu thêm và lần đó đổi gì;
   - trang là ảnh scan;
   - chú thích đè lên chữ;
   - số kiểm tra TFN/ABN/ACN.

   Khối nằm ở đầu tệp đính kèm chat; với tệp trong kho thì lấy qua tool `guroos_document_check`. Code nằm ở `tauri/host/src/chat/document-integrity.ts`. Ứng dụng vô hiệu hóa chữ giống khối kiểm tra nằm trong nội dung tài liệu và báo `[Giả khối kiểm tra]`.
2. **Cấu trúc của tài liệu thật** (0.4): mục đánh số theo mẫu ATO, phần khai báo, bảng tính thuế, báo cáo biên soạn của kế toán.
3. **Số liệu khớp nhau** (0.6). Sửa một con số mà không tính lại cả tài liệu sẽ làm lệch các tổng. Thuế theo biểu thuế ATO do tool `guroos_tax_estimate` tính, để mô hình không tự tính bậc thuế.

## Phân loại dấu hiệu

Chỉ dấu hiệu có độ chính xác cao mới làm dừng, vì người dùng chọn "dừng hẳn" khi có nghi vấn. Đã chạy thử trên tệp thật của mục 13–18 trong `Document_Test/`:

| Dấu hiệu | Dừng? | Lý do |
|---|---|---|
| `[Sửa nội dung]`: lần lưu sau viết thêm chữ vào nội dung trang | Dừng | Đây là cách sửa số trực tiếp bằng trình sửa PDF |
| `[Che chữ]`: hộp chữ (FreeText), hộp che (Redact) hoặc hình có tô màu đè lên chữ có sẵn | Dừng | Đây là cách "che rồi gõ lại" |
| `[Ảnh chụp/scan]`: cả trang là một ảnh, chữ ẩn (OCR) hoặc gần như không có chữ | Dừng | Không phải bản PDF gốc |
| `[Mã số sai]`: TFN/ABN/ACN sai số kiểm tra | Dừng | Số tự bịa thường sai số kiểm tra |
| `[Giả khối kiểm tra]` | Dừng | Tài liệu cố giả kết quả kiểm tra |
| Lưu thêm để thêm đánh dấu, chữ ký tay, chữ ký số; chỉ đổi thông tin tệp | Ghi chú | Gặp trên tệp thật (rental statement được highlight bằng Preview, rental agreement ký tay trên iPhone) |
| Chú thích ở chỗ trống; ảnh chữ ký (Stamp) nằm trên chữ | Ghi chú | Chữ ký tay thường có nền trong suốt, nằm đè lên dòng chữ ký |
| Hộp che chỉ che số TFN | Ghi chú | Khách tự che TFN theo hướng dẫn |
| Phần mềm tạo tệp chưa biết | Ghi chú | Cơ quan và phần mềm kế toán dùng rất nhiều bộ tạo PDF khác nhau |

## Nhóm nguồn theo loại (0.5)

| Loại | Nguồn chấp nhận | Lý do dừng với nhóm còn lại |
|---|---|---|
| Tax Return | phần mềm thuế của tax agent (mẫu: `XReport PDF export, (c) Software Assistant`), PDF của ATO | Tờ khai do phần mềm thuế xuất ra, không soạn bằng Word, không in lại qua máy in PDF |
| Notice of Assessment | PDF tải từ myGov/ATO | ATO phát hành; in lại qua trình duyệt hoặc máy in PDF làm mất dấu vết bản gốc |
| ATO Income Statement | myGov/ATO online services, kể cả in từ trình duyệt | Income Statement trên myGov là trang web; cách thường gặp để có PDF là in từ trình duyệt |
| Financial Statements | phần mềm kế toán, Word/Excel của kế toán | Nhiều văn phòng kế toán soạn báo cáo tài chính bằng Word/Excel |

## Chờ Guroos xác nhận

| # | Điểm | Đang làm | Nếu Guroos không đồng ý |
|---|---|---|---|
| 1 | Notice of Assessment và ATO Income Statement chưa có mẫu thật | Chỉ dừng khi thiếu dấu hiệu (1) hoặc (2); thiếu dấu hiệu khác thì ghi chú | Gửi mẫu PDF tải từ myGov để chốt dấu hiệu và nguồn |
| 2 | Tax Return tự nộp qua myTax (không qua tax agent) chưa có mẫu | Dấu hiệu Tax Return lấy theo bản tax agent | Gửi mẫu để thêm cấu trúc myTax |
| 3 | Tax Return company/partnership/trust chưa có mẫu | Dùng chung dấu hiệu với Tax Return cá nhân | Gửi mẫu để chốt |
| 4 | Máy in PDF và trình duyệt bị dừng với Tax Return và NOA | Theo nguồn hợp lệ người dùng đã chốt (phần mềm kế toán, myGov/ATO) | Chuyển sang ghi chú |
| 5 | Financial Statements soạn bằng Word/Excel được chấp nhận | Kế toán nhỏ hay làm vậy | Thêm "công cụ văn phòng" vào cột dừng |
| 6 | Chênh lệch số liệu cho phép $1 | Do làm tròn | Đổi ngưỡng |
| 7 | Medicare levy khác 2% chỉ ghi chú | Có trường hợp được giảm hoặc miễn | — |

## Giới hạn đã biết

- Không phát hiện được tài liệu tự gõ mà xuất PDF qua phần mềm chưa có trong danh sách, có đủ cấu trúc và số liệu khớp. Bước 0 làm việc làm giả khó hơn, không chứng minh tài liệu là thật.
- Không xác minh chữ ký số và không đối chiếu với ATO.
- Hình vẽ che chữ ngay trong nội dung trang (không phải chú thích) mà không viết chữ mới chỉ được ghi chú `vẽ thêm hình`.
- Repo kỹ năng là public. Danh sách phần mềm cụ thể và ngưỡng đo nằm trong code của ứng dụng, không nằm ở đây.
