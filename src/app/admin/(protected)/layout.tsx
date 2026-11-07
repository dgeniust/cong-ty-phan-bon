import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/server";

// Defence in depth: middleware already gates /admin, re-check role on the server.
export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (session?.role !== "ADMIN") redirect("/admin/login");
  return <div className="min-h-screen bg-muted">{children}</div>;
}
