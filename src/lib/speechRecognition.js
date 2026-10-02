function getSpeechRecognitionConstructor() {
  if (typeof window === "undefined") return null;
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
    let didSettle = false;

    function settle(callback, value) {
      if (didSettle) return;
      didSettle = true;
      callback(value);
    }

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      settle(resolve, transcript);
      recognition.stop();
    };

    recognition.onerror = (event) => {
      settle(reject, { code: event.error || "recognition-error" });
    };

    recognition.onend = () => {
      settle(reject, { code: "no-speech" });
    };

    recognition.start();
  });
}
