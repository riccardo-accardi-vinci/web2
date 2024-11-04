// src/components/ColorBox.tsx
import React, { useState } from 'react';

const colors = ['red', 'green', 'blue', 'yellow', 'purple'];

const ColorBox = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const handleClick = () => {
    // Change la couleur actuelle
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  return (
    <div style={{ backgroundColor: colors[currentColorIndex]}}>
      <button onClick={handleClick}>
        {colors[(currentColorIndex + 1) % colors.length]}
      </button>
      <p>{colors[currentColorIndex]}</p>
    </div>
  );
};

export default ColorBox;

