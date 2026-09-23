import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import contactHandler from './api/contact.js'

// Serves the /api/contact function locally, so `npm run dev` and
// `npm run preview` behave like the Vercel deployment.
const contactApi = () => {
  const mount = (middlewares) => {
    middlewares.use('/api/contact', (req, res) => {
      contactHandler(req, res)
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
  // Expose server-only secrets (RESEND_API_KEY, ...) from .env files to the
  // API handler. Only VITE_-prefixed vars ever reach the browser bundle.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), tailwindcss(), contactApi()],
  }
})
