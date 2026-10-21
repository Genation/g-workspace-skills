# 11. Tệp mới khách gửi (tmp/)

Mục 11 của kỹ năng doc-check, tách khỏi SKILL.md; đọc khi bảng ở SKILL.md mục 1 nêu. "Mục 1–9" là mục của SKILL.md; mục 10 ở `references/crm-recording.md`, 12 ở `references/filing.md`, 13 ở `references/old-folder.md`: mỗi tệp đọc đúng bước dưới nêu (chưa có trong hội thoại thì đọc, cùng cách).

Khi người dùng hỏi có hồ sơ, tệp nào khách mới gửi ("có hồ sơ nào khách mới gửi không"), hay nhờ xử lý, kiểm tra tệp mới, hồ sơ mới khách gửi, của một deal ("xử lý các file mới khách gửi trong tmp của deal Whitmore", "kiểm tra hồ sơ mới của Whitmore") hoặc chưa nêu deal ("xử lý các tệp khách mới gửi"). Tệp khách gửi nằm nguyên trong `<thư mục deal>/tmp/`, chưa có trên deal, chưa đặt tên. Cần CRM (SKILL.md mục 1); không có CRM: kiểm tra các tệp trong `tmp/` như tệp trong hồ sơ (mục 1–9), không ghi nhận, không lưu hồ sơ. Mỗi lượt chỉ xử lý MỘT deal.

Hai nguồn tệp mới:
- **Mục intake (nguồn chính).** Tệp khách tải lên cổng khách hàng: backend lưu vào `<thư mục deal>/tmp/` và ghi một mục intake (`dealId`, `dealTitle`, `contactName`, `fileName`, `path`, `driveItemId`, `uploadedAt`, `status`). `status` là `new` cho tới khi tệp được ghi nhận lên deal (10.1), rồi tự thành `processed` kèm `dealFileId`; `processed` chỉ là đã ghi nhận, chưa phải đã kiểm tra hay đã lưu hồ sơ. `checkStatus` của mục là trạng thái kiểm tra của tệp trên deal (`null` khi còn `new`). Lọc `status` = `unchecked`: các mục đã ghi nhận mà chưa kiểm tra lần nào (ví dụ OneDrive trên máy chưa đồng bộ ở lần xử lý trước), vẫn chờ kiểm tra và lưu hồ sơ. Đọc bằng `genation-workspace_deal_intakes_list` (đọc hết các trang theo `cursor`). Không có công cụ đó (tổ chức chưa bật module `client_portal`), hoặc công cụ báo `module_not_enabled`: chỉ dùng nguồn dự phòng.
- **Thư mục `tmp/` (dự phòng).** Tệp vào `tmp/` không qua cổng (tải từ thư bằng `mail-intake`, nhân viên chép vào) không có mục intake. Xem bằng `guroos_customer_files`.
- **Không trùng.** Một tệp chỉ là một mục: cùng `driveItemId` (tệp trên deal: `document.driveItemId`) hoặc cùng đường dẫn (mục intake: `path`; tệp trên deal: `document.path`; tệp trong kho: `/<thư mục deal>/tmp/<tên tệp>`; không phân biệt hoa thường) là cùng một tệp.

0. **Chưa nêu deal** (cuộc trò chuyện cũng chưa nói deal nào): có `deal_intakes_list` thì gọi hai lần, không lọc deal: `status` = `new` (tệp mới, chưa ghi nhận) và `status` = `unchecked` (đã ghi nhận, chưa kiểm tra). Gom theo `dealId`: tên deal (`dealTitle`), số tệp mới, số tệp chưa kiểm tra, tên khách (`contactName`), ngày gửi mới nhất; deal có tệp gửi mới nhất lên trước. Có `genation-workspace_deals_list`: gọi thêm MỘT lần với `unassigned` = `true` (đọc hết các trang) để đánh dấu deal chưa ai nhận. Liệt kê rồi hỏi xử lý deal nào, dừng lượt, kể cả khi chỉ có một deal (deal có thể của nhân viên khác) hay người dùng nhờ xử lý hết:

   ```
   Tệp khách gửi qua cổng khách hàng, chưa xử lý:
   1. <tên deal> · <n> tệp mới · <m> tệp chưa kiểm tra · <tên khách> · gửi <DD/MM/YYYY> · chưa ai nhận
   2. <tên deal> · <n> tệp mới · <tên khách> · gửi <DD/MM/YYYY>
   Bạn muốn xử lý deal nào?
   ```

   Số bằng 0 thì bỏ phần đó. Không có mục nào: "Không có tệp mới hay tệp chưa kiểm tra nào khách gửi qua cổng khách hàng." Cả hai trường hợp thêm một dòng: tệp gửi qua thư hay chép vào `tmp/` không có trong danh sách này; nhờ "xử lý tệp mới của deal <tên>" để xem `tmp/` của deal đó. Không có `deal_intakes_list`: hỏi người dùng deal nào, dừng. Không tự quét kho tìm `tmp/`.
