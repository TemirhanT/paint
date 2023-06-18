import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { pushCash, setFigureDraw, setFigureType } from "../../store/reducers/figureReducer";


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
    const linewidth = useSelector((state: RootState) => state.brushReducer.linewidth);
    const cash = useSelector((state: RootState) => state.figureReducer.cash);
    const zoom = useSelector((state: RootState) => state.zoomReducer);


    const dispatch = useDispatch<AppDispatch>();





    //ФУНКЦИИ ПО ОТРИСОВКЕ ФИГУР
    // 
    // -270, что используются в формулах, - это значение toolbar'a и небольшого пробела - серой линии между тулбаром и канвасом
    // делится на zoom.currentScale для правильного расчета координат при изменении зума
    // 
    // 
    // 
    // 
    // 
    // 
    const drawLine = (x: number, y: number, linewidth: number, color: string, scale: number) => {
        canvasCtx.lineWidth = linewidth;
        canvasCtx.fillStyle = color;
        canvasCtx.strokeStyle = color;
        canvasCtx.lineTo(x, y - 270/scale);
        canvasCtx.stroke();
        canvasCtx.beginPath();
        canvasCtx.arc(x, y - 270/scale, linewidth/2 , 0, Math.PI * 2);
        canvasCtx.fill();
        canvasCtx.beginPath();
        canvasCtx.moveTo(x, y - 270/scale);
    }
    const drawRectangle = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number) => {
        canvasCtx.lineWidth = linewidth;
        canvasCtx.fillStyle = color;
        canvasCtx.strokeStyle = color;
        canvasCtx.beginPath();
        canvasCtx.moveTo(startX, startY - 270/scale);
        canvasCtx.lineTo(startX, y - 270/scale);
        canvasCtx.lineTo(x, y - 270/scale);
        canvasCtx.lineTo(x, startY - 270/scale);
        canvasCtx.closePath();
        canvasCtx.stroke(); 
        canvasCtx.beginPath();
    }
    const drawTriangle = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number) => {
        canvasCtx.lineWidth = linewidth;
        canvasCtx.fillStyle = color;
        canvasCtx.strokeStyle = color;
        canvasCtx.beginPath();
        canvasCtx.moveTo(startX + (x - startX)/2, y - 270/scale);
        canvasCtx.lineTo(startX, startY - 270/scale);
        canvasCtx.lineTo(x, startY - 270/scale);
        canvasCtx.closePath();
        canvasCtx.stroke();
        canvasCtx.beginPath();
    }
    const drawCircle = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number) => {
        canvasCtx.lineWidth = linewidth;
        canvasCtx.fillStyle = color;
        canvasCtx.strokeStyle = color;
        const difRadX = x > startX ? (x - startX)/2 : (startX - x)/2;
        const difRadY = y > startY ? (y - startY)/2 : (startY - y)/2;
        const radius = difRadX > difRadY ? difRadY : difRadX
        canvasCtx.fillStyle = color;
        canvasCtx.beginPath();
        canvasCtx.arc(startX + (x - startX)/2, startY + (y - startY)/2 - 270/scale, radius, 0, Math.PI * 2);
        canvasCtx.stroke();
        canvasCtx.beginPath();
    }


    //эта функция удаляет старый рисунок фигуры и перерисовывает все другие рисунки, что уже были на экране
    // к сожалению, она начинает лагать когда массив коррдинат прошлых рисунков становится слишком большим
    // у меня не получилось оптимизировать это, перерисовывая именно элементы, входящие в территорию рисуемой фигуры, так как lineDraw не имеет beginPath в нужных местах и поэтому линии, которые не должны соединяться, соединяются из за lineTo
    // я посчитал невозможным добавлять в нужные места beginPath, чтобы исключить этот баг, поэтому оставил как есть
    //
    // для перерисовки нужно запоминать прошлые значение color, linewidth, zoom.currentScale, ну и координаты, поэтому очень много пропсов
    //  
    const redraw = (color: string) => {        
        canvasCtx.fillStyle = 'white';
        canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        canvasCtx.fillStyle = color

        canvasCtx.beginPath()
        for(let i in cash) {
            if(cash[+i] == null) {
                canvasCtx.beginPath()
            } else if(cash[i][0] == 'line') {
                drawLine(cash[+i][1], cash[+i][2], cash[+i][3], cash[+i][4], cash[+i][5])
            } else if(cash[i][0] == 'rectangle') {
                drawRectangle(cash[+i][1], cash[+i][2], cash[+i][3], cash[+i][4], cash[+i][5], cash[+i][6] - linewidth, cash[+i][7] + linewidth)
            } else if(cash[i][0] == 'triangle') {
                drawTriangle(cash[+i][1], cash[+i][2], cash[+i][3], cash[+i][4], cash[+i][5], cash[+i][6] - linewidth, cash[+i][7] + linewidth)
            } else if(cash[i][0] == 'circle') {
                drawCircle(cash[+i][1], cash[+i][2], cash[+i][3], cash[+i][4], cash[+i][5], cash[+i][6] - linewidth, cash[+i][7] + linewidth)
            }
        }
    }

    

    // комбинация отрисовки и перерисовки
    const lineFigure = (x: number, y: number, linewidth: number, color: string, scale: number) => {
        dispatch(pushCash(['line', x, y, linewidth, color, zoom.currentScale]))
        drawLine(x, y, linewidth, color, zoom.currentScale)
    }

    const rectangleFigure = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number) => {
        redraw(color)
        drawRectangle(x, y, linewidth, color, zoom.currentScale, startX, startY)
    }

    const triangleFigure = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number) => {
        redraw(color)
        drawTriangle(x, y, linewidth, color, zoom.currentScale, startX, startY)
    }

    const circleFigure = (x: number, y: number, linewidth: number, color: string, scale: number, startX:number, startY: number) => {
        redraw(color)
        drawCircle(x, y, linewidth, color, zoom.currentScale, startX, startY)
    }





    // ПЕРЕНАЗНАЧЕНИЕ ФУНКЦИИ РИСОВАНИЯ ДЛЯ ОБНОВЛЕНИЯ ПЕРЕМЕННЫХ
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
    }, [zoom.currentScale, figureState.cash])






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