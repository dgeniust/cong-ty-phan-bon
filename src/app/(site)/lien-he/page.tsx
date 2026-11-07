import type { Metadata } from "next";
import { Building2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { ContactForm } from "@/components/site/contact-form";
import { PageHero } from "@/components/site/page-hero";
import { getContent } from "@/lib/content/store";
import { getProduct } from "@/lib/mock/products";

export const metadata: Metadata = { title: "Liên hệ | Kim Ngoan" };

const WORKING_HOURS = "Thứ 2 – Chủ nhật: 7:00 – 18:00";

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ "san-pham"?: string }> }) {
  const [{ site }, sp] = await Promise.all([getContent(), searchParams]);
  const product = sp["san-pham"] ? getProduct(sp["san-pham"]) : undefined;
  const companyName = `${site.companyPrefix} ${site.companyName}`;

  const info = [
    { icon: Building2, label: "Tên doanh nghiệp", value: companyName },
    { icon: MapPin, label: "Địa chỉ", value: site.address },
    { icon: Phone, label: "Điện thoại", value: site.phone, href: `tel:${site.phone}` },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Clock, label: "Giờ làm việc", value: WORKING_HOURS },
  ];

  return (
    <>
      <PageHero
        title="Liên hệ"
        description="Kim Ngoan luôn sẵn sàng lắng nghe và hỗ trợ bà con. Hãy để lại lời nhắn hoặc gọi trực tiếp cho chúng tôi."
        crumbs={[{ label: "Liên hệ" }]}
      />

      <Container className="grid gap-8 py-10 md:py-14 lg:grid-cols-[380px_1fr]">
        <div className="space-y-4">
          {info.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-4 rounded-2xl border border-border/70 bg-white p-5 shadow-soft">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sun-300/70 text-brand-700">
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</p>
                {href ? (
                  <a href={href} className="mt-0.5 block break-words font-semibold text-brand-800 hover:text-brand-600">
                    {value}
                  </a>
                ) : (
                  <p className="mt-0.5 font-semibold text-brand-800">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-white to-brand-50 p-6 shadow-soft md:p-8">
          <h2 className="text-2xl font-bold uppercase text-brand-700">Gửi lời nhắn</h2>
          <p className="mb-6 mt-1 text-sm text-ink-muted">Điền thông tin bên dưới, chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
          <ContactForm defaultMessage={product ? `Tôi cần tư vấn về sản phẩm: ${product.name}.` : ""} />
        </div>
      </Container>

      <section className="pb-14 md:pb-20">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-brand-50 shadow-soft">
            <iframe
              title={`Bản đồ chỉ đường đến ${companyName}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
              className="block h-[380px] w-full md:h-[450px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Container>
      </section>
    </>
  );
}
