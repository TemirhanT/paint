import { FC, memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { SketchPicker } from 'react-color';
import { changeColor } from "../../store/reducers/colorReducer";


// изменение цвета


const Color: FC = memo(() => {
    const [colorPickerDisplay, setColorPickerDisplay] = useState<boolean>(false)
    const color = useSelector((state: RootState) => state.colorReducer.color)
    const dispatch = useDispatch<AppDispatch>()


    //eventListener который следит за нажатиями вне объектов колор пикера для скрытия 
    //он такой сложный поскольку компонент sketchPicker добавленный из библиотеки react-color содержит очень много дочерних div'ов
    //и прописывать их все в условии будет еще хуже
    useEffect(() => {
        const func = (e: MouseEvent) => {
            const recursion = (htmlElement: any) => {
                if(htmlElement == document.querySelector('.color-picker')) {
                    setColorPickerDisplay(true)
                    return
                }
                if(htmlElement == document.querySelector('HTML')) {
                    setColorPickerDisplay(false)
                    return
                }
                setColorPickerDisplay(false)
                recursion(htmlElement?.parentElement)
            }

            recursion(e.target)

            if(e.target == document.querySelector('.color-wrapper img')) {
                setColorPickerDisplay(true)
            }
        }

        window.addEventListener('click', func);
        return () => {
            window.removeEventListener('click', func);
        }
    }, [])



    return ( 
        <div className="color-wrapper">
            <div className="color-container">
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

                <img src="./Assets/colorWheel.png" onClick={() => setColorPickerDisplay(!colorPickerDisplay)}/>

                <div className="name">Цвета</div>
            </div>

            <div className="color-picker" style={colorPickerDisplay ? {display: 'flex'} : {display: 'none'}}>
                <SketchPicker
                width='100%'
                color={color}
                onChange={(newColor) => dispatch(changeColor(newColor.hex))}/>
            </div>
        </div>
     );
})
 
export default Color;