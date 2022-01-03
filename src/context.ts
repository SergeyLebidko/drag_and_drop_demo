import {createContext} from 'react';
import {InitialData} from './types';

const appContext = createContext<InitialData>({cards: [], tasks: []});
export default appContext;