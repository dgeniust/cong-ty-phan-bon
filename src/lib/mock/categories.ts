import type { Category } from "./types";

export const categories: Category[] = [
  { slug: "phan-bon", name: "Phân bón", description: "Dinh dưỡng cân đối cho cây trồng khoẻ, năng suất cao." },
  { slug: "phan-bon-huu-co", name: "Phân bón hữu cơ", parent: "phan-bon", description: "Cải tạo đất, tăng mùn, bền vững lâu dài." },
  { slug: "phan-bon-vo-co", name: "Phân bón vô cơ", parent: "phan-bon", description: "Bổ sung nhanh đạm, lân, kali theo từng giai đoạn." },
  { slug: "phan-bon-npk", name: "Phân bón NPK", parent: "phan-bon", description: "Công thức phối trộn sẵn cho từng thời kỳ sinh trưởng." },
  { slug: "phan-bon-vi-sinh", name: "Phân bón vi sinh", parent: "phan-bon", description: "Vi sinh vật có ích giúp đất tơi xốp, rễ khoẻ." },
  { slug: "thuoc-bao-ve-thuc-vat", name: "Thuốc bảo vệ thực vật", description: "Phòng trừ sâu bệnh, bảo vệ mùa màng." },
  { slug: "thuoc-tru-sau", name: "Thuốc trừ sâu", parent: "thuoc-bao-ve-thuc-vat", description: "Kiểm soát côn trùng gây hại." },
  { slug: "thuoc-tru-benh", name: "Thuốc trừ bệnh", parent: "thuoc-bao-ve-thuc-vat", description: "Phòng và trị nấm bệnh hại cây trồng." },
  { slug: "thuoc-diet-co", name: "Thuốc diệt cỏ", parent: "thuoc-bao-ve-thuc-vat", description: "Quản lý cỏ dại trong vườn và ruộng." },
  { slug: "kich-thich-sinh-truong", name: "Thuốc kích thích sinh trưởng", parent: "thuoc-bao-ve-thuc-vat", description: "Hỗ trợ ra rễ, ra hoa, đậu trái." },
];

export const categoryGroups = categories
  .filter((c) => !c.parent)
  .map((g) => ({ ...g, children: categories.filter((c) => c.parent === g.slug) }));

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

/** A slug plus all its children (for parent groups). */
export function categoryScope(slug: string) {
  return [slug, ...categories.filter((c) => c.parent === slug).map((c) => c.slug)];
}
