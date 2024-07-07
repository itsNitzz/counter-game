import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultDialogue = forwardRef(function ResultDialogue(
  { remainingTime, targetTime, onHandleReset },
  ref
) {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  const isLost = remainingTime <= 0;
  const formattedTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  return createPortal(
    <dialog ref={dialogRef} className="result-modal">
      {isLost && <h2>Your lost</h2>}
      {!isLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime}</strong> seconds.
      </p>
      <p>
        You stopped the timer with <strong>{formattedTime}</strong> seconds
        remaining.
      </p>
      <form method="dialog" onSubmit={onHandleReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.querySelector("#modal")
  );
});

export default ResultDialogue;
