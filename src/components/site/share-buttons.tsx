"use client";

import { Link2 } from "lucide-react";
import { toast } from "sonner";

const btn =
  "grid size-9 place-items-center rounded-full bg-white text-brand-800 transition-shadow hover:shadow-soft focus-visible:ring-2 focus-visible:ring-brand-500";

export function ShareButtons({ title }: { title: string }) {
  const share = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank", "noopener,width=600,height=500");
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Đã sao chép liên kết");
    } catch {
      toast.error("Trình duyệt chặn sao chép. Hãy sao chép địa chỉ trên thanh trình duyệt.");
    }
  };
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-ink-muted">Chia sẻ</span>
      <button type="button" className={btn} aria-label={`Chia sẻ “${title}” lên Facebook`} onClick={share}>
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
          <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
        </svg>
      </button>
      <button type="button" className={btn} aria-label="Sao chép liên kết" onClick={copy}>
        <Link2 className="size-4" />
      </button>
    </div>
  );
}
