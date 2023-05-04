import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { SketchPicker } from 'react-color';
import { changeColor } from "../../store/reducers/colorReducer";

const Color: FC = () => {

    const color = useSelector((state: RootState) => state.colorReducer.color)
    const dispatch = useDispatch()


    return ( 
        <div className="color-picker">
            <SketchPicker
            color={color}
            onChange={(newColor) => dispatch(changeColor(newColor.hex))}/>
        </div>
     );
}
 
export default Color;