import { useSelector } from 'react-redux';
import Canvas from './Components/Canvas';
import './styles/styles.css'
import { useDispatch } from 'react-redux';
import { brush_4, brush_6, brush_8, brush_10 } from './store/reducers/brushReducer';
import Linewidth from './Components/Toolbar/Linewidth';
import Color from './Components/Toolbar/Color';
import Figures from './Components/Toolbar/Figures';
import CancelRetrieve from './Components/Toolbar/CancelRetrieve';
import Tutorial from './Components/Tutorial/Tutorial';
import { useRef, useEffect } from 'react';
import IsPanningMobile from './Components/Toolbar/IsPanningMobile';

function App() {

  return (
    <div className="App">
      <div className='toolbar'>
        <CancelRetrieve/>
        <Linewidth/>
        <Color/>
        <Figures/> 
        <IsPanningMobile/>
        {/* <Zoom/> 
        этот компонент находится в файле canvas.tsx, иначе фукнционал не будет работать.
        А тут он находится лишь для напоминания и избежания путаницы, ведь на странице с помощью position absolute он перемещен к остальным инструментам */}
      </div>
      <Tutorial/>
      <div className='space'></div>
      <Canvas/>
    </div>
  );
}

export default App;
