import { createAction, createReducer } from "@reduxjs/toolkit"

interface IColorState {
    color: string
}

const colorState: IColorState = {
    color: 'black'
}


export const changeColor: any = createAction("CHANGE_COLOR")

export default createReducer(colorState, {
    [changeColor]: function (state: IColorState, action) {
        state.color = action.payload
    }
})

