import { WordButton } from "./WordButton.jsx";

export function SentenceCard({ sentence, words, onSpeakWord }) {
  return (
    <section className="sentence-card" aria-label="Practice sentence">
      <p className="sentence-text">{sentence}</p>
      <div className="word-list" aria-label="Tap words to hear them">
        {words.map((word, index) => (
          <WordButton
            key={`${word}-${index}`}
            word={word}
            onClick={() => onSpeakWord(word)}
          />
        ))}
      </div>
    </section>
  );
}
