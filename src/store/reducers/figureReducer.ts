import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

interface IFigureState {
    figureType: string
    figureDraw: Function,
    figureStartX: number,
    figureStartY: number,
    cash: number[][] & string[][],
}

const figureState: IFigureState = {
    figureType: 'line',
    figureDraw: () => {},
    figureStartX: 0,
    figureStartY: 0,
    cash: [],
}

export const setFigureType = createAction<string>("SET_FIGURE_TYPE")
export const setFigureDraw = createAction<Function>("SET_FIGURE_DRAW");
export const setFigureStartX = createAction<number>("SET_FIGURE_START_X");
export const setFigureStartY = createAction<number>("SET_FIGURE_START_Y");
export const pushCash = createAction<[string, number, number, number, string, number?, number?] | null>("PUSH_CASH");


export default createReducer(figureState, {
    "SET_FIGURE_TYPE": function (state: IFigureState, action: PayloadAction<string>) {
        state.figureType = action.payload
    },
    "SET_FIGURE_DRAW": function (state: IFigureState, action: PayloadAction<Function>) {
        state.figureDraw = action.payload
    },
    "SET_FIGURE_START_X": function (state: IFigureState, action: PayloadAction<number>) {
        state.figureStartX = action.payload
    },
    "SET_FIGURE_START_Y": function (state: IFigureState, action: PayloadAction<number>) {
        state.figureStartY = action.payload
    },
    "PUSH_CASH": function (state: IFigureState, action: PayloadAction<number[] & string[]>) {
        state.cash.push(action.payload);
    },
})