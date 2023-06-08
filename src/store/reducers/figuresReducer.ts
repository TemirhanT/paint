import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface IFigureState {
    figure: Function
}

const figureState: IFigureState = {
    figure: () => {}
}


const canvasCtx = useSelector((state: RootState) => state.canvasReducer.canvasCtx);



export const figureLine = createAction<Function>("FIGURE_LINE")


export default createReducer(figureState, {
    "FIGURE_LINE": function (state: IFigureState, action: PayloadAction<number, number>) {

        console.log(action.payload)
    }
})