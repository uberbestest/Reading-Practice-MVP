import { useMemo, useState } from "react";
import { compareReading } from "../lib/compareReading.js";
import { listenOnce, supportsSpeechRecognition } from "../lib/speechRecognition.js";
import { createWordTokens } from "../lib/wordTokens.js";

export function ReadingPractice({ lesson, speechRate, onSpeak }) {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState(null);
  const sentence = lesson.sentences[sentenceIndex];
  const words = useMemo(() => createWordTokens(sentence), [sentence]);
  const speechSupported = supportsSpeechRecognition();

  async function practiceSpeaking() {
    if (!speechSupported) return;
    setIsListening(true);
    setSpeechFeedback({ kind: "neutral", message: "Listening…" });
    try {
      const transcript = await listenOnce();
      const comparison = compareReading(sentence, transcript);
      if (comparison.status === "heard-all-target-words") {
        setSpeechFeedback({
          kind: "success",
          message: `I heard: “${transcript}”. I heard all the target words. Speech recognition can make mistakes, so use this as practice—not a grade.`,
        });
      } else {
        const missed = comparison.missing.slice(0, 3).join(", ");
        setSpeechFeedback({
          kind: "try",
          message: `I heard: “${transcript || "nothing"}”. I may have missed: ${missed || "some words"}. Try again, tap a word to hear it, or keep going.`,
        });
      }
    } catch {
      setSpeechFeedback({
        kind: "try",
        message: "I could not get a clear transcript. You can try again or keep practicing without the microphone.",
      });
    } finally {
      setIsListening(false);
    }
  }

  function nextSentence() {
    setSentenceIndex((current) => (current + 1) % lesson.sentences.length);
    setSpeechFeedback(null);
  }

  return (
    <section className="activity-card" aria-labelledby="read-title">
      <p className="step-label">Step 4 · Read</p>
      <h2 id="read-title">Read the sentence</h2>
      <p className="practice-sentence">{sentence}</p>
      <div className="word-tap-row" aria-label="Tap a word to hear it">
        {words.map((word, index) => (
          <button key={`${word.display}-${index}`} type="button" onClick={() => onSpeak(word.speak, speechRate)}>
            {word.display}
          </button>
        ))}
      </div>
      <div className="reading-actions">
        <button type="button" className="primary-button" onClick={() => onSpeak(sentence, speechRate)}>
          🔊 Read to me
        </button>
        <button type="button" onClick={nextSentence}>Another sentence</button>
        {speechSupported ? (
          <button type="button" onClick={practiceSpeaking} disabled={isListening}>
            {isListening ? "Listening…" : "🎤 Practice speaking"}
          </button>
        ) : null}
      </div>
      <p className="microphone-note">
        {speechSupported
          ? "Microphone practice is optional. This app does not save the transcript. Your browser or operating system may process speech using its own service."
          : "Microphone practice is not available in this browser. All other lesson activities still work."}
      </p>
      {speechFeedback ? (
        <p className={`inline-feedback ${speechFeedback.kind}`} role="status">{speechFeedback.message}</p>
      ) : null}
    </section>
  );
}
