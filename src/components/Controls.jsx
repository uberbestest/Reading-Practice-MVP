export function Controls({
  isListening,
  onReadToMe,
  onTryReading,
  onNextSentence,
}) {
  return (
    <div className="controls" aria-label="Reading controls">
      <button className="primary-button" type="button" onClick={onReadToMe}>
        Read to me
      </button>
      <button
        className="primary-button try-button"
        type="button"
        onClick={onTryReading}
        disabled={isListening}
        aria-live="polite"
      >
        {isListening ? "Listening..." : "Now you try"}
      </button>
      <button className="secondary-button" type="button" onClick={onNextSentence}>
        Next sentence
      </button>
    </div>
  );
}
