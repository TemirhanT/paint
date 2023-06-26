import { memo } from "react";

const ZoomTutorial = memo(() => {

    return ( 
        <div className="zoom">
            <img src="./Assets/zoom-in.png"/>
            <img src="./Assets/zoom-out.png"/>
            <img src="./Assets/reset.png"/>
            <span>Зум: 1</span>
            <div className="name">Приближение/Отдаление/Сброс</div>
        </div>
     );
})

export default ZoomTutorial;