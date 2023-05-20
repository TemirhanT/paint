import React, {FC} from 'react';
import { useRef, useEffect, useState} from "react";
import { useSelector } from 'react-redux/es/exports';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { IZoomState } from '../store/reducers/zoomReducer';
import Zoom from './Toolbar/Zoom'



const TestCanvas: FC = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const transformRef = useRef<ReactZoomPanPinchRef>(null)
    const [canvasCtx, setCanvasCtx] = useState<any>({});
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight-270);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [isAltKeyDown, setIsAltKeyDown] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [startY, setStartY] = useState<number>(0);
    const [difX, setDifX] = useState<number>(0);
    const [difY, setDifY] = useState<number>(0);
    const [centerX, setCenterX] = useState<number>(width/2);
    const [centerY, setCenterY] = useState<number>(height/2);
    const [cashCenterX, setCashCenterX] = useState<number>(0);
    const [cashCenterY, setCashCenterY] = useState<number>(0);
    const [staticCurrentScale, setStaticCurrentScale] = useState<number>(0)
    

    // const [storage, setStorage] = useState<any[]>([]);

    const linewidth: number = useSelector((state: RootState) => state.brushReducer.linewidth);
    const color: string = useSelector((state: RootState) => state.colorReducer.color);
    const zoom: IZoomState = useSelector((state: RootState) => state.zoomReducer);

    useEffect(() => {
        setCanvasCtx(canvasRef.current?.getContext('2d'));
    }, [canvasRef])
    useEffect(() => {
        window.addEventListener('keydown', () => setIsAltKeyDown(true))                                                                                                                                                                                                                                                                                                                                        
        return window.removeEventListener('keydown', () => setIsAltKeyDown(true))
    }, [])

    useEffect(() => {
        window.addEventListener('keyup', () => setIsAltKeyDown(false))
        return window.removeEventListener('keyup', () => setIsAltKeyDown(false))
    }, [])


    useEffect(() => {
        setCenterX((prev: number) => prev + difX/((zoom.currentScale - 1) == 0 ? 1 : (zoom.currentScale - 1)))
    }, [difX])
    useEffect(() => {
        setCenterY((prev: number) => prev + difY/((zoom.currentScale - 1) == 0 ? 1 : (zoom.currentScale - 1)))
    }, [difY])

    useEffect(() => {
        console.log('centerX')
        setStaticCurrentScale(zoom.currentScale)
    }, [centerX])


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
            setStartX(e.pageX);
            setStartY(e.pageY)
            return;
        }
        console.log(staticCurrentScale == 1 ? centerX + (e.pageX - centerX)/zoom.currentScale : centerX + (e.pageX - centerX)/staticCurrentScale, 
                centerX + (e.pageX - centerX)/staticCurrentScale,
                centerX + (e.pageX - centerX)/zoom.currentScale,
                e.pageX - centerX, 
                e.pageX, 
                centerX, 
                staticCurrentScale,
                zoom.currentScale);
        canvasCtx.beginPath();
        draw(staticCurrentScale == 1 ? (centerX + (e.pageX - centerX)/zoom.currentScale) : ((centerX + (((e.pageX - centerX)/staticCurrentScale - (e.pageX - centerX)/zoom.currentScale)) + (e.pageX - centerX)/zoom.currentScale)),
            centerY + (e.pageY - centerY)/zoom.currentScale);
        // setStorage([...storage,[e.pageX, e.pageY]]);
    }

    function mouseUp(e: React.MouseEvent<HTMLCanvasElement>): void {
        setIsMouseDown(false);
        if(isAltKeyDown) {
            setDifX(startX - e.pageX)
            setDifY(startY - e.pageY)
        }
        // localStorage.setItem('path', JSON.stringify(storage))
    }

    function mouseMove(e: React.MouseEvent<HTMLCanvasElement>): void {
        if(!isMouseDown) return
        if(isAltKeyDown) {
            return
        }
        draw(centerX + (e.pageX - centerX)/zoom.currentScale, centerY + (e.pageY - centerY)/zoom.currentScale);
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



    return ( 
        <div className='canvas-wrapper'>
            <TransformWrapper
            ref={transformRef}
            initialScale={zoom.currentScale}
            minScale={zoom.minScale}
            maxScale={zoom.maxScale}
            panning={{activationKeys: ["Alt"], velocityDisabled: true}}
            disablePadding={true}
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
                    </TransformComponent>
                </React.Fragment>
                )}
            </TransformWrapper>
        </div>
     );
}
 
export default TestCanvas;