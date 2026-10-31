import type { PortfolioData } from '@/types/portfolio';

/**
 * Portfolio content lives here so it can be reviewed and updated without
 * touching presentation components. Keep claims concrete and non-proprietary.
 */
export const portfolio: PortfolioData = {
  profile: {
    name: 'Arun Dev K V',
    eyebrow: 'Mobile systems engineer · Kochi, India',
    headline: 'I build mobile systems that survive reality.',
    shortBio:
      'React Native is my core. I work outward from the app—into identity, APIs, data, release pipelines, and the signals that make production software diagnosable.',
    about: [
      'I am a software engineer focused on cross-platform mobile applications with React Native, JavaScript, and TypeScript. My work follows an application beyond the screen: native dependencies, authentication, backend contracts, data access, build systems, distribution, and production behaviour.',
      'I am most useful when the failure is not obvious. I like tracing a problem across boundaries—iOS versus Android, app versus identity provider, request versus API, procedure versus database—until the system tells a coherent story.',
      'Backend engineering is a complementary strength, not a replacement for my mobile identity. I am currently expanding into C# and modern .NET to become more effective across the complete application path.',
    ],
    location: 'Kochi, Kerala, India',
    availability: 'Open to meaningful engineering conversations',
    socialLinks: [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/arun-dev-k-v-658b7899',
      },
    ],
    contactLinks: [
      {
        label: 'Email',
        value: 'arundevkv1@gmail.com',
        href: 'mailto:arundevkv1@gmail.com',
      },
      {
        label: 'Phone',
        value: '+91 81299 25632',
        href: 'tel:+918129925632',
      },
      {
        label: 'WhatsApp',
        value: 'Start a conversation',
        href: 'https://wa.me/918129925632?text=Hi%20Arun%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect.',
        external: true,
      },
    ],
  },
  facts: [
    { value: '2017', label: 'Shipping production software since' },
    { value: 'iOS + Android', label: 'One product, two native realities' },
    { value: 'Code → Release', label: 'Engineering scope' },
  ],
  experience: [
    {
      id: 'zero-pixels',
      kind: 'work',
      startYear: '2021',
      period: 'Oct 2021 — Present',
      title: 'Senior Software Developer',
      organization: 'Zero Pixels',
      location: 'Kochi, Kerala, India',
      summary:
        'Building and maintaining application experiences with a strong emphasis on React Native and the production systems around mobile delivery.',
      focus: [
        'React Native',
        'TypeScript',
        'Authentication',
        'API integration',
        'Mobile release engineering',
      ],
      detail: [
        {
          label: 'Application layer',
          text: 'Cross-platform mobile implementation and maintenance across iOS and Android, including native dependencies, permissions, navigation, SDK integrations, and environment-aware configuration.',
        },
        {
          label: 'Production path',
          text: 'Practical involvement in build, signing, distribution, CI/CD, logging, notifications, and the investigation of behaviour that differs between local builds and real devices.',
        },
        {
          label: 'Systems view',
          text: 'Working across authentication, REST APIs, data access, and application monitoring when a mobile issue crosses service boundaries.',
        },
      ],
      sourceNote:
        'Employer and dates are based on Arun’s public professional profile. Project details remain intentionally non-proprietary.',
    },
    {
      id: 'pits-software-engineer',
      kind: 'work',
      startYear: '2018',
      period: 'Dec 2018 — Oct 2021',
      title: 'Software Engineer',
      organization: 'PIT Solutions',
      location: 'Thiruvananthapuram, Kerala, India',
      summary:
        'Progressed from associate to software engineer while developing production experience across mobile and JavaScript application delivery.',
      focus: ['React Native', 'JavaScript', 'React', 'iOS / Android', 'REST APIs'],
      detail: [
        {
          label: 'Core practice',
          text: 'Cross-platform application development, API integration, platform troubleshooting, and maintenance in a client-services engineering environment.',
        },
        {
          label: 'Engineering growth',
          text: 'Built the foundation for investigating framework compatibility, native build behaviour, and the operational details behind releasing mobile software.',
        },
      ],
      sourceNote: 'Role and dates are based on Arun’s public professional profile.',
    },
    {
      id: 'pits-associate',
      kind: 'work',
      startYear: '2017',
      period: 'Sep 2017 — Dec 2018',
      title: 'Associate Software Engineer',
      organization: 'PIT Solutions',
      location: 'Thiruvananthapuram, Kerala, India',
      summary:
        'Started a professional software engineering career and moved from academic foundations into maintained, released application code.',
      focus: ['JavaScript', 'Application development', 'Git', 'API integration'],
      detail: [
        {
          label: 'Foundation',
          text: 'Learned production workflows, asynchronous application behaviour, collaborative delivery, and the discipline of changing existing systems safely.',
        },
      ],
      sourceNote: 'Role and dates are based on Arun’s public professional profile.',
    },
  ],
  capabilities: [
    {
      id: 'mobile',
      index: '01',
      title: 'React Native & mobile application engineering',
      shortTitle: 'Mobile core',
      confidence: 'primary',
      description:
        'Cross-platform implementation and maintenance, framework upgrades, native module compatibility, performance investigation, environment configuration, permissions, navigation, and SDK integration.',
      technologies: [
        'React Native',
        'TypeScript',
        'JavaScript',
        'React Navigation',
        'Reanimated',
        'React Native Screens',
        'React Native Maps',
      ],
    },
    {
      id: 'native-release',
      index: '02',
      title: 'Native build, signing & release systems',
      shortTitle: 'Release path',
      confidence: 'supporting',
      description:
        'The operational path from application code to installable software: Xcode archives, signing and entitlements, Gradle variants, native dependencies, versioning, testing tracks, and release troubleshooting.',
      technologies: [
        'Xcode',
        'CocoaPods',
        'Gradle',
        'Kotlin tooling',
        'TestFlight',
        'Google Play Console',
        'Azure Pipelines',
      ],
    },
    {
      id: 'identity',
      index: '03',
      title: 'Authentication & identity integration',
      shortTitle: 'Identity',
      confidence: 'supporting',
      description:
        'Application-level identity work with Auth0: Universal Login, SDK integration, callbacks, app links, token-aware API communication, environment configuration, and cross-platform troubleshooting.',
      technologies: [
        'Auth0',
        'React Native Auth0',
        'OAuth / OIDC concepts',
        'Universal Links',
        'Android App Links',
      ],
    },
    {
      id: 'backend',
      index: '04',
      title: 'Backend APIs & service reliability',
      shortTitle: 'Service edge',
      confidence: 'supporting',
      description:
        'Practical backend-facing engineering focused on REST contracts, authenticated requests, error behaviour, traceable logging, asynchronous work, connection management, and integration failures.',
      technologies: [
        'Node.js',
        'REST APIs',
        'Pino',
        'pino-http',
        'OpenTelemetry concepts',
        'Prometheus concepts',
      ],
    },
    {
      id: 'data',
      index: '05',
      title: 'Data access & database integration',
      shortTitle: 'Data layer',
      confidence: 'supporting',
      description:
        'Investigating how APIs meet query contracts, procedure signatures, schema permissions, pagination, filtering, connection behaviour, and database migrations.',
      technologies: [
        'MongoDB',
        'Mongoose',
        'PostgreSQL',
        'Oracle Database',
        'SQL',
        'Stored procedures',
      ],
    },
    {
      id: 'reliability',
      index: '06',
      title: 'Notifications, diagnostics & quality',
      shortTitle: 'Reliability',
      confidence: 'supporting',
      description:
        'Making mobile behaviour easier to understand through push-notification investigation, request identifiers, logs, metrics, analytics, crash diagnosis, and safer regression testing practices.',
      technologies: [
        'Firebase Cloud Messaging',
        'Notifee',
        'APNs',
        'Heap',
        'Application logging',
        'Detox — exploring',
      ],
    },
  ],
  skillGroups: [
    {
      confidence: 'primary',
      label: 'Primary practice',
      note: 'The technologies closest to Arun’s professional identity.',
      technologies: ['React Native', 'JavaScript', 'TypeScript', 'React'],
    },
    {
      confidence: 'supporting',
      label: 'Production systems',
      note: 'Used to take mobile applications from implementation through integration and release.',
      technologies: [
        'Xcode',
        'CocoaPods',
        'Gradle',
        'Auth0',
        'Node.js',
        'REST APIs',
        'MongoDB',
        'PostgreSQL',
        'Oracle',
        'Azure Pipelines',
        'FCM / APNs',
        'Pino',
      ],
    },
    {
      confidence: 'expanding',
      label: 'Currently expanding',
      note: 'Active learning directions, deliberately separated from established specialization.',
      technologies: [
        'C#',
        '.NET',
        'ASP.NET Core Web API',
        'Backend architecture',
        'Automated mobile testing',
      ],
    },
  ],
  caseStudies: [
    {
      id: 'rn-upgrades',
      number: 'Field note 01',
      title: 'Upgrading React Native without treating versions as a checklist',
      status: 'professional pattern',
      problem:
        'A framework upgrade can change JavaScript behaviour, native build settings, SDK compatibility, and third-party dependencies at the same time.',
      investigation:
        'Map the compatibility surface first: React Native release changes, native module support, CocoaPods and Gradle requirements, build output, runtime warnings, and platform-specific regressions.',
      reasoning:
        'Separate upgrade failures from product regressions, make changes in reviewable increments, and validate both platforms instead of assuming shared code means shared behaviour.',
      outcome:
        'Publishable project outcome intentionally omitted until a non-proprietary example is added.',
      technologies: ['React Native', 'Xcode', 'CocoaPods', 'Gradle'],
    },
    {
      id: 'auth0',
      number: 'Field note 02',
      title: 'Following authentication across app and browser boundaries',
      status: 'professional pattern',
      problem:
        'Mobile authentication can fail across Universal Login, tenant configuration, callbacks, deep links, token handling, and the authenticated API request.',
      investigation:
        'Verify each boundary independently: Auth0 application settings, environment values, iOS Universal Links, Android App Links, SDK callbacks, token state, and API responses.',
      reasoning:
        'Treat the login journey as a distributed application flow rather than a single screen. A valid token does not prove that redirects, audiences, or backend expectations are correct.',
      outcome:
        'Publishable project outcome intentionally omitted until a non-proprietary example is added.',
      technologies: ['Auth0', 'React Native Auth0', 'OAuth / OIDC', 'App Links'],
    },
    {
      id: 'signing',
      number: 'Field note 03',
      title: 'Diagnosing build and signing failures from evidence',
      status: 'professional pattern',
      problem:
        'An app that works locally may still fail to archive, install, sign, or distribute when certificates, entitlements, variants, or native dependencies diverge.',
      investigation:
        'Read the complete build output, identify the failing phase, compare target and environment configuration, and verify signing assets before changing unrelated application code.',
      reasoning:
        'Build systems report chains of symptoms. The useful error is often earlier than the final failure, so diagnosis should preserve logs and reduce variables.',
      outcome:
        'Publishable project outcome intentionally omitted until a non-proprietary example is added.',
      technologies: ['Xcode', 'Code signing', 'Gradle', 'TestFlight'],
    },
    {
      id: 'notifications',
      number: 'Field note 04',
      title: 'Treating notifications as platform behaviour, not just payloads',
      status: 'professional pattern',
      problem:
        'Push behaviour varies by app state, operating system, permission state, vendor implementation, and the interaction between FCM, APNs, and local display logic.',
      investigation:
        'Compare payloads and device state, isolate receipt from presentation, check platform permissions and channels, and reproduce on physical devices.',
      reasoning:
        'The same backend event can travel through different native paths. Testing must account for foreground, background, terminated, and device-specific conditions.',
      outcome:
        'Publishable project outcome intentionally omitted until a non-proprietary example is added.',
      technologies: ['FCM', 'React Native Firebase', 'Notifee', 'APNs'],
    },
    {
      id: 'mobile-cicd',
      number: 'Field note 05',
      title: 'Making mobile delivery repeatable across environments',
      status: 'professional pattern',
      problem:
        'Manual versioning, environment selection, signing, and distribution create opportunities for configuration drift between development, staging, and production.',
      investigation:
        'Trace every mutable input in the release path, then make versions, environment files, build variants, signing steps, and testing-track delivery explicit in the pipeline.',
      reasoning:
        'Automation is valuable when it makes a release observable and reproducible—not merely when it turns commands into YAML.',
      outcome:
        'Publishable project outcome intentionally omitted until a non-proprietary example is added.',
      technologies: ['Azure Pipelines', 'Yarn', 'Xcode', 'Gradle'],
    },
    {
      id: 'dotnet-learning',
      number: 'Learning log 01',
      title: 'Extending mobile systems thinking into .NET APIs',
      status: 'learning project',
      problem:
        'Build stronger backend fluency without overstating a new technology as an established specialization.',
      investigation:
        'Develop small ASP.NET Core API exercises around validation, pagination, authentication, database access, error handling, testing, and deployment.',
      reasoning:
        'Mobile experience provides a useful consumer-side view of API quality. Learning the service side makes contracts, failures, and observability easier to reason about end to end.',
      outcome:
        'In progress. Add a repository and verified implementation notes when the learning project is ready to publish.',
      technologies: ['C#', '.NET', 'ASP.NET Core', 'REST APIs'],
    },
  ],
  education: [
    {
      period: '2014 — 2017',
      degree: 'Master of Computer Applications',
      field: 'Computer Science',
      institution: 'Cochin University of Science and Technology',
    },
    {
      period: '2011 — 2014',
      degree: 'Bachelor of Science',
      field: 'Mathematics',
      institution: 'St. Berchmans College',
      note: 'NCC “C” Certificate',
    },
  ],
  credentials: [
    {
      issued: 'Issued Mar 2018',
      title: 'Microsoft Certified Professional',
      issuer: 'Microsoft',
    },
  ],
};
