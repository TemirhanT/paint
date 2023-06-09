import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

export interface IZoomState {
    currentScale: number,
    minScale: number,
    maxScale: number,
    step: number,
}

const zoomState: IZoomState = {
    currentScale: 1.0,
    minScale: 1,
    maxScale: 8,
    step: .5,
}


export const myZoomIn = createAction("ZOOM_IN");
export const myZoomOut = createAction("ZOOM_OUT");
export const myReset = createAction("RESET");

export default createReducer(zoomState, {
    "ZOOM_IN": function (state: IZoomState) {
        if(state.currentScale < state.maxScale) state.currentScale += state.step;
    },
    "ZOOM_OUT": function (state: IZoomState) {
        if(state.currentScale > state.minScale)  state.currentScale -= state.step;
    },
    "RESET": function (state: IZoomState) {
        state.currentScale = 1
    },
})
