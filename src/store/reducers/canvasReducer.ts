import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

interface ICanvasState {
    canvasCtx: any,
}

const canvasState: ICanvasState = {
    canvasCtx: null,
}



export const setCanvasCtx = createAction<CanvasRenderingContext2D | null | undefined>("SET_CANVAS_CTX");


export default createReducer(canvasState, {
    "SET_CANVAS_CTX": function (state: ICanvasState, action: PayloadAction<CanvasRenderingContext2D | null | undefined>) {
        state.canvasCtx = action.payload
    },
})