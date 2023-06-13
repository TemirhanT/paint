import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { pushCash, setFigureDraw, setFigureType } from "../../store/reducers/figureReducer";


function Figures<FC>() {
    const canvasCtx = useSelector((state: RootState) => state.canvasReducer.canvasCtx);
    const figureState = useSelector((state: RootState) => state.figureReducer);
    const cash = useSelector((state: RootState) => state.figureReducer.cash);
    const linewidth = useSelector((state: RootState) => state.brushReducer.linewidth);
    const color = useSelector((state: RootState) => state.colorReducer.color);
    const zoom = useSelector((state: RootState) => state.zoomReducer);


    const dispatch = useDispatch();



    const drawLine = (x: number, y: number, linewidth: number, color: string) => {
        canvasCtx.lineWidth = linewidth;
        canvasCtx.fillStyle = color;
        canvasCtx.strokeStyle = color;
        canvasCtx.lineTo(x, y - 270/zoom.currentScale);
        canvasCtx.stroke();
        canvasCtx.beginPath();
        canvasCtx.arc(x, y - 270/zoom.currentScale, linewidth/2 , 0, Math.PI * 2);
        canvasCtx.fill();
        canvasCtx.beginPath();
        canvasCtx.moveTo(x, y - 270/zoom.currentScale);
    }
    const drawRectangle = (x: number, y: number, linewidth: number, color: string, startX:number, startY: number) => {
        canvasCtx.lineWidth = linewidth;
        canvasCtx.fillStyle = color;
        canvasCtx.strokeStyle = color;
        canvasCtx.beginPath();
        canvasCtx.moveTo(startX, startY - 270/zoom.currentScale);
        canvasCtx.lineTo(startX, y - 270/zoom.currentScale);
        canvasCtx.lineTo(x, y - 270/zoom.currentScale);
        canvasCtx.lineTo(x, startY - 270/zoom.currentScale);
        canvasCtx.closePath();
        canvasCtx.stroke(); 
        canvasCtx.beginPath();
    }
    const drawTriangle = (x: number, y: number, linewidth: number, color: string, startX:number, startY: number) => {
        canvasCtx.lineWidth = linewidth;
        canvasCtx.fillStyle = color;
        canvasCtx.strokeStyle = color;
        canvasCtx.beginPath();
        canvasCtx.moveTo(startX + (x - startX)/2, y - 270/zoom.currentScale);
        canvasCtx.lineTo(startX, startY - 270/zoom.currentScale);
        canvasCtx.lineTo(x, startY - 270/zoom.currentScale);
        canvasCtx.closePath();
        canvasCtx.stroke();
        canvasCtx.beginPath();
    }
    const drawCircle = (x: number, y: number, linewidth: number, color: string, startX:number, startY: number) => {
        canvasCtx.lineWidth = linewidth;
        canvasCtx.fillStyle = color;
        canvasCtx.strokeStyle = color;
        const difRadX = x > startX ? (x - startX)/2 : (startX - x)/2;
        const difRadY = y > startY ? (y - startY)/2 : (startY - y)/2;
        const radius = difRadX > difRadY ? difRadY : difRadX
        canvasCtx.fillStyle = color;
        canvasCtx.beginPath();
        canvasCtx.arc(startX + (x - startX)/2, startY + (y - startY)/2 - 270/zoom.currentScale, radius, 0, Math.PI * 2);
        canvasCtx.stroke();
        canvasCtx.beginPath();
    }


    const redraw = () => {
        canvasCtx.beginPath()
        for(let i in cash) {
            if(cash[+i] == null) {
                canvasCtx.beginPath()
            } else if(cash[i][0] == 'line') {
                drawLine(cash[+i][1], cash[+i][2], cash[+i][3], cash[+i][4])
            } else if(cash[i][0] == 'rectangle') {
                drawRectangle(cash[+i][1], cash[+i][2], cash[+i][3], cash[+i][4], cash[+i][5], cash[+i][6])
            } else if(cash[i][0] == 'triangle') {
                drawTriangle(cash[+i][1], cash[+i][2], cash[+i][3], cash[+i][4], cash[+i][5], cash[+i][6])
            } else if(cash[i][0] == 'circle') {
                drawCircle(cash[+i][1], cash[+i][2], cash[+i][3], cash[+i][4], cash[+i][5], cash[+i][6])
            }
        }
    }

    
    const lineFigure = (x: number, y: number, linewidth: number, color: string) => {
        dispatch(pushCash(['line', x, y, linewidth, color]))
        drawLine(x, y, linewidth, color)
    }

    const rectangleFigure = (x: number, y: number, linewidth: number, color: string, startX:number, startY: number) => {
        canvasCtx.fillStyle = 'white';
        canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        canvasCtx.fillStyle = color

        redraw()

        drawRectangle(x, y, linewidth, color, startX, startY)
    }

    const triangleFigure = (x: number, y: number, linewidth: number, color: string, startX:number, startY: number) => {
        canvasCtx.fillStyle = 'white';
        canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        canvasCtx.fillStyle = color;

        redraw()

        drawTriangle(x, y, linewidth, color, startX, startY)
    }

    const circleFigure = (x: number, y: number, linewidth: number, color: string, startX:number, startY: number) => {
        canvasCtx.fillStyle = 'white';
        canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        canvasCtx.fillStyle = color;

        redraw()

        drawCircle(x, y, linewidth, color, startX, startY)
    }

    useEffect(() => {
        dispatch(setFigureDraw(lineFigure))
    }, [canvasCtx])

    useEffect(() => {
        if(figureState.figureType == 'line') {
            dispatch(setFigureDraw(lineFigure))
        }
        if(figureState.figureType == 'rectangle') {
            dispatch(setFigureDraw(rectangleFigure))
        }
        if(figureState.figureType == 'triangle') {
            dispatch(setFigureDraw(triangleFigure))
        }
        if(figureState.figureType == 'circle') {
            dispatch(setFigureDraw(circleFigure))
        }
    }, [zoom.currentScale, figureState.cash])



    const chooseLine = () => {
        dispatch(setFigureDraw(lineFigure));
        dispatch(setFigureType('line'));
    }
    const chooseRectangle = () => {
        dispatch(setFigureDraw(rectangleFigure));
        dispatch(setFigureType('rectangle'));
    }
    const chooseTriangle = () => {
        dispatch(setFigureDraw(triangleFigure));
        dispatch(setFigureType('triangle'));
    }
    const chooseCircle = () => {
        dispatch(setFigureDraw(circleFigure));
        dispatch(setFigureType('circle'));
    }



    return ( 
        <div>
            <button onClick={() => chooseLine()}>
                <img src="/Assets/curved-line.png" width={24} height={24}/>
            </button>
            <button onClick={() => chooseTriangle()}>
                <img src="/Assets/triangle.png" width={24} height={24}/>
            </button>
            <button onClick={() => chooseRectangle()}>
                <img src="/Assets/rectangle.png" width={24} height={24}/>
            </button>
            <button onClick={() => chooseCircle()}>
                <img src="/Assets/circle.png" width={24} height={24}/>
            </button>
        </div>
     );
}

export default Figures;