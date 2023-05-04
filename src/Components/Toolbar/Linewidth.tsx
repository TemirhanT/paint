import { FC } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { brush_4, brush_6, brush_8, brush_10 } from "../../store/reducers/brushReducer";
import { RootState } from "../../store/store";
import { changeColor } from "../../store/reducers/colorReducer";


const Linewidth: FC = () => {

    const linewidth = useSelector((state: RootState) => state.brushReducer.linewidth)
    const dispatch = useDispatch()

    return (
        <div className='buttons'>
            <button onClick={() => dispatch(brush_4())}>4fdghfhgjhgfj</button>
            <button onClick={() => dispatch(brush_6())}>6jkhlnbvm</button>
            <button onClick={() => dispatch(brush_8())}>8esdrtgdfx</button>
            <button onClick={() => dispatch(brush_10())}>10iuyojkl</button>
        </div>
    )
}

export default Linewidth;