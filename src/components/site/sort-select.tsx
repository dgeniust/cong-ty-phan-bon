"use client";

import { useId } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

export const SORT_OPTIONS = [
  { value: "noi-bat", label: "Nổi bật" },
  { value: "moi-nhat", label: "Mới nhất" },
  { value: "ten-az", label: "Tên A → Z" },
  { value: "ten-za", label: "Tên Z → A" },
] as const;

export function SortSelect({ value }: { value: string }) {
  const id = useId();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="text-sm text-ink-muted">
        Sắp xếp theo
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => {
            const sp = new URLSearchParams(params);
            sp.set("sap-xep", e.target.value);
            sp.delete("page");
            router.push(`${pathname}?${sp}`, { scroll: false });
          }}
          className="h-10 appearance-none rounded-full bg-surface pl-4 pr-10 text-sm font-medium text-brand-900 outline-none transition-colors hover:bg-surface-strong focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-muted" aria-hidden />
      </div>
    </div>
  );
}
