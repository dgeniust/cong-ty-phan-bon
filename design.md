# Design – "Phác Thảo" v1

Landing page Kim Ngoan theo phong cách tham chiếu "Чайная Еи" (tiệm trà): ảnh cắt dán + nét phác thảo vẽ tay, chuyển thể cho đại lý phân bón & thuốc BVTV.

- Nhánh: `fe/phac-thao-v1` (tách từ `fe/uiux`, song song với `fe/vuon-xanh-v1` để so sánh)
- Stack: Next.js (App Router) · Tailwind CSS v4 · TypeScript · shadcn/ui
- Phạm vi: trang chủ `/`, header. Trang con giữ bố cục `fe/uiux`.

---

## 1. Phân tích ảnh tham chiếu

| Đặc điểm | Tác dụng | Chuyển thể cho Kim Ngoan |
|---|---|---|
| Ảnh vật thể **cắt nền** (ấm trà, tách) đặt chéo, tràn mép | Cảm giác thủ công, có chiều sâu | Ảnh trong **khung hữu cơ** (bo góc không đều), xoay nhẹ |
| **Nét phác thảo tay** chạy lệch quanh vật thể | Cá tính, ấm áp, "người thật làm" | Component `SketchOutline` – 2 nét lệch nhau quanh ảnh |
| Dòng chảy dọc: ấm → hoa rơi → tách | Kể chuyện bằng hình | **Bao phân → hạt phân rơi → cây trồng**: "bón đúng – cây khoẻ" |
| Cánh hoa rải khắp nền | Không khí, chất liệu | **Lá non rải nhẹ** ở nền hero (mờ, ít) |
| Hình vẽ nét lớn ở nền ngoài (ấm trà) | Thương hiệu hoá | Nét vẽ **cây con, nhánh lá** ở CTA và phần giới thiệu |
| Câu tagline nhỏ in hoa phía trên tiêu đề | Định vị giọng | Giữ – 1 chỗ duy nhất (slogan) |
| Tiêu đề sans vừa, 3 dòng, căn trái | Rõ, nhẹ | Giữ |
| Menu dạng **viên thuốc nền nhạt** từng mục | Mềm, dễ bấm | Giữ, nhưng **viết thường** (chữ in hoa tiếng Việt nhiều dấu khó đọc) |
| Nút pill màu nâu đậm | Hành động chính duy nhất | Pill **xanh rừng** |
| Icon tài khoản / yêu thích / giỏ hàng | Thương mại điện tử | Thay bằng **tìm kiếm + gọi điện** (bán theo báo giá, không có giỏ) |
| Nền be hồng ấm | Trà, hoa | Đổi sang **xanh lúa non** – giữ màu chủ đạo theme cũ |

### Kết luận độ phù hợp

**Phù hợp khá tốt – nhưng là style "kể chuyện", không phải style "bán nhanh".**

- ✅ Nét vẽ tay + ảnh cắt dán khiến thương hiệu **gần gũi với nhà nông**, khác hẳn các trang đại lý phân bón (thường là banner + lưới sản phẩm dày đặc).
- ✅ Dòng chảy *bao phân → hạt → cây* truyền đạt **ngay lập tức** công ty bán gì, không cần đọc.
- ⚠️ Ảnh mẫu chỉ có **1 màn hình**, ít thông tin. Đại lý cần người mua tìm được sản phẩm nhanh → **bổ sung ô tìm kiếm vào hero** và **khối "Mua hàng chỉ 3 bước"** (không có trong ảnh mẫu).
- ⚠️ Hiệu ứng phụ thuộc **ảnh tách nền**. Với ảnh có nền hiện tại, dùng khung hữu cơ + nét phác để "giả" cảm giác cắt dán; khi có ảnh PNG nền trong, hiệu quả sẽ gần với ảnh mẫu hơn.
- ⚠️ Nét vẽ nhiều dễ thành rối → **tối đa 1 hình nét lớn mỗi section**, ẩn bớt trên mobile.

So với `fe/vuon-xanh-v1` (gọn, thương mại): "Phác Thảo" **ấm và có cá tính hơn**, nhưng dài hơn và tốn công ảnh hơn.

---

## 2. Nguyên tắc

1. **Câu chuyện trước, nhưng không chặn đường mua.** Màn hình đầu vẫn có ô tìm kiếm và số điện thoại.
2. **Nét tay chỉ để dẫn mắt**, không phủ chữ, không nằm dưới vùng bấm.
3. **Không viền khung.** Phân tách bằng nền, khoảng trắng, nét phác (là hình vẽ, không phải khung).
4. **Người mới:** mỗi section một hành động, nhãn nút nói rõ việc xảy ra, có khối hướng dẫn mua 3 bước.

---

## 3. Màu

| Token | Hex | Dùng cho |
|---|---|---|
| `paper` | `#f3f6ec` | Nền landing – xanh lúa non (thay be hồng của ảnh mẫu) |
| `brand-100` | `#e4f0d5` | Lá rải nền, nền khung ảnh |
| `brand-500` | `#3e9b37` | Xanh lá tươi: hạt phân, chấm nhấn |
| `sketch` = `brand-900` | `#143f1b` | Nét phác tay, tiêu đề, nút chính |
| `sun-300` | `#f6e27a` | Hạt phân xen kẽ, nút gọi điện |
| `ink-muted` | `#56645a` | Chữ phụ (5.6:1 trên `paper`) |

