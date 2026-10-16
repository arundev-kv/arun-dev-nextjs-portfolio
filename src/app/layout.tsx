import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import { portfolio } from '@/data/portfolio';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const themeScript = `
  (() => {
    try {
      const saved = localStorage.getItem('arun-portfolio-theme');
      const theme = saved === 'light' || saved === 'dark'
        ? saved
        : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch {
      document.documentElement.dataset.theme = 'light';
    }
  })();
`;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f2f0e8',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://arundevkv.netlify.app'),
  title: 'Arun Dev K V — Mobile Systems Engineer',
  description:
    'React Native and mobile systems engineer working across iOS, Android, authentication, APIs, data, release pipelines, and application reliability.',
  keywords: [
    'Arun Dev K V',
    'Mobile Systems Engineer',
    'React Native Engineer',
    'TypeScript',
    'iOS',
    'Android',
    'Auth0',
    'Node.js',
    'Mobile CI/CD',
    'Kochi Software Engineer',
  ],
  authors: [{ name: portfolio.profile.name, url: portfolio.profile.socialLinks[0].href }],
  openGraph: {
    title: 'Arun Dev K V — Mobile Systems Engineer',
    description: 'React Native at the core. Identity, APIs, data, delivery, and reliability around it.',
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Arun Dev K V — Career Field Notes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arun Dev K V — Mobile Systems Engineer',
    description: 'React Native at the core. Systems thinking all the way to production.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolio.profile.name,
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Zero Pixels',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Cochin University of Science and Technology',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'St. Berchmans College',
      },
    ],
    url: portfolio.profile.socialLinks[0].href,
    sameAs: [portfolio.profile.socialLinks[0].href],
    email: portfolio.profile.contactLinks[0].value,
    telephone: portfolio.profile.contactLinks[1].value,
    knowsAbout: [
      'React Native',
      'Mobile application engineering',
      'TypeScript',
      'iOS and Android release engineering',
      'Auth0 integration',
      'REST API integration',
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
