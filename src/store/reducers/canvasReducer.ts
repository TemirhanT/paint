import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

interface ICanvasState {
    canvasCtx: any,
    isAltKeyDownReducer: boolean,
}

const canvasState: ICanvasState = {
    canvasCtx: null,
    isAltKeyDownReducer: false,
}



export const setCanvasCtx = createAction<CanvasRenderingContext2D | null | undefined>("SET_CANVAS_CTX");
export const setIsAltKeyDownReducer = createAction<boolean>("SET_IS_ALT_KEY_DOWN_REDUCER")


export default createReducer(canvasState, {
    "SET_CANVAS_CTX": function (state: ICanvasState, action: PayloadAction<CanvasRenderingContext2D | null | undefined>) {
        state.canvasCtx = action.payload
    },
    "SET_IS_ALT_KEY_DOWN_REDUCER": function (state: ICanvasState, action: PayloadAction<boolean>) {
        state.isAltKeyDownReducer = action.payload
    },
})