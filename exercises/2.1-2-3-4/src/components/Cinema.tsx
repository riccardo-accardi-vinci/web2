import React from "react";

// Définition du type Movie
interface Movie {
  title: string;
  director: string;
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
            <strong>{movie.title}</strong> - Réalisateur : {movie.director}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cinema;
