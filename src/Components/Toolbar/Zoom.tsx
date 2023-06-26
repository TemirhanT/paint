import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { myReset, myZoomIn, myZoomOut } from "../../store/reducers/zoomReducer";
import { clearCash } from "../../store/reducers/memoryReducer";
import { FC, memo } from "react";


// изменения зума и переменных, связанных с зумом


const Zoom: FC = memo(({ zoomIn, zoomOut, centerView, resetTransform }: any) => {


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
            <img src="/Assets/zoom-in.png" onClick={() => customZoomIn()}/>
            <img src="/Assets/zoom-out.png" onClick={() => customZoomOut()}/>
            <img src="/Assets/reset.png" onClick={() => customReset()}/>
            <span>Зум: {zoom.currentScale}</span>
            <div className="name">Приближение/Отдаление/Сброс</div>
        </div>
     );
})

export default Zoom;