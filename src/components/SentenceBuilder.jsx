import { useMemo, useState } from "react";

export function SentenceBuilder({ lesson }) {
  const [picked, setPicked] = useState([]);
  const tokens = lesson.build.scrambled;
  const available = useMemo(
    () => tokens.map((token, index) => ({ token, index })).filter(({ index }) => !picked.includes(index)),
    [tokens, picked],
  );
  const answer = picked.map((index) => tokens[index]).join(" ");
  const isComplete = picked.length === tokens.length;
  const isCorrect = isComplete && answer === lesson.build.sentence;

  function add(index) {
    setPicked((current) => [...current, index]);
  }

  function undo() {
    setPicked((current) => current.slice(0, -1));
  }

  return (
    <section className="activity-card" aria-labelledby="build-title">
      <p className="step-label">Step 3 · Build</p>
      <h2 id="build-title">Build the sentence</h2>
      <p>Tap the words in the order that makes a complete English sentence.</p>
      <div className="sentence-build-line" aria-live="polite">
        {answer || <span className="placeholder">Your sentence will appear here.</span>}
      </div>
      <div className="chip-row" aria-label="Available words">
        {available.map(({ token, index }) => (
          <button key={`${token}-${index}`} type="button" onClick={() => add(index)}>
            {token}
          </button>
        ))}
      </div>
      <div className="small-actions">
        <button type="button" onClick={undo} disabled={!picked.length}>Undo</button>
        <button type="button" onClick={() => setPicked([])} disabled={!picked.length}>Start over</button>
      </div>
      {isComplete ? (
        <p className={isCorrect ? "inline-feedback success" : "inline-feedback try"} role="status">
          {isCorrect ? "That sentence works." : "Almost. Try a different word order."}
        </p>
      ) : null}
    </section>
  );
}
