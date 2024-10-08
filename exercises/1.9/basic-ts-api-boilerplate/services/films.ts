import { MyMovie } from "../types";
import { parse, serialize } from "../utils/json";
import path from "node:path";

const jsonDbPath = path.join(__dirname, "../data/films.json");

// Récupérer tous les films
export function getAllMovies(): MyMovie[] {
  return parse<MyMovie>(jsonDbPath, []);
}

// Filtrer les films par durée minimale
export function getFilteredMovies(minDuration?: number): MyMovie[] {
  const allMovies = getAllMovies();
  return minDuration
    ? allMovies.filter(movie => movie.duration >= minDuration)
    : allMovies;
}

// Trouver un film par son ID
export function getMovieById(id: number): MyMovie | undefined {
  const allMovies = getAllMovies();
  return allMovies.find(movie => movie.id === id);
}

// Créer un nouveau film
export function createMovie(movieData: Omit<MyMovie, 'id'>): MyMovie {
  const allMovies = getAllMovies();
  const newMovie: MyMovie = {
    id: allMovies.length + 1,
    ...movieData
  };
  allMovies.push(newMovie);
  serialize(jsonDbPath, allMovies);
  return newMovie;
}

// Supprimer un film par son ID
export function deleteMovie(id: number): MyMovie | null {
  const allMovies = getAllMovies();
  const movieIndex = allMovies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) return null;

  const deletedMovie = allMovies.splice(movieIndex, 1)[0];
  serialize(jsonDbPath, allMovies);
  return deletedMovie;
}

// Mettre à jour un film partiellement
export function updateMoviePartial(id: number, updatedData: Partial<MyMovie>): MyMovie | null {
  const allMovies = getAllMovies();
  const movieIndex = allMovies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) return null;

  const updatedMovie = { ...allMovies[movieIndex], ...updatedData };
  allMovies[movieIndex] = updatedMovie;
  serialize(jsonDbPath, allMovies);
  return updatedMovie;
}

// Remplacer un film ou le créer s'il n'existe pas
export function replaceOrCreateMovie(id: number, movieData: Omit<MyMovie, 'id'>): MyMovie {
  const allMovies = getAllMovies();
  const movieIndex = allMovies.findIndex(movie => movie.id === id);

  const newMovie = { id, ...movieData };

  if (movieIndex === -1) {
    allMovies.push(newMovie);  // Créer un nouveau film
  } else {
    allMovies[movieIndex] = newMovie;  // Remplacer un film existant
  }

  serialize(jsonDbPath, allMovies);
  return newMovie;
}
