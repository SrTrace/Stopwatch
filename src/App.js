import React, {useState, useEffect} from 'react';
import styles from './App.module.css';

import useDoubleClick from './hook/useDoubleClick';

const App = () => {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [wait, setWait] = useState(false);

    const [refCallback, elem] = useDoubleClick(handleWait);

    function handleWait() {
        if (time > 0) {
            setTimerOn(false);
        }
    }

    useEffect(() => {
        let intervalId = null;

        if (timerOn) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
            if (wait) {
                setWait(false);
            }
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
                <button ref={refCallback} onClick={()=> setWait(true)}>Wait</button>
                <button onClick={() => setTime(0)}>Reset</button>
            </div>
        </div>
    );
};

export default App;
