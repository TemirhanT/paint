import { PayloadAction, createAction, createReducer } from "@reduxjs/toolkit"

interface IMemoryState {
    cash: any,
    step: number,
}

const memoryState: IMemoryState = {
    cash: [null], //массив, который сохраняет все нужные значения о прошлых координатах, для будущей перерисовки, во время рисования фигур
    step: 0, //значение указывающее на количество действий, которые отменил пользователь
    //если значение равно нулю то значит пользователь не может вернуть действие по двум причинам
    //1 - либо потому что вернул все отмененные действия
    //2 - либо потому что добавил новый элемент в массив и все прошлые отмененные действия удалились
}


// для перерисовки нужно запоминать прошлые значение тип фигуры, color, linewidth, zoom.currentScale, ну и координаты, поэтому очень много пропсов
// порядок пропсов выглядит так (тип рисунка, x, y, linewidth, color, zoom.currentScale, figureStartX, figureStartY, isFill)
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