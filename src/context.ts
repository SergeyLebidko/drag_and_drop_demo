import {createContext} from 'react';
import {IAppContext} from './types';

const appContext = createContext<IAppContext>({cards: [], tasks: [], patchTask: () => null});
export default appContext;