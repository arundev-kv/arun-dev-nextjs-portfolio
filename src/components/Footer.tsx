import { portfolio } from '@/data/portfolio';

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6 18 18 6M8 6h10v10" />
    </svg>
  );
}

export default function Footer() {
  const { profile } = portfolio;
  const linkedin = profile.socialLinks[0];
  const contactLinks = [
    ...profile.contactLinks,
    {
      label: 'LinkedIn',
      value: 'View professional profile',
      href: linkedin.href,
      external: true,
    },
  ];

  return (
    <footer className="site-footer">
      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-meta">
          <span>05 / Contact</span>
          <span>{profile.location}</span>
        </div>

        <p className="eyebrow">A good system starts with a useful conversation</p>
        <h2 id="contact-title">
          Have a difficult mobile
          <br />
          problem? <em>Let’s trace it.</em>
        </h2>

        <div className="contact-channels" aria-label="Ways to connect with Arun">
          {contactLinks.map((contact, index) => (
            <a
              className="contact-channel"
              href={contact.href}
              key={contact.label}
              target={contact.external ? '_blank' : undefined}
              rel={contact.external ? 'noreferrer' : undefined}
            >
              <span className="contact-channel-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="contact-channel-copy">
                <span>{contact.label}</span>
                <strong>{contact.value}</strong>
              </span>
              <ArrowUpRight />
            </a>
          ))}
        </div>

        <p className="contact-availability">
          <span className="status-dot" />
          {profile.availability}
        </p>
      </section>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Arun Dev K V</span>
        <span>React Native / TypeScript / Systems thinking</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
