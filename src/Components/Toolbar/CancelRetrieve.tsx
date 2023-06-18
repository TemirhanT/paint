import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

const CancelRetrieve: FC = () => {
    
    const canvasCtx = useSelector((state: RootState) => state.canvasReducer.canvasCtx);
    const figureState = useSelector((state: RootState) => state.figureReducer);
    const linewidth = useSelector((state: RootState) => state.brushReducer.linewidth);
    const color = useSelector((state: RootState) => state.colorReducer.color);
    const zoom = useSelector((state: RootState) => state.zoomReducer);
    const cash = useSelector((state: RootState) => state.memoryReducer.cash)

    const dispatch = useDispatch<AppDispatch>()



    return ( 
        <div>
            <button>
                <img src="/Assets/cancel.png" width={24} height={24}/>
            </button>
            <button>
                <img src="/Assets/retrieve.png" width={24} height={24}/>
            </button>
        </div>
    );
}
 
export default CancelRetrieve;