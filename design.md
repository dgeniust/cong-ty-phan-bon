# Design – "Vườn Xanh" v1

Tài liệu thiết kế cho landing page Kim Ngoan theo phong cách tham chiếu (Earthmade / Aromacup), chuyển thể cho một đại lý phân bón & thuốc BVTV.

- Nhánh: `fe/vuon-xanh-v1` (tách từ `fe/uiux`)
- Stack: Next.js (App Router) · Tailwind CSS v4 · TypeScript · shadcn/ui
- Phạm vi: trang chủ `/` + header, footer dùng chung. Trang con giữ bố cục của `fe/uiux`, chỉ nhận token mới.

---

## 1. Phân tích ảnh tham chiếu

| Đặc điểm trong ảnh mẫu | Vai trò | Có dùng không |
|---|---|---|
| Nền trắng ngả xám rất nhạt, nhiều khoảng trống | Cảm giác sạch, cao cấp | **Có** – đổi sang trắng ngả xanh lá |
| Tiêu đề sans cỡ lớn, nét vừa (500), không in hoa | Thanh lịch, dễ đọc | **Có** |
| Sản phẩm đặt trong khối **vòm** (arch) màu nhạt | Điểm nhấn nhận diện | **Có** – vòm xanh lá non |
| Nút **viên thuốc** (pill) màu tối + nút viền | Hành động chính/phụ rõ ràng | **Có** – nút xanh rừng đậm |
| Menu nằm trong một **thanh bo tròn nổi** | Gọn, hiện đại | **Có** |
| Bộ số liệu lớn (40k+ / 100%) | Tạo niềm tin nhanh | **Có** – số năm, số nhà vườn, số sản phẩm |
| "Colors available" – các chấm tròn | Cho người xem lựa chọn | **Có, chuyển nghĩa** → "Bạn trồng cây gì?" (ảnh tròn cây trồng) |
| Khối ảnh – chữ xen kẽ trái/phải | Kể chuyện từng tính năng | **Có** – mỗi nhóm sản phẩm một khối |
| Hàng ảnh tròn (các loại nắp) | Trình bày biến thể | **Có** – hàng cây trồng tiêu biểu |
| Form đăng ký với ô gạch chân | Thu lead nhẹ nhàng | **Có** – form "Gọi lại tư vấn" |
| Nét vẽ tay (mũi tên, xoắn, ngôi sao) | Thân thiện, có cá tính | **Có, tiết chế** – tối đa 1 nét/section, chỉ ở desktop |
| Giá bán to ($59.00) + Order now | Mua ngay | **Không** – phân bón bán theo báo giá/số lượng → thay bằng số điện thoại + "Gọi đặt hàng" |
| Avatar khách hàng "37k reviews" | Bằng chứng xã hội | **Không** – không có ảnh khách thật; không dùng ảnh giả. Thay bằng số liệu nhà vườn |
| Nút play video | Xem video | **Không** – chưa có video |

### Kết luận về độ phù hợp

Style này **phù hợp có điều kiện**:

- ✅ Bố cục thoáng, khối vòm, nút pill và tiêu đề nét vừa làm thương hiệu trông **chuyên nghiệp, đáng tin** hơn hẳn một trang đại lý thông thường.
- ✅ Ảnh mẫu được thiết kế cho **một sản phẩm** – Kim Ngoan có **nhiều nhóm sản phẩm**, nên phần hero không "khoe" một sản phẩm mà khoe **khả năng tìm đúng sản phẩm cho đúng cây**.
- ⚠️ Ảnh mẫu dựa vào **ảnh sản phẩm tách nền** (packshot). Ảnh bao phân hiện tại là ảnh chụp có nền → cần chụp/tách nền bao bì để khối vòm đạt hiệu quả cao nhất (xem §9).
- ⚠️ Nét vẽ tay rất dễ thành "trang trí thừa". Chỉ giữ ở những chỗ có ý nghĩa dẫn mắt (mũi tên chỉ vào ô tìm kiếm, chỉ vào nút gọi).

---

## 2. Nguyên tắc

1. **Tìm được sản phẩm trong 1 thao tác.** Ô tìm kiếm có trong hero, không ẩn sau icon. Gợi ý nhanh theo cây trồng ngay bên dưới.
2. **Người mới không phải đoán.** Mỗi khối chỉ có một hành động chính. Nhãn nút nói rõ việc sẽ xảy ra: "Gọi đặt hàng", "Xem phân bón", "Gọi lại cho tôi".
3. **Gọi điện luôn trong tầm tay.** Header (desktop) và thanh hành động dưới đáy (mobile) luôn có nút gọi.
4. **Một điểm nhấn.** Khối vòm xanh ở hero là thứ người xem nhớ. Phần còn lại tĩnh và gọn.
5. **Không viền khung.** Tách khối bằng nền, khoảng trắng, bo góc. Chỉ ô nhập liệu có đường gạch chân (bắt buộc để nhận ra ô nhập).

---

## 3. Màu

Chủ đạo là **xanh lá tươi của cây** (giữ từ theme cũ), chữ và nút dùng xanh rừng đậm thay cho màu đen của ảnh mẫu.

