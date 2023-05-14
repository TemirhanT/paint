import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { myZoomIn, myZoomOut } from "../../store/reducers/zoomReducer";

function Zoom({ zoomIn, zoomOut }: any) {

    const zoom = useSelector((state: RootState) => state.zoomReducer);
    const dispatch = useDispatch<AppDispatch>();

    const customZoomIn = () => {
        zoomIn(zoom.step);
        dispatch(myZoomIn())
    }
    const customZoomOut = () => {
        zoomOut(zoom.step);
        dispatch(myZoomOut())
    }

    return ( 
        <div>
            <button onClick={() => customZoomIn()}>+</button>
            <button onClick={() => customZoomOut()}>-</button>
        </div>
     );
}

export default Zoom;