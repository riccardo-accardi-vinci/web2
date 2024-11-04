import React from "react";

interface HeaderProps {
  logoUrl: string;
  children: React.ReactNode; // Permet d'accepter du contenu enfant
}

const Header = ({ logoUrl, children }: HeaderProps) => {
  return (
    <header>
      <img src={logoUrl} alt="Logo" style={{ height: "50px" }} />
      <div>{children}</div>
    </header>
  );
};

export default Header;