import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import contactHandler from './api/contact.js'

// Serves the /api/contact function locally, so `npm run dev` and
// `npm run preview` behave like the Vercel deployment.
const contactApi = (env) => {
  const mount = (middlewares) => {
    middlewares.use('/api/contact', (req, res) => {
      // Never let a bad request take down the whole dev server
      contactHandler(req, res, env).catch((err) => {
        console.error('[contact]', err)
        if (!res.headersSent) {
          res.statusCode = 500
          res.end()
        }
      })
    })
  }
  return {
    name: 'contact-api',
    configureServer: (server) => mount(server.middlewares),
    configurePreviewServer: (server) => mount(server.middlewares),
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Hand server-only secrets (RESEND_API_KEY, ...) from .env files straight to
  // the API handler. Don't copy them into process.env: Vite restarts in-process
  // when .env files change, and loadEnv prefers existing process.env values, so
  // edits would be ignored. Only VITE_-prefixed vars reach the browser bundle.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), contactApi(env)],
  }
})
