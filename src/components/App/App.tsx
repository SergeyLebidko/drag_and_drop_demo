import React, {useState} from 'react';
import CardList from '../CardList/CardList';
import appContext from '../../context';
import {InitialData} from '../../types';
import {createInitialData} from '../../utils';
import './App.scss';

function App() {
    const [data, setData] = useState<InitialData>(createInitialData());

    return (
        <appContext.Provider value={data}>
            <CardList/>
        </appContext.Provider>
    );
}

export default App;
