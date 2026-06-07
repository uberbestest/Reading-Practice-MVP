export function Feedback({ feedback }) {
  return (
    <p className={`feedback feedback-${feedback.kind}`} role="status">
      {feedback.message}
    </p>
  );
}
