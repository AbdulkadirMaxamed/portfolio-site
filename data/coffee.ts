// Coffee data for the Brew app, lock screen widget and terminal.
// PLACEHOLDER content — replace with your own bags and recipes.

import { images } from "./images";

export interface TastingNote {
  label: string;
  /** Emoji used as the chip icon */
  icon: string;
}

export interface CoffeeBag {
  name: string;
  roaster: string;
  process: string;
  variety: string;
  tastingNotes: TastingNote[];
  /** 0–5 */
  rating: number;
  image: string;
  quote?: string;
}

export interface BrewRecipe {
  method: string;
  methodLong: string;
  coffee: string;
  water: string;
  temperature: string;
  time: string;
}

export const currentBag: CoffeeBag = {
  name: "Ethiopia Guji",
  roaster: "B&W Roasters",
  process: "Washed",
  variety: "Heirloom",
  tastingNotes: [
    { label: "Peach", icon: "🍑" },
    { label: "Jasmine", icon: "🌸" },
    { label: "Bergamot", icon: "🍋" },
  ],
  rating: 4,
  image: images.coffee.currentBag,
  quote: "Bright, floral, and a little bit of adventure in every cup.",
};

export const currentBrew: BrewRecipe = {
  method: "V60",
  methodLong: "V60 (Pour Over)",
  coffee: "15g",
  water: "250g",
  temperature: "94°C",
  time: "2:45",
};

export const coffeeHistory: Pick<CoffeeBag, "name" | "roaster" | "process" | "rating">[] = [
  { name: "Ethiopia Guji", roaster: "B&W Roasters", process: "Washed", rating: 4 },
  { name: "Colombia Huila", roaster: "Local Roastery", process: "Natural", rating: 4 },
  { name: "Kenya Nyeri", roaster: "Square Mile", process: "Washed", rating: 5 },
];

export const coffeeGear: string[] = ["Hario V60 02", "Comandante C40 grinder", "Fellow Stagg EKG kettle", "Acaia Pearl scale"];

export const coffeeMethods: string[] = ["V60", "AeroPress", "Chemex", "French Press"];

export const coffeeNotes: string[] = [
  "Grind a touch finer for lighter roasts.",
  "Bloom for 40s with 2× the coffee weight in water.",
];
