import { useSelector } from 'react-redux';
import Canvas from './Components/Canvas';
import './styles/styles.css'
import { useDispatch } from 'react-redux';
import { brush_4, brush_6, brush_8, brush_10 } from './store/reducers/brushReducer';

function App() {

  const linewidth = useSelector(state => state.toolkit.linewidth)
  const dispatch = useDispatch()

  console.log(linewidth)
  return (
    <div className="App">
      <div className='buttons'>
        <button onClick={() => dispatch(brush_4())}>4fdghfhgjhgfj</button>
        <button onClick={() => dispatch(brush_6())}>6jkhlnbvm</button>
        <button onClick={() => dispatch(brush_8())}>8esdrtgdfx</button>
        <button onClick={() => dispatch(brush_10())}>10iuyojkl</button>
      </div>
      <Canvas/>
    </div>
  );
}

export default App;
