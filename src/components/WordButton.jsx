export function WordButton({ wordToken, onClick }) {
  return (
    <button
      className="word-button"
      type="button"
      onClick={onClick}
      aria-label={`Hear the word ${wordToken.speak}`}
    >
      {wordToken.display}
    </button>
  );
}
