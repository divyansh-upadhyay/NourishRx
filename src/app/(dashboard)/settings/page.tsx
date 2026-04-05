import { Activity, Camera, Settings as Cog, CreditCard } from "lucide-react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: (session as any).id },
    include: { patientProfile: true, subscriptions: true }
  });

  const subscription = user?.subscriptions[0];
  const activePlan = subscription ? subscription.planType : "standard";

  const plans = [
    { id: "basic", name: "Basic", price: "₹10", features: ["AI Plans", "Profile"] },
    { id: "standard", name: "Standard", price: "₹20", features: ["Basic +", "Grocery", "Charts"] },
    { id: "complete", name: "Complete", price: "₹50", features: ["Standard +", "Dietitian Chat"] },
  ];

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
          <Cog className="w-6 h-6 text-medical-teal" />
          Settings & Subscription
        </h2>
        <p className="text-navy-light dark:text-gray-400 mt-1">Manage your account and billing.</p>
      </div>

      <div className="bg-white dark:bg-navy-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 dark:text-white">
          <CreditCard className="w-5 h-5 text-gray-500" /> Subscription Plan
        </h3>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {plans.map(p => (
             <div key={p.id} className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-all ${activePlan === p.id ? 'border-medical-teal bg-medical-tealSoft/30' : 'border-gray-200 dark:border-gray-700 hover:border-medical-teal/50'}`}>
               <h4 className="font-bold text-lg dark:text-white">{p.name}</h4>
               <p className="text-2xl font-extrabold text-medical-teal my-2">{p.price}<span className="text-sm font-normal text-gray-500">/mo</span></p>
               <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-3">
                 {p.features.map(f => (
                   <li key={f}>{f}</li>
                 ))}
               </ul>
               <button className={`mt-4 px-4 py-1.5 rounded-full text-sm font-bold w-full ${activePlan === p.id ? 'bg-medical-teal text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
                 {activePlan === p.id ? 'Active' : 'Upgrade'}
               </button>
             </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center">In INR (Indian Rupee) as requested. Real checkout flows would use Stripe API here.</p>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-sm">
         <span className="text-gray-500">Need to leave?</span>
         <button className="text-red-500 font-bold hover:underline">Delete Account</button>
      </div>
    </div>
  );
}
