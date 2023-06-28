import { MobileView } from "react-device-detect";
import { setIsPanningMobile } from "../../store/reducers/canvasReducer";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useRef } from "react";
import { useSelector } from "react-redux";

const IsPanningMobile = () => {

    const dispatch = useDispatch<AppDispatch>()
    const isPanning = useSelector((state: RootState) => state.canvasReducer.isPanningMobile)


    return ( 
        <MobileView>
            <div className="is-panning-mobile">
                <img className={isPanning ? "active" : ''} src="./Assets/panning.png" onClick={() => dispatch(setIsPanningMobile())}/>
            </div>
        </MobileView>
     );
}
 
export default IsPanningMobile;