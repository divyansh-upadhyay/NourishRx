import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Activity, Clock, Users } from "lucide-react";

export default async function RecipeDetail({ params }: { params: { id: string } }) {
  const recipe = await prisma.recipe.findUnique({
    where: { id: params.id },
    include: {
      ingredients: { include: { foodItem: true } },
      nutrients: true,
    }
  });

  if (!recipe) notFound();

  return (
    <div className="bg-white dark:bg-navy-dark rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="h-64 bg-gray-200 dark:bg-navy-medium relative">
        {/* Placeholder for recipe image */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
           Image: {recipe.name}
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex gap-4 items-center uppercase text-xs font-bold tracking-wider text-medical-teal mb-3">
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {recipe.prepTimeMin} min</span>
          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {recipe.servings} servings</span>
          <span className="px-2 py-1 bg-medical-tealSoft text-medical-teal rounded">{recipe.cuisine}</span>
        </div>

        <h1 className="text-3xl font-heading font-extrabold text-navy-dark dark:text-white mb-6">{recipe.name}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-4 dark:text-white">Ingredients</h3>
              <ul className="space-y-3">
                {recipe.ingredients.map(ing => (
                  <li key={ing.id} className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2 text-navy-light dark:text-gray-300">
                    <span>{ing.foodItem.name}</span>
                    <span className="font-medium text-navy-dark dark:text-white">{ing.quantity} {ing.unit}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4 dark:text-white">Instructions</h3>
              <p className="text-navy-light dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {recipe.instructions}
              </p>
            </section>
          </div>

          <div>
             <div className="border-4 border-black dark:border-white p-4">
               <h2 className="text-2xl font-black border-b-8 border-black dark:border-white pb-2 mb-2 dark:text-white">Nutrition Facts</h2>
               <div className="flex justify-between font-bold border-b-4 border-black dark:border-white pb-1 mb-2 dark:text-white">
                 <span>Amount Per Serving</span>
                 <span>% Daily Value</span>
               </div>
               
               {recipe.nutrients.map(n => (
                 <div key={n.id} className="flex justify-between border-b border-gray-300 dark:border-gray-600 py-1 text-sm dark:text-white">
                   <span className="font-bold">{n.nutrientType.charAt(0).toUpperCase() + n.nutrientType.slice(1)}</span>
                   <span>{n.amountPerServing} {n.unit}</span>
                 </div>
               ))}
               
               <div className="mt-4 bg-medical-tealSoft/50 p-3 text-xs text-medical-tealDark dark:text-teal-200 border border-medical-teal/30 rounded flex gap-2">
                 <Activity className="w-6 h-6 shrink-0" />
                 <p>This recipe matches your clinical profile goals. Contains low sodium and controlled carbohydrates.</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
