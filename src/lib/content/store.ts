import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { defaultContent } from "./default-content";
import { siteContentSchema, type SiteContent } from "./schema";

/**
 * File-based content store (data/content.json).
 * Swap this module for a DB implementation (Prisma, Supabase…) when deploying
 * to a serverless host with a read-only filesystem — the rest of the app only
 * depends on getContent / saveContent.
 */
const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

export async function getContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    const parsed = siteContentSchema.safeParse(JSON.parse(raw));
    if (parsed.success) return parsed.data;
    console.warn("[content] invalid content.json, falling back to defaults", parsed.error.issues);
  } catch {
    // file missing -> defaults
  }
  return defaultContent;
}

export async function saveContent(content: SiteContent): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${CONTENT_FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(content, null, 2), "utf8");
  await fs.rename(tmp, CONTENT_FILE);
}

export async function resetContent(): Promise<void> {
  await fs.rm(CONTENT_FILE, { force: true });
}
