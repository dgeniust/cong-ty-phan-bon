"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên"),
  phone: z
    .string()
    .trim()
    .regex(/^(0|\+84)(\s?\d){9}$/, "Số điện thoại không hợp lệ (VD: 0909 123 456)"),
  email: z.union([z.literal(""), z.string().trim().email("Email không hợp lệ")]),
  message: z.string().trim().min(10, "Nội dung tối thiểu 10 ký tự"),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

/** UI-only: validates on the client and simulates sending. Wire `onSubmit` to an API/server action later. */
export function ContactForm({ defaultMessage = "" }: { defaultMessage?: string }) {
  const [values, setValues] = useState<Values>({ name: "", phone: "", email: "", message: defaultMessage });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

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
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  }

  if (status === "sent")
    return (
      <div className="flex flex-col items-center py-10 text-center" role="status">
        <span className="grid size-16 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft">
          <CheckCircle2 className="size-9" aria-hidden />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-brand-900">Đã gửi lời nhắn</h3>
        <p className="mt-2 max-w-sm text-sm text-ink-muted">
          Cảm ơn {values.name}. Kim Ngoan sẽ liên hệ lại với bạn qua số {values.phone} trong thời gian sớm nhất.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setValues({ name: "", phone: "", email: "", message: "" });
            setStatus("idle");
          }}
        >
          Gửi lời nhắn khác
        </Button>
      </div>
    );

  const field = (k: keyof Values) => ({
    id: `contact-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": !!errors[k] || undefined,
    "aria-describedby": errors[k] ? `contact-${k}-error` : undefined,
    "aria-required": k !== "email" || undefined,
  });
  const err = (k: keyof Values) =>
    errors[k] ? (
      <p id={`contact-${k}-error`} className="text-[13px] text-destructive">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">
            Họ và tên <span className="text-destructive">*</span>
          </Label>
          <Input {...field("name")} autoComplete="name" placeholder="Nguyễn Văn A" />
          {err("name")}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-phone">
            Số điện thoại <span className="text-destructive">*</span>
          </Label>
          <Input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="0909 123 456" />
          {err("phone")}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input {...field("email")} type="email" autoComplete="email" placeholder="email@example.com" />
        {err("email")}
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">
          Nội dung lời nhắn <span className="text-destructive">*</span>
        </Label>
        <Textarea {...field("message")} rows={5} placeholder="Bạn cần tư vấn sản phẩm cho loại cây trồng nào, diện tích bao nhiêu…" />
        {err("message")}
      </div>
      <Button type="submit" variant="sun" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? <Loader2 className="animate-spin" /> : <Send />} {status === "sending" ? "Đang gửi…" : "Gửi lời nhắn"}
      </Button>
    </form>
  );
}