## 4. Chữ

**Be Vietnam Pro** duy nhất.
- Tiêu đề hero: 36 → 56px, weight 500, line-height 1.1, tracking −0.02em.
- H2: 30 → 44px, weight 500.
- Tagline: 12px, in hoa, tracking 0.12em – **chỉ 1 chỗ** ở hero.
- Thân: 15–17px, line-height 1.65.

## 5. Bố cục trang chủ

### 5.1 Header
```
(🌿 KIM NGOAN)    (Sản phẩm)(Dịch vụ)(Tin tức)(Giới thiệu)(Liên hệ)    🔍  ☎
```
Nền trong suốt trên `paper`; mỗi mục menu là pill nền trắng mờ; khi cuộn → thanh trắng.

### 5.2 Hero – chữ trái, cắt dán phải
```
┌───────────────────────────────┬──────────────────────────────┐
│ ĐẠI LÝ PHÂN BÓN – VÌ MÙA…      │            ╭─────────╮ ~~~    │
│                                │    ~~~~   │ BAO PHÂN │       │
│ Đồng hành cùng nhà nông        │           ╰────┬────╯        │
│ vì một nền nông nghiệp…        │                ● ○ ●  (hạt)   │
│ lead…                          │                 ● ○           │
│ [🔍 Tìm phân bón, cây trồng][Tìm]│          ╭───────────╮ ~~~  │
│ NPK · Hữu cơ · …               │          │  CÂY TRỒNG │      │
│ [Chọn phân bón cho vườn] ☎ 0123│          ╰───────────╯       │
└───────────────────────────────┴──────────────────────────────┘
          lá non rải nhẹ khắp nền
```

### 5.3 Dải cam kết – 4 mục, icon trong vòng nét phác.

### 5.4 "Bạn trồng cây gì?" – 5 ảnh tròn có nét phác, so le lên xuống, xoay nhẹ. Bấm → tìm sản phẩm theo cây.

### 5.5 Nhóm sản phẩm – 2 thẻ cạnh nhau
Ảnh khung hữu cơ + nét phác, tên nhóm, danh sách danh mục con (mỗi dòng là liên kết), nút "Xem …".

### 5.6 Mua hàng chỉ 3 bước (mới – cho người mới)
```
 ①  Cho biết cây & diện tích  ~~~>  ②  Nhận phác đồ tư vấn  ~~~>  ③  Giao tận vườn
```
Đây là trình tự thật nên dùng số thứ tự; nối bằng nét cong vẽ tay.

### 5.7 Sản phẩm được tin dùng – lưới 4 cột (2 cột mobile).

### 5.8 Về chúng tôi – ảnh khung hữu cơ + nét phác bên trái, chữ phải, số liệu (CMS `hero.stats`), hình nét cây con ở nền.

### 5.9 Kiến thức canh tác – 3 bài mới.

### 5.10 Form "Gọi lại cho tôi" – ô gạch chân, 2 ô bắt buộc.

### 5.11 Thanh hành động mobile – Tìm · Tư vấn · Gọi ngay (cố định đáy, < 1024px).

## 6. Thành phần

| Component | File | Ghi chú |
|---|---|---|
| `SketchOutline` | `shared/sketch.tsx` | SVG 2 nét lệch, `vector-effect: non-scaling-stroke`, `aria-hidden` |
| `OrganicImage` | `shared/sketch.tsx` | Ảnh trong khung bo không đều + nét phác, xoay tuỳ chọn |
| `LineArt` | `shared/line-art.tsx` | Hình nét lớn: `seedling`, `branch` |
| `LeafScatter` | `shared/line-art.tsx` | Lá non rải nền, vị trí cố định (không random → không lệch SSR) |
| `HeroCollage` | `landing/hero-collage.tsx` | Bao phân → hạt → cây |
| `BuySteps` | `landing/buy-steps.tsx` | 3 bước mua |
| `HeroSearch`, `QuickConsult`, `MobileActionBar` | dùng lại từ `fe/vuon-xanh-v1` | |

## 7. UX, truy cập, SEO
- 3 lối vào sản phẩm ở màn đầu: ô tìm kiếm, gợi ý nhanh, nút chính; ảnh tròn cây trồng ngay section sau.
- Không có chuyển động tự chạy; hạt phân "rơi" là hình tĩnh. `prefers-reduced-motion` tôn trọng.
- Mọi hình vẽ `aria-hidden`; ảnh trang trí `alt=""`; một `h1` thật.
- Vùng chạm ≥ 44px; focus ring xanh.
- Giữ JSON-LD, sitemap, canonical của `fe/uiux`.

## 8. Cần làm thêm
1. Ảnh **bao bì tách nền** (PNG nền trong) và ảnh **cây/luống đất tách nền** cho cột cắt dán hero.
2. Có thể nhờ hoạ sĩ vẽ lại bộ nét tay (cây con, bao phân, bình phun) cho đồng bộ thương hiệu.
3. Số liệu thật cho `hero.stats`.

## 9. Đánh giá
Như `fe/vuon-xanh-v1`: cho 3–5 người mua thật làm 3 việc (tìm phân cho sầu riêng, tìm số gọi, gửi yêu cầu tư vấn) trên cả 3 nhánh, so thời gian và cảm nhận "tin tưởng/gần gũi".
