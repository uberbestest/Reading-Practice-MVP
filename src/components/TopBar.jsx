export function TopBar({ screen, onNavigate }) {
  return (
    <header className="topbar">
      <button className="brand-button" type="button" onClick={() => onNavigate("course")}>
        <span className="brand-mark" aria-hidden="true">Aa</span>
        <span>
          <strong>Project Read Good</strong>
          <small>English practice</small>
        </span>
      </button>
      <nav className="topnav" aria-label="Main navigation">
        <button
          type="button"
          className={screen === "course" ? "nav-button active" : "nav-button"}
          onClick={() => onNavigate("course")}
        >
          Course
        </button>
        <button
          type="button"
          className={screen === "about" ? "nav-button active" : "nav-button"}
          onClick={() => onNavigate("about")}
        >
          About
        </button>
      </nav>
    </header>
  );
}
