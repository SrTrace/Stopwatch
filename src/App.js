import React, {useState, useEffect} from 'react';
import styles from './App.module.css';

import Display from "./components/Display/Display";

const App = () => {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [wait, setWait] = useState(false);
    const [firstClick, setFirstClick] = useState(null);

    const callbackForWaitBtn = () => {
        console.log('Do something!');
        if (time > 0) {
            setWait(true);
            setTimerOn(false);
        }
    };

    const clickHandler = () => {
        if (firstClick) {
            const secondClick = Date.now();
            const timeInterval = secondClick - firstClick; // for test
            if (secondClick - firstClick < 300) {
                setFirstClick(null);
                callbackForWaitBtn();
                console.log('interval => ', timeInterval); // for test
                return;
            } else {
                console.log('interval => ', timeInterval); // for test
                setFirstClick(null);
                return;
            }
        }
        setFirstClick(Date.now());
    };

    useEffect(() => {
        let intervalId = null;
        console.log("on top useEffect:  ", timerOn, " ", wait);
        if (timerOn) {
            console.log("start");
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (!timerOn && wait) {
            console.log("wait")
            clearInterval(intervalId);
            setWait(false);
        } else if (!timerOn) {
            console.log("stop");
            setTime(0);
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);

    }, [timerOn]);

    return (
        <div className={styles.container}>
            <div>
                <Display time={time}/>
            </div>
            <div>
                {!timerOn && (
                    <button onClick={() => setTimerOn(true)}>Start</button>
                )}
                {timerOn && (
                    <button onClick={() => setTimerOn(false)}>Stop</button>
                )}
                <button onClick={clickHandler}>Wait</button>
                <button onClick={() => setTime(0)}>Reset</button>
            </div>
        </div>
    );
};

export default App;
