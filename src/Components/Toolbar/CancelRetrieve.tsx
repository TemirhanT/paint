import { FC, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { stepDecr, stepIncr } from "../../store/reducers/memoryReducer";
import { redraw } from "../../DrawFunctions/Redraw";

const CancelRetrieve: FC = memo(() => {
    
    const canvasCtx = useSelector((state: RootState) => state.canvasReducer.canvasCtx)
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
        <div className="cancel-retrieve-container">
            <div className="cancel-retrieve">
                <img className={(cash.length - 1 + step) <= 0 ? "unactive" : ''} src="/paint/Assets/cancel.png" onClick={() => cancel()}/>
                <img className={step == 0 ? "unactive" : ''} src="/paint/Assets/retrieve.png" onClick={() => retrieve()}/>
            </div>

            <div className="name">
                отменить/вернуть
            </div>
        </div>
    );
})
 
export default CancelRetrieve;