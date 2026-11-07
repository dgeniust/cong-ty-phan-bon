"use client";

import { Link2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
      toast.error("Không thể sao chép liên kết");
    }
  };
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-ink-muted">Chia sẻ:</span>
      <Button variant="outline" size="icon" className="size-9" aria-label={`Chia sẻ "${title}" lên Facebook`} onClick={share}>
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
          <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
        </svg>
      </Button>
      <Button variant="outline" size="icon" className="size-9" aria-label="Sao chép liên kết" onClick={copy}>
        <Link2 />
      </Button>
    </div>
  );
}
