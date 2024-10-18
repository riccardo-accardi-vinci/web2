import React from "react";

interface FooterProps {
  footerText: string;
}

const Footer = ({ footerText }: FooterProps) => {
  return <footer>{footerText}</footer>;
};

export default Footer;
