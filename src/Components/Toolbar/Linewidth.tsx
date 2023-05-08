import { FC } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changeBrush } from "../../store/reducers/brushReducer";
import { AppDispatch, RootState } from "../../store/store";


const Linewidth: FC = () => {

    const linewidth = useSelector((state: RootState) => state.brushReducer.linewidth)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className="selector-wrapper">
            <select className = 'selector' onChange={e => dispatch(changeBrush(+e.currentTarget.value))}>
                <option value = '4'>4 px</option>
                <option value = '6'>6 px</option>
                <option value = '8'>8 px</option>
                <option value = '10'>10 px</option>
            </select>
        </div>
    )
}

export default Linewidth;