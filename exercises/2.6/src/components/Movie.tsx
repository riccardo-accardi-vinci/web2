// src/components/Movie.tsx
import React, { useState } from 'react';

type MovieProps = {
    title: string;
    director: string;
    description: string;
};

const Movie = ({ title, director, description }: MovieProps) => {
    const [showDescription, setShowDescription] = useState(false);

    const handleClick = () => {
        setShowDescription(!showDescription); // Toggle the visibility of the description
    };

    return (
        <div>
            <h3 onClick={handleClick} style={{ cursor: 'pointer' }}>
                {title} ({director})
            </h3>
            {showDescription && <p>{description}</p>}
        </div>
    );
};

export default Movie;
