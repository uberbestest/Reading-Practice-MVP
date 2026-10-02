import { useMemo, useState } from "react";
import { About } from "./components/About.jsx";
import { CourseMap } from "./components/CourseMap.jsx";
import { LessonView } from "./components/LessonView.jsx";
import { PathPicker } from "./components/PathPicker.jsx";
import { TopBar } from "./components/TopBar.jsx";
import { course, getLesson } from "./data/curriculum.js";
import { clearProgress, loadProgress, saveProgress } from "./lib/progress.js";
import { completeLesson, setLearningPath, setSpeechRate } from "./lib/progressModel.js";
import { speakText } from "./lib/speechSynthesis.js";

function App() {
  const [screen, setScreen] = useState("course");
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [progress, setProgress] = useState(() => loadProgress());

  const activeLesson = useMemo(
    () => (activeLessonId ? getLesson(activeLessonId) : null),
    [activeLessonId],
  );

  function updateProgress(next) {
    setProgress(next);
    saveProgress(next);
  }

  function navigate(nextScreen) {
    setActiveLessonId(null);
    setScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function openLesson(lessonId) {
    setActiveLessonId(lessonId);
    setScreen("lesson");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function finishLesson(lessonId) {
    updateProgress(completeLesson(progress, lessonId));
    navigate("course");
  }

  function resetProgress() {
    clearProgress();
    const next = loadProgress();
    setProgress(next);
  }

  return (
    <div className="app-shell">
      <TopBar screen={screen} onNavigate={navigate} />

      {screen === "course" ? (
        <main className="page-shell">
          <CourseMap
            course={course}
            completedLessonIds={progress.completedLessonIds}
            onOpenLesson={openLesson}
            path={progress.path}
          />
          <PathPicker
            value={progress.path}
            onChange={(path) => updateProgress(setLearningPath(progress, path))}
          />
          <section className="boundary-card">
            <strong>Practice, not a verdict.</strong>
            <span>{course.evidenceBoundary}</span>
          </section>
        </main>
      ) : null}

      {screen === "lesson" && activeLesson ? (
        <LessonView
          lesson={activeLesson}
          isComplete={progress.completedLessonIds.includes(activeLesson.id)}
          speechRate={progress.speechRate}
          onSpeak={(text, rate) => speakText(text, { rate })}
          onBack={() => navigate("course")}
          onComplete={finishLesson}
          path={progress.path}
        />
      ) : null}

      {screen === "about" ? (
        <About
          course={course}
          speechRate={progress.speechRate}
          onSpeechRateChange={(rate) => updateProgress(setSpeechRate(progress, rate))}
          onResetProgress={resetProgress}
        />
      ) : null}

      <footer className="site-footer">
        <span>See it · hear it · use it</span>
        <span>No account · no analytics · local progress only</span>
      </footer>
    </div>
  );
}

export default App;
