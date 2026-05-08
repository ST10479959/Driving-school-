import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send, Loader2, ArrowRight } from "lucide-react";
import { SERVICES, BUSINESS } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const QuoteForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) {
      toast.error("Please fill in your name, phone and service.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        service: form.service,
        location: form.location.trim() || undefined,
        message: form.message.trim() || undefined,
      };
      if (form.email && form.email.trim()) {
        payload.email = form.email.trim();
      }
      await axios.post(`${API}/quotes`, payload);
      setSubmitted(true);
      toast.success("Quote request sent! We'll be in touch shortly.");
      setForm({
        name: "",
        phone: "",
        email: "",
        service: "",
        location: "",
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
    <section
      id="quote"
      data-testid="quote-section"
      className="bg-neutral-50 py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
              / 05 — Get a Quote
            </p>
            <h2
              data-testid="quote-heading"
              className="font-display font-black uppercase text-neutral-950 tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
            >
              Tell us
              <br />
              about the job.
            </h2>
            <p className="mt-6 font-body text-base lg:text-lg text-neutral-600 leading-relaxed">
              Drop your details and the service you need. We&rsquo;ll respond
              with a fair, no-obligation quote — usually within the same working
              day.
            </p>

            <div className="mt-10 border border-neutral-200 bg-white p-6">
              <p className="font-body text-xs uppercase tracking-widest text-neutral-500 mb-2">
                Prefer to talk directly?
              </p>
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                data-testid="quote-side-call"
                className="block font-display font-black text-3xl text-neutral-950 hover:text-yellow-600 transition-colors tracking-tighter"
              >
                {BUSINESS.phone}
              </a>
              <a
                href={BUSINESS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="quote-side-whatsapp"
                className="mt-3 inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest font-bold text-neutral-700 hover:text-neutral-950"
              >
                Or message on WhatsApp <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div
                data-testid="quote-success"
                className="bg-neutral-950 text-white p-10 lg:p-14"
              >
                <p className="font-body text-xs uppercase tracking-[0.3em] text-yellow-400 mb-4">
                  Request received
                </p>
                <h3 className="font-display font-black uppercase tracking-tighter text-4xl lg:text-5xl">
                  Thank you.
                </h3>
                <p className="mt-6 font-body text-base text-neutral-300 max-w-md">
                  We&rsquo;ve received your quote request and will be in touch
                  via call or WhatsApp shortly. For urgent jobs, message us
                  directly.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={BUSINESS.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="success-whatsapp"
                    className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-neutral-950 font-body font-bold text-sm uppercase tracking-widest px-6 py-4"
                  >
                    Open WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    data-testid="success-new-request"
                    className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white font-body font-bold text-sm uppercase tracking-widest px-6 py-4 transition-colors"
                  >
                    New Request
                  </button>
                </div>
              </div>
            ) : (
              <form
                data-testid="quote-form"
                onSubmit={onSubmit}
                className="bg-white border border-neutral-200 p-6 lg:p-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field
                    label="Full Name *"
                    testId="field-name"
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="e.g. Thabo Mokoena"
                  />
                  <Field
                    label="Phone / WhatsApp *"
                    testId="field-phone"
                    value={form.phone}
                    onChange={updateField("phone")}
                    placeholder="065 ___ ____"
                    type="tel"
                  />
                  <Field
                    label="Email (optional)"
                    testId="field-email"
                    value={form.email}
                    onChange={updateField("email")}
                    placeholder="you@email.com"
                    type="email"
                  />
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="service-select"
                      className="font-body text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold"
                    >
                      Service *
                    </label>
                    <Select
                      value={form.service}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, service: v }))
                      }
                    >
                      <SelectTrigger
                        id="service-select"
                        data-testid="field-service"
                        className="w-full rounded-none border-neutral-300 h-12 font-body text-sm focus:ring-yellow-400"
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent
                        data-testid="service-options"
                        className="rounded-none max-h-72"
                      >
                        {SERVICES.map((s) => (
                          <SelectItem
                            key={s.name}
                            value={s.name}
                            className="rounded-none font-body text-sm"
                          >
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Field
                    label="Project Location"
                    testId="field-location"
                    value={form.location}
                    onChange={updateField("location")}
                    placeholder="e.g. Naledi, Soweto"
                    fullWidth
                  />
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="font-body text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      data-testid="field-message"
                      rows={4}
                      value={form.message}
                      onChange={updateField("message")}
                      placeholder="Briefly describe what you need done..."
                      className="w-full border border-neutral-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="submit-quote-btn"
                    className="inline-flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed text-neutral-950 font-body font-bold text-sm uppercase tracking-widest px-10 py-4 transition-colors"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Request
                      </>
                    )}
                  </button>
                  <p className="font-body text-xs text-neutral-500">
                    By submitting, you agree we may contact you about your
                    request.
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

const Field = ({ label, testId, value, onChange, placeholder, type = "text", fullWidth }) => (
  <div className={`flex flex-col gap-2 ${fullWidth ? "md:col-span-2" : ""}`}>
    <label
      htmlFor={testId}
      className="font-body text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold"
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
      className="w-full border border-neutral-300 px-4 h-12 font-body text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
    />
  </div>
);

export default QuoteForm;
