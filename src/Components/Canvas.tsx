import React, {FC} from 'react';
import { useRef, useEffect, useState} from "react";
import { useSelector } from 'react-redux/es/exports';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import Zoom from './Toolbar/Zoom'
import { useInView } from 'react-intersection-observer';
import { setCanvasCtx } from '../store/reducers/canvasReducer';
import { setFigureStartX, setFigureStartY } from '../store/reducers/figureReducer';
import { pushCash } from '../store/reducers/memoryReducer';
import { myReset } from '../store/reducers/zoomReducer';



const Canvas: FC = () => {


    // ЧАСТЬ С ПЕРЕМЕННЫМИ
    // 
    // почти все значения, связанные с Y координатой имеют -270. 
    // Это место, занимаемое тулбаром и небольшим пробелом между тулбаром и канвасом
    // toolbar: 250px,   space: 20px
    // 
    // 
    // 
    // 
    // 
    // 
    const [width, setWidth] = useState<number>(window.innerWidth - 20);
    const [height, setHeight] = useState<number>(window.innerHeight-274);
    const [startX, setStartX] = useState<number>(0);
    const [startY, setStartY] = useState<number>(0);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [isAltKeyDown, setIsAltKeyDown] = useState<boolean>(false);
    const [isAltKeyWasDown, setIsAltKeyWasDown] = useState<boolean>(false)
    const [isAltKeyDownBeforeMouse, setIsAltKeyDownBeforeMouse] = useState<boolean>(false)
    const [difX, setDifX] = useState<number>(0);
    const [difY, setDifY] = useState<number>(0);
    const [centerX, setCenterX] = useState<number>(width/2);
    const [centerY, setCenterY] = useState<number>(height/2);



    // переменные для отслеживания краев экрана
    // в случае, если края экрана видны пользователю, значения centerX и centerY будут определенными
    const options = {
        threshold: 0
    }
    const [topRef, topInView, topEntry] = useInView(options);
    const [rightRef, rightInView, rightEntry] = useInView(options);
    const [bottomRef, bottomInView, bottomEntry] = useInView(options);
    const [leftRef, leftInView, leftEntry] = useInView(options);
    const [prevScale, setPrevScale] = useState<number>(1);
    const [delay, setDelay] = useState<boolean>(false);




    const transformRef = useRef<ReactZoomPanPinchRef>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);



    const canvasCtx = useSelector((state: RootState) => state.canvasReducer.canvasCtx);
    const figureState = useSelector((state: RootState) => state.figureReducer);
    const linewidth = useSelector((state: RootState) => state.brushReducer.linewidth);
    const color = useSelector((state: RootState) => state.colorReducer.color);
    const zoom = useSelector((state: RootState) => state.zoomReducer);
    const cash = useSelector((state: RootState) => state.memoryReducer.cash)

    const dispatch = useDispatch<AppDispatch>()

    


    // ЧАСТЬ С USEEFFECT'АМИ
    // 
    // 
    // 
    // 
    // 
    // 
    // 
    // 
    useEffect(() => {
        dispatch(setCanvasCtx(canvasRef.current?.getContext('2d')));
    }, [canvasRef])


    useEffect(() => {
        if(canvasCtx) {
            canvasCtx.fillStyle = color;
            canvasCtx.strokeStyle = color;
            canvasCtx.lineWidth = linewidth;
        }
    }, [canvasCtx, linewidth, color])


    useEffect(() => {
        const func = () => {
            setWidth(window.innerWidth - 20)
            setCenterX((window.innerWidth - 20)/2)
            setHeight(window.innerHeight - 274)
            setCenterY((window.innerHeight - 274)/2)

            transformRef.current?.resetTransform(60);
            dispatch(myReset())
        }

        window.addEventListener('resize', func); 
        return () => {
            window.removeEventListener('resize', func)
        }
    }, [])



    useEffect(() => {
        const func = (e: KeyboardEvent) => {
            if(e.altKey) setIsAltKeyDown(true)
        }
        
        window.addEventListener('keydown', func); 
        return () => {
            window.removeEventListener('keydown', func)
        }
    }, [])


    useEffect(() => {
        const func = () => {
            setIsAltKeyDown(false)
        }

        window.addEventListener('keyup', func);
        return () => {
            window.removeEventListener('keyup', func)
        }
    }, [])


    
    // useEffect'ы для определения касается ли поле зрения пользователя края канваса
    // значение передвинутых центров перестают учитывать difX и difY и расчитываются по другим формулам
    // useEffect'ы с дилэем и currentScale'ом в дэпсах нужны для случаев, когда пользователь уменьшает зум и задевает край экрана,во время расширения
    // а delay позволяет дать время обновится значению скейла и правильно расчитать значение центра
    useEffect(() => {
        setCenterX((prev: number): number => {
            if(leftEntry?.isIntersecting) return width/(2*zoom.currentScale)
            if(rightEntry?.isIntersecting) return width - width/(2*zoom.currentScale)
            return prev + difX / zoom.currentScale;
        })
    }, [difX])


    useEffect(() => {
        setCenterY((prev: number): number => {
            if(topEntry?.isIntersecting) return height/(2*zoom.currentScale)
            if(bottomEntry?.isIntersecting) return height - height/(2*zoom.currentScale)
            return prev + difY / zoom.currentScale;
        })
    }, [difY])


    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelay(!delay)
        }, 100)

        return () => {
            clearTimeout(timeout)
        }
    }, [zoom.currentScale])


    useEffect(() => {
        setCenterX((prev: number): number => {
            if(zoom.currentScale == 1) return width/2
            if(leftEntry?.isIntersecting && zoom.currentScale < prevScale) return width/(2*zoom.currentScale)
            if(rightEntry?.isIntersecting && zoom.currentScale < prevScale) return width - width/(2*zoom.currentScale)
            return prev
        })
        setCenterY((prev: number): number => {
            if(zoom.currentScale == 1) return height/2
            if(topEntry?.isIntersecting && zoom.currentScale < prevScale) return height/(2*zoom.currentScale)
            if(bottomEntry?.isIntersecting && zoom.currentScale < prevScale) return height - height/(2*zoom.currentScale)
            return prev
        })
        setPrevScale(zoom.currentScale)
    }, [delay])






    // ЧАСТЬ С СОБЫТИЯМИ МЫШИ И РИСОВКОЙ
    // 
    // Рисование работает основываясь на значении центра, которое может изменяться.
    // Значение центра может меняться, если пользователь захочет передвинуть холст.
    // Эффект передвижения работает благодаря библиотеке react-zoom-pan-pinch.
    // Однако при зуме и передвижении по холсту, координаты нарисованной линии будут не совпадать с тем, куда нажимал пользователь.
    // Для этого значения координат пересчитываются с учетом отдаления мышки от centerX и centerY, а также учитывается zoom.currentScale.
    // 
    // 
    // Пример.  Вы увеличили зум в два раза и поставили точку в самую правую часть экрана. Зум происходит именно в центр экрана
    // Пусть ширина будет 1000, centerX изначально 500.
    // Так как зум = 2, то пользователь видит территорию от 250 до 750 координат, и ставя точку в самый край, ожидается, что точка будет на 750, но она отрисовывается на 1000, за пределами поля зрения пользователя.
    // Для вычисления нужных координат я нахожу разницу от непередвинутого центра экрана(width/2), делю ее на нынешнее значение зума и прибавляю к передвинотому центру экрана(centerX), то есть 500 + (1000 - 500)/2.
    // Я описал принцип работы этой формулы centerX + (e.pageX - width/2)/zoom.currentScale
    // 
    // 
    // Как уже говорил, centerX может меняться.
    // При зажатой alt, вместо рисования происходит движение по холсту и сэтится значение difX, которая отвечает за обновление centerX.
    // setDifX происходит при отпускании мыши(функция mouseUp ниже) и при выходе мыши за края экрана(функция mouseLeave ниже), а обновление centerX происходит в разделе с UseEffect'ами выше.
    // 
    // 
    // 
    // В функциях присутствует много проверок, чтобы предотвратить разные баги. Также есть pushCash, который нужен для перерисовки во время рисования фигур
    // 
    //  
    function mouseDown(e: React.MouseEvent<HTMLCanvasElement>): void {
        if(e.button == 2 || e.button == 1) return
        setIsMouseDown(true);
        if(isAltKeyDown) {
            setIsAltKeyDownBeforeMouse(true)
            setStartX(e.pageX);
            setStartY(e.pageY);
            return;
        }
        canvasCtx?.beginPath()
        dispatch(setFigureStartX(centerX + (e.pageX - width/2)/zoom.currentScale));
        dispatch(setFigureStartY(centerY + (e.pageY - height/2)/zoom.currentScale));
        draw(centerX + (e.pageX - width/2)/zoom.currentScale,
             centerY + (e.pageY - height/2)/zoom.currentScale);
    }


    function dispatchDuringMouseEvent(e: React.MouseEvent<HTMLCanvasElement>): void {
        if(!isAltKeyWasDown && !isAltKeyDownBeforeMouse) {
            if(figureState.figureType == 'line') {
                dispatch(pushCash(null))
            }  else {
                dispatch(pushCash([
                    figureState.figureType, 
                    centerX + (e.pageX - width/2)/zoom.currentScale,
                    centerY + (e.pageY - height/2)/zoom.currentScale, 
                    linewidth, 
                    color, 
                    zoom.currentScale,
                    figureState.figureStartX, 
                    figureState.figureStartY,
                    figureState.isFill,
                ]))
                dispatch(pushCash(null))
            }
        }
    }


    function mouseLeaveAndUp(e: React.MouseEvent<HTMLCanvasElement>): void {
        if(isAltKeyWasDown && isAltKeyDownBeforeMouse) {
            setDifX(startX - e.pageX)
            setDifY(startY - e.pageY)
            setIsAltKeyWasDown(false)
            setIsAltKeyDownBeforeMouse(false)
        }
        if(isMouseDown) {
            draw(centerX + (e.pageX - width/2)/zoom.currentScale,
             centerY + (e.pageY - height/2)/zoom.currentScale);

            dispatchDuringMouseEvent(e)
        }
        setIsMouseDown(false);
        canvasCtx.beginPath()
    }



    function mouseMove(e: React.MouseEvent<HTMLCanvasElement>): void {
        if(!isMouseDown) return

        if(isAltKeyDown && isAltKeyDownBeforeMouse) {
            setIsAltKeyWasDown(true)
            return
        }

        if(isAltKeyWasDown && !isAltKeyDown && isAltKeyDownBeforeMouse) {
            setDifX(startX - e.pageX)
            setDifY(startY - e.pageY)
            setIsAltKeyWasDown(false)
            setIsAltKeyDownBeforeMouse(false)
            setIsMouseDown(false)
            canvasCtx?.beginPath()
            return
        }

        draw(centerX + (e.pageX - width/2)/zoom.currentScale,
             centerY + (e.pageY - height/2)/zoom.currentScale);
    }


    // порядок пропсов: 
    // 1.координата мыши по горизонтали 
    // 2.по вертикали 
    // 3.толщина линии фигуры 
    // 4.цвет  
    // 5.скейл 
    // 6.начальная точка фигуры по горизонтали (сэтится при mouseDown)
    // 7.по вертикали(сэтится при mouseDown)
    function draw(x: number, y: number): void {
        if(!isMouseDown) {
            figureState.figureDraw(x, y, linewidth, color, zoom.currentScale, x - linewidth, y + linewidth, figureState.isFill)
        } else {
            figureState.figureDraw(x, y, linewidth, color, zoom.currentScale, figureState.figureStartX - linewidth, figureState.figureStartY + linewidth, figureState.isFill)
        }
    }



    return ( 
        <div className='canvas-wrapper'>
            <TransformWrapper
            ref={transformRef}
            initialScale={zoom.currentScale}
            minScale={zoom.minScale}
            maxScale={zoom.maxScale}
            panning={{activationKeys: ["Alt"], velocityDisabled: true}}
            disablePadding={true}
            wheel={{disabled: true}}
            doubleClick={{disabled: true}}
            >
                {(utils: any) => (
                <React.Fragment>
                    <Zoom {...utils}/>
                    <TransformComponent>
                            <canvas 
                                ref={canvasRef} 
                                role='img'
                                style={{display: 'block'}} 
                                height={height} 
                                width={width} 
                                className="canvas" 
                                onMouseDown={(e) => mouseDown(e)}
                                onMouseMove={(e) => mouseMove(e)}
                                onMouseUp={(e) => mouseLeaveAndUp(e)}
                                onMouseLeave={(e) => mouseLeaveAndUp(e)}
                            />
                            <div ref={topRef} className='observed-top'/>
                            <div ref={rightRef} className='observed-right'/>
                            <div ref={bottomRef} className='observed-bottom'/>
                            <div ref={leftRef} className='observed-left'/>
                    </TransformComponent>
                </React.Fragment>
                )}
            </TransformWrapper>
        </div>
     );
}
 
export default Canvas;