1. **Deal:** deal người dùng chọn ở bước 0 (`dealId` của nhóm đó), deal đang nói trong cuộc trò chuyện, hoặc `genation-workspace_deals_list` (`search` = tên người dùng nêu, deal chưa lưu trữ). Đúng MỘT deal: dùng nó. Nhiều deal: liệt kê tên (`title`) và hỏi, dừng. Không có: báo và hỏi, dừng. Người dùng nêu hay chọn nhiều deal: hỏi làm deal nào trước, dừng. Gọi `genation-workspace_deals_get` để có khách của deal (Applicant, mục 2), thư mục và người phụ trách. `ownerId` trống: deal chưa ai nhận (thường là deal khách tạo trên cổng); vẫn xử lý, nêu ở tóm tắt (bước 6), không tự nhận deal. Chỉ khi người dùng nhờ nhận ("nhận hồ sơ này"): `genation-workspace_deals_update` với `id` và `claim` = `true`; lỗi `deal_already_owned`: báo deal đã có người khác nhận.
2. **Mục intake và thư mục:**
   - Có `deal_intakes_list`: gọi với `dealId`, một lần `status` = `new` (chưa ghi nhận) và một lần `status` = `unchecked` (đã ghi nhận, chưa kiểm tra). Mục `unchecked` đã có trên deal: không ghi nhận lại, vào thẳng phân loại và kiểm tra (bước 3, 4).
   - Thư mục deal = `folderPath`. Chưa có `folderPath`: làm mục 13 trước (thư mục cũ của khách: đọc `references/old-folder.md`); gắn được thì thư mục deal = `folderPath` vừa gắn; không có ứng viên hay nhân viên không gắn: `plannedFolderPath`; cả hai trống: báo deal chưa có thư mục, dừng. Bỏ dấu `/` đầu; xem bằng `guroos_customer_files` (`customer` = đường dẫn đó).
   - Có mục intake mới hay chưa kiểm tra, hoặc `tmp/` có tệp: làm tiếp (mục intake vẫn ghi nhận được khi OneDrive trên máy chưa có tệp).
   - Không có mục intake nào, và thư mục hay `tmp/` không có, hoặc `tmp/` trống: deal chưa có `folderPath` thì mục 13 đã tìm, không tìm lại: báo "không có tệp mới trong `<thư mục deal>/tmp/`", dừng. Deal đã có `folderPath`: tìm thư mục ứng viên bằng `guroos_customers` (`query` = tên deal: thư mục cấp cao nhất) và `guroos_customer_files` với thư mục cha của thư mục deal (thường `Customers`: các thư mục deal cùng tên khách); tệp gửi trước khi deal có thư mục có thể nằm ở thư mục khác (`…_PUR OO` thay vì `…_PUR OO_WBC`, vì `plannedFolderPath` đổi theo mục đích vay, OO/INV và lender). Liệt kê các thư mục có tệp trong `tmp/` mà tên có tên khách của deal (kèm số tệp), nói rằng tệp chỉ được ghi nhận và lưu hồ sơ khi nằm trong `<thư mục deal>/tmp/`: nhân viên chuyển tệp vào đó rồi nhờ lại. Dừng: không tự chọn, không ghi nhận tệp ở thư mục khác, không chuyển hay đổi tên gì. Không có ứng viên: báo "không có tệp mới trong `<thư mục deal>/tmp/`", dừng.
3. **Ghi nhận và lô:** đọc `references/crm-recording.md` (mục 10), rồi theo 10.1, đúng thứ tự:
   - ghi nhận từng mục intake mới bằng `itemId`; mục intake chưa kiểm tra (`unchecked`) không ghi nhận lại;
   - `deal_files_list` (đọc hết các trang) một lần;
   - tệp trong `tmp/` của kho không trùng tệp nào trên deal hay mục intake nào (kể cả mục chưa ghi nhận được): ghi nhận bằng `path` (dự phòng).

   Lô = tệp trong `tmp/` vừa ghi nhận hoặc đã có trên deal mà chưa kiểm tra (`latestCheck` trống), cùng tệp của mọi mục intake chưa kiểm tra (tệp trên deal có `id` = `dealFileId`); người dùng nhờ kiểm tra lại: mọi tệp giấy tờ trong `tmp/`. Tệp trong `tmp/` đã kiểm tra: không kiểm tra lại, chỉ lập kế hoạch lưu hồ sơ (mục 12). Đọc tệp trên deal bằng `guroos_document_read` với `customer` = thư mục deal, `file` = `document.path` tính từ thư mục deal (`tmp/<tên tệp>`). Tệp đã ghi nhận mà chưa có trong `guroos_customer_files` (OneDrive trên máy chưa đồng bộ xong): chưa kiểm tra, không lưu hồ sơ; lần nhờ sau tệp vẫn vào lô vì `latestCheck` còn trống.
