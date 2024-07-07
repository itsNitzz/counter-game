import { useRef, useState } from "react";
import ResultDialogue from "./ResultDialogue";

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timer = useRef();
  const dialogRef = useRef();

  const isTimerStarted = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialogRef.current.open();
  }

  const onTimerHandler = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 10);
    }, 10);
  };

  const onStopTimer = () => {
    clearInterval(timer.current);
    dialogRef.current.open();
  };

  function resetTimer() {
    setTimeRemaining(targetTime * 1000);
  }

  return (
    <>
      <ResultDialogue
        ref={dialogRef}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onHandleReset={resetTimer}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={isTimerStarted ? onStopTimer : onTimerHandler}>
            {isTimerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p>{isTimerStarted ? "Timer running..." : "Timer is inactive"}</p>
      </section>
    </>
  );
}
