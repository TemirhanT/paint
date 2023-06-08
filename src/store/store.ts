import { configureStore, combineReducers } from '@reduxjs/toolkit';
import brushReducer from './reducers/brushReducer';
import colorReducer from './reducers/colorReducer';
import zoomReducer from './reducers/zoomReducer';
import canvasReducer from './reducers/canvasReducer';
import figureReducer from './reducers/figureReducer';


const rootReducer = combineReducers({
    canvasReducer,
    brushReducer, 
    colorReducer,
    zoomReducer,
    figureReducer
})

export const store = configureStore({
    reducer: rootReducer,
}) 

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch