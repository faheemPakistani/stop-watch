import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [isStart, setIsStart] = useState(true);
  const ref = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTimer((pre) => ({ ...pre, [name]: value }));
  };

  const handleStartButton = () => {
    setIsStart(!isStart);
    ref.current = setInterval(() => {
      setTimer((pre) => {
        if (pre.seconds == 0 && pre.minutes == 0) {
          clearInterval(ref.current)
          return {minutes: 0, seconds: 0}
        }
        if (pre.seconds == 0) {
          return { seconds: 59, minutes: pre.minutes - 1 };
        } else {
          return {
            ...pre,
            seconds: pre.seconds - 1,
          };
        }
      });
    }, 1000);
  };

  const handleStopButton = () => {
    setIsStart(!isStart);
    clearInterval(ref.current);
  };

  const handleResetButton = () => {
    clearInterval(ref.current);
    const seconds = document.getElementById("seconds").value;
    const minutes = document.getElementById("minutes").value;
    setTimer({ seconds, minutes });
  };

  return (
    <>
      <input
        type="number"
        name="minutes"
        id="seconds"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="seconds"
        id="minutes"
        onChange={handleInputChange}
      />
      {isStart ? (
        <button onClick={handleStartButton}>Start</button>
      ) : (
        <button onClick={handleStopButton}>Stop</button>
      )}
      <button onClick={handleResetButton}>Reset</button>
      <p>{`${timer.minutes}m:${timer.seconds}s`}</p>
    </>
  );
}

export default App;
