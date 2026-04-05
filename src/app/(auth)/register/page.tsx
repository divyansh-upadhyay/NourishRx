"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    gender: "Male",
    heightCm: "",
    weightKg: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="max-w-md w-full glass-card p-8 rounded-2xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-medical-teal to-accent-coral" />
        
        <div className="text-center mb-8">
          <Activity className="h-10 w-10 text-medical-teal mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-navy-dark dark:text-white">Join NourishRx</h2>
          <p className="text-navy-light dark:text-gray-400 mt-1">Step {step} of 2</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-center mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmit} className="space-y-4">
          {step === 1 && (
            <div className="animate-fade-in space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-navy-dark dark:text-gray-300 mb-1">First Name</label>
                  <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-navy-dark text-navy-dark dark:text-white" />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-navy-dark dark:text-gray-300 mb-1">Last Name</label>
                  <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-navy-dark text-navy-dark dark:text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-dark dark:text-gray-300 mb-1">Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-navy-dark text-navy-dark dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-dark dark:text-gray-300 mb-1">Password</label>
                <input type="password" name="password" required value={formData.password} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-navy-dark text-navy-dark dark:text-white" />
              </div>

              <button type="submit" className="w-full bg-medical-teal hover:bg-medical-tealDark text-white py-3 rounded-xl font-bold transition-all mt-4">
                Continue to Health Profile
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-dark dark:text-gray-300 mb-1">Date of Birth</label>
                <input type="date" name="dob" required value={formData.dob} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-navy-dark text-navy-dark dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-dark dark:text-gray-300 mb-1">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-navy-dark text-navy-dark dark:text-white">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-navy-dark dark:text-gray-300 mb-1">Height (cm)</label>
                  <input type="number" name="heightCm" required value={formData.heightCm} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-navy-dark text-navy-dark dark:text-white" />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-navy-dark dark:text-gray-300 mb-1">Weight (kg)</label>
                  <input type="number" name="weightKg" required value={formData.weightKg} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-navy-dark text-navy-dark dark:text-white" />
                </div>
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-navy-dark dark:text-white py-3 rounded-xl font-bold transition-all mt-4">
                  Back
                </button>
                <button type="submit" disabled={loading} className="w-2/3 bg-medical-teal hover:bg-medical-tealDark text-white py-3 rounded-xl font-bold transition-all mt-4 disabled:opacity-70">
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </div>
          )}
        </form>

        <p className="text-center mt-6 text-sm text-navy-light dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-medical-teal font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
