import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Quiet text link used for "see all" / secondary actions. */
export function MoreLink({ href, children, className, inverted }: { href: string; children: React.ReactNode; className?: string; inverted?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[15px] font-semibold underline-offset-[6px] hover:underline",
        inverted ? "text-white decoration-sun-300" : "text-brand-800 decoration-sun-400",
        className
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}
