const paths = [
  {
    id: "reading",
    title: "Learn to read English",
    description: "Letter patterns, word reading, sentence reading, and fluency practice.",
  },
  {
    id: "english",
    title: "Learn English",
    description: "Meaning, listening, speaking, useful words, and sentence patterns.",
  },
  {
    id: "both",
    title: "Practice both",
    description: "Read, listen, understand, and speak in one course.",
  },
];

export function PathPicker({ value, onChange }) {
  return (
    <section className="path-picker" aria-labelledby="path-title">
      <div>
        <p className="eyebrow">Choose your focus</p>
        <h2 id="path-title">What are you practicing?</h2>
      </div>
      <div className="path-grid">
        {paths.map((path) => (
          <button
            key={path.id}
            type="button"
            aria-pressed={value === path.id}
            className={value === path.id ? "path-card selected" : "path-card"}
            onClick={() => onChange(path.id)}
          >
            <strong>{path.title}</strong>
            <span>{path.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
