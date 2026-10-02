import { useState } from "react";

export function MeaningCheck({ lesson }) {
  const [choice, setChoice] = useState(null);
  const isCorrect = choice === lesson.check.answer;

  return (
    <section className="activity-card" aria-labelledby="meaning-title">
      <p className="step-label">Step 5 · Understand</p>
      <h2 id="meaning-title">Check the meaning</h2>
      <p className="meaning-question">{lesson.check.prompt}</p>
      <div className="choice-grid vertical" role="group" aria-label="Meaning choices">
        {lesson.check.choices.map((item) => (
          <button
            key={item}
            type="button"
            className={choice === item ? "choice-button selected" : "choice-button"}
            onClick={() => setChoice(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {choice ? (
        <p className={isCorrect ? "inline-feedback success" : "inline-feedback try"} role="status">
          {isCorrect ? "Yes. That matches what the sentence says." : "Try reading the sentence again and look for the detail that answers the question."}
        </p>
      ) : null}
    </section>
  );
}
