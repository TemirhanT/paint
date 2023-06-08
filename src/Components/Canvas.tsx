import React, {FC, useLayoutEffect} from 'react';
import { useRef, useEffect, useState} from "react";
import { useSelector } from 'react-redux/es/exports';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef, useTransformEffect, useTransformContext } from "react-zoom-pan-pinch";
import { IZoomState } from '../store/reducers/zoomReducer';
import Zoom from './Toolbar/Zoom'
import { InView, useInView } from 'react-intersection-observer';
import { setCanvasCtx } from '../store/reducers/canvasReducer';



const Canvas: FC = () => {

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

    const options = {
        threshold: 0
    }
    const [topRef, topInView, topEntry] = useInView(options);
    const [rightRef, rightInView, rightEntry] = useInView(options);
    const [bottomRef, bottomInView, bottomEntry] = useInView(options);
    const [leftRef, leftInView, leftEntry] = useInView(options);
    const [prevScale, setPrevScale] = useState<number>(1)
    const [delay, setDelay] = useState<boolean>(false)



    const transformRef = useRef<ReactZoomPanPinchRef>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);



    const canvasCtx = useSelector((state: RootState) => state.canvasReducer.canvasCtx);
    const linewidth = useSelector((state: RootState) => state.brushReducer.linewidth);
    const color = useSelector((state: RootState) => state.colorReducer.color);
    const zoom = useSelector((state: RootState) => state.zoomReducer);

    const dispatch = useDispatch()

    


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
            if(leftEntry?.isIntersecting && prevScale !== 1 && zoom.currentScale < prevScale) return width/(2*zoom.currentScale)
            if(rightEntry?.isIntersecting && prevScale !== 1 && zoom.currentScale < prevScale) return width - width/(2*zoom.currentScale)
            return prev
        })
        setCenterY((prev: number): number => {
            if(zoom.currentScale == 1) return height/2
            if(topEntry?.isIntersecting && prevScale !== 1 && zoom.currentScale < prevScale) return height/(2*zoom.currentScale)
            if(bottomEntry?.isIntersecting && prevScale !== 1 && zoom.currentScale < prevScale) return height - height/(2*zoom.currentScale)
            return prev
        })
        console.log(topEntry?.isIntersecting)
        setPrevScale(zoom.currentScale)
    }, [delay])



    function mouseDown(e: React.MouseEvent<HTMLCanvasElement>): void {
        if(e.button == 2 || e.button == 1) return
        setIsMouseDown(true);
        if(isAltKeyDown) {
            setIsAltKeyDownBeforeMouse(true)
            setStartX(e.pageX);
            setStartY(e.pageY);
            return;
        }
        console.log(e.pageX, e.pageY, centerX, centerY)
        canvasCtx.beginPath()
        draw(centerX + (e.pageX - width/2)/zoom.currentScale,
             centerY + (e.pageY - height/2)/zoom.currentScale);
    }

    function mouseUp(e: React.MouseEvent<HTMLCanvasElement>): void {
        if(isAltKeyWasDown && isAltKeyDownBeforeMouse) {
            setDifX(startX - e.pageX)
            setDifY(startY - e.pageY)
            setIsAltKeyWasDown(false)
            setIsAltKeyDownBeforeMouse(false)
        }
        setIsMouseDown(false);
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
            canvasCtx.beginPath()
            return
        }

        draw(centerX + (e.pageX - width/2)/zoom.currentScale,
             centerY + (e.pageY - height/2)/zoom.currentScale);
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
                        <div ref={topRef} className='observed-top'/>
                        <div ref={rightRef} className='observed-right'/>
                        <div ref={bottomRef} className='observed-bottom'/>
                        <div ref={leftRef} className='observed-left'/>
                </TransformComponent>
            </React.Fragment>
            )}
        </TransformWrapper>
     );
}
 
export default Canvas;