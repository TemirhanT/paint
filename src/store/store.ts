import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import colorReducer from './reducers/colorReducer';
import zoomReducer from './reducers/zoomReducer';
import canvasReducer from './reducers/canvasReducer';
import figureReducer from './reducers/figureReducer';
import memoryReducer from './reducers/memoryReducer';
import brushReducer from './reducers/brushReducer';


const rootReducer = combineReducers({
    canvasReducer,
    colorReducer,
    brushReducer,
    zoomReducer,
    figureReducer,
    memoryReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
}) 

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch