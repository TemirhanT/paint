import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

interface IFigureState {
    figureType: string
    figureDraw: Function,
    figureStartX: number,
    figureStartY: number,
}

const figureState: IFigureState = {
    figureType: 'line',
    figureDraw: () => {}, // сюда сетится функция рисования в компоненте figures.tsx и передается в компонент canvas.tsx в функцию draw()
    figureStartX: 0, //начальные координаты фигуры
    figureStartY: 0,
}

export const setFigureType = createAction<string>("SET_FIGURE_TYPE")
export const setFigureDraw = createAction<Function>("SET_FIGURE_DRAW");
export const setFigureStartX = createAction<number>("SET_FIGURE_START_X");
export const setFigureStartY = createAction<number>("SET_FIGURE_START_Y");  



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
})