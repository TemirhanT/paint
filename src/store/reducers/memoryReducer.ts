import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

interface IMemoryState {
    cash: number[][] & string[][],
}

const memoryState: IMemoryState = {
    cash: [], //массив, который сохраняет все нужные значения о прошлых координатах, для будущей перерисовки, во время рисования фигур
}


export const pushCash = createAction<[string, number, number, number, string, number, number?, number?] | null>("PUSH_CASH"); 
// для перерисовки нужно запоминать прошлые значение тип фигуры, color, linewidth, zoom.currentScale, ну и координаты, поэтому очень много пропсов
// порядок пропсов выглядит так (тип рисунка, x, y, linewidth, color, zoom.currentScale, figureStartX, figureStartY)


export default createReducer(memoryState, {
    "PUSH_CASH": function (state: IMemoryState, action: PayloadAction<number[] & string[]>) {
        state.cash.push(action.payload);
    },
})