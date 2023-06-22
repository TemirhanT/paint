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
        <div className="color-wrapper">
            <div className="current-color" style={{backgroundColor: color}}/>

            <div className="all-color">
                <div className="one-color" style={{backgroundColor: 'black'}} onClick={() => dispatch(changeColor('black'))}/>
                <div className="one-color" style={{backgroundColor: 'white'}} onClick={() => dispatch(changeColor('white'))}/>
                <div className="one-color" style={{backgroundColor: 'grey'}} onClick={() => dispatch(changeColor('grey'))}/>
                <div className="one-color" style={{backgroundColor: 'brown'}} onClick={() => dispatch(changeColor('brown'))}/>
                <div className="one-color" style={{backgroundColor: 'green'}} onClick={() => dispatch(changeColor('green'))}/>
                <div className="one-color" style={{backgroundColor: 'yellow'}} onClick={() => dispatch(changeColor('yellow'))}/>
                <div className="one-color" style={{backgroundColor: 'red'}} onClick={() => dispatch(changeColor('red'))}/>
                <div className="one-color" style={{backgroundColor: 'orange'}} onClick={() => dispatch(changeColor('orange'))}/>
                <div className="one-color" style={{backgroundColor: 'cyan'}} onClick={() => dispatch(changeColor('cyan'))}/>
                <div className="one-color" style={{backgroundColor: 'purple'}} onClick={() => dispatch(changeColor('purple'))}/>
                <div className="one-color" style={{backgroundColor: 'pink'}} onClick={() => dispatch(changeColor('pink'))}/>
                <div className="one-color" style={{backgroundColor: 'blue'}} onClick={() => dispatch(changeColor('blue'))}/>
            </div>

            <img src="/Assets/colorWheel.png" width={60} height={60} style={{objectFit: 'fill', marginLeft: 20}}/>


            {/* <div className="color-picker">
                <SketchPicker
                className="sketch-picker"
                disableAlpha
                presetColors={[]}
                color={color}
                onChange={(newColor) => dispatch(changeColor(newColor.hex))}/>
            </div> */}

            <div className="name">Цвета</div>
        </div>
     );
}
 
export default Color;