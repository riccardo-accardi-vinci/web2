import React from "react";
import Movie from "./Movie"; // Assurez-vous d'importer le composant Movie

// Définition du type Movie
interface Movie {
  title: string;
  director: string;
  description: string; // Ajout de la description au type Movie
}

// Définition du type pour les props de Cinema
interface CinemaProps {
  name: string;
  movies: Movie[];
}

// Composant Cinema avec typage des props et gestion de la liste de films
const Cinema = ({ name, movies }: CinemaProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <Movie 
              title={movie.title} 
              director={movie.director} 
              description={movie.description} // Passer la description au composant Movie
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cinema;
