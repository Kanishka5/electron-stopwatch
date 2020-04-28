/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useRef } from 'react';
import styles from './Home.css';

const Home = () => {
  // states
  const [timerOn, SetTimer] = useState(false);
  const [startTime, SetStart] = useState(0);
  const [currTime, SetCurrent] = useState(0);
  const timer = useRef(null);

  // start timer function
  const startTimer = () => {
    SetTimer(true);
    SetCurrent(currTime);
    SetStart(Date.now() - currTime);
  };

  // Stop timer function
  const stopTimer = () => {
    SetTimer(false);
    clearInterval(timer.current);
  };

  // Reset timer function
  const resetTimer = () => {
    SetCurrent(0);
    SetStart(0);
  };

  // update start time
  useEffect(() => {
    if (startTime > 0) {
      timer.current = setInterval(() => {
        SetCurrent(Date.now() - startTime);
      }, 10);
    }
  }, [startTime]);

  // formatiing time
  const centiseconds = `0${Math.floor(currTime / 10) % 100}`.slice(-2);
  const seconds = `0${Math.floor(currTime / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(currTime / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(currTime / 3600000)}`.slice(-2);

  // Return html
  return (
    <div className={styles.container}>
      <h1>Timer</h1>
      <p>
        {hours} : {minutes} : {seconds} : {centiseconds}
      </p>
      {}
      {timerOn === false && currTime === 0 && (
        <button type="button" onClick={startTimer}>
          Start
        </button>
      )}
      {timerOn === true && (
        <button type="button" onClick={stopTimer}>
          Stop
        </button>
      )}
      {timerOn === false && currTime > 0 && (
        <button type="button" onClick={startTimer}>
          Resume
        </button>
      )}
      {timerOn === false && currTime > 0 && (
        <button type="button" onClick={resetTimer}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Home;
