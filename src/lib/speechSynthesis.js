export function speakText(text, { rate = 0.82 } = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !window.SpeechSynthesisUtterance) {
    return false;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(String(text));
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
  return true;
}
