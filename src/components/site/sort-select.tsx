"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

export const SORT_OPTIONS = [
  { value: "noi-bat", label: "Nổi bật" },
  { value: "moi-nhat", label: "Mới nhất" },
  { value: "ten-az", label: "Tên A → Z" },
  { value: "ten-za", label: "Tên Z → A" },
] as const;

export function SortSelect({ value }: { value: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  return (
    <label className="flex items-center gap-2 text-sm text-ink-muted">
      <ArrowUpDown className="size-4" aria-hidden />
      <span className="hidden sm:inline">Sắp xếp:</span>
      <select
        value={value}
        onChange={(e) => {
          const sp = new URLSearchParams(params);
          sp.set("sap-xep", e.target.value);
          sp.delete("page");
          router.push(`${pathname}?${sp}`, { scroll: false });
        }}
        className="h-9 rounded-full border border-input bg-white px-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
