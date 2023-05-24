import { createAction, createReducer } from "@reduxjs/toolkit"

export interface IZoomState {
    offsetX: number,
    offsetY: number,
    currentScale: number,
    minScale: number,
    maxScale: number,
    step: number,
}

const zoomState: IZoomState = {
    offsetX: 0,
    offsetY: 270,
    currentScale: 1.0,
    minScale: 1,
    maxScale: 8,
    step: .5,
}


export const myZoomIn = createAction("ZOOM_IN");
export const myZoomOut = createAction("ZOOM_OUT");

export default createReducer(zoomState, {
    "ZOOM_IN": function (state: IZoomState) {
        if(state.currentScale < state.maxScale) state.currentScale += state.step;
        state.offsetX = (window.innerWidth/2 - window.innerWidth/(2*state.currentScale));
        state.offsetY = 270 + ((window.innerHeight-270)/2 - (window.innerHeight-270)/(2*state.currentScale));
    },
    "ZOOM_OUT": function (state: IZoomState) {
        if(state.currentScale > state.minScale)  state.currentScale -= state.step;
        state.offsetX = (window.innerWidth/2 - window.innerWidth/(2*state.currentScale));
        state.offsetY = 270 + ((window.innerHeight-270)/2 - (window.innerHeight-270)/(2*state.currentScale));
    }
})
