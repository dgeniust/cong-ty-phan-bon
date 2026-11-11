# Design – "Lá Non" v1

Landing page Kim Ngoan theo phong cách tham chiếu "Glowing Hair – Hair oil": nền trắng sạch, xanh lá non tươi, sản phẩm đứng trên **bục tròn**, ảnh trong **khung oval/viên thuốc**, **tem tròn xoay** và chữ có chân xen chữ in hoa màu xanh. Chuyển thể cho đại lý phân bón & thuốc BVTV.

- Nhánh: `fe/la-non-v1` (tách từ `fe/uiux`, song song với `fe/vuon-xanh-v1`, `fe/phac-thao-v1`, `fe/mua-vang-v1`)
- Stack: Next.js (App Router) · Tailwind CSS v4 · TypeScript · shadcn/ui
- Phạm vi: trang chủ `/` và header. Trang con giữ bố cục `fe/uiux`.

---

## 1. Phân tích ảnh tham chiếu

| Đặc điểm | Tác dụng | Chuyển thể cho Kim Ngoan |
|---|---|---|
| Bảng màu **xanh lá non + trắng** | Tươi, tự nhiên, "organic" | **Giữ nguyên** – trùng màu chủ đạo theme cũ |
| Sản phẩm đứng trên **bục trụ tròn** | Biến sản phẩm thành "ngôi sao" | Bao phân đứng trên bục xanh lá non |
| **Tem tròn chữ chạy vòng** + ngôi sao | Điểm nhấn, cảm giác thủ công | Tem "PHÂN BÓN CHÍNH HÃNG · KIM NGOAN ·" |
| Tiêu đề serif, **1 từ in hoa màu xanh** ("Glowing HAIR") | Gây chú ý, nhận diện | "Mùa màng **BỘI THU** bắt đầu từ đây" |
| Số liệu 100% / 95% / 10y+ với ký hiệu nhỏ màu | Tạo niềm tin nhanh | Số liệu từ CMS (`hero.stats`) |
| Thẻ sản phẩm nhỏ + giá nổi bật bên phải hero | Mua ngay | Thẻ sản phẩm bán chạy + **"Liên hệ báo giá"** (không có giá) |
| Hàng "The Production – process" | Minh bạch quy trình | "Quy trình – Từ tư vấn đến tận vườn" + số nhà vườn |
| Ảnh người mẫu trong **khung viên thuốc/oval** quanh sản phẩm | Kết nối cảm xúc | Ảnh cây trồng/vườn trong khung oval |
| "Help to shine" – hướng dẫn dùng | Giáo dục | **"Hướng dẫn bón"** lấy từ dữ liệu sản phẩm thật |
| Dải chữ chạy "Hair Oil ✦ Hair Oil" | Nhịp, chuyển cảnh | Dải chạy **tên danh mục** – mỗi tên là một liên kết |
| "Explore our collection" – 3 thẻ trên nền xanh nhạt, nhãn NEW | Duyệt sản phẩm | Bộ sưu tập + **chip lọc theo cây trồng** |
| Testimonial khách hàng | Bằng chứng xã hội | **Không có đánh giá thật → không bịa.** Thay bằng **bài kiến thức nổi bật** cùng bố cục (ảnh + trích dẫn) |
| Banner CTA nền kem cuối trang | Chốt hành động | Banner "Muốn vườn xanh tốt hơn?" + Gọi / Gửi yêu cầu |
| Logo giữa menu | Cân đối, thương hiệu | Logo giữa trên desktop; trái trên mobile |

### Kết luận độ phù hợp

**Rất hợp về màu sắc và tinh thần; cần chỉnh về nhịp bán hàng.**

- ✅ Ảnh mẫu dùng **đúng tông xanh lá** của Kim Ngoan → không phải "dịch màu" như 3 style trước; nhìn tự nhiên nhất.
- ✅ Bục tròn + tem tròn biến bao phân (vốn không đẹp) thành **sản phẩm cao cấp**.
- ⚠️ Style mỹ phẩm hướng tới **một sản phẩm chủ lực**; Kim Ngoan có nhiều dòng → bổ sung **ô tìm kiếm** trong hero, **dải danh mục** và **chip cây trồng** để người mới không bị lạc.
- ⚠️ Tông "mỹ phẩm" có thể hơi "điệu" với bà con nông dân → giảm trang trí (tem chỉ 2 chỗ, ngôi sao ≤ 3), chữ thân to (16px), nhãn nút rõ ràng.
- ⚠️ Cần **ảnh bao bì tách nền** để đứng được trên bục. Ảnh hiện có nền trắng nên vẫn chấp nhận được.

---

## 2. Nguyên tắc

1. **Màn đầu đủ 3 lối vào:** tìm kiếm, nút "Xem sản phẩm", số điện thoại.
2. **Trang trí phục vụ sản phẩm:** bục, tem, khung oval chỉ quanh ảnh sản phẩm/cây, không đặt sau chữ.
3. **Không viền khung, không bóng gắt:** khối tách bằng nền xanh rất nhạt `#f1f7e6`.
4. **Một màu cho hành động:** nút chính xanh lá `brand-500` chữ trắng, kèm vòng tròn mũi tên như ảnh mẫu.

## 3. Màu

