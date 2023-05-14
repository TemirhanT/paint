import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

function Zoom({ zoomIn, zoomOut }: any) {

    const zoom = useSelector((state: RootState) => state.zoomReducer);
    const dispatch = useDispatch<AppDispatch>();

    const customZoomIn = () => {
        zoomIn(zoom.step);
        
    }

    return ( 
        <div>
            <button onClick={() => zoomIn(zoom.step)}>+</button>
            <button onClick={() => zoomOut(zoom.step)}>-</button>
        </div>
     );
}

export default Zoom;