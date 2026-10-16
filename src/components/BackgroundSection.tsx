import { portfolio } from '@/data/portfolio';

export default function BackgroundSection() {
  return (
    <section className="background-section section-shell" id="background" aria-labelledby="background-title">
      <div className="section-rail">
        <span>04</span>
        <span>Background</span>
      </div>

      <header className="section-heading background-heading">
        <p className="eyebrow">Education / credential</p>
        <h2 id="background-title">
          Mathematics first.
          <br />
          <em>Software ever since.</em>
        </h2>
      </header>

      <div className="education-list">
        {portfolio.education.map((item, index) => (
          <article className="education-item" key={`${item.institution}-${item.degree}`}>
            <span className="education-index">0{index + 1}</span>
            <span className="education-period">{item.period}</span>
            <div>
              <h3>{item.degree}</h3>
              <p>{item.field}</p>
            </div>
            <div>
              <strong>{item.institution}</strong>
              {item.note && <p>{item.note}</p>}
            </div>
          </article>
        ))}
      </div>

      {portfolio.credentials.map((credential) => (
        <aside className="credential-card" key={credential.title}>
          <span className="credential-star" aria-hidden="true">
            ✳
          </span>
          <span>{credential.issued}</span>
          <div>
            <strong>{credential.title}</strong>
            <p>{credential.issuer}</p>
          </div>
          <span className="credential-code">CREDENTIAL / 01</span>
        </aside>
      ))}
    </section>
  );
}
