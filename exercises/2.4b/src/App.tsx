import React from "react";
import UserCard from "./components/Usercards";

const App = () => {
  return (
    <div>
      <h1>Liste des utilisateurs</h1>

      {/* Premier utilisateur */}
      <UserCard name="Alice" age={25} isOnline={true} />

      {/* Deuxième utilisateur */}
      <UserCard name="Bob" age={30} isOnline={false} />

      {/* Troisième utilisateur */}
      <UserCard name="Charlie" age={35} isOnline={true} />
    </div>
  );
};

export default App;
