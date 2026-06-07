export function WordButton({ word, onClick }) {
  const spokenWord = word.replace(/[^a-zA-Z0-9]/g, "");

  return (
    <button
      className="word-button"
      type="button"
      onClick={onClick}
      aria-label={`Hear the word ${spokenWord}`}
    >
      {word}
    </button>
  );
}
