import React, {FC} from 'react';
import { useRef, useEffect, useState} from "react";
import { useSelector } from 'react-redux/es/exports';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { IZoomState } from '../store/reducers/zoomReducer';
import Zoom from './Toolbar/Zoom'



const Canvas: FC = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const transformRef = useRef<ReactZoomPanPinchRef>(null)
    const [canvasCtx, setCanvasCtx] = useState<any>({});
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight-270);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [isAltKeyDown, setIsAltKeyDown] = useState<boolean>(false);
    const [altStartX, setAltStartX] = useState<number>(0);
    const [altStartY, setAltStartY] = useState<number>(0);
    const [altDifX, setAltDifX] = useState<number>(0);
    const [altDifY, setAltDifY] = useState<number>(0);
    const [centerX, setCenterX] = useState<number>(width/2);
    const [centerY, setCenterY] = useState<number>(height/2);
    const [cashX, setCashX] = useState<number>(0);
    const [cashY, setCashY] = useState<number>(0);


    const [startX, setStartX] = useState<number>(0);
    const [startY, setStartY] = useState<number>(0);
    

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
        setCashX(centerX);
        setCenterX((prev: number) => prev + altDifX/((zoom.currentScale - 1) == 0 ? 1 : (zoom.currentScale - 1)))
    }, [altDifX])
    useEffect(() => {
        setCashY(centerY);
        setCenterY((prev: number) => prev + altDifY/((zoom.currentScale - 1) == 0 ? 1 : (zoom.currentScale - 1)))
    }, [altDifY])

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
            setAltStartX(e.pageX);
            setAltStartY(e.pageY)
            return;
        }

        setStartX(zoom.offsetX + e.pageX);
        setStartY(zoom.offsetY + e.pageY);

        console.log(zoom.offsetX, zoom.offsetY)
        
        canvasCtx.beginPath();
        draw(zoom.offsetX + e.pageX/zoom.currentScale, zoom.offsetY + (e.pageY-zoom.offsetY));
        // setStorage([...storage,[e.pageX, e.pageY]]);
    }

    function mouseUp(e: React.MouseEvent<HTMLCanvasElement>): void {
        setIsMouseDown(false);
        if(isAltKeyDown) {
            setAltDifX(altStartX - e.pageX)
            setAltDifY(altStartY - e.pageY)
        }
        // localStorage.setItem('path', JSON.stringify(storage))
    }

    function mouseMove(e: React.MouseEvent<HTMLCanvasElement>): void {
        if(!isMouseDown) return
        if(isAltKeyDown) {
            return
        }
        draw(zoom.offsetX + startX + (e.pageX - startX)/zoom.currentScale, zoom.offsetY + startY + (e.pageY - startY)/zoom.currentScale);
        // setStorage([...storage,[e.pageX, e.pageY]]);
    }

    function draw(x: number, y: number): void {
        canvasCtx.lineTo(x, (y - 270)/zoom.currentScale);
        canvasCtx.stroke();
        canvasCtx.beginPath();
        canvasCtx.arc(x, (y - 270)/zoom.currentScale, linewidth/2 , 0, Math.PI * 2);
        canvasCtx.fill();
        canvasCtx.beginPath();
        canvasCtx.moveTo(x, (y - 270)/zoom.currentScale);
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
 
export default Canvas;