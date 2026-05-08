# MVELO Trading Enterprise — Marketing Website (PRD)

## Original problem statement
Create a professional business profile and promotional advertisement for a construction & home-improvement company called **MVELO TRADING ENTERPRISE** based in Naledi, Soweto, South Africa.
- Highlight 4.6★ rating from 18 reviews; reliable, affordable, high-quality workmanship.
- Services (17): Floor fitting, Flooring repairs, TV mounting, Tile installation, Architectural plans, Building design, Building materials supply, Construction projects, Interior design & decoration, Electrical installations & maintenance, Electrical repairs, Heating systems, Home improvements, House plans, House renovations, Painting services, Paving work.
- Location: Mohlomi Street, Naledi, Soweto, 1865.
- Contact: WhatsApp / Call 065 805 1448.
- Build a website.

User opted to proceed with main agent's best judgment.

## Architecture
- **Frontend:** React 19 + Tailwind + shadcn/ui + sonner + lucide-react. Single-page, anchor-section navigation. Fonts: Outfit (display) + Manrope (body). Swiss high-contrast aesthetic (neutral-50/white/yellow-400/neutral-950).
- **Backend:** FastAPI + Motor (MongoDB). All routes prefixed with `/api`.
- **DB Collections:** `quote_requests`, `contact_messages`, `status_checks`.

## API surface
- `GET /api/` — health
- `GET /api/business` — static business info (name, rating, address, phone, services)
- `POST /api/quotes` — submit quote request (name, phone, service required; email/location/message optional)
- `GET /api/quotes` — list quote requests (no admin auth — backlog item)
- `POST /api/contact` — submit contact message
- `GET /api/contact` — list contact messages
- `POST/GET /api/status` — legacy status check

## User personas
1. **Soweto homeowner** — needs a renovation/repair, wants quick WhatsApp contact and trustworthy track record (rating, reviews, address).
2. **Property developer / landlord** — looking for full-service contractor (plans → build → finishing).
3. **Commercial walk-in (mobile)** — wants tap-to-call/WhatsApp immediately.

## Implemented (Dec 2025)
- Sticky header with nav, phone number, "Get a Quote" CTA + mobile menu.
- Hero: bold typography, hero image with overlay, 4.6★/18 reviews badge, CTA cluster (Quote, WhatsApp, Call), stats sidebar with address.
- Yellow trust marquee (animated) under hero.
- Services: 17-card grid using "Grid Borders" technique with hover-to-dark interaction.
- About: 5 trust points + 2x2 stats grid + dark "promise" card.
- Gallery: 6 project images in 3-col grid borders, tag chips.
- Reviews: 4 testimonials + 4.6★ heading.
- Quote form (functional): React form → POST `/api/quotes` → success state. Sonner toasts for validation/success/error.
- Contact: dark section with primary CTAs, hours, location, Google Maps deep link.
- Footer: brand, services list (10 + view-all link), contact info.
- Floating WhatsApp button.
- All elements have `data-testid` attributes.

## Verification
- Backend: 14/14 pytest tests passing (iteration_1).
- Frontend: 12/12 behaviors verified via Playwright (iteration_2).

## Backlog / Next phase (P0 → P2)
- **P1** Admin route to view submitted quotes/contact messages (currently endpoints are public — protect with simple JWT or API key).
- **P1** Add rate limiting / spam protection on POST endpoints (Cloudflare Turnstile or similar).
- **P2** Phone format validation client-side (SA mobile pattern).
- **P2** Lead notification: forward new quotes to MVELO's WhatsApp/Email automatically (Twilio or Resend integration).
- **P2** Replace stock testimonials with real Google reviews via API once shared.
- **P2** SEO: structured data (LocalBusiness schema), sitemap.xml, robots.txt.
- **P2** Service detail pages or modals with pricing ranges.
- **P3** Multi-language (Zulu/Sotho) toggle for local accessibility.
