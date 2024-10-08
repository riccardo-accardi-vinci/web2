import {Router} from "express";
import {MyMovie} from "../types";
import path from 'node:path';
import { parse, serialize } from "../utils/json"; // Si tu utilises une fonction parse personnalisée

// Définir le chemin du fichier JSON
const jsonDbPath = path.join(__dirname, '/../data/films.json');

const myMovies: MyMovie[] = [
    {
      id: 1,
      title: "Un meutre à vinci" ,
      director:"Mr.Choquet" ,
      duration: 125,
      budget: 19000000,
      description: "Un meutre à vinci. Un supsens incroyable"
    },
    {
       id: 2,
      title: "Le monstre du Lockness",
      director: "Gerard",
      duration: 126,
      budget: 2090000,
      description: "Tous à l'abri"
    },
    {
       id: 3,
       title:"Superman Homecoming" ,
       director: "Tony Parker",
       duration: 150,
       budget: 9000000,
       description: "Après Spiderman Superman"
    },
  ];
  
  const router = Router();

  let getRequestCount = 0;
  router.use((_req, _res, next) => {
    if (_req.method === 'GET') {
      getRequestCount++;
      console.log(`GET counter: ${getRequestCount}`);
    }
    next();
  });

  router.get('/', (_req, res) => {
    const myMovies: MyMovie[] = parse(jsonDbPath) 
    const minDuration = Number(_req.query['minimum-duration']);
    
    if (minDuration && minDuration <= 0) {
      return res.status(400).json({ error: 'Wrong minimum duration' });
    }
  
    let filteredMovies = minDuration 
      ? myMovies.filter(movie => movie.duration >= minDuration) 
      : myMovies;
  
    return res.json(filteredMovies);
  });
  
  // Créer un nouveau film
  router.post('/', (_req, res) => {
    const myMovies: MyMovie[] = parse(jsonDbPath) as MyMovie[]; // Lire les films depuis le fichier JSON
  
    const { title, director, duration, budget, description, imageUrl } = _req.body;
  
    // Validation
    if (!title || !director || typeof duration !== 'number' || duration <= 0) {
      return res.status(400).json({ error: 'Invalid data: title, director, and positive duration are required' });
    }
  
    // Vérifier si un film avec le même titre et le même directeur existe déjà
    const existingMovie = myMovies.find(m => m.title === title && m.director === director);
    if (existingMovie) {
      return res.status(409).json({ error: 'Movie with the same title and director already exists' }); // Code 409 pour conflit
    }
  
    // Créer un nouvel objet film
    const newMovie: MyMovie = {
      id: myMovies.length + 1, // ou utilisez une autre logique pour générer des ID uniques
      title,
      director,
      duration,
      budget: budget && budget > 0 ? budget : undefined,
      description: description || '',
      imageUrl: imageUrl || '',
    };
  
    // Ajouter le nouveau film au tableau
    myMovies.push(newMovie);
  
    // Écrire le tableau mis à jour dans le fichier JSON
    serialize(jsonDbPath, myMovies);
  
    return res.status(201).json(newMovie); // Code 201 (Created)
  });

  router.delete('/:id', (_req, res) => {
    const id = Number(_req.params.id);
    const myMovies: MyMovie[] = parse(jsonDbPath) as MyMovie[]; // Lire les films depuis le fichier JSON
  
    // Rechercher l'index du film à supprimer
    const index = myMovies.findIndex((film) => film.id === id);
    
    // Si le film n'existe pas, renvoyer un 404
    if (index === -1) {
      return res.status(404).json({ error: 'Movie not found' }); // Code 404 pour film non trouvé
    }
  
    // Supprimer le film
    const deletedMovie = myMovies.splice(index, 1)[0]; // splice() retourne un tableau des éléments supprimés
  
    // Écrire le tableau mis à jour dans le fichier JSON
    serialize(jsonDbPath, myMovies);
  
    return res.json(deletedMovie); // Retourner le film supprimé
  });

  router.patch('/:id', (_req, res) => {
    const id = Number(_req.params.id);
    const myMovies: MyMovie[] = parse(jsonDbPath) as MyMovie[]; // Lire les films depuis le fichier JSON
  
    // Rechercher le film par ID
    const movie = myMovies.find(m => m.id === id);
  
    // Si le film n'existe pas, renvoyer un 404
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' }); // Code 404 pour film non trouvé
    }
  
    // Extraction des données de mise à jour depuis la requête
    const { title, director, duration, budget, description, imageUrl } = _req.body;
  
    // Validation des données pour les champs à mettre à jour
    if (duration && (typeof duration !== 'number' || duration <= 0)) {
      return res.status(400).json({ error: 'Invalid duration, it must be a positive number' });
    }
  
    if (budget && (typeof budget !== 'number' || budget <= 0)) {
      return res.status(400).json({ error: 'Invalid budget, it must be a positive number' });
    }
  
    // Mise à jour des propriétés si elles existent dans la requête
    if (title) movie.title = title;
    if (director) movie.director = director;
    if (duration) movie.duration = duration;
    if (budget) movie.budget = budget;
    if (description) movie.description = description;
    if (imageUrl) movie.imageUrl = imageUrl;
  
    // Écrire le tableau mis à jour dans le fichier JSON
    serialize(jsonDbPath, myMovies);
  
    return res.status(200).json(movie); // Code 200 (OK) après la mise à jour
  });

  router.put('/:id', (_req, res) => {
    const id = Number(_req.params.id);
    const myMovies: MyMovie[] = parse(jsonDbPath) as MyMovie[]; // Lire les films depuis le fichier JSON
  
    // Vérifier que toutes les propriétés obligatoires sont présentes
    const { title, director, duration, budget, description, imageUrl } = _req.body;
  
    if (!title || !director || typeof duration !== 'number' || duration <= 0) {
      return res.status(400).json({ error: 'Invalid data: title, director, and positive duration are required' });
    }
  
    // Vérifier si le budget est valide s'il est fourni
    if (budget && (typeof budget !== 'number' || budget <= 0)) {
      return res.status(400).json({ error: 'Invalid budget, it must be a positive number' });
    }
  
    // Rechercher le film par ID
    const movieIndex = myMovies.findIndex(m => m.id === id);
  
    if (movieIndex !== -1) {
      // Si le film existe, le remplacer complètement
      myMovies[movieIndex] = {
        id,
        title,
        director,
        duration,
        budget: budget && budget > 0 ? budget : undefined,
        description: description || '',
        imageUrl: imageUrl || '',
      };
  
      // Écrire le tableau mis à jour dans le fichier JSON
      serialize(jsonDbPath, myMovies);
  
      return res.status(200).json(myMovies[movieIndex]); // Code 200 (OK) après remplacement
    } else {
      // Si le film n'existe pas, vérifier si l'ID est unique
      const existingMovie = myMovies.find(m => m.id === id);
      if (existingMovie) {
        return res.status(409).json({ error: 'Movie with the given ID already exists' }); // Code 409 pour un conflit d'ID
      }
  
      // Créer un nouveau film
      const newMovie: MyMovie = {
        id,
        title,
        director,
        duration,
        budget: budget && budget > 0 ? budget : undefined,
        description: description || '',
        imageUrl: imageUrl || '',
      };
  
      myMovies.push(newMovie); // Ajouter le nouveau film au tableau
  
      // Écrire le tableau mis à jour dans le fichier JSON
      serialize(jsonDbPath, myMovies);
  
      return res.status(201).json(newMovie); // Code 201 (Created) après création
    }
  });
  

export default router;