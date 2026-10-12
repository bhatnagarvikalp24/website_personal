import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Link previews (WhatsApp, iMessage) need an absolute og:image URL.
// SITE_URL can be set by hand; Netlify (URL) and Vercel provide one automatically.
function siteUrl() {
  const url =
    process.env.SITE_URL ||
    process.env.URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  return url ? url.replace(/\/+$/, '') + '/' : ''
}

function absoluteSocialImage() {
  return {
    name: 'absolute-social-image',
    transformIndexHtml(html) {
      const base = siteUrl()
      if (!base) return html
      return html
        .replace('content="og-image.png"', `content="${base}og-image.png"`)
        .replace('<meta property="og:type"', `<meta property="og:url" content="${base}" />\n    <meta property="og:type"`)
    },
  }
}

// Relative base so the built site works on any host or sub-path.
export default defineConfig({
  base: './',
  plugins: [react(), absoluteSocialImage()],
})
