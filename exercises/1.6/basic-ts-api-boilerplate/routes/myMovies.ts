import {Router} from "express";
import {MyMovie} from "../types";

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
    const minDuration = Number(_req.query['minimum-duration']);
    
    if (minDuration && minDuration <= 0) {
      return res.status(400).json({ error: 'Wrong minimum duration' });
    }
  
    let filteredMovies;

if (minDuration) {
  filteredMovies = myMovies.filter(movie => movie.duration >= minDuration);
} else {
  filteredMovies = myMovies;
}
    return res.json(filteredMovies);
  });
  
  // Lire un film par son ID
  router.get('/:id', (_req, res) => {
    const id = Number(_req.params.id);
  
    // Recherche du film par ID
    const movie = myMovies.find(m => m.id === id);
  
    // Si le film n'est pas trouvé, renvoyer un 404
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' }); // Code 404 pour un film non trouvé
    }
  
    return res.json(movie);
  });
  
  // Créer un nouveau film
  router.post('/', (_req, res) => {
    const { title, director, duration, budget, description, imageUrl } = _req.body;
  
    // Validation
    if (!title || !director || typeof duration !== 'number' || duration <= 0) {
      return res.status(400).json({ error: 'Invalid data: title, director, and positive duration are required' });
    }

    const existingMovie = myMovies.find(m => m.title === title && m.director === director);
    if (existingMovie) {
      return res.status(409).json({ error: 'Movie with the same title and director already exists' }); // Code 409 pour un conflit (film déjà existant)
    }
    const newMovie: MyMovie = {
      id: myMovies.length + 1,
      title,
      director,
      duration,
      budget: budget && budget > 0 ? budget : undefined,
      description: description || '',
      imageUrl: imageUrl || '',
    };
  
    myMovies.push(newMovie);
  
    return res.status(201).json(newMovie);
  });

  router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = myMovies.findIndex((film) => film.id === id);
    if (index === -1) {
      return res.sendStatus(404).json({ error: "Movie not found" });
    }
    const deletedElements = myMovies.splice(index, 1); // splice() returns an array of the deleted elements
    return res.json(deletedElements[0]);
  });

  router.patch('/:id', (_req, res) => {
    const id = Number(_req.params.id);
    const { title, director, duration, budget, description, imageUrl } = _req.body;
  
    const movie = myMovies.find(m => m.id === id);
  
    // Si le film n'existe pas, renvoyer un 404
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
  
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
  
    return res.status(200).json(movie); // Code 200 (OK) après la mise à jour
  });

  router.put('/:id', (_req, res) => {
    const id = Number(_req.params.id);
    const { title, director, duration, budget, description, imageUrl } = _req.body;
  
    // Vérifier que toutes les propriétés obligatoires sont présentes
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
  
      myMovies.push(newMovie);
  
      return res.status(201).json(newMovie); // Code 201 (Created) après création
    }
  });
  
  

export default router;