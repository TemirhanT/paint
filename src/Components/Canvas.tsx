import React, {FC} from 'react';
import { useRef, useEffect, useState} from "react";
import { useSelector } from 'react-redux/es/exports';
import { AppDispatch, RootState } from '../store/store';
import { createAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { IZoomState } from '../store/reducers/zoomReducer';
import Zoom from './Toolbar/Zoom'



const Canvas: FC = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const transformRef = useRef<ReactZoomPanPinchRef>(null)
    const [canvasCtx, setCanvasCtx] = useState<any>({});
    const [width, setWidth] = useState<number>(window.screen.width);
    const [height, setHeight] = useState<number>(window.outerHeight-320);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    let dif: number;
    const [start, setStart] = useState<number>(0);
    // const [storage, setStorage] = useState<any[]>([]);

    const linewidth: number = useSelector((state: RootState) => state.brushReducer.linewidth);
    const color: string = useSelector((state: RootState) => state.colorReducer.color);
    const zoom: IZoomState = useSelector((state: RootState) => state.zoomReducer);

    console.log(zoom.currentScale)

    useEffect(() => {
        setCanvasCtx(canvasRef.current?.getContext('2d'));
    }, [canvasRef])

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
        setIsMouseDown(true);
        canvasCtx.beginPath();
        setStart(e.pageX);
        draw(e.pageX, e.pageY);
        // setStorage([...storage,[e.pageX, e.pageY]]);
    }

    function mouseUp(): void {
        setIsMouseDown(false);
        // localStorage.setItem('path', JSON.stringify(storage))
    }

    function mouseMove(e: React.MouseEvent<HTMLCanvasElement>): void {
        if(!isMouseDown) return
        dif = e.pageX - start;
        console.log(dif, start)
        draw(e.pageX-dif, e.pageY);
        // setStorage([...storage,[e.pageX, e.pageY]]);
    }

    function draw(x: number, y: number): void {
        canvasCtx.lineTo(x, y - 320);
        canvasCtx.stroke();
        canvasCtx.beginPath();
        canvasCtx.arc(x, y - 320, linewidth/2 , 0, Math.PI * 2);
        canvasCtx.fill();
        canvasCtx.beginPath();
        canvasCtx.moveTo(x, y - 320);
    }



    return ( 
        <TransformWrapper
        ref={transformRef}
        initialScale={zoom.currentScale}
        panning={{disabled: true}}
        pinch={{disabled: true}}
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
                        onMouseUp={() => mouseUp()}
                        onMouseLeave={() => mouseUp()}
                    />
                </TransformComponent>
            </React.Fragment>
            )}
        </TransformWrapper>
     );
}
 
export default Canvas;