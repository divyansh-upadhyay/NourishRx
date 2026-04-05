import { prisma } from "./prisma";

export async function generateMealPlan(userId: string) {
  // 1. Fetch user data with conditions and preferences
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      patientProfile: { include: { conditions: true } },
      dietaryPrefs: true,
    }
  });

  if (!user || !user.patientProfile) throw new Error("Patient profile required");

  const conditions = user.patientProfile.conditions.map(c => c.conditionType);
  
  // Rule-based constraints logic...
  const constraints = {
    carbsMax: conditions.includes('type2_diabetes') ? 160 : 300,
    sodiumMax: conditions.includes('hypertension') || conditions.includes('ckd') ? 1500 : 2300,
    potassiumMax: conditions.includes('ckd') ? 2000 : 4000,
  };

  // 2. Fetch recipes
  const allRecipes = await prisma.recipe.findMany({
    include: { nutrients: true }
  });

  // Filter recipes based on constraints (mock logic: just select 21 random or first N fitting)
  // Real logic would filter by checking nutrient objects against the constraints.
  
  // For MVP, we just assign random recipes we have in DB
  if (allRecipes.length < 1) throw new Error("No recipes in database");

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner'];

  // Start transaction
  const result = await prisma.$transaction(async (tx) => {
    // Discard current active plans
    await tx.mealPlan.updateMany({
      where: { userId, status: 'active' },
      data: { status: 'discarded' }
    });

    // Create new plan
    const newPlan = await tx.mealPlan.create({
      data: {
        userId,
        weekStart: new Date(),
        status: 'active'
      }
    });

    // Assign meals
    const itemsData = [];
    for (const day of days) {
      for (const mealType of mealTypes) {
        // Pick random recipe
        const randomRecipe = allRecipes[Math.floor(Math.random() * allRecipes.length)];
        
        itemsData.push({
          planId: newPlan.id,
          day,
          mealType,
          recipeId: randomRecipe.id,
          servings: 1
        });
      }
    }

    await tx.mealPlanItem.createMany({
      data: itemsData
    });

    return newPlan;
  });

  return result;
}
