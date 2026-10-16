import { portfolio } from '@/data/portfolio';

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M10 3v14M3 10h14" />
    </svg>
  );
}

export default function FieldNotes() {
  return (
    <section className="notes-section section-shell" id="field-notes" aria-labelledby="notes-title">
      <div className="section-rail">
        <span>03</span>
        <span>Technical field notes</span>
      </div>

      <header className="section-heading notes-heading">
        <p className="eyebrow">Problem-solving patterns / no invented metrics</p>
        <h2 id="notes-title">
          Start with evidence.
          <br />
          <em>End with understanding.</em>
        </h2>
        <p>
          Non-proprietary outlines of the technical problems Arun engages with. These describe reasoning patterns,
          not fabricated project outcomes.
        </p>
      </header>

      <div className="field-notes-list">
        {portfolio.caseStudies.map((study) => (
          <details className="field-note" key={study.id}>
            <summary>
              <span className="note-number">{study.number}</span>
              <span className="note-title">{study.title}</span>
              <span className={`note-status note-status-${study.status.replace(' ', '-')}`}>{study.status}</span>
              <span className="note-toggle">
                <PlusIcon />
              </span>
            </summary>
            <div className="field-note-body">
              <div className="note-lede">
                <span>Original problem</span>
                <p>{study.problem}</p>
              </div>
              <div className="note-steps">
                <div>
                  <span>01 / Investigation</span>
                  <p>{study.investigation}</p>
                </div>
                <div>
                  <span>02 / Technical reasoning</span>
                  <p>{study.reasoning}</p>
                </div>
                <div>
                  <span>03 / Verified outcome</span>
                  <p>{study.outcome}</p>
                </div>
              </div>
              <ul className="note-tech" aria-label={`${study.title} technologies`}>
                {study.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
