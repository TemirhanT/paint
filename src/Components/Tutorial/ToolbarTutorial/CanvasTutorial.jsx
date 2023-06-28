import { memo, useState } from "react";

const CanvasTutorial = memo(() => {

    const [width, setWidth] = useState(window.innerWidth - 20);
    const [height, setHeight] = useState(window.innerHeight-274);


    return ( 
        <div className='canvas-wrapper'>
            <canvas 
                role='img'
                style={{display: 'block'}} 
                height={height} 
                width={width} 
                className="canvas" 
            />
        </div>
     );
})
 
export default CanvasTutorial;