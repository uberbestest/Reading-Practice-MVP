import { useState } from "react";

export function ListenChoice({ lesson, speechRate, onSpeak }) {
  const [choice, setChoice] = useState(null);
  const isCorrect = choice === lesson.listen.target;

  return (
    <section className="activity-card" aria-labelledby="listen-title">
      <p className="step-label">Step 2 · Listen</p>
      <h2 id="listen-title">Which word do you hear?</h2>
      <p>Listen as many times as you need. This is practice, not a test.</p>
      <button
        className="big-listen-button"
        type="button"
        onClick={() => onSpeak(lesson.listen.target, speechRate)}
      >
        <span aria-hidden="true">🔊</span> Play word
      </button>
      <div className="choice-grid" role="group" aria-label="Choose the word you heard">
        {lesson.listen.choices.map((item) => (
          <button
            type="button"
            key={item}
            className={choice === item ? "choice-button selected" : "choice-button"}
            onClick={() => setChoice(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {choice ? (
        <p className={isCorrect ? "inline-feedback success" : "inline-feedback try"} role="status">
          {isCorrect ? "Yes — that is the word." : "Not that one yet. Play the word again and listen closely."}
        </p>
      ) : null}
    </section>
  );
}
