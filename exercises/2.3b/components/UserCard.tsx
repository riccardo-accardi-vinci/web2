import React from "react";

interface UserCardProps {
  name: string;
  age: number;
}

const UserCard = ({ name, age }: UserCardProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
};

export default UserCard;
