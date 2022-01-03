import React, {useState} from 'react';
import CardList from '../CardList/CardList';
import appContext from '../../context';
import {IData, Task} from '../../types';
import {createInitialData} from '../../utils';
import './App.scss';

function App() {
    const [{cards, tasks}, setData] = useState<IData>(createInitialData());

    const patchTask = (patchedTask: Task): void => {
        setData(oldData => ({
            cards: oldData.cards,
            tasks: oldData.tasks.map(task => task.id === patchedTask.id ? patchedTask : task)
        }));
    }

    return (
        <appContext.Provider value={{cards, tasks, patchTask}}>
            <CardList/>
        </appContext.Provider>
    );
}

export default App;
