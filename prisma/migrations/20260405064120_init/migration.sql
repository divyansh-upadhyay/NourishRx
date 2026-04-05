-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'PATIENT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PatientProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dob" DATETIME NOT NULL,
    "gender" TEXT NOT NULL,
    "heightCm" REAL NOT NULL,
    "weightKg" REAL NOT NULL,
    CONSTRAINT "PatientProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Condition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "conditionType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "diagnosedAt" DATETIME NOT NULL,
    CONSTRAINT "Condition_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "PatientProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    CONSTRAINT "Medication_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "PatientProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LabValue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "recordedAt" DATETIME NOT NULL,
    CONSTRAINT "LabValue_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "PatientProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DietaryPreference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cuisinePrefs" TEXT NOT NULL DEFAULT '',
    "allergies" TEXT NOT NULL DEFAULT '',
    "dislikes" TEXT NOT NULL DEFAULT '',
    "religiousRestrictions" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "DietaryPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MealPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "weekStart" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "generatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MealPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MealPlanItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "planId" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "mealType" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "servings" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "MealPlanItem_planId_fkey" FOREIGN KEY ("planId") REFERENCES "MealPlan" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MealPlanItem_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cuisine" TEXT NOT NULL,
    "prepTimeMin" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "imageUrl" TEXT
);

-- CreateTable
CREATE TABLE "RecipeNutrient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipeId" TEXT NOT NULL,
    "nutrientType" TEXT NOT NULL,
    "amountPerServing" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    CONSTRAINT "RecipeNutrient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FoodItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "usdaId" TEXT,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipeId" TEXT NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RecipeIngredient_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroceryCart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'created',
    "provider" TEXT NOT NULL,
    CONSTRAINT "GroceryCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GroceryCart_planId_fkey" FOREIGN KEY ("planId") REFERENCES "MealPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroceryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cartId" TEXT NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    CONSTRAINT "GroceryItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "GroceryCart" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GroceryItem_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DietitianMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sentAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" DATETIME,
    CONSTRAINT "DietitianMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DietitianMessage_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "planType" TEXT NOT NULL,
    "stripeId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "renewsAt" DATETIME,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PatientProfile_userId_key" ON "PatientProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DietaryPreference_userId_key" ON "DietaryPreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeId_key" ON "Subscription"("stripeId");
