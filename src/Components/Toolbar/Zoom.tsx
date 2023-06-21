import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { myReset, myZoomIn, myZoomOut } from "../../store/reducers/zoomReducer";
import { clearCash } from "../../store/reducers/memoryReducer";


// изменения зума и переменных, связанных с зумом


function Zoom({ zoomIn, zoomOut, centerView, resetTransform }: any) {

    const zoom = useSelector((state: RootState) => state.zoomReducer);
    const cash = useSelector((state: RootState) => state.memoryReducer.cash);
    const canvasCtx = useSelector((state: RootState) => state.canvasReducer.canvasCtx)
    const dispatch = useDispatch<AppDispatch>();

    const customZoomIn = () => {
        dispatch(myZoomIn());
        zoomIn(zoom.step, 60);
    }
    const customZoomOut = () => {
        dispatch(myZoomOut());
        zoomOut(zoom.step, 60);
    }
    const customReset = () => {
        dispatch(myReset());
        resetTransform(60);

        dispatch(clearCash());
        canvasCtx.fillStyle = 'white'
        canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    }

    return ( 
        <div className="zoom">
            <button onClick={() => customZoomIn()}>+</button>
            <button onClick={() => customZoomOut()}>-</button>
            <button onClick={() => customReset()}>reset</button>
            <span>{zoom.currentScale}</span>
        </div>
     );
}

export default Zoom;