import React, {useState} from 'react';
import CardList from '../CardList/CardList';
import appContext from '../../context';
import {Card, IData, Task} from '../../types';
import {createInitialData} from '../../utils';

function App() {
    const [{cards, tasks}, setData] = useState<IData>(createInitialData());
    const [dndObject, setDndObject] = useState<Card | Task | null>(null);

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

    const setDnd = (object: Card | Task): void => setDndObject(object);

    const clearDnd = (): void => setDndObject(null);

    const createCard = (): void => {
        setData(({cards, tasks}) => {
            const id = getNextFieldValue(cards, 'id');
            const order = getNextFieldValue(cards, 'order');
            const createdCard = {
                id,
                order,
                title: `Карточка ${id + 1}`
            }
            return {
                tasks,
                cards: [...cards, createdCard]
            }
        })
    }

    const removeCard = (id: number): void => {
        setData(({cards, tasks}) => {
            return {
                cards: cards.filter(card => card.id !== id),
                tasks: tasks.filter(task => task.cardId !== id)
            }
        });
    }

    const createTask = (cardId: number): void => {
        setData(({cards, tasks}) => {
            const id = getNextFieldValue(tasks, 'id');
            const order = getNextFieldValue(tasks.filter(task => task.cardId === cardId), 'order');
            const createdTask = {
                id,
                cardId,
                order,
                title: `Задача ${id + 1}`
            }
            return {
                cards,
                tasks: [...tasks, createdTask]
            }
        });
    }

    const removeTask = (id: number): void => {
        setData(({cards, tasks}) => {
            return {
                cards,
                tasks: tasks.filter(task => task.id !== id)
            }
        });
    }

    const insertCard = (card: Card, before?: Card): void => {
        if (before !== undefined && before.id === card.id) return;

        setData(({cards, tasks}) => {
            let _cards = cards.filter(_card => _card.id !== card.id);
            let insertedCard;

            if (before === undefined) {
                insertedCard = {
                    ...card,
                    order: getNextFieldValue(_cards, 'order')
                }
            } else {
                _cards = _cards.map(_card => {
                    if (card.order < before.order && _card.order <= before.order) {
                        return {
                            ..._card,
                            order: _card.order - 1
                        }
                    }
                    if (card.order > before.order && _card.order >= before.order) {
                        return {
                            ..._card,
                            order: _card.order + 1
                        }
                    }
                    return _card;
                });
                insertedCard = {
                    ...card,
                    order: before.order
                }
            }

            return {cards: [..._cards, insertedCard], tasks};
        });
    }

    const insertTask = (task: Task, cardId: number, before?: Task): void => {
        setData(({cards, tasks}) => {
            let _tasks = tasks.filter(_task => _task.id !== task.id);
            let insertedTask;

            if (before === undefined) {
                insertedTask = {
                    ...task,
                    cardId,
                    order: getNextFieldValue(_tasks.filter(_task => _task.cardId === cardId), 'order')
                }
            } else {
                _tasks = _tasks.map(_task => {
                    if (_task.cardId === cardId && _task.order >= before.order) {
                        return {
                            ..._task,
                            order: _task.order + 1
                        };
                    }
                    return _task;
                });
                insertedTask = {
                    ...task,
                    cardId,
                    order: before.order
                }
            }

            return {cards, tasks: [..._tasks, insertedTask]};
        });
    }

    const context = {
        cards,
        tasks,
        dndObject,
        setDnd,
        clearDnd,
        createCard,
        removeCard,
        createTask,
        removeTask,
        insertCard,
        insertTask
    };
    return (
        <appContext.Provider value={context}>
            <CardList/>
        </appContext.Provider>
    );
}

export default App;
