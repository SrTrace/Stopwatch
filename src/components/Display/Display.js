import React from 'react';

import styles from './Display.module.css';


const Display = ({time}) => {

    return (
        <div className={styles.container}>
            <div className="min">
                {("0" + Math.floor(time / 60000) % 60).slice(-2)+": "}
            </div>
            <div className="sec">
                {("0" + Math.floor(time / 1000) % 60).slice(-2)+": "}
            </div>
            <div className="ms">
                {("0" + (time / 10) % 100).slice(-2)}
            </div>

        </div>
);
};

export default Display;