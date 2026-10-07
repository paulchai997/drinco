# Drinco International Website

Modern static website for Drinco International, built with Astro, React and Tailwind CSS.

## Requirements

- Node.js 20 LTS or newer
- npm 10 or newer

## Run locally

Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

Then open the local URL shown by Astro, normally:

http://localhost:4321/

## Production build

```bash
npm run build
```

The production files are generated in:

```text
dist/
```

## Preview the production build

```bash
npm run preview
```

## Optional production site URL

For correct absolute URLs in the sitemap, set `PUBLIC_SITE_URL` when building:

Windows Command Prompt:

```bat
set PUBLIC_SITE_URL=https://your-domain.example
npm run build
```

PowerShell:

```powershell
$env:PUBLIC_SITE_URL="https://your-domain.example"
npm run build
```

The contact form is still configured to use the original Kleap form endpoint. If the site is moved to another form/backend provider, update `src/components/KleapForm.tsx` accordingly.
