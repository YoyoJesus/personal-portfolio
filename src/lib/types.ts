export interface SiteConfig extends HeaderProps {
  title: string;
  description: string;
  lang: string;
  author: string;
  socialLinks: { text: string; href: string }[];
  socialImage: string;
  canonicalURL?: string;
  activity: { letterboxd: string; lastfm: string; steam: string; github: string };
}

export interface SiteContent {
  hero: HeroProps;
  hackerHero: HackerHeroProps;
  experience: ExperienceProps[];
  leadership: ExperienceProps[];
  projects: ProjectProps[];
  about: AboutProps;
  hackerAbout: Pick<AboutProps, "description">;
  /** Project names shown first, in this order, while hacker mode is on. */
  hackerProjectOrder: string[];
  workspace: WorkspaceProps;
  hackerWorkspace: WorkspaceProps;
}

export interface HeroProps {
  name: string;
  specialty: string;
  summary: string;
  email: string;
  resume: string;
  blog: string;
}

/** Hero copy shown while hacker mode is on. */
export interface HackerHeroProps {
  specialty: string;
  summary: string;
  wins: { place: string; event: string }[];
}

export interface ExperienceProps {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  workType: string;
  summary: string | string[];
  previousPositions?: PreviousPositionProps[];
  /** Fields swapped in while hacker mode is on. */
  hacker?: Partial<Omit<ExperienceProps, "hacker" | "hackerHidden">>;
  hackerHidden?: boolean;
}

export interface PreviousPositionProps {
  position: string;
  startDate: string;
  endDate: string;
}

export interface ProjectProps {
  name: string;
  status: "Active" | "Completed" | "Prototype" | "Archived";
  openSource?: boolean;
  awards?: { label: string; href: string; details?: string }[];
  summary: string;
  image: string;
  linkPreview?: string;
  linkSource?: string;
  linkWriteup?: string;
  languages: LanguageProps[];
  collaborators?: CollaboratorProps[];
  /** Fields swapped in while hacker mode is on. */
  hacker?: Partial<Pick<ProjectProps, "summary">>;
}

export interface AboutProps {
  description: string;
  image: string;
}

export interface HeaderProps {
  siteLogo: string;
  navLinks: { text: string; href: string }[];
}

export interface CollaboratorProps {
  image: string;
  name: string;
  profileLink?: string;
}

export interface LanguageProps {
  icon: string; // Icon name from devicon or simple-icons (e.g., 'devicon:python', 'simple-icons:react')
  name: string;
  languageLink?: string;
}

export interface WorkspaceProps {
  /** Desk/setup photo; omitted when empty. */
  image?: string;
  imageAlt?: string;
  /** Physical setup, numbered and pinned on the photo. */
  gear: WorkspaceItem[];
  /** Software, shown as chip rows below. */
  groups: WorkspaceGroup[];
}

export interface WorkspaceGroup {
  title: string;
  items: WorkspaceItem[];
}

export interface WorkspaceItem {
  name: string;
  /** Devicon class or image URL, same as LanguageProps.icon. */
  icon?: string;
  detail?: string;
  href?: string;
  /** Year or "Mon YYYY" this became part of the setup. */
  since?: string;
  /** Marks something still being evaluated. */
  trying?: boolean;
  /** Pin position(s) on the photo, as percentages from the top-left. Multiple pins highlight together. */
  pin?: WorkspacePin | WorkspacePin[];
}

export interface WorkspacePin {
  x: number;
  y: number;
}
