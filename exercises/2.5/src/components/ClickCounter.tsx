import { useState } from 'react';

type ClickCounterProps = {
    title: string;
    message: string;
};

function ClickCounter({ title, message }: ClickCounterProps) {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>{title}</h2>
            <button onClick={() => setCount(count + 1)}>
                count is {count}
            </button>
            {count >= 10 && <p>{message}</p>}
        </div>
    );
}

export default ClickCounter;