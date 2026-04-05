import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { 
  LayoutDashboard, 
  CalendarDays, 
  UtensilsCrossed, 
  LineChart, 
  ShoppingCart, 
  MessageSquare, 
  UserCircle 
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  const navigations = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Meal Plans", href: "/dashboard/meal-plans", icon: CalendarDays },
    { name: "Recipes", href: "/dashboard/recipes", icon: UtensilsCrossed },
    { name: "Progress", href: "/dashboard/progress", icon: LineChart },
    { name: "Grocery", href: "/dashboard/grocery", icon: ShoppingCart },
    { name: "Dietitian", href: "/dashboard/dietitian", icon: MessageSquare },
    { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-navy-dark border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-medical-teal text-white flex items-center justify-center font-bold">N</div>
            <span className="font-heading font-bold text-xl text-navy-dark dark:text-white">NourishRx</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigations.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-navy-light dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-medium hover:text-medical-teal transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="bg-gray-50 dark:bg-navy-medium rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Subscription</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold dark:text-white">Standard Plan</span>
              <span className="px-2 py-1 bg-medical-tealSoft text-medical-teal text-xs rounded font-bold">Active</span>
            </div>
            <Link href="/dashboard/settings" className="text-xs text-medical-teal hover:underline mt-2 inline-block">Manage</Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white/80 dark:bg-navy-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="md:hidden">
            <span className="font-heading font-bold text-lg text-navy-dark dark:text-white">NourishRx</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-medical-teal text-white flex items-center justify-center font-bold text-sm">
              U
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
