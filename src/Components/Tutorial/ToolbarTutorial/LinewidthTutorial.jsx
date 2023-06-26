import { memo } from "react";

const LinewidthTutorial = memo(() => {

    return (
        <div className="linewidth-container">
            <div className="linewidth-selector">
                <div className="title">
                    <img src='./Assets/brush.png' width={35} height={35}/>
                    <img src="./Assets/arrowDown.png" alt="arrow down" width={16} height={16}/>
                </div>
            </div>

            <div className="name">
                Толщина кисти
            </div>
        </div>
    )
})

export default LinewidthTutorial;