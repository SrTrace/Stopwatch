import React, {useState, useEffect} from 'react';
import styles from './App.module.css';

import Display from "./components/Display/Display";
import Buttons from "./components/Buttons/Buttons";

const App = () => {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [wait, setWait] = useState(false);
    const [firstClick, setFirstClick] = useState(null);

    const callbackForWaitBtn = () => {
        console.log('Stop counting!');
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

        if (timerOn) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (!timerOn && wait) {
            clearInterval(intervalId);
            setWait(false);
        } else if (!timerOn) {
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
                    <Buttons onClick={() => setTimerOn(true)}>Start</Buttons>
                )}
                {timerOn && (
                    <Buttons onClick={() => setTimerOn(false)}>Stop</Buttons>
                )}
                <Buttons onClick={clickHandler}>Wait</Buttons>
                <Buttons onClick={() => setTime(0)}>Reset</Buttons>
            </div>
        </div>
    );
};

export default App;
