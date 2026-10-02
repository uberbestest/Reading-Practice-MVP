export const DEFAULT_PROGRESS = Object.freeze({
  path: "both",
  completedLessonIds: [],
  lastLessonId: null,
  speechRate: 0.82,
});

export function normalizeProgress(value) {
  const source = value && typeof value === "object" ? value : {};
  const path = ["reading", "english", "both"].includes(source.path)
    ? source.path
    : DEFAULT_PROGRESS.path;
  const completedLessonIds = Array.isArray(source.completedLessonIds)
    ? [...new Set(source.completedLessonIds.filter((id) => typeof id === "string"))]
    : [];
  const lastLessonId = typeof source.lastLessonId === "string" ? source.lastLessonId : null;
  const speechRate = [0.7, 0.82, 0.95].includes(source.speechRate)
    ? source.speechRate
    : DEFAULT_PROGRESS.speechRate;

  return { path, completedLessonIds, lastLessonId, speechRate };
}

export function completeLesson(progress, lessonId) {
  const next = normalizeProgress(progress);
  return {
    ...next,
    lastLessonId: lessonId,
    completedLessonIds: [...new Set([...next.completedLessonIds, lessonId])],
  };
}

export function setLearningPath(progress, path) {
  return normalizeProgress({ ...progress, path });
}

export function setSpeechRate(progress, speechRate) {
  return normalizeProgress({ ...progress, speechRate });
}
