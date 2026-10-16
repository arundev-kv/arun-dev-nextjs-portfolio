import { portfolio } from '@/data/portfolio';
import ThemeToggle from './ThemeToggle';

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  );
}

export default function SiteHeader() {
  const linkedin = portfolio.profile.socialLinks[0];

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Arun Dev K V — back to top">
          <span className="wordmark-mark">AD</span>
          <span className="wordmark-copy">
            <strong>Arun Dev K V</strong>
            <small>Mobile systems engineer</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#systems">Systems</a>
          <a href="#field-notes">Field notes</a>
          <a href="#background">Background</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a className="header-link" href={linkedin.href} target="_blank" rel="noreferrer">
            <span>{linkedin.label}</span>
            <ArrowUpRight />
          </a>
        </div>
      </header>

      <nav className="mobile-dock" aria-label="Mobile navigation">
        <a href="#top">
          <span>00</span>
          Home
        </a>
        <a href="#work">
          <span>01</span>
          Work
        </a>
        <a href="#systems">
          <span>02</span>
          Systems
        </a>
        <a href="#field-notes">
          <span>03</span>
          Notes
        </a>
        <a href="#contact">
          <span>04</span>
          Contact
        </a>
      </nav>
    </>
  );
}
