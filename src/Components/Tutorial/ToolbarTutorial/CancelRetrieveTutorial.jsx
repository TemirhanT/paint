import { memo } from "react";

const CancelRetrieveTutorial = memo(() => {

    return ( 
        <div className="cancel-retrieve-container">
            <div className="cancel-retrieve">
                <img src="/Assets/cancel.png"/>
                <img src="/Assets/retrieve.png"/>
            </div>

            <div className="name">
                отменить/вернуть
            </div>
        </div>
    );
})
 
export default CancelRetrieveTutorial;