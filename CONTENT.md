# Keeping the cabinet

Everything you write lives in `src/content/`. You never edit HTML.

## Run it on your computer

In WSL, from this folder:

```bash
npm run dev
```

Open http://localhost:4321. Pages update as you save. Files marked `draft: true` show here with an "Example · local only" label, and never on the live site.

## Add a Dear Diary entry (every Sunday)

1. Copy `templates/dear-diary.md` to `src/content/dear-diary/2026-w42.md`.
2. Fill in the title, date, week and the `medium` line (what the week was made of).
3. Write under the headings. Set `stage` to `seedling`, `growing` or `evergreen`.

## Add a Scrapbook find (any day, one minute)

Open this month's file in `src/content/scrapbook/`, for example `2026-10.yaml`, or create it. Append:

```yaml
- type: quote # quote, blog, podcast, book, video, song, line
  text: The words themselves
  by: Who said or made it
  url: https://optional-link
  note: Optional: why it caught you
  tags: [brain]
  date: 2026-10-14
```

## Add a Machine Musings post

Copy `templates/machine-musing.md` to `src/content/machine-musings/<short-name>.md`.

## Add a pull request

Append an entry to `src/content/prs.yaml` (newest at the top). When an open PR merges, change `status: open` to `status: merged` and add `merged: <date>`.

## Change wording, links or open a gallery

- Names, intro, links, galleries: `src/data/site.ts`. Set a gallery's `open: true` when it has content.
- About page, including the motto (the line starting with `>`): `src/content/pages/curator.md`.
- Résumé: the lists at the top of `src/pages/route-1/resume.astro`. To offer a download, put a PDF at `public/resume.pdf` and set `resumePdf: '/resume.pdf'` in `site.ts`.
- Photos: `src/assets/photos/`. Any size is fine; the build resizes them.

## Publish

Commit and push to `main`. GitHub builds and publishes the site in about a minute. If a file has a mistake, the build stops and names the file and line, and the live site stays as it was.
