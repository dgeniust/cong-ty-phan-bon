/** Public site URL – set NEXT_PUBLIC_SITE_URL in production (e.g. https://kimngoan.vn). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const absoluteUrl = (path = "/") =>
  /^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

/**
 * Links saved in the CMS may be section anchors ("#san-pham") that only exist on the
 * home page. Prefix them with "/" so they keep working from every inner page.
 */
export const resolveHref = (href: string) => (href.startsWith("#") ? `/${href}` : href);
