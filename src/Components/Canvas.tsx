import React, {FC, useLayoutEffect} from 'react';
import { useRef, useEffect, useState} from "react";
import { useSelector } from 'react-redux/es/exports';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef, useTransformEffect, useTransformContext } from "react-zoom-pan-pinch";
import { IZoomState } from '../store/reducers/zoomReducer';
import Zoom from './Toolbar/Zoom'



const Canvas: FC = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const observer = useRef<any>(null);
    const observedTop = useRef<any>(null);
    const observedRight = useRef<any>(null);
    const observedBottom = useRef<any>(null);
    const observedLeft = useRef<any>(null);
    const transformRef = useRef<ReactZoomPanPinchRef>(null);
    const [canvasCtx, setCanvasCtx] = useState<any>({});
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight-270);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [isAltKeyDown, setIsAltKeyDown] = useState<boolean>(false);
    const [isAltKeyWasDown, setIsAltKeyWasDown] = useState<boolean>(false)
    const [isAltKeyDownBeforeMouse, setIsAltKeyDownBeforeMouse] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0);
    const [startY, setStartY] = useState<number>(0);
    const [difX, setDifX] = useState<number>(0);
    const [difY, setDifY] = useState<number>(0);
    const [centerX, setCenterX] = useState<number>(width/2);
    const [centerY, setCenterY] = useState<number>(height/2);
    const [button, setButton] = useState<string>("Alt");


    
    // const [storage, setStorage] = useState<any[]>([]);

    const linewidth: number = useSelector((state: RootState) => state.brushReducer.linewidth);
    const color: string = useSelector((state: RootState) => state.colorReducer.color);
    const zoom: IZoomState = useSelector((state: RootState) => state.zoomReducer);

    useEffect(() => {
        setCanvasCtx(canvasRef.current?.getContext('2d'));
    }, [canvasRef])




    useEffect(() => {
        const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
            if(entries[0].isIntersecting) {
                setIsAltKeyDown(false)
                setButton("null")
                console.log(zoom.currentScale)
            }
        }
        let options = {
            root: document.querySelector(".canvas-wrapper"),
            rootMargin: "0px",
            threshold: 0.0,
          };

        observer.current = new IntersectionObserver(callback, options);
        if(observedTop.current && observer.current) observer.current.observe(observedTop.current)   
        // if(observedRight.current && observer.current) observer.current.observe(observedRight.current)   
        // if(observedBottom.current && observer.current) observer.current.observe(observedBottom.current)   
        // if(observedLeft.current && observer.current) observer.current.observe(observedLeft.current) 
    }, [])


    useEffect(() => {
        window.addEventListener('keydown', (e) => {if(e.altKey) setIsAltKeyDown(true)}); 
        return window.removeEventListener('keydown', (e) => {if(e.altKey) setIsAltKeyDown(true)})
    }, [])

    useEffect(() => {
        const altKeyUp = () => {
            setButton("Alt")
            setIsAltKeyDown(false)
        }

        window.addEventListener('keyup', () => altKeyUp())
        return window.removeEventListener('keyup', () => altKeyUp())
    }, [])


    useEffect(() => {
        setCenterX((prev: number) => prev + difX/zoom.currentScale)
    }, [difX])
    useEffect(() => {
        setCenterY((prev: number) => prev + difY/zoom.currentScale)
    }, [difY])
    useEffect(() => {
        if(zoom.currentScale == 1) {
            setCenterX(width/2)
            setCenterY(height/2)
        }
    }, [zoom.currentScale])


    // useEffect(() => {
    //     setCenterX(cashX + difX/((zoom.currentScale - 1) == 0 ? 1 : (zoom.currentScale - 1)));
    //     setCenterY(cashY + difY/((zoom.currentScale - 1) == 0 ? 1 : (zoom.currentScale - 1)));
    // }, [zoom.currentScale])

    // useEffect(() => {        
    //     const drawFromCash = (): void => {
    //         const path: any[] = JSON.parse(localStorage.getItem('path') || '')
    //         for(let coords of path) {
    //             setTimeout(() =>draw(coords[0], coords[1]), )
    //         }
    //     }

    //     const updateWindowDimensions = (): void => {
    //         setWidth(window.innerWidth);
    //         setHeight(window.innerHeight - 320);
    //         drawFromCash()
    //     }        
        
    //     window.addEventListener('resize', updateWindowDimensions);

    //     return (): void => window.removeEventListener('resize', updateWindowDimensions);
    // }, [])

    canvasCtx.fillStyle = color;
    canvasCtx.strokeStyle = color;
    canvasCtx.lineWidth = linewidth;


    function mouseDown(e: React.MouseEvent<HTMLCanvasElement>): void {
        if(e.button == 2 || e.button == 1) return
        setIsMouseDown(true);
        if(isAltKeyDown) {
            setIsAltKeyDownBeforeMouse(true)
            setStartX(e.pageX);
            setStartY(e.pageY)
            return;
        }
        console.log(centerX, centerY)
        canvasCtx.beginPath()
        draw(centerX + (e.pageX - width/2)/zoom.currentScale,
             centerY + (e.pageY - height/2)/zoom.currentScale);
        // setStorage([...storage,[e.pageX, e.pageY]]);
    }

    function mouseUp(e: React.MouseEvent<HTMLCanvasElement>): void {
        if(isAltKeyWasDown && isAltKeyDownBeforeMouse) {
            setDifX(startX - e.pageX)
            setDifY(startY - e.pageY)
            setIsAltKeyWasDown(false)
            setIsAltKeyDownBeforeMouse(false)
        }
        setIsMouseDown(false);
        // localStorage.setItem('path', JSON.stringify(storage))
    }

    function mouseMove(e: React.MouseEvent<HTMLCanvasElement>): void {
        if(!isMouseDown) return
        if(isAltKeyDown && isAltKeyDownBeforeMouse) {
            console.log(".")
            setIsAltKeyWasDown(true)
            return
        }
        if(isAltKeyWasDown && !isAltKeyDown && isAltKeyDownBeforeMouse) {
            setDifX(startX - e.pageX)
            setDifY(startY - e.pageY)
            setIsAltKeyWasDown(false)
            setIsAltKeyDownBeforeMouse(false)
            canvasCtx.beginPath()
            return
        }
        draw(centerX + (e.pageX - width/2)/zoom.currentScale,
             centerY + (e.pageY - height/2)/zoom.currentScale);
        // setStorage([...storage,[e.pageX, e.pageY]]);
    }

    function draw(x: number, y: number): void {
        canvasCtx.lineTo(x, y - 270/zoom.currentScale);
        canvasCtx.stroke();
        canvasCtx.beginPath();
        canvasCtx.arc(x, y - 270/zoom.currentScale, linewidth/2 , 0, Math.PI * 2);
        canvasCtx.fill();
        canvasCtx.beginPath();
        canvasCtx.moveTo(x, y - 270/zoom.currentScale);
    }

    // useTransformEffect(({ state, instance }) => {
    //     console.log(state); // { previousScale: 1, scale: 1, positionX: 0, positionY: 0 }
    // });


    return ( 
        <div ref={observer} className='canvas-wrapper'>
            <TransformWrapper
            ref={transformRef}
            initialScale={zoom.currentScale}
            minScale={zoom.minScale}
            maxScale={zoom.maxScale}
            panning={{activationKeys: [button], velocityDisabled: true}}
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
                                onMouseUp={(e) => mouseUp(e)}
                                onMouseLeave={(e) => mouseUp(e)}
                            />
                            <div ref={observedTop} className='observed-top'/>
                            <div ref={observedRight} className='observed-right'/>
                            <div ref={observedBottom} className='observed-bottom'/>
                            <div ref={observedLeft} className='observed-left'/>
                    </TransformComponent>
                </React.Fragment>
                )}
            </TransformWrapper>
            <button onClick={() => setButton("Alt")}>dfshjfjfgdjgfjfgnjgdfg</button>
        </div>
     );
}
 
export default Canvas;