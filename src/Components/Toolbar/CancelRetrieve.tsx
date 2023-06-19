import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { popLightCash, pushLightCash, setHardCash, setLightCash } from "../../store/reducers/memoryReducer";
import { redraw } from "../../DrawFunctions/Redraw";

const CancelRetrieve: FC = () => {
    
    const canvasCtx = useSelector((state: RootState) => state.canvasReducer.canvasCtx)
    const addControl = useSelector((state: RootState) => state.memoryReducer.addControl);
    const deleteControl = useSelector((state: RootState) => state.memoryReducer.deleteControl);
    const lightCash = useSelector((state: RootState) => state.memoryReducer.lightCash);
    const hardCash = useSelector((state: RootState) => state.memoryReducer.hardCash);

    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        if(addControl) {
            dispatch(setHardCash())
        }
    }, [lightCash])


    const retrieve = () => {    
        const changedHardCash: any = hardCash.slice(0, lightCash.length + 2);

        for(let i = changedHardCash.length - 2; i > 0; i--) {
            if(lightCash[+i] === null) {
                dispatch(setLightCash(+i))
                break
            }
        }

        redraw(canvasCtx, changedHardCash)
    }

    const cancel = () => {
        let changedLightCash: any;
        for(let i = lightCash.length - 2; i > 0; i--) {
            if(lightCash[+i] === null) {
                changedLightCash = lightCash.slice(0, +i)
                break
            }
        }
        dispatch(popLightCash(lightCash))
        redraw(canvasCtx, changedLightCash)
    }

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