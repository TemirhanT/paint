import { memo } from "react";

const ColorTutorial = memo(() => {

    return ( 
        <div className="color-wrapper">
            <div className="color-container">
                <div className="current-color" style={{backgroundColor: 'black'}}/>

                <div className="all-color">
                    <div className="one-color" style={{backgroundColor: 'black'}}/>
                    <div className="one-color" style={{backgroundColor: 'white'}}/>
                    <div className="one-color" style={{backgroundColor: 'grey'}}/>
                    <div className="one-color" style={{backgroundColor: 'brown'}}/>
                    <div className="one-color" style={{backgroundColor: 'green'}}/>
                    <div className="one-color" style={{backgroundColor: 'yellow'}}/>
                    <div className="one-color" style={{backgroundColor: 'red'}}/>
                    <div className="one-color" style={{backgroundColor: 'orange'}}/>
                    <div className="one-color" style={{backgroundColor: 'cyan'}}/>
                    <div className="one-color" style={{backgroundColor: 'purple'}}/>
                    <div className="one-color" style={{backgroundColor: 'pink'}}/>
                    <div className="one-color" style={{backgroundColor: 'blue'}}/>
                </div>

                <img src="./Assets/colorWheel.png"/>

                <div className="name">Цвета</div>
            </div>
        </div>
     );
})
 
export default ColorTutorial;