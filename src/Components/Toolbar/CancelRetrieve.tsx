import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { pushCash, setCash, stepDecr, stepIncr } from "../../store/reducers/memoryReducer";
import { redraw } from "../../DrawFunctions/Redraw";

const CancelRetrieve: FC = () => {
    
    const canvasCtx = useSelector((state: RootState) => state.canvasReducer.canvasCtx)
    const addControl = useSelector((state: RootState) => state.memoryReducer.addControl);
    const cash = useSelector((state: RootState) => state.memoryReducer.cash);
    const step = useSelector((state: RootState) => state.memoryReducer.step);

    const dispatch = useDispatch<AppDispatch>()




    const retrieve = () => {   
        for(let i = cash.length + step; i < cash.length; i++) {
            dispatch(stepIncr()) 
            if(cash[+i] === null) break
        }
    }

    const cancel = () => {
        for(let i = cash.length - 2 + step; i >= 0; i--) {
            dispatch(stepDecr())
            if(cash[+i] === null) break
        }
    }

    const stepDraw = () => {
        const changedCash: any = cash.slice(0, cash.length - 1 + step)
        redraw(canvasCtx, changedCash)
    }

    // изначально был вариант с stepDraw() вкладывать сразу в retrieve и cancel
    // но значение step использовалось прошлое 
    // так что тут я сделал что то вроде async await
    // то есть как только step диспачится то вызывается useEffect с обновленным значением
    useEffect(() => {
        if(cash && canvasCtx) {
            stepDraw()
        }
    }, [step, canvasCtx])

    return ( 
        <div>
            <button onClick={() => cancel()}>
                <img  src="/Assets/cancel.png" width={24} height={24}/>
            </button>
            <button onClick={() => retrieve()}>
                <img src="/Assets/retrieve.png" width={24} height={24}/>
            </button>
        </div>
    );
}
 
export default CancelRetrieve;