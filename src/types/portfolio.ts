export type Confidence = 'primary' | 'supporting' | 'expanding';
export type ExperienceKind = 'work' | 'education' | 'credential';
export type CaseStudyStatus = 'professional pattern' | 'learning project';

export interface SocialLink {
  label: string;
  href: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export interface Profile {
  name: string;
  eyebrow: string;
  headline: string;
  shortBio: string;
  about: string[];
  location: string;
  availability: string;
  socialLinks: SocialLink[];
  contactLinks: ContactLink[];
}

export interface Experience {
  id: string;
  kind: ExperienceKind;
  startYear: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  summary: string;
  focus: string[];
  detail: {
    label: string;
    text: string;
  }[];
  sourceNote: string;
}

export interface Capability {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  confidence: Confidence;
  description: string;
  technologies: string[];
}

export interface SkillGroup {
  confidence: Confidence;
  label: string;
  note: string;
  technologies: string[];
}

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  status: CaseStudyStatus;
  problem: string;
  investigation: string;
  reasoning: string;
  outcome: string;
  technologies: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  field: string;
  institution: string;
  note?: string;
}

export interface Credential {
  issued: string;
  title: string;
  issuer: string;
}

export interface PortfolioData {
  profile: Profile;
  facts: {
    value: string;
    label: string;
  }[];
  experience: Experience[];
  capabilities: Capability[];
  skillGroups: SkillGroup[];
  caseStudies: CaseStudy[];
  education: EducationItem[];
  credentials: Credential[];
}
