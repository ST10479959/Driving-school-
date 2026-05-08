import {
  Hammer,
  Wrench,
  Tv,
  Grid3x3,
  Ruler,
  PencilRuler,
  Truck,
  HardHat,
  Sofa,
  Zap,
  Plug,
  Flame,
  Home as HomeIcon,
  FileText,
  Building2,
  Paintbrush,
  Layers,
} from "lucide-react";

export const BUSINESS = {
  name: "MVELO TRADING ENTERPRISE",
  shortName: "MVELO",
  tagline: "Reliable. Affordable. High-Quality Workmanship.",
  rating: 4.6,
  reviewsCount: 18,
  address: "Mohlomi Street, Naledi, Soweto, 1865",
  city: "Soweto, South Africa",
  phone: "065 805 1448",
  phoneTel: "+27658051448",
  whatsappLink:
    "https://wa.me/27658051448?text=Hi%20MVELO%2C%20I%27d%20like%20a%20quote%20for%20",
  founded: "Established in Naledi",
};

export const SERVICES = [
  { name: "Floor fitting", icon: Layers, desc: "Precision floor installation across all surface types." },
  { name: "Flooring repairs", icon: Wrench, desc: "Restoring damaged floors with lasting craftsmanship." },
  { name: "TV mounting", icon: Tv, desc: "Secure, level wall mounts with clean cable management." },
  { name: "Tile installation", icon: Grid3x3, desc: "Bathroom, kitchen and feature wall tiling." },
  { name: "Architectural plans", icon: Ruler, desc: "Drafted plans ready for council submission." },
  { name: "Building design", icon: PencilRuler, desc: "Functional, modern designs tailored to your stand." },
  { name: "Building materials supply", icon: Truck, desc: "Sourcing & delivery of quality materials." },
  { name: "Construction projects", icon: HardHat, desc: "Full builds from foundation to finishing." },
  { name: "Interior design & decoration", icon: Sofa, desc: "Spaces designed to live, work and breathe." },
  { name: "Electrical installations & maintenance", icon: Zap, desc: "Certified electrical work for homes & shops." },
  { name: "Electrical repairs", icon: Plug, desc: "Fault finding, rewiring and safety upgrades." },
  { name: "Heating systems", icon: Flame, desc: "Geyser, underfloor and heater solutions." },
  { name: "Home improvements", icon: HomeIcon, desc: "Targeted upgrades that lift property value." },
  { name: "House plans", icon: FileText, desc: "Custom house plans drawn to your brief." },
  { name: "House renovations", icon: Hammer, desc: "Reimagine your home with full renovations." },
  { name: "Painting services", icon: Paintbrush, desc: "Interior & exterior painting with sharp finishes." },
  { name: "Paving work", icon: Building2, desc: "Driveways, walkways and patios that last." },
];

export const HERO_IMAGE =
  "https://static.prod-images.emergentagent.com/jobs/0f86343d-aec9-41c5-83ea-01e7a26598cd/images/441381ba4ac10a7b85b26528b069d1ef2c982ef49db4c1935779501540f4fd40.png";

export const GALLERY = [
  {
    url: "https://static.prod-images.emergentagent.com/jobs/0f86343d-aec9-41c5-83ea-01e7a26598cd/images/c9931d37fc7ddb429b43b5d147b5a514f75f9ee6b856739405e6971f7591546f.png",
    title: "Floor Fitting",
    tag: "FLOORING",
  },
  {
    url: "https://static.prod-images.emergentagent.com/jobs/0f86343d-aec9-41c5-83ea-01e7a26598cd/images/5942e3dac54bf5853789794fdc4bd82f7b2a18ed18683c0562989f28ce798f3c.png",
    title: "Architectural Plans",
    tag: "DESIGN",
  },
  {
    url: "https://images.unsplash.com/photo-1655224652169-7c7e207aa897?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGhvbWUlMjByZW5vdmF0aW9uJTIwdGlsZSUyMGZsb29yaW5nfGVufDB8fHx8MTc3ODI0Njc5OHww&ixlib=rb-4.1.0&q=85",
    title: "Interior Renovation",
    tag: "INTERIOR",
  },
  {
    url: "https://images.unsplash.com/photo-1778087293366-bc308530035a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGhvbWUlMjByZW5vdmF0aW9uJTIwdGlsZSUyMGZsb29yaW5nfGVufDB8fHx8MTc3ODI0Njc5OHww&ixlib=rb-4.1.0&q=85",
    title: "Tile Installation",
    tag: "TILING",
  },
  {
    url: "https://images.unsplash.com/photo-1699625809637-31c6f327ac96?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJzJTIwaG91c2UlMjByZW5vdmF0aW9ufGVufDB8fHx8MTc3ODI0Njc5OHww&ixlib=rb-4.1.0&q=85",
    title: "On-Site Build",
    tag: "CONSTRUCTION",
  },
  {
    url: "https://static.prod-images.emergentagent.com/jobs/0f86343d-aec9-41c5-83ea-01e7a26598cd/images/33d38df824f84a920e91272f7c94653777df00a420af6354e92e6d311fa19f73.png",
    title: "Living Space Refresh",
    tag: "RENOVATION",
  },
];

export const TESTIMONIALS = [
  {
    name: "Thandi M.",
    location: "Naledi, Soweto",
    rating: 5,
    text:
      "MVELO renovated our kitchen end-to-end. Tiling and electrical were spot on. Honest pricing, no surprises.",
    service: "House renovation",
  },
  {
    name: "Sipho K.",
    location: "Protea Glen",
    rating: 5,
    text:
      "Got our paving and painting done in one go. Team was on time every day and cleaned up properly.",
    service: "Paving & painting",
  },
  {
    name: "Lerato D.",
    location: "Dobsonville",
    rating: 4,
    text:
      "Quality TV mounting and tile installation. Communication on WhatsApp made the booking easy.",
    service: "TV mounting & tiling",
  },
  {
    name: "Kabelo N.",
    location: "Naledi, Soweto",
    rating: 5,
    text:
      "Drew up our house plans and handled the build. Reliable workmanship from start to finish.",
    service: "House plans & build",
  },
];

export const STATS = [
  { value: "4.6", label: "Star rating" },
  { value: "18", label: "Verified reviews" },
  { value: "17", label: "Services offered" },
  { value: "100%", label: "Soweto-based" },
];
