import { Router } from "express";
import { getAllMovies, getFilteredMovies, getMovieById, createMovie, deleteMovie, updateMoviePartial, replaceOrCreateMovie } from "../services/films";
import { MyMovie } from "../types";

const router = Router();

// Obtenir tous les films ou filtrer par durée minimale
router.get('/', (req, res) => {
  const minDuration = Number(req.query['minimum-duration']);
  
  if (minDuration && minDuration <= 0) {
    return res.status(400).json({ error: 'Wrong minimum duration' });
  }

  const movies = getFilteredMovies(minDuration);
  return res.json(movies);
});

// Obtenir un film par son ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const movie = getMovieById(id);

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  return res.json(movie);
});

// Créer un nouveau film
router.post('/', (req, res) => {
  const { title, director, duration, budget, description, imageUrl } = req.body;

  // Validation
  if (!title || !director || typeof duration !== 'number' || duration <= 0) {
    return res.status(400).json({ error: 'Invalid data: title, director, and positive duration are required' });
  }

  const newMovie: Omit<MyMovie, 'id'> = { title, director, duration, budget, description, imageUrl };
  const createdMovie = createMovie(newMovie);

  return res.status(201).json(createdMovie);
});

// Supprimer un film par son ID
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const deletedMovie = deleteMovie(id);

  if (!deletedMovie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  return res.json(deletedMovie);
});

// Mettre à jour un film partiellement
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, director, duration, budget, description, imageUrl } = req.body;

  // Validation des champs numériques
  if (duration && (typeof duration !== 'number' || duration <= 0)) {
    return res.status(400).json({ error: 'Invalid duration, it must be a positive number' });
  }

  if (budget && (typeof budget !== 'number' || budget <= 0)) {
    return res.status(400).json({ error: 'Invalid budget, it must be a positive number' });
  }

  const updatedMovie = updateMoviePartial(id, { title, director, duration, budget, description, imageUrl });

  if (!updatedMovie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  return res.json(updatedMovie);
});

// Remplacer un film ou le créer s'il n'existe pas
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, director, duration, budget, description, imageUrl } = req.body;

  // Validation des champs obligatoires
  if (!title || !director || typeof duration !== 'number' || duration <= 0) {
    return res.status(400).json({ error: 'Invalid data: title, director, and positive duration are required' });
  }

  const newMovie = replaceOrCreateMovie(id, { title, director, duration, budget, description, imageUrl });

  return res.status(200).json(newMovie);
});

export default router;
