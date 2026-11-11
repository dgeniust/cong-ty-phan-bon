# Design – "Mùa Vàng" v1

Landing page Kim Ngoan theo phong cách tham chiếu "Honey – Raw honey online shop": chữ serif in hoa cỡ lớn, dải ảnh tràn màn hình, xen kẽ nền trắng và nền màu đậm, điểm nhấn màu vàng hổ phách. Chuyển thể cho đại lý phân bón & thuốc BVTV.

- Nhánh: `fe/mua-vang-v1` (tách từ `fe/uiux`, song song với `fe/vuon-xanh-v1`, `fe/phac-thao-v1`)
- Stack: Next.js (App Router) · Tailwind CSS v4 · TypeScript · shadcn/ui
- Phạm vi: trang chủ `/`, header, nút bấm (bo góc vuông hơn). Trang con giữ bố cục `fe/uiux`.

---

## 1. Phân tích ảnh tham chiếu

| Đặc điểm trong ảnh mẫu | Tác dụng | Chuyển thể |
|---|---|---|
| Tiêu đề **serif in hoa rất lớn**, dòng 2 đè lên dải ảnh | Sang, giống thương hiệu cao cấp | "ĐẠI LÝ PHÂN BÓN" trên nền trắng, "KIM NGOAN" chữ trắng đè lên dải ảnh đồng lúa |
| Dải ảnh **tràn hết chiều ngang** | Cảm xúc, chất liệu sản phẩm | Ảnh cánh đồng / vườn (slide 2 CMS) |
| Nền **nâu đậm** xen nền trắng | Nhịp đọc rõ, trang trọng | Nâu → **xanh rừng đậm** `#143f1b` |
| Nút **vàng hổ phách** chữ đậm, bo góc nhỏ | Hành động nổi bật | Vàng lúa `sun-300`; bo `6px` thay vì pill |
| Khối giới thiệu: ảnh có **khối màu lệch phía sau** | Chiều sâu, điểm nhấn | Khối vàng lúa lệch góc trên-trái |
| 6 mục trong **huy hiệu lục giác** trên nền đậm ("Learn about honey") | Giáo dục, điều hướng | **8 danh mục sản phẩm** trong huy hiệu lục giác – bấm là vào danh mục |
| Lưới sản phẩm 4×2: ảnh + **thanh tên màu đậm** + giá | Mua sắm nhanh | Giữ: thanh xanh đậm, tên + quy cách (không có giá – bán theo báo giá) |
| "Honey collection": tab lọc + lưới ảnh có **1 ô chữ** | Khám phá theo dòng | "Giải pháp cho từng cây trồng": lưới ảnh cây + 1 ô chữ xanh đậm |
| Testimonial trên ảnh nền tối | Bằng chứng xã hội | **Không có đánh giá thật → không bịa.** Thay bằng form "Gọi lại tư vấn" trên ảnh nền tối |
| Menu chữ nhỏ, mục đang chọn màu vàng | Gọn | Giữ |

### Kết luận độ phù hợp

**Phù hợp tốt nhất trong 3 style đã thử về mặt "bán hàng"**, vì ảnh mẫu vốn là một cửa hàng nhiều sản phẩm:

- ✅ Lưới sản phẩm 4×2 và khối danh mục lục giác cho người mua **thấy toàn bộ hàng hoá trong 2 lần cuộn**.
- ✅ Nền xanh đậm + chữ serif + vàng lúa tạo cảm giác **uy tín, lâu năm** – hợp với đại lý muốn được tin tưởng.
- ⚠️ Chữ serif **in hoa tiếng Việt** nhiều dấu chồng (Ẩ, Ỗ…) → chỉ in hoa cho **tiêu đề ngắn** (≤ 5 chữ), mọi chữ khác viết thường; chọn **Playfair Display** vì có bộ dấu tiếng Việt chuẩn.
- ⚠️ Style dựa nhiều vào **ảnh chất lượng cao, tông ấm**. Ảnh sản phẩm hiện là ảnh tạm → lưới sản phẩm sẽ trông "trống" cho tới khi có ảnh thật.
- ⚠️ Bỏ phần đánh giá khách hàng của ảnh mẫu cho tới khi có phản hồi thật (ghi rõ nguồn, có sự đồng ý).

---

## 2. Nguyên tắc

1. **Thấy hàng sớm.** Danh mục ở màn 2, sản phẩm ở màn 3.
2. **Tìm kiếm có mặt ngay hero**, cạnh câu giới thiệu.
3. **Nhịp sáng – tối rõ ràng**: trắng → ảnh → trắng → xanh đậm → trắng → nhạt → ảnh tối. Không dùng viền để chia khối.
4. **Một màu cho hành động**: vàng lúa = nút chính (xem, tìm, gọi). Xanh đậm = nút phụ.

## 3. Màu

| Token | Hex | Vai trò (tương ứng ảnh mẫu) |
|---|---|---|
| `brand-950` / `brand-900` | `#0d2b12` / `#143f1b` | Nền đậm (thay nâu socola) |
| `brand-500` | `#3e9b37` | Xanh lá tươi – icon, menu đang chọn |
| `sun-300` / `sun-400` | `#f6e27a` / `#efd35a` | Nút chính, huy hiệu lục giác (thay vàng hổ phách) |
| `white` | `#ffffff` | Nền chính |
| `surface` | `#f4f7f1` | Nền nhạt cho lưới cây trồng |
| `ink` / `ink-muted` | `#1f2a22` / `#56645a` | Chữ |

