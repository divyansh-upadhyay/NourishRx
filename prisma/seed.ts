import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Database...')

  // Clean existing data for safety (optional depending on your preference)
  await prisma.recipeNutrient.deleteMany()
  await prisma.recipeIngredient.deleteMany()
  await prisma.recipe.deleteMany()
  await prisma.foodItem.deleteMany()

  // 1. Create Dietitian User
  const dietitianPass = await bcrypt.hash('password123', 10)
  const dietitian = await prisma.user.upsert({
    where: { email: 'dietitian@nourishrx.com' },
    update: {},
    create: {
      email: 'dietitian@nourishrx.com',
      password: dietitianPass,
      role: 'DIETITIAN',
    },
  })
  
  // 2. Create Patient User with Profile
  const patientPass = await bcrypt.hash('password123', 10)
  const patient = await prisma.user.upsert({
    where: { email: 'patient@nourishrx.com' },
    update: {},
    create: {
      email: 'patient@nourishrx.com',
      password: patientPass,
      role: 'PATIENT',
      patientProfile: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
          dob: new Date('1985-05-15'),
          gender: 'Male',
          heightCm: 175,
          weightKg: 85,
          conditions: {
            create: [
              {
                conditionType: 'type2_diabetes',
                severity: 'moderate',
                diagnosedAt: new Date('2022-01-10'),
              }
            ]
          },
          medications: {
            create: [
              {
                name: 'Metformin',
                dosage: '500mg',
                frequency: 'Twice daily',
              }
            ]
          },
          labValues: {
            create: [
              {
                type: 'A1C',
                value: 7.2,
                unit: '%',
                recordedAt: new Date('2026-03-01'),
              }
            ]
          }
        }
      },
      dietaryPrefs: {
        create: {
          cuisinePrefs: 'Indian,Mediterranean',
          allergies: 'Shellfish',
          dislikes: 'Liver',
        }
      }
    },
  })

  // 3. Create Basic Food Items
  const foods = [
    { name: 'Brown Rice', category: 'grains', usdaId: '1001' },
    { name: 'Salmon', category: 'proteins', usdaId: '1002' },
    { name: 'Broccoli', category: 'vegetables', usdaId: '1003' },
    { name: 'Chicken Breast', category: 'proteins', usdaId: '1004' },
    { name: 'Quinoa', category: 'grains', usdaId: '1005' },
    { name: 'Lentils', category: 'proteins', usdaId: '1006' },
  ]
  const createdFoods: any[] = []
  for (const food of foods) {
    createdFoods.push(await prisma.foodItem.create({ data: food }))
  }

  // 4. Create Sample Recipes
  // Recipe 1: Baked Salmon
  const recipe1 = await prisma.recipe.create({
    data: {
      name: 'Herb Baked Salmon with Quinoa',
      cuisine: 'Mediterranean',
      prepTimeMin: 30,
      servings: 2,
      instructions: '1. Preheat oven to 400°F. 2. Season salmon. 3. Bake for 15-20 min. 4. Cook quinoa.',
      imageUrl: '/images/salmon.jpg',
      nutrients: {
        create: [
          { nutrientType: 'calories', amountPerServing: 420, unit: 'kcal' },
          { nutrientType: 'protein', amountPerServing: 38, unit: 'g' },
          { nutrientType: 'carbs', amountPerServing: 42, unit: 'g' },
          { nutrientType: 'fat', amountPerServing: 14, unit: 'g' },
          { nutrientType: 'sodium', amountPerServing: 380, unit: 'mg' },
        ],
      },
      ingredients: {
        create: [
          { foodItemId: createdFoods[1].id, quantity: 6, unit: 'oz' },
          { foodItemId: createdFoods[4].id, quantity: 0.5, unit: 'cup' },
        ],
      },
    },
  })

  // Recipe 2: Lentil Stew (Indian inspired)
  const recipe2 = await prisma.recipe.create({
    data: {
      name: 'Spiced Lentil Dal',
      cuisine: 'Indian',
      prepTimeMin: 45,
      servings: 4,
      instructions: '1. Boil lentils. 2. Sauté spices. 3. Mix and simmer.',
      imageUrl: '/images/dal.jpg',
      nutrients: {
        create: [
          { nutrientType: 'calories', amountPerServing: 350, unit: 'kcal' },
          { nutrientType: 'protein', amountPerServing: 18, unit: 'g' },
          { nutrientType: 'carbs', amountPerServing: 50, unit: 'g' },
          { nutrientType: 'fat', amountPerServing: 8, unit: 'g' },
          { nutrientType: 'sodium', amountPerServing: 410, unit: 'mg' },
        ],
      },
      ingredients: {
        create: [
          { foodItemId: createdFoods[5].id, quantity: 1, unit: 'cup' },
        ],
      },
    },
  })
  
  // Recipe 3: Chicken and Broccoli
  const recipe3 = await prisma.recipe.create({
    data: {
      name: 'Grilled Chicken & Broccoli',
      cuisine: 'American',
      prepTimeMin: 25,
      servings: 2,
      instructions: '1. Grill chicken. 2. Steam broccoli. 3. Serve.',
      imageUrl: '/images/chicken.jpg',
      nutrients: {
        create: [
          { nutrientType: 'calories', amountPerServing: 380, unit: 'kcal' },
          { nutrientType: 'protein', amountPerServing: 45, unit: 'g' },
          { nutrientType: 'carbs', amountPerServing: 12, unit: 'g' },
          { nutrientType: 'fat', amountPerServing: 10, unit: 'g' },
          { nutrientType: 'sodium', amountPerServing: 320, unit: 'mg' },
        ],
      },
      ingredients: {
        create: [
          { foodItemId: createdFoods[3].id, quantity: 8, unit: 'oz' },
          { foodItemId: createdFoods[2].id, quantity: 1, unit: 'cup' },
        ],
      },
    },
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
