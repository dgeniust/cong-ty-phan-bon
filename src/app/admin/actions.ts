"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authenticate, requireAdmin } from "@/lib/auth/server";
import { SESSION_COOKIE, signSession } from "@/lib/auth/session";
import { siteContentSchema, type SiteContent } from "@/lib/content/schema";
import { resetContent, saveContent } from "@/lib/content/store";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function loginAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");
  const session = authenticate(email, password);
  if (!session || session.role !== "ADMIN") return { ok: false, error: "Email hoặc mật khẩu không đúng" };

  (await cookies()).set(SESSION_COOKIE, await signSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function saveContentAction(content: SiteContent): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Bạn không có quyền ADMIN" };
  }
  const parsed = siteContentSchema.safeParse(content);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: `Dữ liệu không hợp lệ: ${issue.path.join(".")} – ${issue.message}` };
  }
  await saveContent(parsed.data);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function resetContentAction(): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Bạn không có quyền ADMIN" };
  }
  await resetContent();
  revalidatePath("/", "layout");
  return { ok: true };
}
