import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { SketchPicker } from 'react-color';
import { changeColor } from "../../store/reducers/colorReducer";


// изменение цвета


const Color: FC = () => {

    const color = useSelector((state: RootState) => state.colorReducer.color)
    const dispatch = useDispatch<AppDispatch>()


    return ( 
        <div className="color-picker">
            <SketchPicker
            className="sketch-picker"
            disableAlpha
            presetColors={[]}
            color={color}
            onChange={(newColor) => dispatch(changeColor(newColor.hex))}/>
        </div>
     );
}
 
export default Color;