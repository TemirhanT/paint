import { useSelector } from 'react-redux';
import Canvas from './Components/Canvas';
import './styles/styles.css'
import { useDispatch } from 'react-redux';
import { brush_4, brush_6, brush_8, brush_10 } from './store/reducers/brushReducer';
import Linewidth from './Components/Toolbar/Linewidth';
import Color from './Components/Toolbar/Color';

function App() {

  const linewidth = useSelector(state => state.brushReducer.linewidth)
  const dispatch = useDispatch()

  console.log(linewidth)
  return (
    <div className="App">
      <div className='toolbar'>
        <Linewidth/>
        <Color/>
      </div>
      <div className='space'></div>
      <Canvas/>
    </div>
  );
}

export default App;
