import React, { useState, useEffect, useRef } from "react";

function useInterval(callback) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    });
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
  
      let id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }, []);
  }

  const displayTime = secs => {
    const secondCounter = secs % 60;
    const hourCounter = Math.floor(secs / 3600);
    const minuteCounter = Math.floor(secs / 60) - hourCounter*60;

    const computedSecond =
        String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
    const computedMinute =
        String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;
    const computedHour = String(hourCounter).length === 1
    ? `0${hourCounter}`
    : hourCounter;
        return computedHour+':'+computedMinute+':'+computedSecond
}

const Timer = ({ seconds }) => {
    // initialize timeLeft with the seconds prop
    const [timeLeft, setTimeLeft] = useState(seconds);
  
    useEffect(() => {
      // exit early when we reach 0
      if (!timeLeft) return;
  
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
  
      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }, [timeLeft]);
  

    return (
      <span>{displayTime(timeLeft)}</span>
    );
  };

export default Timer;