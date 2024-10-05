import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const oneMinMs = 60 * 1000;
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [TimerValueMs, setTimerValueMs] = useState(sessionLength * oneMinMs);
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    let id = setInterval(() => {
      if (isTimerRunning) {
        let time = TimerValueMs - 1000;
        if (time < 0) {
          if (!isBreakTime) {
            setTimerValueMs(breakLength * oneMinMs);
          } else {
            setTimerValueMs(sessionLength * oneMinMs);
          }
          setIsBreakTime(!isBreakTime);
        } else {
          setTimerValueMs(time);
        }

        console.log(TimerValueMs);
      }
    }, 1000);
    if (!window.started) {
      window.started = true;
    }

    return () => clearInterval(id);
  }, [
    setTimerValueMs,
    TimerValueMs,
    isTimerRunning,
    breakLength,
    isBreakTime,
    oneMinMs,
    sessionLength,
  ]);

  const handleChangeBreakLength = (value) => {
    if (!isTimerRunning && value >= 1 && value <= 60) {
      setBreakLength(value);
    }
  };
  const handleChangeSessionLength = (value) => {
    if (!isTimerRunning && value >= 1 && value <= 60) {
      setSessionLength(value);
      setTimerValueMs(value * oneMinMs);
    }
  };
  const handlePlayPause = () => {
    setIsTimerRunning(!isTimerRunning);
  };
  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setIsTimerRunning(false);
  };
  return (
    <div className="App text-white">
      <Header
        breakLength={breakLength}
        onChangeBreakLength={handleChangeBreakLength}
        sessionLength={sessionLength}
        onChangeSessionLength={handleChangeSessionLength}
      />
      <Main
        isTimerRunning={isTimerRunning}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        isBreakTime={isBreakTime}
        TimerValue={TimerValueMs}
      />
      <Footer />
    </div>
  );
}

export default App;
