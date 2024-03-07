import "../styles/App.css";

import React, { useState, useEffect, useRef } from "react";

function App() {
  const [time, setTime] = useState(0); // Time in centiseconds
  const [laps, setLaps] = useState([]); // Array to store lap times
  const [timerRunning, setTimerRunning] = useState(false); // Flag to track if timer is running
  const intervalRef = useRef(); // Mutable reference to the interval timer

  useEffect(() => {
    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalRef.current);
  }, []);

  // Function to start or resume the timer
  const startTimer = () => {
    if (!timerRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increment time by 1 centisecond
      }, 10); // Update time every 10 milliseconds (centiseconds)
      setTimerRunning(true);
    }
  };

  // Function to stop the timer
  const stopTimer = () => {
    clearInterval(intervalRef.current); // Clear the interval
    setTimerRunning(false);
  };

  // Function to record a lap time
  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]); // Add current time to the laps array
  };

  // Function to reset the timer and laps
  const resetTimer = () => {
    clearInterval(intervalRef.current); // Clear the interval
    setTime(0); // Reset time to zero
    setLaps([]); // Clear lap times
    setTimerRunning(false); // Stop the timer
  };

  // Format time in minutes, seconds, and centiseconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;
    return `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(
      centiseconds
    )}`;
  };

  // Function to pad numbers with leading zeros
  const padNumber = (number) => {
    return number.toString().padStart(2, "0");
  };

  return (
    <div className="lap-timer">
      <div className="timer">{formatTime(time)}</div>
      <div className="controls">
        {!timerRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={stopTimer}>Stop</button>
        )}
        <button onClick={recordLap} disabled={!timerRunning}>
          Lap
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="laps">
        <h2>Lap Times</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{formatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
