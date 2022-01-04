import React, {useState} from 'react';
import CardList from '../CardList/CardList';
import appContext from '../../context';
import {Card, IData, Task} from '../../types';
import {createInitialData} from '../../utils';
import './App.scss';

function App() {
    const [{cards, tasks}, setData] = useState<IData>(createInitialData());

    const getNextFieldValue = (objects: Array<Card> | Array<Task>, field: 'id' | 'order'): number => {
        let nextValue = 0;
        if (objects.length > 0) {
            objects.forEach(object => {
                if (object[field] > nextValue) nextValue = object[field];
            });
            nextValue++;
        }
        return nextValue;
    }

    const insertTask = (task: Task, cardId: number, before?: Task): void => {
        // Если не указано, перед какой задачей вставлять - вставляем в конец списка
        if (before === undefined) {
            setData(({cards, tasks}) => {
                const _tasks = tasks.filter(_task => _task.id !== task.id);
                const insertedTask = {
                    ...task,
                    cardId,
                    order: getNextFieldValue(_tasks.filter(_task => _task.cardId === cardId), 'order')
                }
                return {cards, tasks: [..._tasks, insertedTask]};
            });
            return;
        }

        setData(({cards, tasks}) => {
            let _tasks = tasks.filter(_task => _task.id !== task.id);
            _tasks = _tasks.map(_task => {
                if (_task.cardId === cardId && _task.order >= before.order) {
                    return {..._task, order: _task.order + 1};
                }
                return _task;
            });
            const insertedTask = {
                ...task,
                cardId,
                order: before.order
            }
            return {cards, tasks: [..._tasks, insertedTask]};
        });
    }

    return (
        <appContext.Provider value={{cards, tasks, insertTask}}>
            <CardList/>
        </appContext.Provider>
    );
}

export default App;
