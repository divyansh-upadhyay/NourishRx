"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2, Utensils, CalendarDays } from "lucide-react";

export default function MealPlansPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // In a real app we'd fetch the current plan with SWR/ReactQuery.
  // For simplicity, we just provide the generation button here since we don't have Server Components full layout yet

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/meal-plans/generate", { method: "POST" });
      if (res.ok) {
        // reload to show plan
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-navy-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-medical-teal" />
            Weekly Meal Plan
          </h2>
          <p className="text-navy-light dark:text-gray-400 mt-1">
            AI-generated meals perfectly tailored for your health profile.
          </p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="bg-medical-teal hover:bg-medical-tealDark text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {loading ? "Generating Plan..." : "Generate New Plan"}
        </button>
      </div>

      <div className="bg-medical-tealSoft/50 dark:bg-navy-medium p-12 rounded-3xl text-center border-2 border-dashed border-medical-teal/30 dark:border-navy-light mt-8">
         <Utensils className="w-16 h-16 text-medical-teal/50 mx-auto mb-4" />
         <h3 className="text-xl font-bold dark:text-white">Plan Grid Placeholder</h3>
         <p className="text-navy-light dark:text-gray-400 max-w-md mx-auto mt-2">
           The 7-day grid with breakfast, lunch, and dinner will appear here showing all the meals from your database. Clicking Generate will build 21 new meals.
         </p>
      </div>
    </div>
  );
}
