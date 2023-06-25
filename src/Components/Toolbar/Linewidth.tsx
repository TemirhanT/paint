import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changeBrush } from "../../store/reducers/brushReducer";
import { AppDispatch, RootState } from "../../store/store";



// выбор толщины кисти


const Linewidth: FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [isDroppedDown, setIsDroppedDown] = useState<boolean>(false);



    const chooseOption = (number: number) => {
        dispatch(changeBrush(number))
    }



    useEffect(() => {
        const func = (e: MouseEvent) => {
            if(e.target != document.querySelector('.linewidth-container .title') && 
            e.target != document.querySelectorAll('.linewidth-container .title img')[0] && 
            e.target != document.querySelectorAll('.linewidth-container .title img')[1]) {
                setIsDroppedDown(false)
            }
        } 

        window.addEventListener('click', func)
        return () => {
            window.removeEventListener('click', func)
        }
    }, [])

    return (
        <div className="linewidth-container">
            <div className="linewidth-selector">
                <div className="title" onClick={() => setIsDroppedDown(!isDroppedDown)}>
                    <img src='/Assets/brush.png' width={35} height={35}/>
                    <img src="/Assets/arrowDown.png" alt="arrow down" width={16} height={16}/>
                </div>

                <div className="options" style={isDroppedDown ? {display: "flex"} : {display: 'none'}}>
                    <div className="option" onClick={() => chooseOption(4)}>
                        4px
                    </div>
                    <div className="option" onClick={() => chooseOption(6)}>
                        6px
                    </div>
                    <div className="option" onClick={() => chooseOption(8)}>
                        8px
                    </div>
                    <div className="option" onClick={() => chooseOption(10)}>
                        10px
                    </div>
                </div>
            </div>

            <div className="name">
                Толщина кисти
            </div>
        </div>
    )
}

export default Linewidth;