export function About({ course, speechRate, onSpeechRateChange, onResetProgress }) {
  return (
    <main className="about-shell">
      <section className="about-hero">
        <p className="eyebrow">About the project</p>
        <h1>Simple practice on top. Explicit boundaries underneath.</h1>
        <p className="lede">
          Project Read Good is a local-first starter course for people learning to read English,
          learning English as an additional language, or doing both.
        </p>
      </section>

      <section className="about-grid">
        <article>
          <h2>What it teaches</h2>
          <p>Beginner words, common spelling patterns, listening, sentence order, oral reading practice, and basic comprehension.</p>
        </article>
        <article>
          <h2>What it does not claim</h2>
          <p>{course.evidenceBoundary}</p>
        </article>
        <article>
          <h2>Privacy</h2>
          <p>The app has no account, advertising, analytics, learner database, or application backend. Course completion is stored only in this browser.</p>
        </article>
        <article>
          <h2>Microphone boundary</h2>
          <p>The app does not save speech audio or transcripts. Browser speech recognition may use a browser or operating-system service, which can have its own data handling. Microphone practice is always optional.</p>
        </article>
      </section>

      <section className="settings-card" aria-labelledby="speech-speed-title">
        <div>
          <p className="eyebrow">Settings</p>
          <h2 id="speech-speed-title">Listening speed</h2>
          <p>Choose how quickly the browser reads words and sentences aloud.</p>
        </div>
        <div className="rate-buttons" role="group" aria-label="Speech rate">
          {[
            [0.7, "Slow"],
            [0.82, "Practice"],
            [0.95, "Natural"],
          ].map(([rate, label]) => (
            <button
              key={rate}
              type="button"
              aria-pressed={speechRate === rate}
              onClick={() => onSpeechRateChange(rate)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="danger-zone">
        <h2>Local progress</h2>
        <p>You can erase the lesson-completion data stored in this browser at any time.</p>
        <button type="button" onClick={onResetProgress}>Reset local progress</button>
      </section>
    </main>
  );
}
