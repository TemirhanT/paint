import React, {FC} from 'react';
import { useRef, useEffect, useState} from "react";
import { useSelector } from 'react-redux/es/exports';
import { RootState } from '../store/store';


const Canvas: FC = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvasCtx, setCanvasCtx] = useState<any>({});
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight-300);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    const linewidth: number = useSelector((state: RootState) => state.brushReducer.linewidth);
    const color = useSelector((state: RootState) => state.colorReducer.color)


    useEffect(() => {
        setCanvasCtx(canvasRef.current?.getContext('2d'));
    }, [canvasRef])


    useEffect(() => {
        const updateWindowDimensions = (): void => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight - 300);
        }

        window.addEventListener('resize', updateWindowDimensions);

        return (): void => window.removeEventListener('resize', updateWindowDimensions);
    }, [])

    canvasCtx.fillStyle = color;
    canvasCtx.strokeStyle = color;
    canvasCtx.lineWidth = linewidth;

    function mouseDown(e: React.MouseEvent<HTMLCanvasElement>): void {
        setIsMouseDown(true);
        canvasCtx.beginPath();
        draw(e.pageX, e.pageY)
    }

    function mouseUp(): void {
        setIsMouseDown(false);
    }

    function mouseMove(e: React.MouseEvent<HTMLCanvasElement>): void {
        if(!isMouseDown) return
        draw(e.pageX, e.pageY)
    }

    function draw(x: number, y: number): void {
        canvasCtx.lineTo(x, y - 300);
        canvasCtx.stroke();
        canvasCtx.beginPath();
        canvasCtx.arc(x, y - 300, linewidth/2 , 0, Math.PI * 2);
        canvasCtx.fill();
        canvasCtx.beginPath();
        canvasCtx.moveTo(x, y - 300);
    }



    return ( 
        <canvas 
            ref={canvasRef} 
            style={{display: 'block'}} 
            height={height} 
            width={width} 
            className="canvas" 
            onMouseDown={(e) => mouseDown(e)}
            onMouseMove={(e) => mouseMove(e)}
            onMouseUp={() => mouseUp()}
            onMouseLeave={() => mouseUp()}
        />
     );
}
 
export default Canvas;