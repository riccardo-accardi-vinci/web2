import { useState } from 'react';

function ClickCounter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            count is {count}
        </button>
    );
}

export default ClickCounter;