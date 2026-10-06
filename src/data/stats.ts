// Counts and "new this week" flags for every gallery, computed at build time.
import { getCollection } from 'astro:content';
import { isFresh, isVisible } from './site';

const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export async function galleryStats() {
  const musings = (await getCollection('machineMusings')).filter((e) => isVisible(e.data));
  const diary = (await getCollection('dearDiary')).filter((e) => isVisible(e.data));
  const scraps = (await getCollection('scrapbook')).filter((e) => isVisible(e.data));
  const prs = await getCollection('prs');

  const fresh: string[] = [];
  if (musings.some((e) => isFresh(e.data.date))) fresh.push('machine-musings');
  if (diary.some((e) => isFresh(e.data.date))) fresh.push('dear-diary');
  if (scraps.some((e) => isFresh(e.data.date))) fresh.push('scrapbook');
  if (prs.some((e) => isFresh(e.data.merged ?? e.data.opened))) fresh.push('pr-exhibits');

  const merged = prs.filter((p) => p.data.status === 'merged').length;
  const counts: Record<string, string> = {
    'machine-musings': count(musings.length, 'post', 'posts'),
    'pr-exhibits': `${prs.length} PRs · ${merged} merged`,
    'dear-diary': count(diary.length, 'entry', 'entries'),
    scrapbook: count(scraps.length, 'find', 'finds'),
  };
  return { fresh, counts };
}
