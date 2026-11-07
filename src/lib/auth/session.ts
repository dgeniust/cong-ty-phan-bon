import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "kn_session";
export type Role = "ADMIN" | "EDITOR" | "USER";
export type Session = { sub: string; role: Role };

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) {
    if (process.env.NODE_ENV === "production") throw new Error("AUTH_SECRET must be set (>= 32 chars)");
    return new TextEncoder().encode("dev-only-insecure-secret-change-me-please!!");
  }
  return new TextEncoder().encode(s);
}

export async function signSession(session: Session) {
  return new SignJWT({ role: session.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifySession(token: string | undefined): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (!payload.sub || typeof payload.role !== "string") return null;
    return { sub: payload.sub, role: payload.role as Role };
  } catch {
    return null;
  }
}
