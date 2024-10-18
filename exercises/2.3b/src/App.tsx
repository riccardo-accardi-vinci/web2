import React from "react";
import PageTitle from "../components/PageTitle";
import UserCard from "../components/UserCard";
import Footer from "../components/Footer";

const App = () => {
  const title = "Welcome to My App";
  const footerText = "© 2023 My App";

  // Utilisation d'un tableau d'objets pour les utilisateurs
  const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
  ];

  return (
    <div>
      {/* Composant pour le titre de la page */}
      <PageTitle title={title} />

      {/* Boucle sur le tableau des utilisateurs pour afficher chaque carte */}
      {users.map((user, index) => (
        <UserCard key={index} name={user.name} age={user.age} />
      ))}

      {/* Composant pour le pied de page */}
      <Footer footerText={footerText} />
    </div>
  );
};

export default App;
