import {createContext} from 'react';
import {IAppContext} from './types';

const appContext = createContext<IAppContext>({
    cards: [],
    tasks: [],
    dndObject: null,
    setDnd: () => null,
    clearDnd: () => null,
    createCard: () => null,
    removeCard: () => null,
    createTask: () => null,
    removeTask: () => null,
    insertCard: () => null,
    insertTask: () => null
});
export default appContext;