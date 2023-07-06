import { memo } from "react";

const FiguresTutorial = memo(() => {


    return ( 
        <div className="figures-wrapper">
            <div className="figures">
                <button className="figure">
                    <img src="/Assets/curved-line.png"/>
                </button>
                <button className="figure">
                    <img src="/Assets/triangle.png"/>
                </button>
                <button className="figure">
                    <img src="/Assets/square.png"/>
                </button>
                <button className="figure">
                    <img src="/Assets/circle.png"/>
                </button>
            </div>


            <div className="fill-selector">
                <div className="title">
                    <img src='/Assets/figuresStroke.png' width={24} height={24}/>
                    <img src="/Assets/arrowDown.png" alt="arrow down" width={16} height={16}/>
                </div>
            </div>
            <div className="name">Фигуры</div>
        </div>
    );
})

export default FiguresTutorial;