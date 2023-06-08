import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

interface ICanvasState {
    canvasCtx: any,
    startX: number,
    startY: number,
}

const canvasState: ICanvasState = {
    canvasCtx: null,
    startX: 0,
    startY: 0,
}



export const setCanvasCtx = createAction<CanvasRenderingContext2D | null | undefined>("SET_CANVAS_CTX");
export const setStartX = createAction<number>("SET_START_X");
export const setStartY = createAction<number>("SET_START_Y");


export default createReducer(canvasState, {
    "SET_CANVAS_CTX": function (state: ICanvasState, action: PayloadAction<CanvasRenderingContext2D | null | undefined>) {
        state.canvasCtx = action.payload
    },
    "SET_START_X": function (state: ICanvasState, action: PayloadAction<number>) {
        state.startX = action.payload
    },
    "SET_START_Y": function (state: ICanvasState, action: PayloadAction<number>) {
        state.startY = action.payload
    },
})