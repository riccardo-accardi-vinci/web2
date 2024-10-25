// src/components/ClickCounter.tsx
import { useState } from 'react';

type ClickCounterProps = {
    title: string;
    message: string;
    hoverMessage: string;
};

function ClickCounter({ title, message, hoverMessage }: ClickCounterProps) {
    const [count, setCount] = useState(0);
    const [showHoverMessage, setShowHoverMessage] = useState(false);

    // Gestionnaires d'événements pour le survol
    const handleMouseEnter = () => setShowHoverMessage(true);
    const handleMouseLeave = () => setShowHoverMessage(false);

    return (
        <div>
            <h2>{title}</h2>
            <button
                onClick={() => setCount(count + 1)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                count is {count}
            </button>
            {showHoverMessage && <p>{hoverMessage}</p>}
            {count >= 10 && <p>{message}</p>}
        </div>
    );
}

export default ClickCounter;
