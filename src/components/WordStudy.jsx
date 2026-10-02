export function WordStudy({ lesson, speechRate, onSpeak, path }) {
  return (
    <section className="activity-card" aria-labelledby="word-study-title">
      <p className="step-label">Step 1 · Learn</p>
      <h2 id="word-study-title">{path === "english" ? "Learn the words" : path === "reading" ? "Read the words" : "Meet the words"}</h2>
      <p>{lesson.teach}</p>

      {lesson.phonics ? (
        <div className="teaching-note">
          <strong>{path === "english" ? "Spelling & pronunciation" : "Sound & spelling focus"}: {lesson.phonics.pattern}</strong>
          <span>{lesson.phonics.note}</span>
          <div className="mini-word-row" aria-label="Sound pattern examples">
            {lesson.phonics.examples.map((word) => (
              <button key={word} type="button" onClick={() => onSpeak(word, speechRate)}>
                {word} <span aria-hidden="true">🔊</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="vocab-grid">
        {lesson.newWords.map((item) => (
          <button
            key={item.word}
            type="button"
            className="vocab-card"
            onClick={() => onSpeak(item.word, speechRate)}
            aria-label={`Hear ${item.word}. ${item.meaning}`}
          >
            <span className="vocab-cue" aria-hidden="true">{item.cue}</span>
            <strong>{item.word}</strong>
            <small>{item.meaning}</small>
            <span className="hear-label">Hear word</span>
          </button>
        ))}
      </div>
    </section>
  );
}
