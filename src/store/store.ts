import { configureStore, combineReducers } from '@reduxjs/toolkit';
import brushReducer from './reducers/brushReducer';


const rootReducer = combineReducers({
    toolkit: brushReducer
})

export const store = configureStore({
    reducer: rootReducer,
}) 