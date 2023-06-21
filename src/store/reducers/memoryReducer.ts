import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

interface IMemoryState {
    cash: any,
    addControl: number, //переменная следит за случаями когда в lightCash добавляются данные.
    step: number,
}

const memoryState: IMemoryState = {
    cash: [null], //массив, который сохраняет все нужные значения о прошлых координатах, для будущей перерисовки, во время рисования фигур
    addControl: 0,
    step: 0,
}


// для перерисовки нужно запоминать прошлые значение тип фигуры, color, linewidth, zoom.currentScale, ну и координаты, поэтому очень много пропсов
// порядок пропсов выглядит так (тип рисунка, x, y, linewidth, color, zoom.currentScale, figureStartX, figureStartY)
export const pushCash = createAction<[string, number, number, number, string, number, number?, number?, boolean?] | null>("PUSH_CASH"); 
export const setCash = createAction<any>("SET_CASH");
export const stepIncr = createAction<void>("STEP_INCR");
export const stepDecr = createAction<void>("STEP_DECR");
export const clearCash = createAction<void>("CLEAR_CASH");


export default createReducer(memoryState, {
    "PUSH_CASH": function(state: IMemoryState, action: PayloadAction<number[] & string[]>) {
        state.cash = state.cash.slice(0, state.cash.length + state.step)
        state.cash.push(action.payload);
        state.step = 0
        console.log(state.cash)
    },
    "STEP_INCR": function(state: IMemoryState) {
        state.step = state.step + 1;
    },
    "STEP_DECR": function(state: IMemoryState) {
        state.step = state.step - 1;
    },
    "CLEAR_CASH": function(state: IMemoryState) {
        state.cash = [];
    },
})