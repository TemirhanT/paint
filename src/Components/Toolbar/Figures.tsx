import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setFigureDraw, setFigureType } from "../../store/reducers/figureReducer";
import { drawCircle } from "../../DrawFunctions/Circle";
import { drawLine } from "../../DrawFunctions/Line";
import { drawRectangle } from "../../DrawFunctions/Rectangle";
import { drawTriangle } from "../../DrawFunctions/Triangle";
import { pushCash } from "../../store/reducers/memoryReducer";
import { redraw } from "../../DrawFunctions/Redraw";


// выбор фигуры для рисования





function Figures<FC>() {

    // ПЕРЕМЕННЫЕ
    // 
    // 
    // 
    // 
    // 
    // 
    const canvasCtx = useSelector((state: RootState) => state.canvasReducer.canvasCtx);
    const figureState = useSelector((state: RootState) => state.figureReducer);
    const cash = useSelector((state: RootState) => state.memoryReducer.cash);
    const step = useSelector((state: RootState) => state.memoryReducer.step);

    const dispatch = useDispatch<AppDispatch>();




    

    // комбинация отрисовки и перерисовки
    const lineFigure = (x: number, y: number, linewidth: number, color: string, scale: number) => {
        dispatch(pushCash(['line', x, y, linewidth, color, scale]))
        drawLine(x, y, linewidth, color, scale, canvasCtx)
    }

    const rectangleFigure = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number) => {
        redraw(canvasCtx, cash.slice(0, cash.length + step)) //тут используется слайс, потому что сам кэш изменяется только после pushCash события
        // а оно происходит только при mouseLeaveAndUp и до
        drawRectangle(x, y, linewidth, color, scale, startX, startY, canvasCtx)
    }

    const triangleFigure = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number) => {
        redraw(canvasCtx, cash.slice(0, cash.length + step))
        drawTriangle(x, y, linewidth, color, scale, startX, startY, canvasCtx)
    }

    const circleFigure = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number) => {
        redraw(canvasCtx, cash.slice(0, cash.length + step))
        drawCircle(x, y, linewidth, color, scale, startX, startY, canvasCtx)
    }





    // ПЕРЕНАЗНАЧЕНИЕ ФУНКЦИИ РИСОВАНИЯ ДЛЯ ОБНОВЛЕНИЯ ПЕРЕМЕННЫХ И ПЕРЕРИСОВКА ПРИ ИЗМЕНЕНИИ РАЗМЕРОВ ОКНА
    // 
    // 
    // 
    // 
    // 
    // 
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
    }, [cash])

    useEffect(() => {
        const func = () => {
            redraw(canvasCtx, cash)
        } 

        window.addEventListener('resize', func)
        return () => {
            window.removeEventListener('resize', func)
        }
    }, [cash])






    // ФУНКЦИИ ВЫБОРА ТИПА РИСОВАНИЯ    
    // 
    // 
    // 
    // 
    // 
    // 
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