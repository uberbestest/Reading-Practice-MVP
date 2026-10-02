import { ListenChoice } from "./ListenChoice.jsx";
import { MeaningCheck } from "./MeaningCheck.jsx";
import { ReadingPractice } from "./ReadingPractice.jsx";
import { SentenceBuilder } from "./SentenceBuilder.jsx";
import { WordStudy } from "./WordStudy.jsx";

export function LessonView({ lesson, isComplete, speechRate, onSpeak, onBack, onComplete, path }) {
  return (
    <main className="lesson-shell">
      <button type="button" className="back-button" onClick={onBack}>← Course map</button>
      <header className="lesson-header">
        <p className="eyebrow">{lesson.unitTitle}</p>
        <h1>{lesson.title}</h1>
        <p className="lede">{lesson.goal}</p>
      </header>

      <div className="activity-stack">
        <WordStudy lesson={lesson} speechRate={speechRate} onSpeak={onSpeak} path={path} />
        <ListenChoice key={`${lesson.id}-listen`} lesson={lesson} speechRate={speechRate} onSpeak={onSpeak} />
        <SentenceBuilder key={`${lesson.id}-build`} lesson={lesson} />
        <ReadingPractice key={`${lesson.id}-read`} lesson={lesson} speechRate={speechRate} onSpeak={onSpeak} />
        <MeaningCheck key={`${lesson.id}-meaning`} lesson={lesson} />
      </div>

      <section className="finish-card">
        <p className="step-label">Finish</p>
        <h2>{isComplete ? "Lesson complete" : "You reached the end of this lesson."}</h2>
        <p>Marking a lesson complete only saves its lesson ID on this device. There is no account or online learner profile.</p>
        <button type="button" className="finish-button" onClick={() => onComplete(lesson.id)}>
          {isComplete ? "✓ Completed — return to course" : "Mark complete and return"}
        </button>
      </section>
    </main>
  );
}
