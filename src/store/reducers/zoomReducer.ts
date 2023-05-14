import { createAction, createReducer } from "@reduxjs/toolkit"

export interface IZoomState {
    currentScale: number,
    step: number,
}

const zoomState: IZoomState = {
    currentScale: 1,
    step: 0.2,
}


export const myZoomIn = createAction("ZOOM_IN");
export const myZoomOut = createAction("ZOOM_OUT");

export default createReducer(zoomState, {
    "ZOOM_IN": function (state: IZoomState) {
        state.currentScale += state.step
    },
    "ZOOM_OUT": function (state: IZoomState) {
        if(state.currentScale > 1)  state.currentScale -= state.step
    }
})
