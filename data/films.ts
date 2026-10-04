// Film data for the Cinema app and terminal.

import { images } from "./images";

export interface Film {
  id: string;
  title: string;
  year: number;
  /** 0–5 */
  rating: number;
  /** Optional poster/still — falls back to a gradient */
  image?: string;
}

export interface CinemaHero {
  eyebrow: [string, string];
  title: string;
  subtitle: string;
  image?: string;
}

export const cinemaHeroes: CinemaHero[] = [
  {
    eyebrow: ["GOOD FILMS", "BRIGHTER DAYS"],
    title: "A personal space for the stories that stay with you.",
    subtitle: "Track, discover and keep your favourite films all in one place.",
    image: images.films.hero,
  },
  {
    eyebrow: ["FAVOURITES", "MIDDLE-EARTH"],
    title: "The Hobbit and The Lord of the Rings.",
    subtitle: "Six films I never get tired of rewatching.",
    image: images.films.hero,
  },
  {
    eyebrow: ["NOW SHOWING", "ON MY SCREEN"],
    title: "Working through the X-Men films.",
    subtitle: "From the original X-Men onwards, in release order.",
  },
];

export const favouriteFilms: Film[] = [
  { id: "fellowship", title: "The Fellowship of the Ring", year: 2001, rating: 5 },
  { id: "two-towers", title: "The Two Towers", year: 2002, rating: 5 },
  { id: "return-of-the-king", title: "The Return of the King", year: 2003, rating: 5 },
  { id: "unexpected-journey", title: "An Unexpected Journey", year: 2012, rating: 5 },
  { id: "desolation-of-smaug", title: "The Desolation of Smaug", year: 2013, rating: 5 },
  { id: "five-armies", title: "The Battle of the Five Armies", year: 2014, rating: 5 },
];

/** Working through the X-Men films in release order */
export const currentlyWatching: Film[] = [
  { id: "x-men", title: "X-Men", year: 2000, rating: 0 },
  { id: "x2", title: "X2", year: 2003, rating: 0 },
  { id: "last-stand", title: "X-Men: The Last Stand", year: 2006, rating: 0 },
  { id: "first-class", title: "X-Men: First Class", year: 2011, rating: 0 },
  { id: "days-of-future-past", title: "X-Men: Days of Future Past", year: 2014, rating: 0 },
  { id: "apocalypse", title: "X-Men: Apocalypse", year: 2016, rating: 0 },
  { id: "dark-phoenix", title: "Dark Phoenix", year: 2019, rating: 0 },
];

export const watchlist: Film[] = [
  { id: "past-lives", title: "Past Lives", year: 2023, rating: 0, image: images.films.pastLives },
  { id: "her", title: "Her", year: 2013, rating: 0, image: images.films.her },
];
