import type { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login — Kunal Farma",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Admin
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">
          Log in to the dashboard
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Authorized access only. All attempts are logged.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
