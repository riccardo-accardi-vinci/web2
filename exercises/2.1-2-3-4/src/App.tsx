import PageTitle from "./components/PageTitle";
import Cinema from "./components/Cinema";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  // Données du premier cinéma
  const cinema1Name = "UGC DeBrouckère";
  const moviesCinema1 = [
    { title: "HAIKYU-THE DUMPSTER BATTLE", director: "Susumu Mitsunaka" },
    { title: "GOODBYE JULIA", director: "Mohamed Kordofani" },
    { title: "INCEPTION", director: "Christopher Nolan" },
    { title: "PARASITE", director: "Bong Joon-ho" },
  ];

  // Données du deuxième cinéma
  const cinema2Name = "UGC Toison d'Or";
  const moviesCinema2 = [
    { title: "THE WATCHERS", director: "Ishana Night Shyamalan" },
    { title: "BAD BOYS: RIDE OR DIE", director: "Adil El Arbi, Bilall Fallah" },
    { title: "TENET", director: "Christopher Nolan" },
    { title: "THE IRISHMAN", director: "Martin Scorsese" },
  ];

  // URL d'exemple pour le logo
  const logoUrl = "https://plus.unsplash.com/premium_photo-1663839014860-382ee7152d43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8";

  return (
    <div>
      {/* Header avec logo et navigation */}
      <Header logoUrl={logoUrl}>
        <nav>
          <a href="/">Accueil</a> | <a href="/about">À propos</a>
        </nav>
      </Header>

      {/* Titre de la page */}
      <PageTitle title={pageTitle} />

      {/* Affichage des informations des cinémas */}
      <Cinema name={cinema1Name} movies={moviesCinema1} />
      <Cinema name={cinema2Name} movies={moviesCinema2} />

      {/* Footer avec logo et texte */}
      <Footer logoUrl={logoUrl}>
        <p>© 2024 - Tous droits réservés</p>
      </Footer>
    </div>
  );
};

export default App;