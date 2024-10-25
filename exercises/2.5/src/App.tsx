// src/App.tsx
import ClickCounter from './components/ClickCounter';

function App() {
    return (
        <>
            <div>
                yo
            </div>
            <h1>Vite + React</h1>
            <div className="card">
            <ClickCounter 
                    title="Click Counter" 
                    message="You are a master in the art of clicking!" 
                    hoverMessage="Please click on me now!" 
                />
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;