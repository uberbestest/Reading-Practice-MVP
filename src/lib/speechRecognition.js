function getSpeechRecognitionConstructor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function supportsSpeechRecognition() {
  return Boolean(getSpeechRecognitionConstructor());
}

export function listenOnce() {
  const SpeechRecognition = getSpeechRecognitionConstructor();

  if (!SpeechRecognition) {
    return Promise.reject({ code: "unsupported" });
  }

  return new Promise((resolve, reject) => {
    const recognition = new SpeechRecognition();
    let didResolve = false;

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      didResolve = true;
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      recognition.stop();
      resolve(transcript);
    };

    recognition.onerror = (event) => {
      reject({ code: event.error || "recognition-error" });
    };

    recognition.onend = () => {
      if (!didResolve) {
        reject({ code: "no-speech" });
      }
    };

    recognition.start();
  });
}
