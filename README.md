# Reading Practice MVP

A local-first React + Vite reading-practice MVP for simple sentence practice.

The app helps a learner read short sentences by showing large text, letting them
tap words to hear them aloud, and offering one speech-recognition attempt when
the browser supports it.

## What It Does

- Shows one simple sentence at a time.
- Splits the sentence into tappable word buttons.
- Speaks tapped words using browser speech synthesis.
- Speaks the whole sentence with `Read to me`.
- Lets the learner try reading aloud with `Now you try` when speech recognition
  is available.
- Gives gentle feedback after the attempt.
- Cycles through a built-in sentence bank of a few hundred short early-reader
  phrases.

## What It Does Not Do

- No login.
- No backend.
- No database.
- No analytics.
- No data collection.
- No cloud sync.
- No chatbot or AI companion.
- No rewards system.
- No parent dashboard.

## Run Locally

```powershell
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Build

```powershell
npm run build
```

## Current Sentence Bank

The sentence bank starts with the original five MVP examples and expands into a
few hundred short early-reader phrases using simple nouns, common verbs, colors,
basic feelings, home objects, animals, and outdoor words.

## Architecture

Speech features are behind small adapter modules:

- `src/lib/speechSynthesis.js`
- `src/lib/speechRecognition.js`
- `src/lib/compareReading.js`

This keeps the first MVP simple while leaving room to replace browser speech
APIs later, add PWA support, or wrap the app with Capacitor.
