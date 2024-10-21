import React from "react";

interface FooterProps {
  logoUrl: string;
  children: React.ReactNode;
}

const Footer = ({ logoUrl, children }: FooterProps) => {
  return (
    <footer>
      <img src={logoUrl} alt="Logo" style={{ height: "50px" }} />
      <div>{children}</div>
    </footer>
  );
};

export default Footer;