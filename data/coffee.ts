// Coffee data for the Brew app, lock screen widget, About/Now cards and terminal.

import { images } from "./images";

export interface TastingNote {
  label: string;
  /** Emoji used as the chip icon */
  icon: string;
}

export interface CoffeeBag {
  name: string;
  origin: string;
  /** Rows shown next to the bag in the Brew app (label → value) */
  details: { label: string; value: string }[];
  tastingNotes: TastingNote[];
  /** 0–5 — optional; the Rating row is hidden when not set */
  rating?: number;
  image: string;
  quote?: string;
}

export interface BrewRecipe {
  method: string;
  machine: string;
  dose: string;
  grind: string;
  shotTime: string;
}

export const currentBrew: BrewRecipe = {
  method: "Espresso",
  machine: "Breville Barista Express",
  dose: "18g",
  grind: "11",
  shotTime: "34s",
};

export const currentBag: CoffeeBag = {
  name: "Nkora",
  origin: "Colombia",
  details: [
    { label: "Origin", value: "Colombia" },
    { label: "Machine", value: currentBrew.machine },
    { label: "Grind", value: currentBrew.grind },
  ],
  tastingNotes: [
    { label: "Honey", icon: "🍯" },
    { label: "Chocolate", icon: "🍫" },
    { label: "Roasted nuts", icon: "🌰" },
  ],
  image: images.coffee.currentBag,
  quote: "Honey, chocolate and roasted nuts in every shot.",
};

/** The "My Brew" stats row in the Brew app */
export const brewStats: { icon: string; value: string; label: string }[] = [
  { icon: "cup", value: currentBrew.method, label: "Brew method" },
  { icon: "bean", value: currentBrew.dose, label: "Coffee" },
  { icon: "settings", value: currentBrew.grind, label: "Grind size" },
  { icon: "timer", value: currentBrew.shotTime, label: "Shot time" },
];

export interface CoffeeHistoryEntry {
  name: string;
  roaster?: string;
  origin: string;
  tastingNotes: string[];
  grind?: string;
  /** 0–5 — optional; stars are hidden when not set */
  rating?: number;
}

/** Coffees I've had, most recent first (shown in the Brew app's History tab) */
export const coffeeHistory: CoffeeHistoryEntry[] = [
  {
    name: currentBag.name,
    origin: currentBag.origin,
    tastingNotes: currentBag.tastingNotes.map((n) => n.label),
    grind: currentBrew.grind,
    rating: currentBag.rating,
  },
  {
    name: "Murphy",
    roaster: "Dugout Roastery",
    origin: "Brazil – Nicaragua",
    tastingNotes: ["Chocolate", "Nuts", "Caramel"],
    grind: "10",
    rating: 5,
  },
];

export const coffeeGear: string[] = [currentBrew.machine];

export const coffeeMethods: string[] = [currentBrew.method];

export const coffeeNotes: string[] = [
  `Grind setting ${currentBrew.grind} on the ${currentBrew.machine}.`,
  `${currentBrew.dose} dose, pulled for ${currentBrew.shotTime}.`,
];
