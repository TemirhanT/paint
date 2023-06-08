import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setFigure } from "../../store/reducers/figureReducer";


function Figures<FC>() {
    const canvasCtx = useSelector((state: RootState) => state.canvasReducer.canvasCtx);
    const startX = useSelector((state: RootState) => state.canvasReducer.startX);
    const startY = useSelector((state: RootState) => state.canvasReducer.startY);
    const figure = useSelector((state: RootState) => state.figureReducer.figure);
    const zoom = useSelector((state: RootState) => state.zoomReducer)
    const linewidth = useSelector((state: RootState) => state.brushReducer.linewidth);

    const dispatch = useDispatch();
    
    const lineFigure = (x: number, y: number) => {
        canvasCtx.lineTo(x, y - 270/zoom.currentScale);
        canvasCtx.stroke();
        canvasCtx.beginPath();
        canvasCtx.arc(x, y - 270/zoom.currentScale, linewidth/2 , 0, Math.PI * 2);
        canvasCtx.fill();
        canvasCtx.beginPath();
        canvasCtx.moveTo(x, y - 270/zoom.currentScale);
    }

    const rectangleFigure = (x: number, y: number) => {
        canvasCtx.beginPath();
        canvasCtx.rect(startX, startY, x, y);
        canvasCtx.stroke();
        console.log(startX)
    }

    useEffect(() => {
        dispatch(setFigure(lineFigure))
    }, [canvasCtx, zoom.currentScale])



    return ( 
        <div>
            <button onClick={() => console.log(figure)}>
                <img src="/Assets/triangle.png"/>
            </button>
            <button onClick={() => dispatch(setFigure(rectangleFigure))}>
                <img src="/Assets/rectangle.png" width={24} height={24}/>
            </button>
        </div>
     );
}

export default Figures;