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
  
  router.get("/", (_req, res) => {
    return res.json(myMovies);
  });
  

export default router;