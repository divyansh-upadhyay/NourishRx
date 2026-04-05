import Link from "next/link";
import { Activity, Plus, ShoppingCart, MessageSquare, Utensils } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export default async function DashboardHome() {
  const session = await getSession();
  
  // Try to find an active plan
  const activePlan = await prisma.mealPlan.findFirst({
    where: { userId: (session as any).id, status: "active" },
    include: { items: { include: { recipe: true } } },
  });

  const todayMeals = activePlan?.items.filter(item => item.day === 'monday') || [];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-navy-dark dark:text-white">Overview</h1>
          <p className="text-navy-light dark:text-gray-400 mt-1">Here's your nutritional summary for today.</p>
        </div>
        <button className="bg-medical-teal hover:bg-medical-tealDark text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-colors">
          <Plus className="w-4 h-4" />
          Log Meal
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Adherence Card */}
        <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center relative shadow-sm">
          <h3 className="text-navy-light dark:text-gray-400 font-medium absolute top-6 left-6">Goal Adherence</h3>
          <div className="relative w-32 h-32 mt-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="12" fill="none" />
              <circle cx="64" cy="64" r="56" className="stroke-medical-teal" strokeWidth="12" fill="none" strokeDasharray="351.8" strokeDashoffset="52.7" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold dark:text-white">85%</span>
            </div>
          </div>
          <p className="text-sm mt-4 font-medium text-medical-teal">On track today!</p>
        </div>

        {/* Quick Actions */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <Link href="/dashboard/meal-plans" className="bg-gradient-to-br from-medical-tealSoft to-white dark:from-navy-medium dark:to-navy-dark p-6 rounded-2xl border border-medical-teal/20 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="w-10 h-10 rounded-full bg-medical-teal text-white flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg dark:text-white">View Meal Plan</h3>
              <p className="text-sm text-navy-light dark:text-gray-400 mt-1">Check this week's AI-generated meals.</p>
            </div>
          </Link>

          <Link href="/dashboard/grocery" className="bg-white dark:bg-navy-dark p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col justify-between">
             <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg dark:text-white">Grocery Cart</h3>
              <p className="text-sm text-navy-light dark:text-gray-400 mt-1">Order ingredients via Instacart.</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Today's Meals Section */}
      <div>
        <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-medical-teal" />
          Today's Meals
        </h2>
        
        {todayMeals.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {todayMeals.map((item) => (
              <div key={item.id} className="bg-white dark:bg-navy-dark rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-medical-teal">{item.mealType}</span>
                <h3 className="font-bold mt-1 text-lg leading-tight dark:text-white h-12 overflow-hidden">{item.recipe.name}</h3>
                <div className="mt-4 flex justify-between items-center text-sm text-navy-light dark:text-gray-400">
                  <span>{item.recipe.prepTimeMin} mins</span>
                  <Link href={`/dashboard/recipes/${item.recipe.id}`} className="font-medium text-medical-teal hover:underline">View Recipe</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
           <div className="bg-gray-50 dark:bg-navy-medium rounded-2xl p-8 text-center border border-dashed border-gray-300 dark:border-gray-600">
              <Utensils className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold dark:text-white">No active meal plan</h3>
              <p className="text-gray-500 mt-1 mb-4">Generate your first personalized meal plan to see today's meals.</p>
              <Link href="/dashboard/meal-plans" className="bg-medical-teal text-white px-5 py-2 rounded-lg font-medium inline-block">
                Generate Plan
              </Link>
           </div>
        )}
      </div>
    </div>
  );
}
