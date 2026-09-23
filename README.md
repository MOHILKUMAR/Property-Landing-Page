# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




#Project Planing 

1. components
        # banner : Inside this banner we have the 3 sections 
                    1.Customer Supports 
                    2.Our Location.
                    3.Contact with us.
        #homePage: It is have two section 
                         #Navbar sections: Inside the navbar section we Have 3 sections
                                           1.Logo
                                           2.navList
                                           3.CTA Button
                         #Main sections:             
                                    1. Title
                                    2. Descrition
                                    3. CTA button.








## Dark mode

A sun/moon toggle in the navbar switches themes. The choice is saved in
`localStorage`; first-time visitors get their OS preference. Dark styles use
Tailwind's `dark:` variant, driven by a `dark` class on `<html>` (see
`src/index.css` and the inline script in `index.html`).

## Contact form (Resend)

The "Request to Connect" form (`src/components/ContactForm.jsx`) posts to
`/api/contact` (`api/contact.js`), which sends the request to your inbox with
[Resend](https://resend.com). The API key stays on the server and is never
shipped to the browser.

1. Create an API key at https://resend.com/api-keys
2. Copy `.env.example` to `.env.local` and fill in:
   - `RESEND_API_KEY` - your Resend key
   - `CONTACT_TO_EMAIL` - where requests are delivered
   - `CONTACT_FROM_EMAIL` - sender; must be on a domain verified in Resend.
     Until you verify one, keep `onboarding@resend.dev`, which can only deliver
     to your own Resend account's email address.
3. `npm run dev` - the Vite dev server serves `/api/contact` locally.

**Abuse protection:** the form and the API share the same validation rules
(`src/utils/contactValidation.js`). The browser checks only give instant
feedback; `server/contact.js` enforces them again, because anyone can call
the API directly. The API also rejects requests from other websites (Origin
check) and non-JSON or oversized bodies, drops bots that fill a hidden
honeypot field, escapes all user input in the email, and allows each IP 5
emails per 10 minutes. That rate limit is kept in memory, so it applies per
server instance only; for a hard global limit, add a rate-limiting rule in
your host's firewall (Cloudflare WAF or Vercel Firewall), and consider a
CAPTCHA such as Cloudflare Turnstile if spam gets through.

The endpoint logic lives in `server/contact.js` and uses only web-standard
`Request`/`Response`, so the same code runs on Cloudflare, Vercel and the
local Vite server.

## Deploying to Cloudflare

The site deploys as a Cloudflare Worker (`wrangler.jsonc`): the built files
in `dist/` are served as static assets, and `worker/index.js` handles
`/api/*`.

1. Set the three variables as **secrets** (secrets survive redeploys; plain
   dashboard variables are replaced by each `wrangler deploy`):
   ```bash
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put CONTACT_TO_EMAIL
   npx wrangler secret put CONTACT_FROM_EMAIL
   ```
   Or in the dashboard: Workers & Pages > property-landing-page > Settings >
   Variables and Secrets > Add, type **Secret**.
2. Deploy, either:
   - **From your machine:** `npx wrangler login`, then `npm run deploy`.
   - **From GitHub:** Workers & Pages > Create > Import a repository, pick
     this repo, and keep build command `npm run build` and deploy command
     `npx wrangler deploy`. Every push then redeploys. The Worker name in
     the dashboard must match `name` in `wrangler.jsonc`.

To run the real Worker locally, put test values in a git-ignored
`.dev.vars` file (same format as `.env.local`) and run `npm run cf:dev`.

**Other hosts:** on Vercel, `api/contact.js` runs automatically; add the
three variables under Project Settings > Environment Variables. On
static-only hosts (e.g. GitHub Pages) the form needs a backend, since the
Resend API can't be called from the browser.