| Token | Hex | Dùng cho |
|---|---|---|
| `paper` | `#f7f9f4` | Nền trang (thay cho trắng xám của ảnh mẫu) |
| `leaf-100` (`brand-100`) | `#e4f0d5` | Khối vòm, nền ảnh tròn |
| `leaf-500` (`brand-500`) | `#3e9b37` | Xanh lá tươi: icon, chấm nhấn, liên kết hover |
| `forest` (`brand-900`) | `#143f1b` | Tiêu đề, nút chính, chữ đậm |
| `sage` (`surface`) | `#f4f7f1` → `#e9efe3` | Nền khối phụ, panel ảnh |
| `sun` (`sun-300`) | `#f6e27a` | Chỉ cho nút **gọi điện** – một màu, một ý nghĩa |
| `ink-muted` | `#56645a` | Chữ phụ |

Độ tương phản: chữ `forest` trên `paper` ≈ 12:1; `ink-muted` trên `paper` ≈ 5.8:1 (đạt AA).

---

## 4. Chữ

Một họ chữ: **Be Vietnam Pro** – được thiết kế cho tiếng Việt, dấu không bị dính/chồng.

| Vai trò | Cỡ (mobile → desktop) | Độ đậm | Ghi chú |
|---|---|---|---|
| Display (hero) | 40 → 64px | 500 | tracking −0.03em, line-height 1.05 |
| H2 section | 30 → 44px | 500 | tracking −0.02em |
| H3 khối | 20 → 24px | 600 | |
| Số liệu | 36 → 48px | 500 | `tabular-nums` |
| Thân | 15 → 16px | 400 | line-height 1.65, tối đa ~65 ký tự/dòng |
| Nhãn nhỏ | 13px | 500 | không in hoa toàn bộ |

Dancing Script (theme cũ) chỉ giữ cho câu slogan trong form tư vấn – không dùng ở tiêu đề.

---

## 5. Bố cục trang chủ

Lưới: container 1280px, lề 16/24/32px. Căn **trái** cho mọi section, trừ hàng cây trồng (căn giữa như hàng nắp trong ảnh mẫu).

### 5.1 Header – thanh nổi bo tròn

```
┌──────────────────────────────────────────────────────────────┐
│ (🌿 KIM NGOAN)   Trang chủ  Sản phẩm  Dịch vụ  Tin tức …   [🔍] [☎ 0123…] │
└──────────────────────────────────────────────────────────────┘
```
- Thanh trắng `rounded-full`, đổ bóng nhẹ khi cuộn, cách mép trên 12px.
- Mobile: logo + nút menu; nút gọi chuyển xuống thanh hành động dưới đáy.

### 5.2 Hero – 3 cột (tương ứng ảnh mẫu)

```
┌───────────────────────┬──────────────────┬───────────────────┐
│ Đồng hành cùng        │      ╭──────╮    │  ╭────╮           │
│ nhà nông vì mùa       │     ╱        ╲   │  │ảnh │  (vòm nhỏ) │
│ màng bội thu          │    │  ẢNH BAO │   │  ╰────╯           │
│ lead…                 │    │   PHÂN   ◉ ← │  Tư vấn miễn phí  │
│ [🔍 Bạn cần tìm…  ][Tìm]│   │ (vòm lớn) │  │  0123 456 789     │
│ NPK · Cà phê · …      │    ╰──────────╯   │  [Gọi đặt hàng]   │
│                       │                  │                   │
│ 10+      5.000+       │                  │  Bạn trồng cây gì?│
│ năm      nhà vườn     │                  │  ◯ ◯ ◯ ◯ ◯        │
└───────────────────────┴──────────────────┴───────────────────┘
```
- Cột trái: H1 thật (SEO), lead, **ô tìm kiếm** (điểm khác biệt so với ảnh mẫu, phục vụ "tìm kiếm nhanh"), gợi ý nhanh, số liệu.
- Cột giữa: ảnh trong khối vòm `rounded-t-full`, huy hiệu tròn tối "Xem sản phẩm" đè mép phải.
- Cột phải: vòm nhỏ (slide thứ 2 của CMS), khối liên hệ, **ảnh tròn cây trồng** thay cho chấm màu – bấm là lọc sản phẩm theo cây.
- Mobile: xếp dọc theo thứ tự trái → giữa → phải; ô tìm kiếm luôn nằm trong màn hình đầu tiên.

### 5.3 Dải cam kết

4 cam kết (CMS `features`) trên một hàng, icon xanh trong vòng tròn `leaf-100`, không có khung bao.

### 5.4 Nhóm sản phẩm – khối xen kẽ (tương ứng "Stylish body…")

```
┌────────────────────────┬──────────────────────────┐
│                        │ Phân bón                 │
│  ẢNH (panel sage,      │ mô tả 1–2 dòng           │
│  bo góc lớn, tràn      │ • Phân bón hữu cơ  →     │
│  lề trái)              │ • Phân bón NPK     →     │
│                        │ [Xem phân bón]           │
└────────────────────────┴──────────────────────────┘
          (khối sau đảo chiều: chữ trái – ảnh phải)
```
- Mỗi dòng gạch đầu dòng là **liên kết thẳng tới danh mục con** (người mới bấm đúng thứ mình cần, không phải đọc).

