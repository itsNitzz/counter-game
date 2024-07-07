import { useState, useRef } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState(null);
  const nameRef = useRef();

  const onPlayerNamehandler = () => {
    setPlayerName(nameRef.current.value);
  };
  return (
    <section id="player">
      <h2>Welcome {playerName ?? "unknown entity"}</h2>
      <p>
        <input ref={nameRef} type="text" />
        <button onClick={onPlayerNamehandler}>Set Name</button>
      </p>
    </section>
  );
}
