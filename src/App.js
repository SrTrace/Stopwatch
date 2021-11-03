import React, {useState, useEffect} from 'react';
import styles from './App.module.css';

const App = () => {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [wait, setWait] = useState(false);


    return (
        <div className={styles.container}>
            <div>
                <span>{("0" + Math.floor(time / 60000) % 60).slice(-2)} : </span>
                <span>{("0" + Math.floor(time / 1000) % 60).slice(-2)} : </span>
                <span>{("0" + (time / 10) % 100).slice(-2)}</span>
            </div>
            <div>
                {!timerOn && (
                    <button onClick={() => setTimerOn(true)}>Start</button>
                )}
                {timerOn && (
                    <button onClick={() => setTimerOn(false)}>Stop</button>
                )}
                <button  onClick={()=> setWait(true)}>Wait</button>
                <button onClick={() => setTime(0)}>Reset</button>
            </div>

        </div>
    );
};

export default App;
