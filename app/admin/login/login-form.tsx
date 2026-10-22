"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-zinc-300"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          maxLength={254}
          className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-indigo-400 focus:outline-none"
          placeholder="admin@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-zinc-300"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={200}
          className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-indigo-400 focus:outline-none"
          placeholder="••••••••••"
        />
      </div>

      {state.error && (
        <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2.5 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
