import { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setFigureDraw, setFigureType, setIsFill } from "../../store/reducers/figureReducer";
import { drawCircle } from "../../DrawFunctions/Circle";
import { drawLine } from "../../DrawFunctions/Line";
import { drawRectangle } from "../../DrawFunctions/Rectangle";
import { drawTriangle } from "../../DrawFunctions/Triangle";
import { pushCash } from "../../store/reducers/memoryReducer";
import { redraw } from "../../DrawFunctions/Redraw";


// выбор фигуры для рисования





const Figures: FC =  memo(() => {

    // ПЕРЕМЕННЫЕ
    // 
    // 
    // 
    // 
    // 
    // 
    const figuresStrokePng: string = "/paint/Assets/figuresStroke.png";
    const figuresFillPng: string = "/paint/Assets/figuresFill.png";
    const [isFiguresDroppedDown, setIsFiguresDroppedDown] = useState<boolean>(false);
    const [imgSrc, setImgSrc] = useState<string>(figuresStrokePng)
    const canvasCtx = useSelector((state: RootState) => state.canvasReducer.canvasCtx);
    const isAltKeyDown = useSelector((state: RootState) => state.canvasReducer.isAltKeyDownReducer);
    const figureState = useSelector((state: RootState) => state.figureReducer);
    const cash = useSelector((state: RootState) => state.memoryReducer.cash);
    const step = useSelector((state: RootState) => state.memoryReducer.step);

    const dispatch = useDispatch<AppDispatch>();




    

    // комбинация отрисовки и перерисовки
    const lineFigure = (x: number, y: number, linewidth: number, color: string, scale: number) => {
        if(!isAltKeyDown) {
            dispatch(pushCash(['line', x, y, linewidth, color, scale]))
        }
        drawLine(x, y, linewidth, color, scale, canvasCtx)
    }

    const rectangleFigure = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number, isFill: boolean) => {
        redraw(canvasCtx, cash.slice(0, cash.length + step)) //тут и дальше используется слайс, потому что сам кэш изменяется только после pushCash события
        // а оно происходит только при mouseLeaveAndUp и получается в функции рисования прокидывается старая версия кеша
        // из за этого пока пользователь удерживает мышку рисуя фигуру(все кроме линии), он будет видеть уже удаленные моменты
        // если хотите посмотреть, можете вместо кэш.слайс вставить просто кэш
        drawRectangle(x, y, linewidth, color, scale, startX, startY, canvasCtx, isFill)
    }

    const triangleFigure = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number, isFill: boolean) => {
        redraw(canvasCtx, cash.slice(0, cash.length + step))
        drawTriangle(x, y, linewidth, color, scale, startX, startY, canvasCtx, isFill)
    }

    const circleFigure = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number, isFill: boolean) => {
        redraw(canvasCtx, cash.slice(0, cash.length + step))
        drawCircle(x, y, linewidth, color, scale, startX, startY, canvasCtx, isFill)
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
    }, [cash, step, isAltKeyDown])

    useEffect(() => {
        const func = () => {
            if(cash && canvasCtx) {
                redraw(canvasCtx, cash);
            }
        } 

        window.addEventListener('resize', func)
        return () => {
            window.removeEventListener('resize', func)
        }
    }, [cash])

    useEffect(() => {
        const func = (e: MouseEvent) => {
            if(e.target != document.querySelector('.fill-selector .title') && 
            e.target != document.querySelectorAll('.fill-selector .title img')[0] && 
            e.target != document.querySelectorAll('.fill-selector .title img')[1]) {
                setIsFiguresDroppedDown(false)
            }
        } 

        window.addEventListener('click', func)
        return () => {
            window.removeEventListener('click', func)
        }
    }, [])






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

    const chooseOption = (bool: boolean, png: string) => {
        setImgSrc(png)
        dispatch(setIsFill(bool))
    }



    return ( 
        <div className="figures-wrapper">
            <div className="figures">
                <button className="figure" onClick={() => chooseLine()}>
                    <img src="/paint/Assets/curved-line.png"/>
                </button>
                <button className="figure" onClick={() => chooseTriangle()}>
                    <img src="/paint/Assets/triangle.png"/>
                </button>
                <button className="figure" onClick={() => chooseRectangle()}>
                    <img src="/paint/Assets/square.png"/>
                </button>
                <button className="figure" onClick={() => chooseCircle()}>
                    <img src="/paint/Assets/circle.png"/>
                </button>
            </div>


            <div className="fill-selector">
                <div className="title" onClick={() => {setIsFiguresDroppedDown(!isFiguresDroppedDown); console.log('24')}}>
                    <img src={imgSrc} width={24} height={24}/>
                    <img src="/paint/Assets/arrowDown.png" alt="arrow down" width={16} height={16}/>
                </div>

                <div className="options" style={isFiguresDroppedDown ? {display: "flex"} : {display: 'none'}}>
                    <div className="option" onClick={() => chooseOption(false, figuresStrokePng)}>
                        <img src="/paint/Assets/figuresStroke.png" width={24} height={24}/>
                        <div>Обводить</div>
                    </div>
                    <div className="option" onClick={() => chooseOption(true, figuresFillPng)}>
                        <img src="/paint/Assets/figuresFill.png" width={24} height={24}/>
                        <div>Заполнять</div>
                    </div>
                </div>
            </div>
            <div className="name">Фигуры</div>
        </div>
    );
})

export default Figures;