import React from 'react';
import appContext from '../../context';
import './App.scss';

function App() {
    return (
        <appContext.Provider value={{}}>
            <div>
                Drag and drop demo
            </div>
        </appContext.Provider>
    );
}

export default App;
