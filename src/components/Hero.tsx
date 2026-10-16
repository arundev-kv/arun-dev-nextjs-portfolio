import Image from 'next/image';
import { portfolio } from '@/data/portfolio';

const PORTRAIT_SRC: string | null = '/images/arun-dev.png';

function ArrowDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 4v15m0 0 6-6m-6 6-6-6" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  );
}

function Portrait() {
  return (
    <figure className="portrait-frame">
      {PORTRAIT_SRC ? (
        <Image
          src={PORTRAIT_SRC}
          alt="Arun Dev K V"
          width={1014}
          height={1638}
          priority
          sizes="(max-width: 820px) 82vw, 27rem"
        />
      ) : (
        <div className="portrait-placeholder" aria-label="Portrait placeholder">
          <div className="portrait-orbit portrait-orbit-one" />
          <div className="portrait-orbit portrait-orbit-two" />
          <div className="portrait-silhouette" aria-hidden="true">
            <span className="portrait-head" />
            <span className="portrait-body" />
          </div>
          <span className="portrait-monogram">AD</span>
          <span className="portrait-corner portrait-corner-top">PORTRAIT / 01</span>
          <span className="portrait-corner portrait-corner-bottom">
            Image slot reserved
            <br />
            04:05 aspect ratio
          </span>
        </div>
      )}
      <figcaption>
        <span>Based in</span>
        <strong>{portfolio.profile.location}</strong>
      </figcaption>
    </figure>
  );
}

export default function Hero() {
  const { profile, facts } = portfolio;
  const linkedin = profile.socialLinks[0];

  return (
    <section className="hero" id="top">
      <div className="hero-index" aria-hidden="true">
        <span>PORTFOLIO</span>
        <span>2026 EDITION</span>
      </div>

      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">
          <span className="status-dot" />
          {profile.eyebrow}
        </p>
        <h1>
          <span>I build mobile</span>
          <span>
            systems that <em>survive</em>
          </span>
          <span>reality.</span>
        </h1>
        <p className="hero-intro">{profile.shortBio}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            Trace the work
            <ArrowDown />
          </a>
          <a className="text-link" href={linkedin.href} target="_blank" rel="noreferrer">
            View LinkedIn
            <ArrowUpRight />
          </a>
        </div>
      </div>

      <div className="hero-portrait">
        <Portrait />
      </div>

      <div className="hero-facts" aria-label="Professional summary">
        {facts.map((fact) => (
          <div className="fact" key={fact.label}>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </div>
        ))}
      </div>

      <div className="hero-scroll-note" aria-hidden="true">
        <span>Scroll to inspect</span>
        <span className="scroll-line" />
      </div>
    </section>
  );
}
