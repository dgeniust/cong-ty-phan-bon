import type { SiteContent } from "./schema";

export const defaultContent: SiteContent = {
  site: {
    companyPrefix: "CÔNG TY TNHH",
    companyName: "KIM NGOAN",
    slogan: "Đại lý phân bón - Vì mùa màng bội thu",
    logo: "",
    phone: "123456789",
    email: "kimngoan@example.com",
    address: "Chơn Thành - Đồng Nai",
    facebook: "https://facebook.com",
    seoTitle: "Công ty TNHH Kim Ngoan – Đại lý phân bón & thuốc BVTV",
    seoDescription:
      "Đại lý phân bón uy tín tại Chơn Thành - Đồng Nai. Cung cấp phân bón, thuốc bảo vệ thực vật chất lượng cao cho nhà nông.",
  },
  nav: [
    { label: "Trang chủ", href: "#trang-chu" },
    { label: "Giới thiệu", href: "#gioi-thieu" },
    { label: "Sản phẩm", href: "#san-pham" },
    { label: "Cây trồng", href: "#cay-trong" },
    { label: "Tin tức", href: "#tin-tuc" },
    { label: "Liên hệ", href: "#lien-he" },
  ],
  hero: {
    autoplay: true,
    slides: [
      {
        eyebrow: "ĐẠI LÝ PHÂN BÓN",
        titleLine1: "CÔNG TY TNHH",
        titleLine2: "KIM NGOAN",
        tagline: "Đồng hành cùng nhà nông\nvì một nền nông nghiệp bền vững",
        description: "Cung cấp các loại phân bón và thuốc bảo vệ thực vật",
        ctaLabel: "Xem sản phẩm",
        ctaHref: "#san-pham",
        image: "/tmp-img.jpg",
      },
      {
        eyebrow: "GIẢI PHÁP DINH DƯỠNG",
        titleLine1: "MÙA MÀNG",
        titleLine2: "BỘI THU",
        tagline: "Chọn đúng phân bón\ncho từng loại cây trồng",
        description: "Tư vấn kỹ thuật miễn phí cho cà phê, cao su, sầu riêng, tiêu và lúa",
        ctaLabel: "Tư vấn ngay",
        ctaHref: "#lien-he",
        image: "/tmp-img.jpg",
      },
    ],
  },
  features: [
    { icon: "ShieldCheck", title: "Sản phẩm chính hãng", description: "Chất lượng, uy tín" },
    { icon: "Truck", title: "Giao hàng nhanh chóng", description: "Đúng hẹn, tận nơi" },
    { icon: "Sprout", title: "Tư vấn kỹ thuật tận tâm", description: "Đồng hành cùng nhà nông" },
    { icon: "Handshake", title: "Giá cả hợp lý", description: "Hỗ trợ tối đa" },
  ],
  products: {
    title: "Sản phẩm của chúng tôi",
    subtitle: "Đa dạng sản phẩm - Đáp ứng mọi nhu cầu của nhà nông",
    items: [
      {
        title: "Phân bón",
        bullets: ["Phân bón hữu cơ", "Phân bón vô cơ", "Phân bón NPK", "Phân bón vi sinh"],
        image: "/tmp-img.jpg",
        ctaLabel: "Xem chi tiết",
        ctaHref: "#lien-he",
      },
      {
        title: "Thuốc bảo vệ thực vật",
        bullets: ["Thuốc trừ sâu", "Thuốc trừ bệnh", "Thuốc diệt cỏ", "Thuốc kích thích sinh trưởng"],
        image: "/tmp-img.jpg",
        ctaLabel: "Xem chi tiết",
        ctaHref: "#lien-he",
      },
    ],
  },
  crops: {
    title: "Cây trồng tiêu biểu",
    subtitle: "Chúng tôi cung cấp giải pháp dinh dưỡng và bảo vệ cây trồng cho nhiều loại cây trồng chủ lực",
    items: [
      { name: "Cây cà phê", description: "Năng suất cao - Chất lượng tốt", image: "/tmp-img.jpg" },
      { name: "Cây cao su", description: "Bền vững - Hiệu quả lâu dài", image: "/tmp-img.jpg" },
      { name: "Cây sầu riêng", description: "Trái to - Ngọt đậm", image: "/tmp-img.jpg" },
      { name: "Cây tiêu", description: "Phát triển mạnh - Ít sâu bệnh", image: "/tmp-img.jpg" },
      { name: "Cây lúa", description: "Xanh lá - Bội thu", image: "/tmp-img.jpg" },
    ],
  },
  about: {
    title: "Về chúng tôi",
    quote: "Nông nghiệp phát triển\nlà cuộc sống ấm no hơn",
    image: "/tmp-img.jpg",
    paragraphs: [
      "Công ty TNHH Kim Ngoan là đại lý phân bón uy tín tại khu vực Chơn Thành - Đồng Nai, chuyên cung cấp các loại phân bón và thuốc bảo vệ thực vật chất lượng cao, phục vụ bà con nông dân.",
      "Với phương châm \"Chất lượng tạo nên niềm tin\", chúng tôi luôn nỗ lực mang đến những sản phẩm tốt nhất, dịch vụ chuyên nghiệp và giải pháp nông nghiệp hiệu quả cho mọi nhà nông.",
    ],
    ctaLabel: "Tìm hiểu thêm",
    ctaHref: "#lien-he",
    highlights: [
      { icon: "ShieldCheck", title: "Uy tín lâu năm" },
      { icon: "Sprout", title: "Sản phẩm đa dạng" },
      { icon: "Users", title: "Đội ngũ chuyên nghiệp" },
      { icon: "HeartHandshake", title: "Luôn đồng hành cùng nhà nông" },
    ],
  },
  contact: {
    title: "Liên hệ ngay",
    subtitle: "Để được tư vấn và hỗ trợ tốt nhất!",
    addressLabel: "Địa chỉ",
  },
  footer: {
    sloganLine1: "Hợp tác hôm nay",
    sloganLine2: "Thịnh vượng ngày mai",
    copyright: "© 2025 Công Ty TNHH Kim Ngoan. Tất cả quyền được bảo lưu.",
    links: [
      { label: "Trang chủ", href: "#trang-chu" },
      { label: "Giới thiệu", href: "#gioi-thieu" },
      { label: "Sản phẩm", href: "#san-pham" },
      { label: "Tin tức", href: "#tin-tuc" },
      { label: "Liên hệ", href: "#lien-he" },
    ],
  },
};
