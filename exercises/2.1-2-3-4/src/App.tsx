import React from "react";

// Définition du type Movie
interface Movie {
  title: string;
  director: string;
}

// Définition du type pour les props de PageTitle
interface PageTitleProps {
  title: string;
}

// Définition du type pour les props de Cinema
interface CinemaProps {
  name: string;
  movie1: Movie;
  movie2: Movie;
}

// Composant PageTitle avec typage des props
const PageTitle = ({ title }: PageTitleProps) => {
  return <h1>{title}</h1>;
};

// Composant Cinema avec typage des props et utilisation du type Movie
const Cinema = ({ name, movie1, movie2 }: CinemaProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        <li>
          <strong>{movie1.title}</strong> - Réalisateur : {movie1.director}
        </li>
        <li>
          <strong>{movie2.title}</strong> - Réalisateur : {movie2.director}
        </li>
      </ul>
    </div>
  );
};

// Composant principal App
const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";
  const movie1: Movie = {
    title: "HAIKYU-THE DUMPSTER BATTLE",
    director: "Susumu Mitsunaka",
  };
  const movie2: Movie = {
    title: "GOODBYE JULIA",
    director: "Mohamed Kordofani",
  };

  const cinema2Name = "UGC Toison d'Or";
  const movie3: Movie = {
    title: "THE WATCHERS",
    director: "Ishana Night Shyamalan",
  };
  const movie4: Movie = {
    title: "BAD BOYS: RIDE OR DIE",
    director: "Adil El Arbi, Bilall Fallah",
  };

  return (
    <div>
      {/* Utilisation du composant PageTitle avec son titre */}
      <PageTitle title={pageTitle} />

      {/* Utilisation du composant Cinema avec les films correspondants */}
      <Cinema name={cinema1Name} movie1={movie1} movie2={movie2} />
      <Cinema name={cinema2Name} movie1={movie3} movie2={movie4} />
    </div>
  );
};

export default App;