### 5.5 "Bạn trồng cây gì?" – hàng ảnh tròn (tương ứng hàng nắp)

Tiêu đề căn giữa, 5 ảnh tròn lớn, tên cây bên dưới, bấm → trang tìm kiếm theo cây.

### 5.6 Sản phẩm được tin dùng

Lưới 4 cột (2 cột mobile), thẻ không viền: ảnh nền sage bo 24px → danh mục → tên → quy cách.

### 5.7 Về chúng tôi (tương ứng "A good cup of coffee…")

Chữ trái + 2 nút (pill tối "Câu chuyện Kim Ngoan" + pill viền "Liên hệ"), ảnh phải tràn lề, một nét vẽ tay xoắn.

### 5.8 Kiến thức canh tác

3 bài mới nhất, thẻ ảnh 16:10.

### 5.9 Form "Gọi lại tư vấn" (tương ứng "Subscribe now…")

```
Để lại số điện thoại,            Họ tên ________   Số điện thoại ________
kỹ thuật viên gọi lại            Cây trồng ________          [Gọi lại cho tôi]
trong 24 giờ.
```
- Chỉ 2 ô bắt buộc (tên, SĐT). Ô gạch chân như ảnh mẫu, nhãn luôn hiển thị (không dùng placeholder thay nhãn).

### 5.10 Footer – nền sáng, 4 cột

Thương hiệu + mô tả | Sản phẩm | Kim Ngoan | Liên hệ (địa chỉ, giờ làm việc). Dải bản quyền cuối.

### 5.11 Thanh hành động mobile (mới, không có trong ảnh mẫu)

Cố định đáy màn hình < 1024px: **Gọi ngay** · **Tìm sản phẩm** · **Nhận tư vấn**. Chiều cao 64px, tôn trọng `safe-area-inset-bottom`.

---

## 6. Thành phần (shadcn + Tailwind)

| Thành phần | File | Ghi chú |
|---|---|---|
| `Button` | `ui/button.tsx` | `default` = pill forest; `outline` = pill viền forest; `sun` = gọi điện |
| `ArchFrame` | `shared/arch-frame.tsx` | Khung vòm `rounded-t-full`, kích thước theo tỉ lệ |
| `Doodle` | `shared/doodle.tsx` | 4 nét SVG vẽ tay (`arrow`, `swirl`, `spark`, `smile`), `aria-hidden`, ẩn trên mobile |
| `HeroSearch` | `landing/hero-search.tsx` | Form GET tới `/tim-kiem`, không cần JS |
| `QuickConsult` | `landing/quick-consult.tsx` | Form client, kiểm tra bằng zod |
| `MobileActionBar` | `site/mobile-action-bar.tsx` | |

---

## 7. UX cho người mua & người mới

- **3 lối vào sản phẩm** ngay màn hình đầu: gõ tìm kiếm, bấm cây trồng, bấm danh mục.
- **Tìm kiếm không dấu**: "phan bon" vẫn ra "Phân bón" (đã có `normalize()`).
- **Vùng chạm ≥ 44px** cho mọi nút/liên kết chính.
- **Không carousel tự chạy ở hero** – nội dung đứng yên, người đọc chậm vẫn kịp đọc. Slide thứ 2 trong CMS hiển thị thành vòm nhỏ cột phải.
- **Số điện thoại hiển thị dạng chữ**, không chỉ là icon.
- Thông báo lỗi form nói rõ cách sửa: "Số điện thoại cần 10 số, ví dụ 0909 123 456".

## 8. Khả năng truy cập & SEO

- Một `h1` thật ở hero; các section dùng `h2` + `aria-labelledby`.
- Ảnh trang trí `alt=""`; nét vẽ tay `aria-hidden`.
- Focus ring xanh 2px; `prefers-reduced-motion` tắt mọi chuyển động.
- Giữ toàn bộ JSON-LD, sitemap, canonical từ `fe/uiux`.

## 9. Việc cần làm thêm (ngoài code)

1. **Ảnh bao bì tách nền** (PNG/WebP nền trong, ≥ 1200px) cho 2–3 sản phẩm chủ lực → thay ảnh hero trong admin.
2. **Số liệu thật** cho bộ đếm (năm hoạt động, số nhà vườn, số sản phẩm) – đang là số mẫu, sửa trong admin › Banner › Số liệu.
3. Xác nhận nội dung câu chào hero với chủ doanh nghiệp.

## 10. Cách đánh giá

Chạy song song `fe/uiux` và `fe/vuon-xanh-v1`, cho 3–5 người mua thật (nông dân, đại lý cấp 2) làm 3 việc và đo thời gian:
1. Tìm phân bón cho cây sầu riêng.
2. Tìm số điện thoại để đặt hàng.
3. Gửi yêu cầu tư vấn.

Style được giữ lại nếu cả 3 việc xong < 30 giây mà không cần hướng dẫn.