| Token | Hex | Dùng cho |
|---|---|---|
| `lime-tint` | `#f1f7e6` | Nền thẻ, khối nhạt (thay xanh nhạt của ảnh mẫu) |
| `podium` gradient | `#c9e27a → #7fb23a` | Bục tròn |
| `brand-500` | `#3e9b37` | Nút chính, chữ in hoa nhấn (≥ 3:1 cho chữ lớn) |
| `brand-900` | `#143f1b` | Tiêu đề, chữ đậm, tem |
| `sun-500` | `#e8c547` | Ngôi sao trang trí, ký hiệu % nhỏ (chỉ trang trí) |
| `ink-muted` | `#56645a` | Chữ phụ |

## 4. Chữ

| Vai trò | Font | Cỡ |
|---|---|---|
| Tiêu đề hero | Playfair Display 500/700 | 40 → 72px, viết thường + **1 cụm in hoa xanh** |
| Tiêu đề section | Playfair Display 500 | 30 → 44px |
| Số liệu | Playfair Display 500 | 32 → 40px, ký hiệu (%/+) nhỏ màu vàng |
| Thân, nút, menu | Be Vietnam Pro | 14 → 17px |

## 5. Bố cục trang chủ

### 5.1 Header – logo giữa
```
☰(mobile)  Sản phẩm  Dịch vụ  Tin tức   (🌿 KIM NGOAN)   Giới thiệu  Liên hệ   🔍 ☎
```

### 5.2 Hero – 3 vùng
```
┌──────────────────────────┬────────────────────┬───────────────────┐
│ Mùa màng BỘI THU         │   (tem tròn)       │  ◯ ảnh cây        │
│ bắt đầu từ đây           │    ┌──────┐        │  "Chọn đúng phân…" │
│ lead…                    │    │ BAO  │        │ ┌───────────────┐ │
│ [🔍 Tìm…           ][Tìm]│    │ PHÂN │        │ │ thẻ SP bán chạy│ │
│ [Xem sản phẩm ↗]  ☎ 0123 │  ══╧══════╧══ bục  │ └───────────────┘ │
│ 10+ năm  5.000+ nhà vườn │  ════════════      │ Quy cách 25kg     │
│                          │                    │ Liên hệ báo giá   │
└──────────────────────────┴────────────────────┴───────────────────┘
```

### 5.3 Quy trình – 1 hàng
```
 Quy trình            Đoạn mô tả quy trình tư vấn → giao hàng…            5.000+
 Từ tư vấn đến vườn                                                     nhà vườn
```

### 5.4 "Cây khoẻ, trái sai" – oval trung tâm (tương ứng "Beautiful hair")
```
 Cây khoẻ,            ╭────────────╮ (tem Bán chạy)     ◯ ảnh cây
 trái sai!           │  BAO PHÂN   │
 ╭──╮                │  trong oval │                  Hướng dẫn bón
 │ảnh│ chú thích      ╰────────────╯                  3 bước từ dữ liệu SP
 ╰──╯
```

### 5.5 Dải chạy danh mục – `Phân bón hữu cơ ✦ Phân bón NPK ✦ Thuốc trừ sâu ✦ …` (dừng khi rê chuột, tắt khi giảm chuyển động).

### 5.6 Bộ sưu tập – tiêu đề phải, chip cây trồng, 4 thẻ nền `lime-tint` (nhãn MỚI), nút "Xem tất cả".

### 5.7 Kiến thức nổi bật (thay testimonial) – ảnh lớn khung bo + trích đoạn bài + tác giả/ngày + "Đọc bài"; 2 bài phụ nhỏ hai bên.

### 5.8 Banner CTA – nền kem `sun-100`, chữ trái, ảnh sản phẩm phải, nút Gọi + Gửi yêu cầu.

### 5.9 Thanh hành động mobile – Tìm · Tư vấn · Gọi ngay.

## 6. Thành phần

| Component | File |
|---|---|
| `Podium`, `RoundStamp`, `Sparkle` | `shared/la-non.tsx` |
| `Hero` | `landing/hero.tsx` |
| `ProcessRow` | `landing/process-row.tsx` |
| `CareShowcase` | `landing/care-showcase.tsx` |
| `CategoryMarquee` | `landing/category-marquee.tsx` |
| `Collection` | `landing/collection.tsx` |
| `FeaturedStory` | `landing/featured-story.tsx` |
| `CtaBanner` | `landing/cta-banner.tsx` |
| `HeroSearch`, `MobileActionBar` | dùng lại |

## 7. UX, truy cập, SEO
- Một `h1` thật trong hero; tem tròn và ngôi sao `aria-hidden`.
- Dải chạy: nội dung là liên kết thật, có bản sao `aria-hidden` để chạy liền; dừng khi hover/focus; `prefers-reduced-motion` → đứng yên, cuộn ngang được.
- Chữ xanh `brand-500` chỉ dùng cho chữ lớn ≥ 24px (tương phản 3.9:1).
- Không dùng giá giả; mọi chỗ ảnh mẫu có giá → "Liên hệ báo giá" + số điện thoại.
- Giữ JSON-LD, sitemap, canonical của `fe/uiux`.

## 8. Cần làm thêm
1. Ảnh **bao bì tách nền** (PNG trong suốt) cho bục hero và oval.
2. Ảnh **cây trồng chân dung** (dọc) cho khung viên thuốc.
3. Khi có phản hồi thật của bà con → thêm khối đánh giá như ảnh mẫu.

## 9. Đánh giá
Cùng bài thử với các nhánh khác: tìm phân cho sầu riêng, tìm số gọi, gửi yêu cầu tư vấn – đo thời gian và hỏi cảm nhận "tin tưởng / hợp với nhà nông không".
