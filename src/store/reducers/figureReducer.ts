import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

interface IFigureState {
    figure: Function
}

const figureState: IFigureState = {
    figure: () => {}
}

export const setFigure = createAction<Function>("SET_FIGURE")


export default createReducer(figureState, {
    "SET_FIGURE": function (state: IFigureState, action: PayloadAction<Function>) {
        state.figure = action.payload
    }
})