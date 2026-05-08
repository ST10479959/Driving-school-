import {
  GraduationCap,
  Car,
  ShieldCheck,
  CheckSquare,
  HeartHandshake,
  CalendarCheck,
  KeyRound,
  Users,
  Compass,
} from "lucide-react";

export const BUSINESS = {
  name: "Ray Driving School",
  shortName: "RAY",
  tagline: "Patient instruction. Confident drivers. Real results.",
  description:
    "Roodepoort's friendly, affordable driving school — guiding students from the very first lesson to a confident pass.",
  address: "1 Goldman Street, Florida, Roodepoort, Gauteng",
  city: "Roodepoort, Gauteng, South Africa",
  phone: "073 403 7108",
  phoneTel: "+27734037108",
  whatsappLink:
    "https://wa.me/27734037108?text=Hi%20Ray%20Driving%20School%2C%20I%27d%20like%20to%20book%20a%20lesson",
  hours: [
    { day: "Mon – Fri", open: "08:00", close: "17:00" },
    { day: "Saturday", open: "08:30", close: "14:00" },
    { day: "Sunday", open: "Closed", close: "" },
  ],
};

export const SERVICES = [
  {
    name: "Learner's Licence Training",
    short: "K53 theory & test prep",
    icon: GraduationCap,
    desc:
      "Master road signs, rules of the road, and vehicle controls — fully prepared for your learner's test.",
    featured: true,
  },
  {
    name: "Driver's Licence Lessons",
    short: "Code 8 — manual & automatic",
    icon: Car,
    desc:
      "Structured lessons that take you from first-time driver to test-ready, at your own pace.",
    featured: true,
  },
  {
    name: "Defensive Driving",
    short: "Stay safe on SA roads",
    icon: ShieldCheck,
    desc:
      "Real-world skills to anticipate hazards, react safely, and protect yourself in any traffic.",
  },
  {
    name: "Licence Test Preparation",
    short: "Mock tests & route practice",
    icon: CheckSquare,
    desc:
      "Walk through the exact yard and routes used by the testing centre until they feel routine.",
  },
  {
    name: "Confidence Building",
    short: "Beat first-time nerves",
    icon: HeartHandshake,
    desc:
      "Patient one-on-one coaching to help nervous learners ease into busy roads with calm control.",
  },
  {
    name: "Test Booking Assistance",
    short: "We handle the paperwork",
    icon: CalendarCheck,
    desc:
      "We assist with booking your driving test at the licensing department — minus the stress.",
  },
  {
    name: "Vehicle Rental for Testing",
    short: "Use our dual-control car",
    icon: KeyRound,
    desc:
      "Take your test in the same dual-controlled vehicle you trained on. Familiar, safe, ready.",
  },
];

export const WHY_CHOOSE = [
  {
    title: "One-on-One Instruction",
    desc:
      "No shared lessons. Every minute is yours, every drive is tailored to where you are right now.",
    icon: Users,
  },
  {
    title: "Patient & Experienced Instructors",
    desc:
      "Calm, friendly professionals who teach the way you learn best — never rushed, never harsh.",
    icon: HeartHandshake,
  },
  {
    title: "Dual-Controlled Vehicles",
    desc:
      "Brake and clutch on the instructor side. Total safety from your very first lesson onwards.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible Scheduling",
    desc:
      "Weekday and Saturday slots that work around your job, school, or family commitments.",
    icon: CalendarCheck,
  },
  {
    title: "Local to Roodepoort",
    desc:
      "Based in Florida, Roodepoort. We know every test route, every yard layout, every shortcut.",
    icon: Compass,
  },
  {
    title: "Affordable & Honest Pricing",
    desc:
      "Friendly rates with no hidden charges. Pay per lesson, learn at your pace.",
    icon: CheckSquare,
  },
];

export const FAQS = [
  {
    q: "Do I need a learner's licence to start driving lessons?",
    a: "Yes. By law you must hold a valid learner's licence to drive on public roads. We offer learner's licence training to help you get yours, and you can start driving lessons the moment you pass.",
  },
  {
    q: "Can I use your vehicle for my driving test?",
    a: "Absolutely. We rent out our dual-controlled training vehicle for your driving test, so you take the test in a car you already know and trust.",
  },
  {
    q: "How many lessons will I need?",
    a: "Every learner is different. After your first lesson we'll give you an honest estimate based on your comfort behind the wheel — usually between 6 and 15 lessons for first-time drivers.",
  },
  {
    q: "Do you teach manual or automatic?",
    a: "Both. Tell us your preference when booking and we'll match you with the right vehicle and instructor.",
  },
  {
    q: "Where do you operate?",
    a: "We're based at 1 Goldman Street, Florida, Roodepoort, and we cover the entire greater Roodepoort, West Rand and surrounding Gauteng areas.",
  },
  {
    q: "How do I book?",
    a: "Send us your details on the booking form, WhatsApp 073 403 7108, or call us during operating hours. We respond the same day.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Nomvula T.",
    achievement: "Passed first attempt",
    text:
      "Ray was so patient with me. I was terrified of driving, and now I drive my kids to school every day. Worth every cent.",
    rating: 5,
  },
  {
    name: "Tebogo M.",
    achievement: "Code 8 — Manual",
    text:
      "Started from zero. The dual-controlled car made me feel safe and the lessons were always on time. Booked my test through them too.",
    rating: 5,
  },
  {
    name: "Aisha K.",
    achievement: "Learner's + Driver's",
    text:
      "Got my learner's and licence with Ray Driving School. Honest pricing, friendly instructors, no nonsense. Highly recommend.",
    rating: 5,
  },
];

export const HERO_IMAGE =
  "https://customer-assets.emergentagent.com/job_mvelo-soweto/artifacts/3uiqyen2_IMG_8224.jpeg";
export const STEERING_IMAGE =
  "https://images.unsplash.com/photo-1745487481703-663a531d28ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwzfHxzdGVlcmluZyUyMHdoZWVsJTIwaGFuZHN8ZW58MHx8fHwxNzc4MjQ4NTQ4fDA&ixlib=rb-4.1.0&q=85";
export const LESSON_IMAGE =
  "https://images.unsplash.com/photo-1553782097-130fef5d3e27?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxkcml2aW5nJTIwbGVzc29ufGVufDB8fHx8MTc3ODI0ODU0OHww&ixlib=rb-4.1.0&q=85";

export const STATS = [
  { value: "1:1", label: "Always one-on-one" },
  { value: "Dual", label: "Controlled vehicle" },
  { value: "6 days", label: "Mon — Sat schedule" },
  { value: "Local", label: "Roodepoort-based" },
];
