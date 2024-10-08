import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const defaultBreakLength = 5;
const defaultSessionLength = 25;
const oneMinMs = 60 * 1000;

function App() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [breakLength, setBreakLength] = useState(defaultBreakLength);
  const [sessionLength, setSessionLength] = useState(defaultSessionLength);
  const [TimerValueMs, setTimerValueMs] = useState(sessionLength * oneMinMs);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [pauseDate, setPauseDate] = useState(null);
  const [timerID, setTimerID] = useState(null);

  const handleChangeBreakLength = (value) => {
    if (!isTimerRunning && value >= 1 && value <= 60) {
      let date = new Date(new Date().getTime() + value * oneMinMs);

      if (isBreakTime) {
        setEndDate(date);
        setTimerValueMs(value * oneMinMs);
      }
      setBreakLength(value);
      setPauseDate(null);
    }
  };
  const handleChangeSessionLength = (value) => {
    if (!isTimerRunning && value >= 1 && value <= 60) {
      let date = new Date(new Date().getTime() + value * oneMinMs);
      if (!isBreakTime) {
        setEndDate(date);
        setTimerValueMs(value * oneMinMs);
      }
      setSessionLength(value);
      setPauseDate(null);
    }
  };
  const startTimer = (date) => {
    clearInterval(timerID);
    let id = setInterval(() => {
      let now = new Date();
      let timeLeft = new Date(date).getTime() - now.getTime();
      if (timeLeft <= 1500) {
        document
          .getElementById("beep")
          .play()
          .catch((err) => console.log(err));
      }
      if (timeLeft < 0) {
        clearInterval(id);

        timerEnded();
      } else {
        setTimerValueMs(timeLeft);
      }
    }, 500);
    setTimerID(id);
  };
  const timerEnded = () => {
    let state = !isBreakTime;
    setIsBreakTime(state);

    let length = state ? breakLength : sessionLength;
    setEndDate(null);
    setIsTimerRunning(false);
    clearInterval(timerID);
    setTimeout(() => {
      setTimerValueMs(length * oneMinMs);
      document.getElementById("start_stop").click();
    }, 200);
  };
  const handlePlayPause = () => {
    let length = isBreakTime ? breakLength : sessionLength;
    let end = new Date().getTime() + length * oneMinMs;
    let pause = new Date();
    if (!endDate || new Date() > endDate) {
      setEndDate(new Date(end));
    } else {
      end = endDate;
    }
    if (isTimerRunning && !pauseDate) {
      setPauseDate(pause);
    } else if (!isTimerRunning && pauseDate) {
      let offset = pause.getTime() - pauseDate.getTime();
      end = endDate.getTime() + offset;
      setEndDate(new Date(end));
      setPauseDate(null);
    }
    if (!isTimerRunning) {
      startTimer(end);
    } else {
      clearInterval(timerID);
    }
    setIsTimerRunning(!isTimerRunning);
  };
  const handleReset = () => {
    setBreakLength(defaultBreakLength);
    setSessionLength(defaultSessionLength);
    setIsBreakTime(false);
    setIsTimerRunning(false);
    setEndDate(null);
    setPauseDate(null);
    setTimerValueMs(defaultSessionLength * oneMinMs);
    clearInterval(timerID);
    document.getElementById("beep").currentTime = 0;
    document.getElementById("beep").pause();
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
        endDate={endDate}
      />
      <Footer />
    </div>
  );
}

export default App;