4. **Từng tệp:** đọc và kiểm tra theo mục 3–8 (không làm mục 9: có CRM). Sau đó làm mục 10 theo thứ tự:
   - 10.3 (loại, khách) cho mọi tệp của lô;
   - đọc quy tắc của các loại trong lô, MỘT lần với `codes` ("Loại giấy tờ và quy tắc", đầu mục 10);
   - rồi với từng tệp: 10.4 (giấy tờ yêu cầu), 10.2 (kết quả kèm `ruleResults`).
5. **Lưu hồ sơ** theo mục 12 (đọc `references/filing.md`), cho mọi tệp của deal còn trong `tmp/`.
6. **Tóm tắt** sau báo cáo (mục 7), một khối cho cả `tmp/`:

```
### Tệp mới · <tên deal> · <thư mục deal>/tmp/
Deal chưa có người phụ trách: bấm "Nhận hồ sơ" trong ứng dụng, hoặc nhờ trợ lý "nhận hồ sơ này".
Vừa gắn thư mục cũ của khách vào deal: <thư mục deal>.
- <tên tệp> · <khách gửi qua cổng: <tên khách>, <DD/MM/YYYY> | có trong tmp/>
  - Trên deal: <vừa ghi nhận | đã có | chưa ghi nhận: lý do>
  - Loại · khách: <nhãn loại> · <tên khách> | chưa phân loại: <lý do>
  - Giấy tờ yêu cầu: <tên> (<vừa gắn | đã gắn>) | không có | chưa gắn: <lý do>
  - Kiểm tra: <Kết luận> · <đạt yêu cầu | cần xem lại | còn tiêu chí chưa đạt | chưa kiểm tra> (<số met>/<số quy tắc> tiêu chí) | chưa kiểm tra: <lý do>
  - Lưu hồ sơ: <chờ duyệt (số n bên dưới) | đã lưu vào <thư mục con>/<tên mới> | đã ở đúng chỗ | để trong tmp/: <lý do>>
Tệp khách gửi qua cổng còn mới: <tên tệp> (<lý do>), … | không còn
Tệp khách gửi qua cổng còn chưa kiểm tra: <tên tệp> (<lý do>), … | không còn
```

- Dòng "Deal chưa có người phụ trách" chỉ khi `ownerId` của deal trống. Dòng "Vừa gắn thư mục cũ" chỉ khi lượt này gắn thư mục theo mục 13. Hai dòng "còn mới", "còn chưa kiểm tra" chỉ khi có `deal_intakes_list`: mục intake ghi nhận được (kể cả `409`) đã thành `processed`; mục chưa ghi nhận được vẫn `new`, kèm lý do; mục đã ghi nhận mà chưa ghi được kết quả kiểm tra (10.2) vẫn `unchecked`, kèm lý do.
- Mỗi mục intake mới hay chưa kiểm tra một mục `- <tên tệp>` (`fileName`), kể cả khi chưa ghi nhận được; tệp có từ trước trong `tmp/` ghi "có trong tmp/".
- Có tệp chưa kiểm tra vì OneDrive trên máy chưa đồng bộ: thêm dòng "Nhờ lại "xử lý tệp mới của deal <tên deal>" sau ít phút để kiểm tra các tệp còn lại."

Trạng thái kiểm tra theo `checkStatus` của tệp: `satisfied` đạt yêu cầu, `needs_attention` cần xem lại, `incomplete` còn tiêu chí chưa đạt, `unchecked` chưa kiểm tra. Tệp không phải giấy tờ: một dòng `- <tên tệp> · không phải giấy tờ, để nguyên trong tmp/`. Sau khối: danh sách xin duyệt của mục 12.3 (nếu có), rồi MỘT câu hỏi cuối gộp câu hỏi duyệt với mọi điều cần nhân viên quyết định (câu hỏi cuối của mục 7, của 10.3, 10.4, 12.2).
