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
feedback; `api/contact.js` enforces them again, because anyone can call the
API directly. The API also rejects requests from other websites (Origin
check) and non-JSON or oversized bodies, drops bots that fill a hidden
honeypot field, escapes all user input in the email, and allows each IP 5
emails per 10 minutes. That rate limit is kept in memory, so on Vercel it is
per-instance only; for a hard global limit, add a Vercel Firewall rate-limit
rule or a Redis-backed limiter, and consider a CAPTCHA such as Cloudflare
Turnstile if spam gets through.

**Deploying:** on Vercel, `api/contact.js` runs as a serverless function
automatically; add the three variables under Project Settings > Environment
Variables. On static-only hosts (e.g. GitHub Pages, plain Netlify) the form
needs a backend, since the Resend API can't be called from the browser.
