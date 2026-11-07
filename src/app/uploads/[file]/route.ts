import { promises as fs } from "fs";
import path from "path";
import { ALLOWED_TYPES, SAFE_NAME, UPLOAD_DIR } from "@/lib/uploads";

const TYPE_BY_EXT = Object.fromEntries(Object.entries(ALLOWED_TYPES).map(([t, e]) => [e, t]));

/** Serves files uploaded at runtime (Next only serves /public files present at build time). */
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!SAFE_NAME.test(file)) return new Response("Not found", { status: 404 });
  try {
    const buf = await fs.readFile(path.join(UPLOAD_DIR, file));
    return new Response(new Uint8Array(buf), {
      headers: {
        "Content-Type": TYPE_BY_EXT[path.extname(file)] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
