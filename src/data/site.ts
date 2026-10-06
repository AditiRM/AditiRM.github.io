// Everything about the site's shape lives here: names, links, wings, galleries and routes.
// Edit this file to change wording; pages read from it.

export const site = {
  title: 'The World of Experiences, Compiled',
  subtitle: 'A Cabinet of Curiosities',
  owner: 'Aditi Medhane',
  intro: "A compiler engineer's work, notes, meals and travels, collected in one place.",
  openToWork: true,
  city: 'Bengaluru',
  links: {
    linkedin: 'https://www.linkedin.com/in/aditi-medhane-92b531191/',
    github: 'https://github.com/AditiRM',
    email: 'aditimedhane73@gmail.com',
  },
  // Put your résumé at public/resume.pdf, then set this to '/resume.pdf'.
  resumePdf: null as string | null,
};

export type WingKey = 'work' | 'life' | 'world';

export const wings: Record<WingKey, { name: string; color: string }> = {
  work: { name: 'Work Wing', color: 'var(--plum)' },
  life: { name: 'Life Wing', color: 'var(--sage)' },
  world: { name: 'World Wing', color: 'var(--ochre)' },
};

export type Gallery = {
  n: number;
  key: string;
  title: string;
  blurb: string;
  wing: WingKey;
  route: 1 | 2;
  href: string;
  /** false shows "opening soon" until the gallery has content */
  open: boolean;
};

export const galleries: Gallery[] = [
  { n: 1, key: 'machine-musings', title: 'Machine Musings', blurb: 'Technical blogs on compilers, systems and the semiconductor world', wing: 'work', route: 1, href: '/route-1/machine-musings/', open: true },
  { n: 2, key: 'pr-exhibits', title: 'PR Exhibits', blurb: 'Upstream LLVM: PowerPC, AMDGPU, Clang', wing: 'work', route: 1, href: '/route-1/pr-exhibits/', open: true },
  { n: 3, key: 'resume', title: 'Résumé', blurb: 'IBM now, AMD before', wing: 'work', route: 1, href: '/route-1/resume/', open: true },
  { n: 4, key: 'dear-diary', title: 'Dear Diary', blurb: 'Weekly entries on whatever tickles my curiosity', wing: 'life', route: 2, href: '/route-2/dear-diary/', open: true },
  { n: 5, key: 'cookbook', title: 'Cookbook', blurb: 'Trying out cuisines and recipes, and bringing them to life', wing: 'life', route: 2, href: '/route-2/cookbook/', open: false },
  { n: 6, key: 'scrapbook', title: 'Scrapbook', blurb: 'Quotes, blogs, podcasts, books and songs worth keeping', wing: 'world', route: 2, href: '/route-2/scrapbook/', open: true },
  { n: 7, key: 'ticket-box', title: 'Ticket Box', blurb: 'Talks, gigs, exhibitions', wing: 'world', route: 2, href: '/route-2/ticket-box/', open: false },
  { n: 8, key: 'lens', title: 'Lens', blurb: 'Travel, one story per trip', wing: 'world', route: 2, href: '/route-2/lens/', open: false },
];

export const routes = {
  1: {
    n: 1,
    name: "The Engineer's Route",
    flag: '-O3',
    pace: 'about 5 minutes',
    tagline: 'Optimised for your time. For recruiters and the LLVM world.',
    href: '/route-1/',
  },
  2: {
    n: 2,
    name: 'The Long Way Round',
    flag: '-O0 -g',
    pace: 'take your time',
    tagline: 'Every story kept. Pull up a chair.',
    href: '/route-2/',
  },
} as const;

export const galleryByKey = (key: string) => {
  const g = galleries.find((x) => x.key === key);
  if (!g) throw new Error(`Unknown gallery: ${key}`);
  return g;
};

export const routeGalleries = (route: 1 | 2) => galleries.filter((g) => g.route === route);

/** Drafts (draft: true) show while you run the site locally, never on the live site. */
export const isVisible = (data: { draft?: boolean }) => import.meta.env.DEV || !data.draft;

/** True when a date falls within the last 7 days of the build. */
export const isFresh = (date?: Date) =>
  !!date && Date.now() - date.getTime() < 7 * 24 * 60 * 60 * 1000;

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
