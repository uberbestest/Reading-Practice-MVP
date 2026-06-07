function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordsFrom(text) {
  const normalized = normalizeText(text);
  return normalized ? normalized.split(" ") : [];
}

function editDistance(a, b) {
  const rows = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0),
  );

  for (let row = 0; row <= a.length; row += 1) rows[row][0] = row;
  for (let col = 0; col <= b.length; col += 1) rows[0][col] = col;

  for (let row = 1; row <= a.length; row += 1) {
    for (let col = 1; col <= b.length; col += 1) {
      const cost = a[row - 1] === b[col - 1] ? 0 : 1;
      rows[row][col] = Math.min(
        rows[row - 1][col] + 1,
        rows[row][col - 1] + 1,
        rows[row - 1][col - 1] + cost,
      );
    }
  }

  return rows[a.length][b.length];
}

function wordsAreClose(targetWord, spokenWord) {
  if (targetWord === spokenWord) return true;
  if (targetWord.length <= 3) return false;
  return editDistance(targetWord, spokenWord) <= 1;
}

export function compareReading(targetSentence, spokenSentence) {
  const targetWords = wordsFrom(targetSentence);
  const spokenWords = wordsFrom(spokenSentence);

  if (targetWords.length === 0) {
    return { status: "correct" };
  }

  let spokenIndex = 0;

  for (const targetWord of targetWords) {
    let foundWord = false;

    while (spokenIndex < spokenWords.length) {
      if (wordsAreClose(targetWord, spokenWords[spokenIndex])) {
        foundWord = true;
        spokenIndex += 1;
        break;
      }

      spokenIndex += 1;
    }

    if (!foundWord) {
      return { status: "almost", word: targetWord };
    }
  }

  return { status: "correct" };
}
