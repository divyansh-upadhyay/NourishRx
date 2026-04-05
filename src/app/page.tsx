import Link from "next/link";
import { ArrowRight, Activity, Shield, ShoppingCart, MessageSquare, Power, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-navy-light/10 bg-white/80 dark:bg-navy-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-medical-teal" />
            <span className="font-heading font-bold text-2xl tracking-tight text-navy-dark dark:text-white">
              Nourish<span className="text-medical-teal">Rx</span>
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="text-navy-light hover:text-medical-teal dark:text-gray-300 dark:hover:text-white font-medium self-center px-4">
              Login
            </Link>
            <Link href="/register" className="bg-medical-teal hover:bg-medical-tealDark text-white px-5 py-2.5 rounded-full font-medium transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-medical-tealSoft/50 via-white to-accent-coralLight/20 dark:from-navy-medium dark:via-navy-dark dark:to-navy-dark -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-slide-up">
              <span className="inline-block py-1 px-3 rounded-full bg-medical-teal/10 text-medical-teal font-medium text-sm mb-6 border border-medical-teal/20">
                AI-Powered Medical Nutrition Therapy
              </span>
              <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-navy-dark dark:text-white tracking-tight mb-8">
                Your Health, <span className="gradient-text">Personalized</span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-navy-light dark:text-gray-300 mb-10 leading-relaxed">
                NourishRx generates instant, medically-tailored meal plans for Chronic Kidney Disease, Diabetes, and Heart Health.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/register" className="bg-medical-teal hover:bg-medical-tealDark text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  Start Your Plan <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#how-it-works" className="bg-white dark:bg-navy-light text-navy-dark dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-full font-bold text-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  How it Works
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white dark:bg-navy-dark" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-dark dark:text-white mb-4">
                Everything you need to succeed
              </h2>
              <p className="text-navy-light dark:text-gray-400 max-w-2xl mx-auto">
                Built specifically for patients managing complex nutritional needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Power, title: "AI Generation", desc: "Instant meal plans perfectly optimized for your lab values and medical constraints." },
                { icon: ShoppingCart, title: "Grocery Delivery", desc: "1-click cart fulfillment with Instacart and Walmart." },
                { icon: MessageSquare, title: "Dietitian Chat", desc: "Direct access to Registered Dietitians when you need guidance." },
                { icon: Activity, title: "Health Tracking", desc: "Monitor your A1C, blood pressure, and weight in one place." },
                { icon: Shield, title: "HIPAA Compliant", desc: "Bank-level encryption keeping your Protected Health Information secure." },
                { icon: Award, title: "Clinically Validated", desc: "Rules engine built on USDA data and national clinical guidelines." },
              ].map((feature, i) => (
                <div key={i} className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-medical-tealSoft dark:bg-medical-teal/20 flex items-center justify-center text-medical-teal mb-6">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">{feature.title}</h3>
                  <p className="text-navy-light dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section - INR */}
        <section className="py-24 bg-gray-50 dark:bg-navy-medium border-t border-gray-100 dark:border-navy-light/10" id="pricing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-dark dark:text-white mb-4">
                Affordable Medical Nutrition
              </h2>
              <p className="text-navy-light dark:text-gray-400 max-w-2xl mx-auto">
                Choose the plan that fits your healthcare journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Basic */}
              <div className="bg-white dark:bg-navy-dark rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Basic</h3>
                <p className="text-navy-light dark:text-gray-400 mb-6">Essential AI meal planning.</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold dark:text-white">₹10</span>
                  <span className="text-navy-light dark:text-gray-400">/month</span>
                </div>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center gap-3"><Activity className="w-5 h-5 text-medical-teal" /> <span className="dark:text-gray-300">Custom Meal Plans</span></li>
                  <li className="flex items-center gap-3"><Activity className="w-5 h-5 text-medical-teal" /> <span className="dark:text-gray-300">Health Profile</span></li>
                  <li className="flex items-center gap-3"><Activity className="w-5 h-5 text-medical-teal" /> <span className="dark:text-gray-300">Recipe Database</span></li>
                </ul>
                <Link href="/register?plan=basic" className="block w-full text-center bg-gray-100 hover:bg-gray-200 dark:bg-navy-light dark:hover:bg-gray-600 text-navy-dark dark:text-white py-3 rounded-xl font-bold transition-colors">
                  Choose Basic
                </Link>
              </div>

              {/* Standard */}
              <div className="bg-medical-teal text-white rounded-3xl p-8 shadow-xl relative transform md:-translate-y-4 border-2 border-medical-teal">
                <div className="absolute top-0 right-0 bg-accent-coral text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-2xl uppercase tracking-wider">
                  Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Standard</h3>
                <p className="text-teal-100 mb-6">For active management.</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">₹20</span>
                  <span className="text-teal-100">/month</span>
                </div>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center gap-3"><Activity className="w-5 h-5 text-teal-200" /> <span>Everything in Basic</span></li>
                  <li className="flex items-center gap-3"><Activity className="w-5 h-5 text-teal-200" /> <span>Grocery Integration</span></li>
                  <li className="flex items-center gap-3"><Activity className="w-5 h-5 text-teal-200" /> <span>Progress Tracking Charts</span></li>
                </ul>
                <Link href="/register?plan=standard" className="block w-full text-center bg-white text-medical-teal hover:bg-gray-50 py-3 rounded-xl font-bold transition-colors shadow-sm">
                  Choose Standard
                </Link>
              </div>

              {/* Complete */}
              <div className="bg-white dark:bg-navy-dark rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Complete</h3>
                <p className="text-navy-light dark:text-gray-400 mb-6">Full clinical support.</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold dark:text-white">₹50</span>
                  <span className="text-navy-light dark:text-gray-400">/month</span>
                </div>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center gap-3"><Activity className="w-5 h-5 text-medical-teal" /> <span className="dark:text-gray-300">Everything in Standard</span></li>
                  <li className="flex items-center gap-3"><Activity className="w-5 h-5 text-medical-teal" /> <span className="dark:text-gray-300">Unlimited Dietitian Chat</span></li>
                  <li className="flex items-center gap-3"><Activity className="w-5 h-5 text-medical-teal" /> <span className="dark:text-gray-300">Priority Support</span></li>
                </ul>
                <Link href="/register?plan=complete" className="block w-full text-center bg-gray-100 hover:bg-gray-200 dark:bg-navy-light dark:hover:bg-gray-600 text-navy-dark dark:text-white py-3 rounded-xl font-bold transition-colors">
                  Choose Complete
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy-dark text-white py-12 border-t border-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-medical-teal" />
            <span className="font-heading font-bold text-xl tracking-tight">
              Nourish<span className="text-medical-teal">Rx</span>
            </span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2026 NourishRx platform. All rights reserved. Not intended to replace professional medical advice.
          </div>
        </div>
      </footer>
    </div>
  );
}
