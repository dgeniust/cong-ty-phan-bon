import type { Article, ArticleSection } from "./types";

export const articleSections: Record<ArticleSection, { title: string; description: string }> = {
  "gioi-thieu": { title: "Giới thiệu", description: "Câu chuyện, sứ mệnh và đội ngũ Công ty TNHH Kim Ngoan." },
  "dich-vu": { title: "Dịch vụ", description: "Giải pháp và dịch vụ đồng hành cùng nhà nông trên từng mùa vụ." },
  "tin-tuc": { title: "Tin tức", description: "Kiến thức canh tác, kỹ thuật bón phân và tin tức nông nghiệp mới nhất." },
};

export const articles: Article[] = [
  {
    slug: "ky-thuat-bon-phan-cho-ca-phe-mua-mua",
    section: "tin-tuc",
    title: "Kỹ thuật bón phân cho cà phê vào đầu mùa mưa",
    excerpt: "Đầu mùa mưa là thời điểm vàng để bổ sung dinh dưỡng giúp cà phê phục hồi sau thu hoạch và chuẩn bị cho vụ mới.",
    cover: "/tmp-img.jpg",
    date: "2026-10-28",
    author: "Phòng Kỹ thuật",
    readingMinutes: 5,
    tags: ["Cà phê", "Bón phân", "Mùa mưa"],
    content: [
      { type: "p", text: "Sau mùa khô và thu hoạch, cây cà phê cần được bổ sung dinh dưỡng kịp thời để phục hồi bộ lá, phát triển cành mới và nuôi trái non." },
      { type: "h2", text: "1. Thời điểm bón" },
      { type: "p", text: "Nên bón khi mưa đã đều, đất đủ ẩm. Tránh bón khi đất quá khô hoặc ngay trước cơn mưa lớn để hạn chế rửa trôi." },
      { type: "h2", text: "2. Loại phân phù hợp" },
      { type: "ul", items: ["Phân hữu cơ để cải tạo đất, tăng mùn.", "NPK cân đối cho giai đoạn phát triển cành lá.", "Bổ sung trung vi lượng nếu lá có dấu hiệu vàng."] },
      { type: "img", src: "/tmp-img.jpg", caption: "Vườn cây khoẻ nhờ chế độ dinh dưỡng cân đối." },
      { type: "h2", text: "3. Cách bón" },
      { type: "p", text: "Rải phân theo hình vành khăn quanh mép tán, cách gốc 20–30cm, sau đó lấp đất nhẹ. Chia nhỏ lượng phân thành nhiều lần bón trong mùa mưa." },
      { type: "quote", text: "Bón đúng thời điểm và đúng liều lượng giúp tiết kiệm chi phí mà vẫn tăng năng suất." },
    ],
  },
  {
    slug: "nhan-biet-thieu-vi-luong-tren-sau-rieng",
    section: "tin-tuc",
    title: "Cách nhận biết cây sầu riêng thiếu vi lượng",
    excerpt: "Lá vàng gân xanh, lá non biến dạng hay trái méo… là những dấu hiệu cảnh báo cây đang thiếu vi lượng.",
    cover: "/tmp-img.jpg",
    date: "2026-10-15",
    author: "Phòng Kỹ thuật",
    readingMinutes: 4,
    tags: ["Sầu riêng", "Vi lượng"],
    content: [
      { type: "p", text: "Vi lượng tuy cây cần với lượng nhỏ nhưng đóng vai trò quan trọng trong quá trình ra hoa, đậu trái và chất lượng trái." },
      { type: "h2", text: "Dấu hiệu thường gặp" },
      { type: "ul", items: ["Thiếu kẽm: lá non nhỏ, mọc chụm.", "Thiếu bo: hoa rụng nhiều, trái méo.", "Thiếu magie: lá già vàng giữa các gân."] },
      { type: "p", text: "Khi thấy dấu hiệu bất thường, bà con nên liên hệ kỹ thuật viên để được kiểm tra và tư vấn phương án bổ sung phù hợp." },
    ],
  },
  {
    slug: "kim-ngoan-khai-truong-kho-hang-moi",
    section: "tin-tuc",
    title: "Kim Ngoan đưa vào hoạt động kho hàng mới tại Chơn Thành",
    excerpt: "Kho hàng mới giúp rút ngắn thời gian giao hàng và đảm bảo nguồn cung ổn định trong mùa cao điểm.",
    cover: "/tmp-img.jpg",
    date: "2026-09-30",
    author: "Kim Ngoan",
    readingMinutes: 2,
    tags: ["Tin công ty"],
    content: [
      { type: "p", text: "Nhằm phục vụ bà con tốt hơn, Kim Ngoan chính thức đưa vào hoạt động kho hàng mới với sức chứa lớn hơn gấp đôi." },
      { type: "p", text: "Kho được bố trí khoa học, bảo quản phân bón và thuốc BVTV đúng tiêu chuẩn, đảm bảo chất lượng sản phẩm đến tay nhà nông." },
    ],
  },
  {
    slug: "tu-van-ky-thuat-tai-vuon",
    section: "dich-vu",
    title: "Tư vấn kỹ thuật tại vườn miễn phí",
    excerpt: "Kỹ thuật viên đến tận vườn khảo sát, đánh giá tình trạng cây và đất để đưa ra phác đồ dinh dưỡng phù hợp.",
    cover: "/tmp-img.jpg",
    date: "2026-08-20",
    author: "Kim Ngoan",
    readingMinutes: 3,
    tags: ["Tư vấn", "Dịch vụ"],
    content: [
      { type: "p", text: "Mỗi vườn có điều kiện đất, giống và tuổi cây khác nhau. Vì vậy, Kim Ngoan cung cấp dịch vụ tư vấn trực tiếp tại vườn." },
      { type: "h2", text: "Quy trình" },
      { type: "ul", items: ["Đăng ký qua hotline hoặc form liên hệ.", "Kỹ thuật viên hẹn lịch và đến khảo sát.", "Đưa ra phác đồ dinh dưỡng – phòng trừ sâu bệnh.", "Theo dõi và hỗ trợ trong suốt mùa vụ."] },
    ],
  },
  {
    slug: "giao-hang-tan-noi",
    section: "dich-vu",
    title: "Giao hàng tận nơi khu vực Đồng Nai – Bình Phước",
    excerpt: "Đặt hàng qua điện thoại, giao tận vườn nhanh chóng, đúng hẹn với chi phí hợp lý.",
    cover: "/tmp-img.jpg",
    date: "2026-07-12",
    author: "Kim Ngoan",
    readingMinutes: 2,
    tags: ["Giao hàng", "Dịch vụ"],
    content: [
      { type: "p", text: "Đội xe của Kim Ngoan hỗ trợ giao hàng tận nơi cho bà con trong khu vực, đặc biệt với các đơn hàng số lượng lớn." },
    ],
  },
  {
    slug: "cau-chuyen-kim-ngoan",
    section: "gioi-thieu",
    title: "Câu chuyện Kim Ngoan – Đồng hành cùng nhà nông",
    excerpt: "Từ một cửa hàng vật tư nhỏ, Kim Ngoan đã trở thành đại lý phân bón uy tín được bà con tin tưởng.",
    cover: "/tmp-img.jpg",
    date: "2026-06-01",
    author: "Kim Ngoan",
    readingMinutes: 4,
    tags: ["Về chúng tôi"],
    content: [
      { type: "p", text: "Kim Ngoan bắt đầu với mong muốn mang đến cho bà con nông dân những sản phẩm chất lượng, giá cả hợp lý và sự tư vấn tận tâm." },
      { type: "quote", text: "Chất lượng tạo nên niềm tin." },
      { type: "h2", text: "Sứ mệnh" },
      { type: "p", text: "Đồng hành cùng nhà nông vì một nền nông nghiệp bền vững, giúp mỗi mùa vụ đều bội thu." },
      { type: "h2", text: "Giá trị cốt lõi" },
      { type: "ul", items: ["Uy tín", "Tận tâm", "Chuyên nghiệp", "Bền vững"] },
    ],
  },
  {
    slug: "doi-ngu-ky-thuat",
    section: "gioi-thieu",
    title: "Đội ngũ kỹ thuật giàu kinh nghiệm",
    excerpt: "Đội ngũ kỹ sư nông nghiệp luôn sẵn sàng hỗ trợ bà con giải quyết các vấn đề trên đồng ruộng.",
    cover: "/tmp-img.jpg",
    date: "2026-05-10",
    author: "Kim Ngoan",
    readingMinutes: 2,
    tags: ["Về chúng tôi", "Đội ngũ"],
    content: [{ type: "p", text: "Các kỹ thuật viên của Kim Ngoan thường xuyên được đào tạo, cập nhật kiến thức canh tác mới." }],
  },
];

export function getArticles(section: ArticleSection) {
  return articles.filter((a) => a.section === section).sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(section: ArticleSection, slug: string) {
  return articles.find((a) => a.section === section && a.slug === slug);
}
