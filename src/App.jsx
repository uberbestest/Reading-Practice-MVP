import { useMemo, useState } from "react";
import { Controls } from "./components/Controls.jsx";
import { Feedback } from "./components/Feedback.jsx";
import { SentenceCard } from "./components/SentenceCard.jsx";
import { sentences } from "./data/sentences.js";
import { compareReading } from "./lib/compareReading.js";
import { listenOnce, supportsSpeechRecognition } from "./lib/speechRecognition.js";
import { speakText } from "./lib/speechSynthesis.js";
import { createWordTokens } from "./lib/wordTokens.js";

const initialFeedback = {
  kind: "idle",
  message: "Tap a word, or listen to the sentence.",
};

function App() {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [isListening, setIsListening] = useState(false);

  const sentence = sentences[sentenceIndex];
  const wordTokens = useMemo(() => createWordTokens(sentence), [sentence]);
  const speechRecognitionSupported = supportsSpeechRecognition();

  function handleSpeakWord(wordToken) {
    speakText(wordToken.speak);
  }

  function handleReadToMe() {
    speakText(sentence);
    setFeedback({ kind: "idle", message: "Listen, then try reading it." });
  }

  async function handleTryReading() {
    if (!supportsSpeechRecognition()) {
      setFeedback({
        kind: "unsupported",
        message: "Speech recognition is not supported in this browser.",
      });
      return;
    }

    setIsListening(true);
    setFeedback({ kind: "listening", message: "Listening..." });

    try {
      const transcript = await listenOnce();
      const result = compareReading(sentence, transcript);

      if (result.status === "correct") {
        setFeedback({ kind: "success", message: "Nice, you got it." });
      } else {
        setFeedback({
          kind: "try-again",
          message: `Almost. Try this word again: "${result.word}".`,
        });
      }
    } catch (error) {
      setFeedback({
        kind: error.code === "unsupported" ? "unsupported" : "try-again",
        message:
          error.code === "unsupported"
            ? "Speech recognition is not supported in this browser."
            : "Almost. Try reading it again.",
      });
    } finally {
      setIsListening(false);
    }
  }

  function handleNextSentence() {
    setSentenceIndex((currentIndex) => (currentIndex + 1) % sentences.length);
    setFeedback(initialFeedback);
    setIsListening(false);
  }

  return (
    <main className="app-shell" aria-labelledby="app-title">
      <section className="practice-panel">
        <p className="eyebrow">Reading practice</p>
        <h1 id="app-title">Read the sentence</h1>

        <SentenceCard
          sentence={sentence}
          wordTokens={wordTokens}
          onSpeakWord={handleSpeakWord}
        />

        <p
          className={`speech-status ${
            speechRecognitionSupported ? "speech-status-supported" : ""
          }`}
        >
          {speechRecognitionSupported
            ? "Speech recognition supported"
            : "Speech recognition not supported"}
        </p>

        <Controls
          isListening={isListening}
          onReadToMe={handleReadToMe}
          onTryReading={handleTryReading}
          onNextSentence={handleNextSentence}
        />

        <Feedback feedback={feedback} />
      </section>
    </main>
  );
}

export default App;
