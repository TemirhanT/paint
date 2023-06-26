import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CancelRetrieve from "../Toolbar/CancelRetrieve";
import Linewidth from "../Toolbar/Linewidth";
import Color from "../Toolbar/Color";
import Figures from "../Toolbar/Figures";
import Zoom from "../Toolbar/Zoom";
import Canvas from "../Canvas";
import CancelRetrieveTutorial from "./ToolbarTutorial/CancelRetrieveTutorial";
import ColorTutorial from "./ToolbarTutorial/ColorTutorial";
import FiguresTutorial from "./ToolbarTutorial/FiguresTutorial";
import LinewidthTutorial from "./ToolbarTutorial/LinewidthTutorial";
import ZoomTutorial from "./ToolbarTutorial/ZoomTutorial";

const Tutorial = memo(() => {

    const [isAllWatched, setIsAllWatched] = useState<boolean>(false);
    const [whatAct, setWhatAct] = useState<number>(0);

    const watchAgain = () => {
        setIsAllWatched(false);
        setWhatAct(-1)
    }

    useEffect(() => {
        const bool = localStorage.getItem('isAllWatched');
        if(bool) {
            setIsAllWatched((/true/).test(bool))
        }
    }, [])

    useEffect(() => {
        if(whatAct == 11) {
            setIsAllWatched(true)
        }
    }, [whatAct])

    useEffect(() => {
        function func() {
            if(whatAct < 12) {
                setWhatAct(prev => prev + 1)
            }
        }

        window.addEventListener('click', func)
        return () => {
            window.removeEventListener('click', func)
        }
    }, [])

    useEffect(() => {
        function func() {
            if(whatAct < 12) {
                setWhatAct(prev => prev + 1)
            }
        }

        window.addEventListener('keydown', func)
        return () => {
            window.removeEventListener('keydown', func)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('isAllWatched', `${isAllWatched}`)
    }, [isAllWatched])




    //чтобы выделить компоненты на фоне всей остальной страницы я покрасил задний фон 
    //однако для указывания на компоненты тулбара и канваса нужно было вернуть как то цвет над этими компонентами
    //для этого я помещаю новые компненты поверх неюзабельных
    //после прохождения обучения они пропадают так что на работоспособность это никак не влияет

    return ( 
        <>
            <div className="tutorial-container" style={isAllWatched ? {display: 'none'} : {display: 'flex'}}>
                <div className="start" style={whatAct !== 0 ? {display: 'none'} : {display: 'flex'}}>
                    Здравствуйте! Это краткое объяснение функционала данного веб-приложения. Для продолжения нажмите любую кнопкую.
                </div>
                <div className="action-1" style={whatAct !== 1 ? {display: 'none'} : {display: 'flex'}}>
                    Приложение состоит из двух блоков.
                </div>
                <div className="action-2-container" style={whatAct !== 2 ? {display: 'none'} : {display: 'flex'}}>
                    <div className="action-2">
                        Инструменты.
                    </div>
                    <div className="toolbar">
                        <CancelRetrieveTutorial/>
                        <LinewidthTutorial/>
                        <ColorTutorial/>
                        <FiguresTutorial/> 
                        <ZoomTutorial/>
                    </div>
                </div>
                <div className="action-3-container" style={whatAct !== 3 ? {display: 'none'} : {display: 'flex'}}>
                    <div className="action-3">И холст.</div>

                        <div className='toolbar' style={{opacity: 0}}>
                            <CancelRetrieveTutorial/>
                            <LinewidthTutorial/>
                            <ColorTutorial/>
                            <FiguresTutorial/> 
                            <ZoomTutorial/>
                        </div>
                        <div className='space'></div>
                        <Canvas/>
                </div>
                <div className="action-4-container" style={whatAct !== 4 ? {display: 'none'} : {display: 'flex'}}>
                    <div className="action-4">Среди инструментов есть отмена и возврат отмененного действия.</div>
                    <div className="toolbar">
                        <CancelRetrieveTutorial/>
                    </div>
                </div>
                <div className="action-5-container" style={whatAct !== 5 ? {display: 'none'} : {display: 'flex'}}>
                    <div className="action-5">Взаимодействие с зумом на холсте и нынешнее значение зума.</div>
                    <div className="toolbar"><ZoomTutorial/></div>
                </div>
                <div className="action-6-container" style={whatAct !== 6 ? {display: 'none'} : {display: 'flex'}}>
                    <div className="action-6">
                        Выбор размера кисти.
                    </div>
                    <div className="toolbar"><LinewidthTutorial/></div>
                </div>
                <div className="action-7-container" style={whatAct !== 7 ? {display: 'none'} : {display: 'flex'}}>
                    <div className="action-7">
                        Выбор цвета. Предоставляются уже готовые варианты цветов, но также можно открыть полную палитру, нажав на разноцветный круг справа.
                    </div>
                    <div className="toolbar"><ColorTutorial/></div>
                </div>
                <div className="action-8-container" style={whatAct !== 8 ? {display: 'none'} : {display: 'flex'}}>
                    <div className="action-8">
                        И несколько фигур для рисования. По умолчанию стоит первая фигура - линия, то есть обычное рисование. Вы также можете нажать на три кубика справа и выбрать заполнять вам рисуемую фигуру или вы хотите чтобы она только обводилась.
                    </div>
                    <div className="toolbar"><FiguresTutorial/></div>
                </div>
                <div className="action-9" style={whatAct !== 9 ? {display: 'none'} : {display: 'flex'}}>
                    У холста есть только одна особенная функция - перемещение по холсту. Перемещение нужно во время использования зума, ведь увеличение идет лишь в центр вашего экрана. Для перемещения зажмите кнопку Alt и используйте ЛКМ. Если вы используете Mac, то, вместо Alt, зажимайте кнопку Option.
                </div>
                <div className="end-container" style={whatAct !== 10 ? {display: 'none'} : {display: 'flex'}}>
                    <div className="end">
                        На этом все! Если вы что то забыли, то можете нажать на знак вопроса в правом верхнем углу и снова пройти это мини-обучение. Веселитесь!
                    </div>

                    <img src="./Assets/question.png" className="tutorial"/>
                </div>
            </div>


            <img src="./Assets/question.png" className="tutorial" onClick={() => watchAgain()}/>
        </>
     );
})
 
export default Tutorial;