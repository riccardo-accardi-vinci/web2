import React from "react";

// Définir une interface simple pour les props du composant Cinema
interface CinemaProps {
  name: string;
  movie1Title: string;
  movie1Director: string;
  movie2Title: string;
  movie2Director: string;
}

// Composant Cinema avec typage des props directement dans les paramètres
const Cinema = ({ name, movie1Title, movie1Director, movie2Title, movie2Director }: CinemaProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        <li>
          <strong>{movie1Title}</strong> - Réalisateur : {movie1Director}
        </li>
        <li>
          <strong>{movie2Title}</strong> - Réalisateur : {movie2Director}
        </li>
      </ul>
    </div>
  );
};

const App = () => {
  const cinema1Data = {
    name: "Cinéma Alpha",
    movie1Title: "Le Voyage",
    movie1Director: "Jean Dupont",
    movie2Title: "L'Évasion",
    movie2Director: "Marie Curie",
  };

  const cinema2Data = {
    name: "Cinéma Beta",
    movie1Title: "La Mer",
    movie1Director: "Sophie Martin",
    movie2Title: "Les Montagnes",
    movie2Director: "Claude Bernard",
  };

  return (
    <div>
      <h1>Programme des Cinémas</h1>

      <Cinema
        name={cinema1Data.name}
        movie1Title={cinema1Data.movie1Title}
        movie1Director={cinema1Data.movie1Director}
        movie2Title={cinema1Data.movie2Title}
        movie2Director={cinema1Data.movie2Director}
      />

      <Cinema
        name={cinema2Data.name}
        movie1Title={cinema2Data.movie1Title}
        movie1Director={cinema2Data.movie1Director}
        movie2Title={cinema2Data.movie2Title}
        movie2Director={cinema2Data.movie2Director}
      />
    </div>
  );
};

export default App;