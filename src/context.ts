import {createContext} from 'react';
import {IAppContext} from './types';

const appContext = createContext<IAppContext>({
    cards: [],
    tasks: [],
    insertCard: () => null,
    insertTask: () => null
});
export default appContext;