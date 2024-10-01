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
      return res.json({ error: 'Wrong minimum duration' });
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
    let movie;
    myMovies.forEach(m => {
      if (m.id === id) {
        movie = m;
      }
}); 
  
    return res.json(movie);
  });
  
  // Créer un nouveau film
  router.post('/', (_req, res) => {
    const { title, director, duration, budget, description, imageUrl } = _req.body;
  
    // Validation
    if (!title || !director || typeof duration !== 'number' || duration <= 0) {
      return res.json({ error: 'Invalid data: title, director, and positive duration are required' });
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
  

  
  

export default router;