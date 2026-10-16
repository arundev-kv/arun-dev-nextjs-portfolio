import { portfolio } from '@/data/portfolio';

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}

export default function SystemsMap() {
  return (
    <section className="systems-section section-shell" id="systems" aria-labelledby="systems-title">
      <div className="section-rail">
        <span>02</span>
        <span>System surface</span>
      </div>

      <header className="section-heading systems-heading">
        <p className="eyebrow">Mobile is the core, not the boundary</p>
        <h2 id="systems-title">
          One app.
          <br />
          <em>Every layer around it.</em>
        </h2>
        <p>
          The strongest mobile work happens when the engineer can follow the product through identity, services,
          data, delivery, and production signals.
        </p>
      </header>

      <div className="systems-map">
        <div className="map-axis map-axis-horizontal" aria-hidden="true" />
        <div className="map-axis map-axis-vertical" aria-hidden="true" />
        <div className="system-core" aria-hidden="true">
          <span className="core-label">PRIMARY PRACTICE</span>
          <div className="phone-shell">
            <div className="phone-speaker" />
            <div className="phone-screen">
              <span className="screen-kicker">React Native</span>
              <strong>Mobile</strong>
              <strong>systems</strong>
              <div className="screen-signal">
                <span />
                <span />
                <span />
              </div>
              <small>iOS / Android</small>
            </div>
          </div>
          <span className="core-coordinate">09.9312° N / 76.2673° E</span>
        </div>

        <div className="capability-nodes">
          {portfolio.capabilities.map((capability) => (
            <details className="capability-node" key={capability.id}>
              <summary>
                <span className="node-index">{capability.index}</span>
                <span className="node-title">{capability.shortTitle}</span>
                <PlusIcon />
              </summary>
              <div className="node-detail">
                <span className={`confidence confidence-${capability.confidence}`}>{capability.confidence}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <ul aria-label={`${capability.title} technologies`}>
                  {capability.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="skill-index" aria-label="Technology confidence index">
        {portfolio.skillGroups.map((group) => (
          <div className={`skill-group skill-group-${group.confidence}`} key={group.label}>
            <div className="skill-group-heading">
              <span>{group.label}</span>
              <p>{group.note}</p>
            </div>
            <ul>
              {group.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