## 4. Chữ

| Vai trò | Font | Cỡ | Ghi chú |
|---|---|---|---|
| Hero | Playfair Display 500 | 44 → 112px | in hoa, tracking −0.01em |
| Tiêu đề section | Playfair Display 500 | 28 → 40px | in hoa, tracking 0.04em, căn giữa |
| Tên sản phẩm / danh mục | Playfair Display 500 | 16 → 18px | viết thường |
| Thân, menu, nút | Be Vietnam Pro 400–600 | 13 → 16px | |

## 5. Bố cục trang chủ

### 5.1 Header
```
Kim Ngoan(logo)     Trang chủ  Sản phẩm  Dịch vụ  Tin tức  Giới thiệu     🔍  [ Liên hệ ]
```
Nền trắng, mục đang chọn màu xanh lá + gạch dưới vàng; nút "Liên hệ" xanh đậm bo 6px.

### 5.2 Hero – chữ lớn + dải ảnh
```
ĐẠI LÝ                              Cung cấp phân bón và thuốc BVTV…
PHÂN BÓN                            [🔍 Tìm phân bón, cây trồng…  ][Tìm]
                                    [ Xem sản phẩm ]  ☎ 0123…
████████████████████████████████████████████████████████████████
█ KIM NGOAN  (chữ trắng, đè mép trên dải ảnh)                   █
█                ẢNH ĐỒNG LÚA TRÀN NGANG                        █
████████████████████████████████████████████████████████████████
```

### 5.3 Dải cam kết – 4 mục trên nền trắng ngay dưới ảnh.

### 5.4 Giới thiệu – ảnh + khối vàng lệch
```
 ┌────┐                     VỀ KIM NGOAN
 │▓▓▓▓┌──────────┐          Đoạn văn…
 │▓▓▓▓│   ẢNH    │          ● Uy tín lâu năm     ● Sản phẩm đa dạng
 └────│          │          ● Đội ngũ chuyên…    ● Đồng hành…
      └──────────┘          [ Câu chuyện Kim Ngoan ]
```

### 5.5 Danh mục sản phẩm – nền xanh đậm, 8 huy hiệu lục giác (4×2, mobile 2×4)
Mỗi mục: lục giác vàng + icon, tên danh mục (serif), mô tả 1 dòng, số sản phẩm. Cả mục là liên kết.

### 5.6 100% chính hãng – lưới sản phẩm 4×2
Thẻ: ảnh vuông bo 8px → thanh xanh đậm chứa tên (serif) + quy cách; nhãn "Bán chạy"/"Mới" góc ảnh.

### 5.7 Giải pháp cho từng cây trồng – lưới ảnh 3×2 có 1 ô chữ
5 ô ảnh cây trồng (tên đè dưới ảnh) + 1 ô xanh đậm chữ serif "Hỏi kỹ thuật viên" → `/lien-he`.

### 5.8 Kiến thức canh tác – 3 bài.

### 5.9 Form tư vấn trên ảnh nền tối (thay testimonial)
Ảnh vườn phủ lớp xanh đậm 80%, tiêu đề serif trắng, form ô gạch chân màu trắng.

### 5.10 Thanh hành động mobile – Tìm · Tư vấn · Gọi ngay.

## 6. Thành phần

| Component | File |
|---|---|
| `Hero` | `landing/hero.tsx` |
| `AboutOffset` | `landing/about-offset.tsx` |
| `CategoryHexGrid` + `Hexagon` | `landing/category-hex-grid.tsx` |
| `ProductShelf` (thẻ thanh tên) | `landing/product-shelf.tsx` |
| `CropMosaic` | `landing/crop-mosaic.tsx` |
| `QuickConsult` (thêm `tone="dark"`) | `landing/quick-consult.tsx` |
| `HeroSearch`, `MobileActionBar` | dùng lại |

## 7. UX, truy cập, SEO
- H1 thật: "Đại lý phân bón Kim Ngoan" (2 dòng hero gộp trong một thẻ `h1`).
- Chữ trắng trên ảnh luôn có lớp phủ gradient đảm bảo tương phản ≥ 4.5:1.
- Lục giác là hình trang trí; nhãn danh mục là chữ thật, vùng bấm là cả ô (≥ 44px).
- Không carousel, không chuyển động tự chạy.
- Giữ JSON-LD, sitemap, canonical của `fe/uiux`.

## 8. Cần làm thêm
1. **Ảnh sản phẩm thật**, cùng tông màu, nền sạch – lưới 4×2 phụ thuộc hoàn toàn vào ảnh.
2. Ảnh dải hero ngang ≥ 2000px (cánh đồng/vườn lúc hoàng hôn hợp tông vàng).
3. Khi có đánh giá thật của bà con → thêm lại khối testimonial.

## 9. Đánh giá
Cùng bài thử với 2 nhánh kia: tìm phân cho sầu riêng, tìm số gọi, gửi yêu cầu tư vấn – đo thời gian và hỏi cảm nhận "tin tưởng".
