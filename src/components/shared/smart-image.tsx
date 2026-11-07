import Image, { type ImageProps } from "next/image";

/**
 * next/image wrapper: uploaded files (/uploads/*) and external URLs are served
 * unoptimized so they work without remotePatterns config (design.md §9).
 */
export function SmartImage({ src, alt, ...props }: Omit<ImageProps, "src"> & { src: string }) {
  const unoptimized = src.startsWith("/uploads/") || /^https?:\/\//.test(src);
  if (!src) return <div className="size-full bg-brand-100" aria-hidden />;
  return <Image src={src} alt={alt} unoptimized={unoptimized} {...props} />;
}
