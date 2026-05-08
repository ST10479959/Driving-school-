import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Star, Send, Loader2, MessageSquarePlus } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    achievement: "",
    rating: 5,
    text: "",
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await axios.get(`${API}/reviews`);
        if (!cancelled) setReviews(Array.isArray(r.data) ? r.data : []);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoadingList(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Approved reviews from backend take priority; show seeded as fallback if none yet
  const displayReviews = reviews.length > 0 ? reviews : TESTIMONIALS;
  const isSeeded = reviews.length === 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.text || form.text.length < 10) {
      toast.error("Please share your name and a short review (at least 10 characters).");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        rating: Number(form.rating) || 5,
        text: form.text.trim(),
      };
      if (form.location.trim()) payload.location = form.location.trim();
      if (form.achievement.trim()) payload.achievement = form.achievement.trim();
      await axios.post(`${API}/reviews`, payload);
      toast.success("Thanks! Your review will appear once it's approved.");
      setForm({ name: "", location: "", achievement: "", rating: 5, text: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      const detail =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "Could not submit your review. Please try again.";
      toast.error(typeof detail === "string" ? detail : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section data-testid="testimonials-section" className="py-24 lg:py-32 bg-white border-y-2 border-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] font-bold text-[#0a0a0a] mb-4">
            / Student stories
          </p>
          <h2
            data-testid="testimonials-heading"
            className="font-display font-black uppercase text-[#0a0a0a] tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
          >
            Real learners.
            <br />
            <span className="bg-[#7dd3fc] border-2 border-[#0a0a0a] px-3 inline-block">
              Real licences.
            </span>
          </h2>
          {isSeeded && !loadingList && (
            <p className="mt-5 font-body text-xs uppercase tracking-[0.2em] font-bold text-[#4a4a4a]">
              Be the first to share your real review →
            </p>
          )}
        </div>

        {loadingList ? (
          <div data-testid="testimonials-loading" className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-[#0a0a0a]" />
          </div>
        ) : (
          <div data-testid="testimonials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {displayReviews.slice(0, 6).map((t, i) => (
              <div
                key={t.id || i}
                data-testid={`testimonial-card-${i}`}
                className="bg-[#fafafa] border-2 border-[#0a0a0a] shadow-brutal-sm p-7 lg:p-8 flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < (t.rating || 5) ? "text-[#7dd3fc] fill-[#7dd3fc]" : "text-[#0a0a0a]/20"
                        }`}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <p className="font-display text-lg lg:text-xl font-medium text-[#0a0a0a] leading-snug">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="mt-8 pt-5 border-t-2 border-[#0a0a0a]/15 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-body font-bold text-sm text-[#0a0a0a] truncate">
                      {t.name}
                    </div>
                    {t.location && (
                      <div className="font-body text-xs text-[#0a0a0a]/60 truncate">
                        {t.location}
                      </div>
                    )}
                  </div>
                  {t.achievement && (
                    <span className="font-body text-[10px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]/60 bg-[#7dd3fc]/40 px-2 py-1 border border-[#0a0a0a] flex-shrink-0">
                      {t.achievement}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit a review */}
        <div className="mt-16 max-w-3xl mx-auto">
          {!showForm ? (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowForm(true)}
                data-testid="open-review-form-btn"
                className="inline-flex items-center gap-2 bg-[#0a0a0a] hover:bg-[#0a0a0a]/90 text-white font-body font-bold text-sm uppercase tracking-widest px-7 py-4 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
              >
                <MessageSquarePlus className="w-4 h-4" strokeWidth={2.5} /> Share Your Story
              </button>
              <p className="mt-3 font-body text-xs text-[#4a4a4a]">
                Reviews are checked before they appear on the site.
              </p>
            </div>
          ) : (
            <form
              data-testid="review-form"
              onSubmit={onSubmit}
              className="bg-white border-2 border-[#0a0a0a] shadow-brutal p-6 lg:p-8"
            >
              <h3 className="font-display font-black uppercase text-2xl lg:text-3xl tracking-tight text-[#0a0a0a]">
                Share your experience
              </h3>
              <p className="mt-2 font-body text-sm text-[#4a4a4a]">
                Help future students by telling them how it went.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Your Name *"
                  testId="review-field-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Lerato D."
                />
                <FormField
                  label="Location"
                  testId="review-field-location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Roodepoort"
                />
                <FormField
                  label="Achievement"
                  testId="review-field-achievement"
                  value={form.achievement}
                  onChange={(e) => setForm({ ...form, achievement: e.target.value })}
                  placeholder="e.g. Passed first try"
                />
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="review-rating"
                    className="font-body text-[11px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]"
                  >
                    Rating
                  </label>
                  <div data-testid="review-field-rating" className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        data-testid={`review-rating-${n}`}
                        onClick={() => setForm({ ...form, rating: n })}
                        className="p-1"
                        aria-label={`${n} stars`}
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            n <= form.rating ? "text-[#7dd3fc] fill-[#7dd3fc]" : "text-[#0a0a0a]/20"
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2 flex flex-col gap-2">
                  <label
                    htmlFor="review-text"
                    className="font-body text-[11px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]"
                  >
                    Your review *
                  </label>
                  <textarea
                    id="review-text"
                    data-testid="review-field-text"
                    rows={4}
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    placeholder="What was your experience like? (min 10 characters)"
                    className="w-full bg-[#fafafa] border-2 border-[#0a0a0a] px-4 py-3 font-body text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7dd3fc] focus:ring-offset-0 transition-colors"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="submit-review-btn"
                  className="inline-flex items-center justify-center gap-2 bg-[#7dd3fc] hover:bg-[#38bdf8] disabled:opacity-60 text-[#0a0a0a] font-body font-bold text-sm uppercase tracking-widest px-7 py-4 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" strokeWidth={2.5} /> Submit Review
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  data-testid="cancel-review-btn"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0a0a0a] font-body font-bold text-sm uppercase tracking-widest px-7 py-4 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const FormField = ({ label, testId, value, onChange, placeholder, type = "text" }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={testId} className="font-body text-[11px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]">
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

export default Testimonials;
