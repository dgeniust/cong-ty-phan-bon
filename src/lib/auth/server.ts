import "server-only";
import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";
import { SESSION_COOKIE, verifySession, type Role, type Session } from "./session";

type UserRecord = { email: string; password: string; role: Role };

/**
 * Users come from env. Replace with a DB lookup (+ bcrypt) when needed;
 * everything else only relies on the Session { sub, role } shape.
 */
function getUsers(): UserRecord[] {
  const email = process.env.ADMIN_EMAIL ?? (process.env.NODE_ENV !== "production" ? "admin@kimngoan.vn" : "");
  const password = process.env.ADMIN_PASSWORD ?? (process.env.NODE_ENV !== "production" ? "1" : "");
  return email && password ? [{ email, password, role: "ADMIN" }] : [];
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function authenticate(email: string, password: string): Session | null {
  const user = getUsers().find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user || !safeEqual(user.password, password)) return null;
  return { sub: user.email, role: user.role };
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

/** Throws unless the current user has the ADMIN role. Use in every server action / route that mutates content. */
export async function requireAdmin(): Promise<Session> {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") throw new Error("FORBIDDEN");
  return session;
}
