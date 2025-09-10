# Upper Keys Marine Survey — Project Notes

Short, practical reference so we can pick up fast next time.

## Purpose
- Single‑page, mobile‑first marketing site for a local marine surveyor serving the Upper Florida Keys.
- Primary goals: drive calls and quote requests; fast clarity for pre‑purchase and insurance (C&V) surveys.

## Business Details
- Brand: Upper Keys Marine Survey (formerly “Keys Marine Survey”).
- Phone (click‑to‑call): +1 305‑306‑6391.
- Quote form recipient: splashdispatchupperkeys@gmail.com (FormSubmit backend).
- Service area: Key Largo, Tavernier, Islamorada, Marathon.
- Credentials shown in copy (text badges only, no third‑party logos):
  - Chapman School of Seamanship — Yacht & Small Craft Surveying (certificate)
  - SAMS® — Accredited Marine Surveyor (AMS) [registered symbol used once]
  - NAMS — Certified Marine Surveyor (NAMS‑CMS)
  - USCG 100‑Ton Master; ABYC/NFPA‑aligned; E&O insured

## Tech & Repo
- Stack: static HTML/CSS/JS (no build step).
- Repo: https://github.com/gregkormendi0101/upperkeysmarinesurvey-site (branch: `main`).
- Hosting: Vercel (static, output dir `.`). Custom domain: https://upperkeysmarinesurvey.com/ (primary).
- Local dev: `python3 -m http.server` then open http://localhost:8000

## Tracking
- GA4 installed (gtag) with Measurement ID: `G-GHN2NBX6F2`.
- Events emitted (via `script.js`):
  - `cta_click` — fired on any element with `data-cta`. Params: `cta`, `link_text`.
  - `phone_click` — fired when a `tel:` link is clicked. Params: `cta`, `link_text`.
  - `generate_lead` — on successful quote form submit. Params: `method: 'formsubmit'`, `form_id`, `service`.
- GA4/Ads setup notes:
  - In GA4, mark `generate_lead` as a conversion (optionally `phone_click`).
  - Link GA4 to Google Ads and import conversions.

## Forms
- Action: `https://formsubmit.co/ajax/splashdispatchupperkeys@gmail.com` (AJAX endpoint to avoid CORS issues).
- Hidden fields configured: `_captcha=false`, `_subject`, `_template=table`, `_next` (fallback redirect).
- Client‑side validation + success/error toast in `script.js`.

## SEO
- Title: “Upper Keys Marine Survey | Marine Surveyor – Upper Keys (48‑Hour Reports)”.
- Canonical/OG/Twitter URLs point to upperkeysmarinesurvey.com.
- JSON‑LD `LocalBusiness` present with name/phone/areas.
- Favicon: SVG + PNG + apple‑touch configured.

## Accessibility & Mobile
- WCAG‑friendly structure: landmarks, labels, focus states, reduced‑motion.
- Buttons have 44px tap targets; sticky header accounted for with `scroll-margin-top`.
- Mobile call bar removed (header already includes Call Now).

## Edit Cheatsheet (index.html)
- Update pricing table under `<section id="pricing">`.
- Update service area map `iframe` src (currently queries 4 towns).
- Update phone number in: header CTA, hero CTA, quote form CTA, and JSON‑LD telephone.
- Replace hero/proof images in `assets/` (current names: `hero.jpeg`, `proof-1.png`..`proof-4.png`).

## Backlog / Nice‑to‑Haves
- Performance: convert images to WebP and use `<picture>` with PNG/JPG fallback.
- Spam control: add honeypot and optional autoresponder to FormSubmit.
- Ads call conversion: if using Google Ads call tracking (forwarding numbers), add AW tag snippet.
- Analytics: optional CallRail snippet; cookie/consent banner if required.
- .gitignore: add `.DS_Store` and remove tracked instance.

## Changelog (recent)
- GA4 gtag added; events wired for CTAs, calls, and lead form.
- Phone updated to 305‑306‑6391 across site and schema.
- Quote form wired to FormSubmit AJAX; success toast works.
- Footer layout adjusted; mobile call bar removed.
- Branding updated to “Upper Keys Marine Survey”.
