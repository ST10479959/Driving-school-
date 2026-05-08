import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send, Loader2, ArrowRight, GraduationCap } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const LICENCE_OPTIONS = [
  "Learner's Licence Training",
  "Driver's Licence — Manual (Code 8)",
  "Driver's Licence — Automatic (Code 8)",
  "Defensive Driving",
  "Test Preparation Only",
  "Vehicle Rental for Test",
  "Not sure — recommend for me",
];

const DAY_OPTIONS = [
  "Weekday Mornings",
  "Weekday Afternoons",
  "Weekday Evenings",
  "Saturday Morning",
  "Saturday Afternoon",
  "Flexible — any time",
];

const EXPERIENCE_OPTIONS = [
  "Complete beginner",
  "Some experience",
  "Have learner's, need lessons",
  "Just need test prep",
];

export const BookLesson = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    licence_type: "",
    preferred_days: "",
    experience_level: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const updateSelect = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.licence_type) {
      toast.error("Please share your name, phone, and which lesson you want.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        licence_type: form.licence_type,
        preferred_days: form.preferred_days || undefined,
        experience_level: form.experience_level || undefined,
        message: form.message.trim() || undefined,
      };
      if (form.email && form.email.trim()) payload.email = form.email.trim();
      await axios.post(`${API}/lessons`, payload);
      setSubmitted(true);
      toast.success("Booking request sent! We'll be in touch shortly.");
      setForm({
        name: "",
        phone: "",
        email: "",
        licence_type: "",
        preferred_days: "",
        experience_level: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      const detail =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "Something went wrong. Please try WhatsApp or call us.";
      toast.error(typeof detail === "string" ? detail : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="book" data-testid="book-section" className="py-24 lg:py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-body text-xs uppercase tracking-[0.3em] font-bold text-[#0a0a0a] mb-4">
              / Book your first lesson
            </p>
            <h2
              data-testid="book-heading"
              className="font-display font-black uppercase text-[#0a0a0a] tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
            >
              Tell us where
              <br />
              <span className="bg-[#7dd3fc] border-2 border-[#0a0a0a] px-3 inline-block">
                you're starting
              </span>
              <br />
              from.
            </h2>

            <p className="mt-6 font-body text-base lg:text-lg text-[#4a4a4a] leading-relaxed max-w-md">
              We respond the same working day. New to driving? Pick "Not sure"
              and we'll recommend the right place to start.
            </p>

            <div className="mt-10 bg-white border-2 border-[#0a0a0a] shadow-brutal-sm p-6">
              <p className="font-body text-[11px] uppercase tracking-[0.25em] font-bold text-[#0a0a0a]/60 mb-2">
                Or skip the form
              </p>
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                data-testid="book-side-call"
                className="block font-display font-black text-3xl tracking-tight text-[#0a0a0a]"
              >
                {BUSINESS.phone}
              </a>
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="book-side-whatsapp"
                className="mt-3 inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] font-bold text-[#0a0a0a] underline underline-offset-4 decoration-[#7dd3fc] decoration-[3px]"
              >
                Or message on WhatsApp <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div
                data-testid="book-success"
                className="bg-[#7dd3fc] border-2 border-[#0a0a0a] shadow-brutal p-10 lg:p-14"
              >
                <div className="w-16 h-16 bg-white border-2 border-[#0a0a0a] flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-[#0a0a0a]" strokeWidth={2.5} />
                </div>
                <p className="font-body text-xs uppercase tracking-[0.3em] font-bold mb-3">
                  Booking received
                </p>
                <h3 className="font-display font-black uppercase tracking-tighter text-4xl lg:text-5xl text-[#0a0a0a]">
                  See you soon!
                </h3>
                <p className="mt-6 font-body text-base text-[#0a0a0a]/80 max-w-md">
                  We've got your request and will be in touch via call or
                  WhatsApp shortly to confirm your first lesson time.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={BUSINESS.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="success-whatsapp"
                    className="inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white font-body font-bold text-sm uppercase tracking-widest px-6 py-4 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
                  >
                    Open WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    data-testid="success-new-request"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#0a0a0a] font-body font-bold text-sm uppercase tracking-widest px-6 py-4 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
                  >
                    New Booking
                  </button>
                </div>
              </div>
            ) : (
              <form
                data-testid="book-form"
                onSubmit={onSubmit}
                className="bg-white border-2 border-[#0a0a0a] shadow-brutal p-6 lg:p-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field
                    label="Full Name *"
                    testId="field-name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="e.g. Lerato Dlamini"
                  />
                  <Field
                    label="Phone / WhatsApp *"
                    testId="field-phone"
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="073 ___ ____"
                  />
                  <Field
                    label="Email (optional)"
                    testId="field-email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@email.com"
                  />
                  <BrutalSelect
                    label="What do you need? *"
                    testId="field-licence-type"
                    value={form.licence_type}
                    onValueChange={updateSelect("licence_type")}
                    options={LICENCE_OPTIONS}
                    placeholder="Select a lesson"
                  />
                  <BrutalSelect
                    label="Preferred Days"
                    testId="field-preferred-days"
                    value={form.preferred_days}
                    onValueChange={updateSelect("preferred_days")}
                    options={DAY_OPTIONS}
                    placeholder="When suits you?"
                  />
                  <BrutalSelect
                    label="Your Experience"
                    testId="field-experience"
                    value={form.experience_level}
                    onValueChange={updateSelect("experience_level")}
                    options={EXPERIENCE_OPTIONS}
                    placeholder="Where are you at?"
                  />
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="font-body text-[11px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]"
                    >
                      Anything we should know?
                    </label>
                    <textarea
                      id="message"
                      data-testid="field-message"
                      rows={4}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Test date already booked? Specific concerns? Tell us..."
                      className="w-full bg-[#fafafa] border-2 border-[#0a0a0a] px-4 py-3 font-body text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7dd3fc] focus:ring-offset-0 transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="submit-book-btn"
                    className="inline-flex items-center justify-center gap-3 bg-[#7dd3fc] hover:bg-[#38bdf8] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a0a0a] font-body font-bold text-sm uppercase tracking-widest px-10 py-4 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" strokeWidth={2.5} /> Send Booking
                      </>
                    )}
                  </button>
                  <p className="font-body text-xs text-[#4a4a4a]">
                    By submitting, you agree we may contact you about your
                    booking.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, testId, value, onChange, placeholder, type = "text" }) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor={testId}
      className="font-body text-[11px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]"
    >
      {label}
    </label>
    <input
      id={testId}
      data-testid={testId}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[#fafafa] border-2 border-[#0a0a0a] px-4 h-12 font-body text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7dd3fc] focus:ring-offset-0 transition-colors"
    />
  </div>
);

const BrutalSelect = ({ label, testId, value, onValueChange, options, placeholder }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={testId} className="font-body text-[11px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]">
      {label}
    </label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        id={testId}
        data-testid={testId}
        className="w-full bg-[#fafafa] rounded-none border-2 border-[#0a0a0a] h-12 font-body text-sm font-medium focus:ring-2 focus:ring-[#7dd3fc] focus:ring-offset-0 hover:bg-white transition-colors"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        className="rounded-none border-2 border-[#0a0a0a] bg-white"
      >
        {options.map((o) => (
          <SelectItem key={o} value={o} className="rounded-none font-body text-sm">
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default BookLesson;
