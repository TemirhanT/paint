import { configureStore, combineReducers } from '@reduxjs/toolkit';
import brushReducer from './reducers/brushReducer';
import colorReducer from './reducers/colorReducer';


const rootReducer = combineReducers({
    brushReducer, 
    colorReducer
})

export const store = configureStore({
    reducer: rootReducer,
}) 

export type RootState = ReturnType<typeof rootReducer>