import { cn } from "@/lib/utils";
import { SmartImage } from "./smart-image";

type Props = {
  prefix: string;
  name: string;
  slogan: string;
  logo?: string;
  inverted?: boolean;
  className?: string;
};

function LeafMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <path d="M8 56C8 30 24 10 56 6c2 30-16 50-44 50" fill="currentColor" className="text-brand-500" />
      <path d="M4 60C10 44 18 34 30 26" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M6 52C4 38 10 26 22 20c4 12 0 26-16 32Z" fill="currentColor" className="text-brand-700" />
    </svg>
  );
}

export function Logo({ prefix, name, slogan, logo, inverted, className }: Props) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {logo ? (
        <div className="relative size-12 shrink-0">
          <SmartImage src={logo} alt={name} fill sizes="48px" className="object-contain" />
        </div>
      ) : (
        <LeafMark className="size-12 shrink-0" />
      )}
      <div className="leading-none">
        <div className={cn("text-sm font-bold tracking-wide", inverted ? "text-white" : "text-brand-800")}>{prefix}</div>
        <div className={cn("text-2xl font-extrabold tracking-tight", inverted ? "text-white" : "text-brand-700")}>{name}</div>
        <div className={cn("mt-1 text-[10px] italic", inverted ? "text-white/75" : "text-brand-700/80")}>{slogan}</div>
      </div>
    </div>
  );
}
