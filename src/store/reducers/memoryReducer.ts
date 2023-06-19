import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

interface IMemoryState {
    hardCash: number[][] & string[][],
    lightCash: number[][] & string[][],
    addControl: boolean, //переменная следит за случаями когда в lightCash добавляются данные.
    deleteControl: boolean, //переменная следит за случаями когда из lightCash удаляются данные.
}

const memoryState: IMemoryState = {
    hardCash: [],
    lightCash: [], //массив, который сохраняет все нужные значения о прошлых координатах, для будущей перерисовки, во время рисования фигур
    addControl: false,
    deleteControl: false,
}


// для перерисовки нужно запоминать прошлые значение тип фигуры, color, linewidth, zoom.currentScale, ну и координаты, поэтому очень много пропсов
// порядок пропсов выглядит так (тип рисунка, x, y, linewidth, color, zoom.currentScale, figureStartX, figureStartY)
export const pushLightCash = createAction<[string, number, number, number, string, number, number?, number?] | null>("PUSH_LIGHT_CASH"); 
export const popLightCash = createAction<number[][] & string[][]>("POP_LIGHT_CASH");
export const clearLightCash = createAction<void>("CLEAR_LIGHT_CASH");
export const setLightCash = createAction<number>("SET_LIGHT_CASH")
export const setHardCash = createAction<void>("SET_HARD_CASH");


export default createReducer(memoryState, {
    "PUSH_LIGHT_CASH": function(state: IMemoryState, action: PayloadAction<number[] & string[]>) {
        state.lightCash.push(action.payload);
        state.addControl = true;
        state.deleteControl = false;
    },
    "POP_LIGHT_CASH": function(state: IMemoryState, action: PayloadAction<number[] & string[]>) {
        for(let i = action.payload.length - 2; i > -2; i--) {
            if(action.payload[+i] === null) {
                state.lightCash.pop()
                break
            }
            state.lightCash.pop()
        }
        state.addControl = false;
        state.deleteControl = true;
    },
    "CLEAR_LIGHT_CASH": function(state: IMemoryState) {
        state.lightCash = [];
        state.deleteControl = true;
    },
    "SET_LIGHT_CASH": function(state: IMemoryState, action: PayloadAction<number>) {
        const temp: any = state.hardCash.slice(0, action.payload);
        state.lightCash = temp;
    },
    "SET_HARD_CASH": function(state: IMemoryState) {
        state.hardCash = state.lightCash
    },
})