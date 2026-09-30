# Happy Birthday — Celebration Experience

A premium, interactive birthday website built with **React + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide React**.

## Getting started

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build into /dist
npm run preview   # preview the production build locally
```

Requires Node 18+.

## Where to edit content

Everything personal — the name, the message, the secret message, the gallery
captions, the "why you're special" cards, and the timeline — lives in one file:

```
src/config/celebration.ts
```

Change the text there and every section updates automatically. Types for
that file live in `src/types.ts`.

## Adding real photos

The gallery currently uses generated gradient placeholders (`src/components/Gallery.tsx`)
so the project works out of the box with no images to source. To use real photos:

1. Drop your images into `src/assets/` (create the folder) and `import photo1 from '../assets/photo1.jpg'` at the top of `celebration.ts`.
2. Add a `src` field to the matching entry in `CONFIG.gallery`, e.g. `{ caption: "...", src: photo1 }`.
3. In `Gallery.tsx`, swap the gradient `<div>` for an `<img src={photo.src} />` when `photo.src` is set (a small conditional is all that's needed — the gradient stays as a graceful fallback for any photo left unset).

## Project structure

```
src/
  config/celebration.ts   <- all editable content
  types.ts                <- shared TypeScript interfaces
  hooks/
    useReducedMotion.ts    accessibility: respects OS motion setting
    useScrollProgress.ts   powers the top progress bar
    useTypewriter.ts       the reveal effect on the messages
    useAmbientAudio.ts     Web Audio-synthesized background music + chime
  components/
    Navigation.tsx
    ProgressBar.tsx
    Hero.tsx
    BirthdayMessage.tsx
    Gallery.tsx
    Lightbox.tsx
    Reasons.tsx
    Timeline.tsx
    Surprise.tsx
    BirthdayCake.tsx
    FinalSection.tsx
  App.tsx
  index.css                <- Tailwind v4 theme tokens (colors, fonts, keyframes)
```

## Notes

- **Music**: rather than shipping/hosting an audio file, the background music
  and celebratory chime are synthesized live with the Web Audio API
  (`useAmbientAudio.ts`). It never autoplays -- it only starts once the
  visitor taps the music toggle in the nav bar.
- **Confetti**: powered by the `canvas-confetti` package, triggered from the
  Surprise and "Make a Wish" buttons.
- **Accessibility**: keyboard-navigable lightbox (Esc, arrow keys), visible
  focus states, `prefers-reduced-motion` support throughout, and semantic
  buttons/labels.
- **Deploying**: `npm run build` outputs a static `dist/` folder you can host
  anywhere (Vercel, Netlify, GitHub Pages, etc.).
