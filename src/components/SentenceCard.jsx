import { WordButton } from "./WordButton.jsx";

export function SentenceCard({ sentence, wordTokens, onSpeakWord }) {
  return (
    <section className="sentence-card" aria-label="Practice sentence">
      <p className="sentence-text">{sentence}</p>
      <div className="word-list" aria-label="Tap words to hear them">
        {wordTokens.map((wordToken, index) => (
          <WordButton
            key={`${wordToken.display}-${index}`}
            wordToken={wordToken}
            onClick={() => onSpeakWord(wordToken)}
          />
        ))}
      </div>
    </section>
  );
}
