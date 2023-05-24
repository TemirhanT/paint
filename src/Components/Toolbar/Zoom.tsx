import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { myZoomIn, myZoomOut } from "../../store/reducers/zoomReducer";

function Zoom({ zoomIn, zoomOut, centerView }: any) {

    const zoom = useSelector((state: RootState) => state.zoomReducer);
    const dispatch = useDispatch<AppDispatch>();

    const customZoomIn = () => {
        dispatch(myZoomIn());
        zoomIn(zoom.step, 60);
    }
    const customZoomOut = () => {
        dispatch(myZoomOut());
        zoomOut(zoom.step, 60);
    }

    return ( 
        <div className="zoom">
            <button onClick={() => customZoomIn()}>+</button>
            <button onClick={() => customZoomOut()}>-</button>
            <button onClick={() => centerView()}>center</button>
            <span>{zoom.currentScale}</span>
        </div>
     );
}

export default Zoom;