"use client";

import { useId, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

const schema = z.object({
  name: z.string().trim().min(2, "Nhập họ tên để kỹ thuật viên tiện xưng hô"),
  phone: z
    .string()
    .trim()
    .regex(/^(0|\+84)(\s?\d){9}$/, "Số điện thoại cần 10 số, ví dụ 0909 123 456"),
  crop: z.string().trim(),
});
type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

/** Underline field (reference style). The bottom rule is the control's visible boundary. */
function LineField({
  label,
  required,
  error,
  ...props
}: { label: string; required?: boolean; error?: string } & React.ComponentProps<"input">) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-[13px] font-medium text-ink-muted">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      <input
        id={id}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        aria-required={required || undefined}
        className="mt-1 h-12 w-full border-0 border-b-2 border-brand-900/25 bg-transparent px-0 text-base text-brand-900 outline-none transition-colors placeholder:text-ink-subtle hover:border-brand-900/50 focus:border-brand-600 aria-invalid:border-destructive"
        {...props}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[13px] text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

/** Lead capture: two required fields only (design.md §5.9). UI-only – wire to an API later. */
export function QuickConsult({ phone }: { phone: string }) {
  const [values, setValues] = useState<Values>({ name: "", phone: "", crop: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const bind = (k: keyof Values) => ({
    name: k,
    value: values[k],
    error: errors[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
      if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    },
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof Values] ??= issue.message;
      setErrors(next);
      return;
    }
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  }

  return (
    <section aria-labelledby="tu-van-title" className="py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div>
          <h2 id="tu-van-title" className="display text-[2rem] md:text-[2.75rem]">
            Để lại số, kỹ thuật viên gọi lại cho bạn
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted">
            Miễn phí, trong vòng 24 giờ. Cần gấp? Gọi ngay{" "}
            <a href={`tel:${phone}`} className="font-semibold text-brand-900 underline decoration-sun-400 underline-offset-4">
              {phone}
            </a>
            .
          </p>
        </div>

        {status === "sent" ? (
          <div role="status" className="flex items-start gap-4 rounded-[2rem] bg-white p-8 shadow-soft">
            <CheckCircle2 className="size-8 shrink-0 text-brand-600" aria-hidden />
            <div>
              <p className="text-xl font-medium text-brand-900">Đã nhận yêu cầu của {values.name}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                Kỹ thuật viên sẽ gọi tới số {values.phone} trong vòng 24 giờ.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            <LineField label="Họ và tên" required autoComplete="name" placeholder="Nguyễn Văn A" {...bind("name")} />
            <LineField
              label="Số điện thoại"
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="0909 123 456"
              {...bind("phone")}
            />
            <LineField label="Bạn đang trồng cây gì?" placeholder="Cà phê, sầu riêng…" {...bind("crop")} />
            <div className="flex items-end">
              <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="animate-spin" /> Đang gửi…
                  </>
                ) : (
                  "Gọi lại cho tôi"
                )}
              </Button>
            </div>
          </form>
        )}
      </Container>
    </section>
  );
}
