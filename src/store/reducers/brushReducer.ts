import { ActionCreatorWithOptionalPayload, ActionCreatorWithoutPayload, createAction, createReducer } from "@reduxjs/toolkit"

interface IBrushState {
    linewidth: number
}
// interface IBrushAction {
//     type: string,
// }

const brushState: IBrushState = {
    linewidth: 6,
}



export const brush_4: any = createAction("BRUSH_4")
export const brush_6: any = createAction("BRUSH_6")
export const brush_8: any = createAction("BRUSH_8")
export const brush_10: any = createAction("BRUSH_10")

export default createReducer(brushState, {
    [brush_4]: function (state: IBrushState) {
        state.linewidth = 4
    },

    [brush_6]: function (state: IBrushState) {
        state.linewidth = 6
    },

    [brush_8]: function (state: IBrushState) {
        state.linewidth = 8
    },
    
    [brush_10]: function (state: IBrushState) {
        state.linewidth = 10
    }
})