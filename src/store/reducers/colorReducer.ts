import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

interface IColorState {
    color: string
}

const colorState: IColorState = {
    color: 'black'
}


export const changeColor = createAction<string>("CHANGE_COLOR")

export default createReducer(colorState, {
    "CHANGE_COLOR": function (state: IColorState, action: PayloadAction<string>) {
        state.color = action.payload
    }
})

