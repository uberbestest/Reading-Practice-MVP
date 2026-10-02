export function CourseMap({ course, completedLessonIds, onOpenLesson, path }) {
  const completed = new Set(completedLessonIds);
  const focusCopy = {
    reading: "Your focus: sound patterns, word reading, sentence reading, and fluency.",
    english: "Your focus: useful vocabulary, listening, sentence patterns, speaking, and meaning.",
    both: "Your focus: read, listen, understand, and speak together.",
  }[path] || "Read, listen, understand, and speak together.";
  const totalLessons = course.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
  const completedCount = course.units.reduce(
    (sum, unit) => sum + unit.lessons.filter((lesson) => completed.has(lesson.id)).length,
    0,
  );

  return (
    <section className="course-map" aria-labelledby="course-title">
      <div className="course-heading">
        <div>
          <p className="eyebrow">Starter course</p>
          <h1 id="course-title">Learn a little. Use it right away.</h1>
          <p className="lede">
            Every lesson teaches a few words, gives listening practice, builds a sentence,
            asks you to read, and checks meaning. <strong>{focusCopy}</strong>
          </p>
        </div>
        <div className="progress-summary" aria-label={`${completedCount} of ${totalLessons} lessons completed`}>
          <strong>{completedCount}/{totalLessons}</strong>
          <span>lessons complete on this device</span>
        </div>
      </div>

      <div className="unit-list">
        {course.units.map((unit, unitIndex) => (
          <article className="unit-card" key={unit.id}>
            <div className="unit-header">
              <span className="unit-number">{String(unitIndex + 1).padStart(2, "0")}</span>
              <div>
                <h2>{unit.title}</h2>
                <p>{unit.goal}</p>
              </div>
            </div>
            <div className="lesson-list">
              {unit.lessons.map((lesson, lessonIndex) => {
                const isComplete = completed.has(lesson.id);
                return (
                  <button
                    className={isComplete ? "lesson-row complete" : "lesson-row"}
                    key={lesson.id}
                    type="button"
                    onClick={() => onOpenLesson(lesson.id)}
                  >
                    <span className="lesson-status" aria-hidden="true">{isComplete ? "✓" : lessonIndex + 1}</span>
                    <span className="lesson-copy">
                      <strong>{lesson.title}</strong>
                      <small>{lesson.goal}</small>
                    </span>
                    <span className="lesson-arrow" aria-hidden="true">→</span>
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
