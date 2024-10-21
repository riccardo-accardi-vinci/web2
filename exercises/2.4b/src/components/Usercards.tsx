import React from "react";

interface UserCardProps {
  name: string;
  age: number;
  isOnline: boolean;
}

const UserCard = ({ name, age, isOnline }: UserCardProps) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.name}>{name}</h2>
      <p>Âge : {age}</p>
      <p style={isOnline ? styles.online : styles.offline}>
        {isOnline ? "En ligne" : "Hors ligne"}
      </p>
    </div>
  );
};

// Styles pour la carte utilisateur
const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "16px",
    borderRadius: "8px",
    width: "200px",
    marginBottom: "16px",
  },
  name: {
    fontSize: "24px",
    margin: "0 0 8px 0",
  },
  online: {
    color: "green",
  },
  offline: {
    color: "red",
  },
};

export default UserCard;
