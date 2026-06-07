export function stripWordPunctuation(word) {
  return word.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
}

export function createWordTokens(sentence) {
  return sentence
    .split(/\s+/)
    .map((word) => ({
      display: stripWordPunctuation(word),
      speak: stripWordPunctuation(word),
    }))
    .filter((wordToken) => wordToken.display.length > 0);
}
