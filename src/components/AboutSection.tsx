import { portfolio } from '@/data/portfolio';

export default function AboutSection() {
  return (
    <section className="about-section section-shell" aria-labelledby="about-title">
      <div className="section-rail">
        <span>00</span>
        <span>Profile</span>
      </div>

      <div className="about-heading">
        <p className="eyebrow">The working thesis</p>
        <h2 id="about-title">
          The interface is only
          <br />
          <em>the visible layer.</em>
        </h2>
      </div>

      <div className="about-copy">
        {portfolio.profile.about.map((paragraph, index) => (
          <p key={paragraph} className={index === 0 ? 'about-lede' : undefined}>
            {paragraph}
          </p>
        ))}
      </div>

      <aside className="about-note">
        <span>Principle / 01</span>
        <p>
          Do not patch the symptom.
          <br />
          Follow the system until the failure makes sense.
        </p>
      </aside>
    </section>
  );
}
