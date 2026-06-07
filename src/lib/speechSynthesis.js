export function speakText(text) {
  if (!("speechSynthesis" in window) || !window.SpeechSynthesisUtterance) {
    return false;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.82;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
  return true;
}
