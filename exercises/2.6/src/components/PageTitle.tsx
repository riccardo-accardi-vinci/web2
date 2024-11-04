import React from "react";

// Définition du type pour les props de PageTitle
interface PageTitleProps {
  title: string;
}

// Composant PageTitle avec typage des props
const PageTitle = ({ title }: PageTitleProps) => {
  return <h1>{title}</h1>;
};

export default PageTitle;
