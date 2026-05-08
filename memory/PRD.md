# Ray Driving School — Marketing Website (PRD)

## Original problem statement
Build a website for **Ray Driving School** (1 Goldman Street, Florida, Roodepoort, Gauteng).
Phone/WhatsApp: 073 403 7108.
Hours: Mon–Fri 08:00–17:00, Sat 08:30–14:00, Sun closed.
Services: learner's licence training, driver's licence lessons, defensive driving, test prep, vehicle rental for testing, etc.

User additions over time:
- Light-blue & white colour scheme.
- Add the user-supplied flyer with packages (R6 000 student special, R7 000 full, R5 500 driving, R11 400 Code 14, individual lessons).
- Replace hero with the real flyer car photo.
- Swap plain "R" logo for colourful Ray wordmark.
- Embed Google Maps in contact section.
- Real testimonials (submission + admin moderation).
- Admin page to view bookings, messages, and reviews.

## Architecture
- **Frontend:** React 19 + react-router-dom + Tailwind + shadcn/ui + sonner + lucide-react. Routes: `/` (single-page site), `/admin` (token-gated console).
- **Backend:** FastAPI + Motor (MongoDB). All routes under `/api`.
- **Auth:** Simple shared-secret `ADMIN_TOKEN` in `/app/backend/.env`, sent via `X-Admin-Token` header on `/api/admin/*` endpoints.
- **Theme:** Neo-brutalist — sky-blue (#7dd3fc) accent, Outfit + Work Sans, hard borders + offset shadows.

## API surface
Public:
- `GET /api/`, `GET /api/business`
- `POST /api/lessons`, `POST /api/contact`
- `POST /api/reviews` (creates with approved=false), `GET /api/reviews` (only approved)
- `POST /api/status`, `GET /api/status` (legacy)

Admin (require `X-Admin-Token: ray-admin-2025`):
- `POST /api/admin/verify`
- `GET /api/admin/lessons`, `GET /api/admin/contact`, `GET /api/admin/reviews`
- `POST /api/admin/reviews/{id}/approve`, `POST /api/admin/reviews/{id}/unapprove`
- `DELETE /api/admin/reviews/{id}`

## Sections (single-page)
Header (sticky w/ colourful Ray wordmark) → Hero (flyer car photo) → Trust marquee → Services → About → WhyChoose → Hours → Packages (Student Special + 3 packages + individual lessons + traffic-fee notes + flyer link) → Testimonials (live from API + Share-Your-Story form) → Book a Lesson form → FAQ → Contact (with Google Maps embed) → Footer → Floating WhatsApp.

## Verification
- Backend: 28/28 pytest tests passing (iteration_3).
- Frontend: All critical flows verified (review submission, admin login, approve→public flow).

## Backlog / Next phase
- **P1** Email/WhatsApp notification when a new booking or review is submitted (Resend or Twilio integration).
- **P1** Replace shared-secret admin with proper auth (Emergent Google OAuth) so the school owner just signs in with Google.
- **P2** SEO: LocalBusiness schema, sitemap.xml, robots.txt.
- **P2** Image carousel of training photos in About section.
- **P2** "Booked sessions" calendar view for admin.
- **P3** Multi-language (Zulu/Sotho) toggle.
