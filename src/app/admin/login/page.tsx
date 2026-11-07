import { Logo } from "@/components/shared/logo";
import { LoginForm } from "@/components/admin/login-form";
import { getContent } from "@/lib/content/store";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const [{ site }, { next }] = await Promise.all([getContent(), searchParams]);
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-sun-100 via-brand-50 to-brand-100 p-4">
      <div className="w-full max-w-sm">
        <Logo prefix={site.companyPrefix} name={site.companyName} slogan={site.slogan} logo={site.logo} className="mb-6 justify-center" />
        <LoginForm next={next ?? "/admin"} />
      </div>
    </main>
  );
}
