import {createContext} from 'react';
import {IAppContext} from './types';

const appContext = createContext<IAppContext>({cards: [], tasks: [], insertTask: () => null});
export default appContext;