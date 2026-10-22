import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { requireAdminPage } from "@/lib/auth";
import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: "Admin — Kunal Farma",
  robots: { index: false, follow: false },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
        Admin
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
        Dashboard
      </h1>
      <div className="mt-8">{children}</div>
    </div>
  );
}

async function Dashboard() {
  // Authenticated content: opts into dynamic rendering (cacheComponents)
  // and validates the session against the database on every request.
  await connection();
  const user = await requireAdminPage();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Status
        </h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Signed in as</dt>
            <dd className="font-medium text-white">{user.email}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Session valid until</dt>
            <dd className="font-medium text-white">
              {user.expiresAt.toISOString().replace("T", " ").slice(0, 16)} UTC
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Foundation</dt>
            <dd className="font-medium text-emerald-300">
              Auth ready — content management arrives in the next phase
            </dd>
          </div>
        </dl>
      </section>

      <form action={logoutAction}>
        <button
          type="submit"
          className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-red-400/50 hover:text-red-300"
        >
          Log out
        </button>
      </form>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Shell>
      <Suspense
        fallback={
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-zinc-500">Checking session…</p>
          </section>
        }
      >
        <Dashboard />
      </Suspense>
    </Shell>
  );
}
