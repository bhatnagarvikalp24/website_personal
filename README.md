# For Medhavi

A single-page, cinematic letter built with React + Vite and plain CSS. No backend, no API keys, and only React as a runtime dependency.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

To test on your phone over the same Wi-Fi: `npm run dev -- --host`, then open the "Network" URL it prints.

Production build:

```bash
npm run build      # outputs to dist/
npm run preview    # serves dist/ at http://localhost:4173
```

## Deploy (free HTTPS link)

### Option A: Netlify Drop (no account setup, ~2 minutes)

1. Build with the final URL so the WhatsApp preview image works:
   `SITE_URL=https://for-medhavi.netlify.app npm run build`
   (use whatever site name you plan to pick in step 4)
2. Go to https://app.netlify.com/drop and sign in (free).
3. Drag the `dist` folder onto the page. You get an `https://….netlify.app` link.
4. In **Site configuration → Change site name**, choose something like `for-medhavi`. If the name differs from step 1, rebuild and drop again.

### Option B: Vercel CLI

```bash
npx vercel          # first run asks you to log in and confirm settings (framework: Vite)
npx vercel --prod   # gives you the https link
```

Vercel sets the site URL automatically, so the preview image just works.

### Before you send it

- Open the link on your own phone first, including from inside WhatsApp.
- Paste the link into a WhatsApp chat with yourself to check the preview card (title "For Medhavi" with the night-sky image). WhatsApp caches previews, so check this before sending it to her.

## Optional music

Music is off by default and the toggle is hidden. To enable it, put a track you have the rights to (for example a royalty-free piano piece) at:

```
public/audio/ambient.mp3
```

A small play/pause button then appears in the bottom-right corner. Nothing autoplays; the track fades in only after she taps it.

## Editing the text

- The letter: `src/content/letter.js` (word for word; `kind` only controls styling)
- The opening: `src/components/Opening.jsx`
- The closing: `src/components/Closing.jsx`

## Structure

```
src/
  App.jsx                 layout + scroll → sky variables
  content/letter.js       letter copy
  components/
    Sky.jsx               fixed CSS star field, nebula, particles, dawn glow
    Opening.jsx           title sequence + the one button
    Letter.jsx            letter with staggered reveals
    Closing.jsx           brighter stars + closing lines
    MusicToggle.jsx       appears only if public/audio/ambient.mp3 exists
    Reveal.jsx, Ornament.jsx, WithHearts.jsx
  hooks/                  useInView, useReducedMotion
  styles/global.css       all styling and motion
```
