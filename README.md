# PDF Manipulator

A browser-only, client-side PDF editing app. Built with React + Vite, renders thumbnails with pdf.js and manipulates pages with pdf-lib. Designed to run entirely on GitHub Pages — no server required.

## Features

- Upload single or multiple PDFs
- Render each page as a thumbnail (pdf.js)
- Drag-and-drop page reordering (dnd-kit)
- Click to select pages; delete selected pages
- Merge another PDF into the current one
- Download only selected pages as a new PDF (pdf-lib)
- Save and download the full, edited PDF

## Setup

```bash
npm install
npm run dev
```

Local dev server runs at http://localhost:5173.

## Build

```bash
npm run build
```

The production build is emitted to the `dist/` folder.

## GitHub Pages Deployment

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds and deploys to GitHub Pages.

Important: `vite.config.js` sets `base: '/pdf_manipulator/'` so assets resolve correctly at `https://<username>.github.io/pdf_manipulator/`.

### 1) Push to GitHub (main branch)

```bash
git init
git add .
git commit -m "Configure GitHub Pages deployment"
git branch -M main
git remote add origin https://github.com/<username>/pdf_manipulator.git
git push -u origin main
```

### 2) Enable Pages via Actions

- In GitHub → Repository → Settings → Pages
- Source: select “GitHub Actions”
- On push to `main`, the workflow runs and publishes the site

### 3) Access the site

Open: `https://<username>.github.io/pdf_manipulator/`

## Tech Stack

- React
- Vite
- Tailwind CSS
- pdf.js (rendering)
- pdf-lib (manipulation)
- dnd-kit (drag & drop)

## Usage

1. Upload a PDF
2. Reorder pages via drag-and-drop
3. Select pages using the round button on each thumbnail
4. Delete unwanted pages
5. Use “Save All” to download the entire edited PDF, or “Download Selected” to export only selected pages
