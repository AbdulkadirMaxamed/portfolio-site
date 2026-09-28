// Film data for the Cinema app and terminal.
// PLACEHOLDER content — replace with your own favourites.

import { images } from "./images";

export interface Film {
  id: string;
  title: string;
  year: number;
  /** 0–5 */
  rating: number;
  image: string;
}

export interface CinemaHero {
  eyebrow: [string, string];
  title: string;
  subtitle: string;
  image: string;
}

export const cinemaHeroes: CinemaHero[] = [
  {
    eyebrow: ["GOOD FILMS", "BRIGHTER DAYS"],
    title: "A personal space for the stories that stay with you.",
    subtitle: "Track, discover and keep your favourite films all in one place.",
    image: images.films.hero,
  },
  {
    eyebrow: ["NOW SHOWING", "ON MY SCREEN"],
    title: "Films I keep coming back to.",
    subtitle: "Comfort watches, rewatches and the occasional surprise.",
    image: images.films.dune,
  },
  {
    eyebrow: ["UP NEXT", "WATCHLIST"],
    title: "Everything I still want to see.",
    subtitle: "A running list of recommendations from friends.",
    image: images.films.pastLives,
  },
];

export const favouriteFilms: Film[] = [
  { id: "interstellar", title: "Interstellar", year: 2014, rating: 4, image: images.films.interstellar },
  { id: "dark-knight", title: "The Dark Knight", year: 2008, rating: 5, image: images.films.darkKnight },
  { id: "inception", title: "Inception", year: 2010, rating: 4, image: images.films.inception },
  { id: "spirited-away", title: "Spirited Away", year: 2001, rating: 5, image: images.films.spiritedAway },
];

export const recentlyWatched: Film[] = [
  { id: "dune", title: "Dune", year: 2024, rating: 4, image: images.films.dune },
  { id: "past-lives", title: "Past Lives", year: 2023, rating: 4, image: images.films.pastLives },
  { id: "her", title: "Her", year: 2013, rating: 4, image: images.films.her },
];

export const watchlist: Film[] = [
  { id: "past-lives", title: "Past Lives", year: 2023, rating: 0, image: images.films.pastLives },
  { id: "her", title: "Her", year: 2013, rating: 0, image: images.films.her },
];
