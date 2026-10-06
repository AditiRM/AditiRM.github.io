import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { readdir, readFile } from 'node:fs/promises';
import yaml from 'js-yaml';

const stage = z.enum(['seedling', 'growing', 'evergreen']).default('seedling');

// Machine Musings · technical blogs and systems musings
const machineMusings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/machine-musings' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    medium: z.string().optional(),
    stage,
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Dear Diary · weekly entries and musings
const dearDiary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dear-diary' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['weekly', 'musing']).default('weekly'),
    week: z.number().int().optional(),
    medium: z.string().optional(),
    stage,
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// PR Exhibits · upstream pull requests, one list in prs.yaml
const prs = defineCollection({
  loader: file('./src/content/prs.yaml'),
  schema: z.object({
    title: z.string(),
    url: z.url(),
    area: z.enum(['PowerPC', 'AMDGPU', 'Clang']),
    status: z.enum(['merged', 'open', 'closed']),
    opened: z.coerce.date(),
    merged: z.coerce.date().optional(),
    note: z.string().optional(),
  }),
});

// Scrapbook · one YAML file per month in src/content/scrapbook/, each a plain list.
// Entries need no id: the loader numbers them by file and position.
const scrapbookDir = new URL('./content/scrapbook/', import.meta.url);
const scrapbook = defineCollection({
  loader: {
    name: 'monthly-scrapbook',
    load: async ({ store, parseData, watcher, logger }) => {
      const load = async () => {
        store.clear();
        let files: string[] = [];
        try {
          files = (await readdir(scrapbookDir)).filter((f) => /\.ya?ml$/.test(f)).sort();
        } catch {
          logger.warn('No src/content/scrapbook folder yet.');
        }
        for (const f of files) {
          const list = yaml.load(await readFile(new URL(f, scrapbookDir), 'utf8'));
          if (!Array.isArray(list)) continue;
          for (const [i, raw] of list.entries()) {
            const id = `${f.replace(/\.ya?ml$/, '')}-${String(i + 1).padStart(3, '0')}`;
            const data = await parseData({ id, data: raw as Record<string, unknown> });
            store.set({ id, data });
          }
        }
      };
      await load();
      watcher?.on('change', (p) => p.includes('/content/scrapbook/') && load());
      watcher?.on('add', (p) => p.includes('/content/scrapbook/') && load());
    },
  },
  schema: z.object({
    type: z.enum(['quote', 'blog', 'podcast', 'book', 'video', 'song', 'line']),
    text: z.string(),
    by: z.string().optional(),
    url: z.url().optional(),
    note: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

// Single pages written in Markdown (The Curator)
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({ title: z.string() }),
});

export const collections = { machineMusings, dearDiary, prs, scrapbook, pages };
