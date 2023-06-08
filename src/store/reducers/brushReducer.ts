import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

interface IBrushState {
    linewidth: number
}

const brushState: IBrushState = {
    linewidth: 6,
}



export const changeBrush = createAction<number>("CHANGE_BRUSH")


export default createReducer(brushState, {
    "CHANGE_BRUSH": function (state: IBrushState, action: PayloadAction<number>) {
        state.linewidth = action.payload
    }
})