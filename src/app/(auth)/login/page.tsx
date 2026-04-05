"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full glass-card p-8 rounded-2xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-medical-teal to-accent-coral" />
        
        <div className="text-center mb-8">
          <Activity className="h-12 w-12 text-medical-teal mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy-dark dark:text-white">Welcome back</h2>
          <p className="text-navy-light dark:text-gray-400 mt-2">Log in to NourishRx to manage your plan</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-center mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-navy-dark dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-navy-dark text-navy-dark dark:text-white focus:ring-2 focus:ring-medical-teal focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-dark dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-navy-dark text-navy-dark dark:text-white focus:ring-2 focus:ring-medical-teal focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-medical-teal hover:bg-medical-tealDark text-white py-3 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-navy-light dark:text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="text-medical-teal font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
