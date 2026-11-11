import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { ContactForm } from "@/components/site/contact-form";
import { PageHero } from "@/components/site/page-hero";
import { getContent } from "@/lib/content/store";
import { getProduct } from "@/lib/mock/products";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Liên hệ Kim Ngoan để đặt hàng và được tư vấn kỹ thuật miễn phí. Địa chỉ, số điện thoại, giờ làm việc và bản đồ chỉ đường.",
  alternates: { canonical: "/lien-he" },
};

const WORKING_HOURS = "Thứ 2 – Chủ nhật, 7:00 – 18:00";

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ "san-pham"?: string }> }) {
  const [{ site }, sp] = await Promise.all([getContent(), searchParams]);
  const product = sp["san-pham"] ? getProduct(sp["san-pham"]) : undefined;
  const companyName = `${site.companyPrefix} ${site.companyName}`.trim();

  const info = [
    { icon: Phone, label: "Điện thoại", value: site.phone, href: `tel:${site.phone}`, strong: true },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Địa chỉ", value: site.address },
    { icon: Clock, label: "Giờ làm việc", value: WORKING_HOURS },
  ];

  return (
    <>
      <PageHero
        title="Liên hệ"
        description="Gọi trực tiếp để được tư vấn ngay, hoặc để lại lời nhắn – kỹ thuật viên sẽ gọi lại cho bạn trong vòng 24 giờ."
        crumbs={[{ label: "Liên hệ" }]}
      />

      <Container className="grid gap-12 py-14 md:py-20 lg:grid-cols-[360px_1fr] lg:gap-16">
        <div>
          <h2 className="text-xl font-semibold text-brand-900">{companyName}</h2>
          <address className="mt-6 space-y-6 not-italic">
            {info.map(({ icon: Icon, label, value, href, strong }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-[13px] text-ink-subtle">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className={
                        strong
                          ? "mt-0.5 block text-xl font-semibold tabular-nums text-brand-900 hover:text-brand-700"
                          : "mt-0.5 block break-words text-base font-medium text-brand-900 hover:text-brand-700"
                      }
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-base font-medium text-brand-900">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </address>
        </div>

        <section aria-labelledby="gui-loi-nhan" className="rounded-3xl bg-surface p-6 sm:p-8 md:p-10">
          <h2 id="gui-loi-nhan" className="text-2xl font-bold tracking-tight text-brand-900">
            Gửi lời nhắn
          </h2>
          <p className="mb-8 mt-2 text-[15px] text-ink-muted">Các ô có dấu * là bắt buộc.</p>
          <ContactForm defaultMessage={product ? `Tôi cần tư vấn về sản phẩm: ${product.name}.` : ""} />
        </section>
      </Container>

      <section aria-label="Bản đồ" className="pb-20 md:pb-28">
        <Container>
          <div className="overflow-hidden rounded-3xl bg-surface">
            <iframe
              title={`Bản đồ chỉ đường đến ${companyName}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
              className="block h-[380px] w-full md:h-[460px]"
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
