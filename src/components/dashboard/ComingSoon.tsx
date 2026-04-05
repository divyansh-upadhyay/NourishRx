import { Utensils, MessageSquare, ShoppingCart, Activity } from "lucide-react";
import Link from "next/link";

export default function PlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 dark:bg-navy-dark rounded-2xl border border-gray-200 dark:border-gray-800 min-h-[400px]">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-medical-tealSoft text-medical-teal mb-6">
        <Activity className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold dark:text-white mb-2">Coming Soon</h2>
      <p className="text-navy-light dark:text-gray-400 max-w-md mx-auto mb-8">
        This is a placeholder for the MVP demonstration. In Phase 2, this section will be fully integrated.
      </p>
      <Link href="/dashboard" className="px-6 py-2 bg-medical-teal text-white font-bold rounded-xl">
        Back to Dashboard
      </Link>
    </div>
  );
}
