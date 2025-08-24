export interface Recipe {
  id: string
  name: string
  description: string
  image: string
  prepTime: number // minutes
  cookTime: number
  totalTime: number
  servings: number
  difficulty: "Lätt" | "Medel" | "Svår"
  category: string
  tags: string[]
  ingredients: Ingredient[]
  steps: Step[]
  nutrition: Nutrition
  allergens: string[]
}

export interface Ingredient {
  id: string
  name: string
  amount: number
  unit: string
  notes?: string
}

export interface Step {
  id: string
  instruction: string
  duration?: number // minutes
  temperature?: number
  notes?: string
}

export interface Nutrition {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
}

// Example Swedish recipes
export const mockRecipes: Recipe[] = [
  {
    id: "1",
    name: "Klassiska köttbullar med gräddsås",
    description:
      "Traditionella svenska köttbullar med krämig gräddsås och lingonsylt. En riktig husmanskost som värmer hjärtat.",
    image: "/swedish-meatballs-with-cream-sauce.png",
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 4,
    difficulty: "Medel",
    category: "Huvudrätt",
    tags: ["Husmanskost", "Kött", "Klassiker", "Familj"],
    ingredients: [
      { id: "1", name: "Köttfärs (blandfärs)", amount: 500, unit: "g" },
      { id: "2", name: "Ägg", amount: 1, unit: "st" },
      { id: "3", name: "Ströbröd", amount: 1, unit: "dl" },
      { id: "4", name: "Mjölk", amount: 1, unit: "dl" },
      { id: "5", name: "Gul lök", amount: 1, unit: "st", notes: "finhackad" },
      { id: "6", name: "Smör", amount: 2, unit: "msk" },
      { id: "7", name: "Vispgrädde", amount: 3, unit: "dl" },
      { id: "8", name: "Soja", amount: 1, unit: "msk" },
    ],
    steps: [
      { id: "1", instruction: "Blanda ströbröd och mjölk i en skål. Låt svälla i 5 minuter.", duration: 5 },
      {
        id: "2",
        instruction:
          "Tillsätt köttfärs, ägg och hackad lök. Krydda med salt och peppar. Arbeta ihop till en smidig smet.",
      },
      { id: "3", instruction: "Forma till köttbullar med våta händer. Gör dem lagom stora, cirka 3 cm i diameter." },
      {
        id: "4",
        instruction: "Stek köttbullarna i smör på medelhög värme tills de är gyllenbruna runt om, cirka 8-10 minuter.",
        duration: 10,
      },
      { id: "5", instruction: "Häll i grädde och soja. Låt sjuda i 10 minuter tills såsen tjocknat.", duration: 10 },
      { id: "6", instruction: "Servera med kokt potatis, lingonsylt och inlagd gurka." },
    ],
    nutrition: {
      calories: 485,
      protein: 28,
      carbs: 12,
      fat: 36,
      fiber: 2,
      sugar: 8,
    },
    allergens: ["Gluten", "Mjölk", "Ägg"],
  },
  {
    id: "2",
    name: "Pannkakor med sylt och grädde",
    description:
      "Fluffiga svenska pannkakor som smakar som barndomens söndagar. Perfekta till eftermiddag eller som efterrätt.",
    image: "/swedish-pancakes-with-jam-and-cream.png",
    prepTime: 10,
    cookTime: 20,
    totalTime: 30,
    servings: 4,
    difficulty: "Lätt",
    category: "Efterrätt",
    tags: ["Söt", "Klassiker", "Barnfavorit", "Snabbt"],
    ingredients: [
      { id: "1", name: "Ägg", amount: 3, unit: "st" },
      { id: "2", name: "Mjölk", amount: 6, unit: "dl" },
      { id: "3", name: "Vetemjöl", amount: 3, unit: "dl" },
      { id: "4", name: "Salt", amount: 1, unit: "krm" },
      { id: "5", name: "Smör", amount: 50, unit: "g", notes: "till stekning" },
      { id: "6", name: "Jordgubbssylt", amount: 1, unit: "dl" },
      { id: "7", name: "Vispgrädde", amount: 2, unit: "dl" },
    ],
    steps: [
      { id: "1", instruction: "Vispa ihop ägg och hälften av mjölken i en skål." },
      { id: "2", instruction: "Tillsätt mjöl och salt. Vispa till en slät smet." },
      { id: "3", instruction: "Späd med resterande mjölk tills smeten har rätt konsistens." },
      { id: "4", instruction: "Låt smeten vila i 10 minuter för bästa resultat.", duration: 10 },
      {
        id: "5",
        instruction: "Stek tunna pannkakor i smör på medelhög värme, cirka 1-2 minuter per sida.",
        duration: 2,
      },
      { id: "6", instruction: "Servera varma med sylt och lättvispad grädde." },
    ],
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 38,
      fat: 14,
      fiber: 2,
      sugar: 18,
    },
    allergens: ["Gluten", "Mjölk", "Ägg"],
  },
  {
    id: "3",
    name: "Laxgryta med dill",
    description:
      "En krämig och smakrik fiskgryta med färsk lax och mycket dill. Perfekt vardagsmat som känns lite lyxig.",
    image: "/creamy-salmon-stew-with-dill.png",
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    difficulty: "Medel",
    category: "Huvudrätt",
    tags: ["Fisk", "Krämig", "Dill", "Vardagsmat"],
    ingredients: [
      { id: "1", name: "Laxfilé", amount: 600, unit: "g", notes: "utan skinn" },
      { id: "2", name: "Potatis", amount: 800, unit: "g", notes: "fast sort" },
      { id: "3", name: "Gul lök", amount: 1, unit: "st" },
      { id: "4", name: "Vispgrädde", amount: 4, unit: "dl" },
      { id: "5", name: "Fiskfond", amount: 2, unit: "dl" },
      { id: "6", name: "Färsk dill", amount: 1, unit: "dl", notes: "hackad" },
      { id: "7", name: "Smör", amount: 2, unit: "msk" },
      { id: "8", name: "Citron", amount: 0.5, unit: "st" },
    ],
    steps: [
      { id: "1", instruction: "Skala och skär potatisen i bitar. Koka i saltat vatten i 15 minuter.", duration: 15 },
      { id: "2", instruction: "Skär laxen i stora bitar och krydda med salt och peppar." },
      { id: "3", instruction: "Fräs hackad lök i smör tills den är mjuk, cirka 3 minuter.", duration: 3 },
      { id: "4", instruction: "Tillsätt grädde och fiskfond. Låt koka upp." },
      { id: "5", instruction: "Lägg i laxbitarna och låt sjuda försiktigt i 8-10 minuter.", duration: 10 },
      { id: "6", instruction: "Tillsätt kokt potatis, dill och citronsaft. Smaka av med salt och peppar." },
      { id: "7", instruction: "Servera direkt med färsk dill som garnering." },
    ],
    nutrition: {
      calories: 420,
      protein: 32,
      carbs: 28,
      fat: 22,
      fiber: 3,
      sugar: 6,
    },
    allergens: ["Fisk", "Mjölk"],
  },
]
