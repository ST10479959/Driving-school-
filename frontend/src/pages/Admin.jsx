import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  LogOut,
  ShieldCheck,
  Loader2,
  Check,
  X,
  Trash2,
  Phone,
  Mail,
  MessageSquare,
  GraduationCap,
  Star,
  RefreshCw,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { RayMark } from "@/components/site/RayLogo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const STORAGE_KEY = "ray_admin_token";

const TABS = [
  { id: "lessons", label: "Bookings" },
  { id: "contact", label: "Messages" },
  { id: "reviews", label: "Reviews" },
];

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || "");
  const [verified, setVerified] = useState(false);
  const [activeTab, setActiveTab] = useState("lessons");
  const [data, setData] = useState({ lessons: [], contact: [], reviews: [] });
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const verify = useCallback(async (t) => {
    try {
      await axios.post(`${API}/admin/verify`, {}, { headers: { "X-Admin-Token": t } });
      return true;
    } catch (e) {
      return false;
    }
  }, []);

  const fetchAll = useCallback(
    async (t) => {
      setLoading(true);
      try {
        const headers = { "X-Admin-Token": t };
        const [l, c, r] = await Promise.all([
          axios.get(`${API}/admin/lessons`, { headers }),
          axios.get(`${API}/admin/contact`, { headers }),
          axios.get(`${API}/admin/reviews`, { headers }),
        ]);
        setData({ lessons: l.data || [], contact: c.data || [], reviews: r.data || [] });
      } catch (e) {
        console.error(e);
        toast.error("Could not load admin data.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (token && !verified) {
      verify(token).then((ok) => {
        if (ok) {
          setVerified(true);
          fetchAll(token);
        } else {
          localStorage.removeItem(STORAGE_KEY);
          setToken("");
        }
      });
    }
  }, [token, verified, verify, fetchAll]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const t = (formData.get("token") || "").toString().trim();
    if (!t) {
      toast.error("Enter your admin token.");
      return;
    }
    const ok = await verify(t);
    if (!ok) {
      toast.error("Invalid token.");
      return;
    }
    localStorage.setItem(STORAGE_KEY, t);
    setToken(t);
    setVerified(true);
    fetchAll(t);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken("");
    setVerified(false);
    setData({ lessons: [], contact: [], reviews: [] });
  };

  const approveReview = async (id) => {
    setBusyId(id);
    try {
      await axios.post(
        `${API}/admin/reviews/${id}/approve`,
        {},
        { headers: { "X-Admin-Token": token } }
      );
      toast.success("Review approved.");
      fetchAll(token);
    } catch (e) {
      toast.error("Could not approve.");
    } finally {
      setBusyId(null);
    }
  };

  const unapproveReview = async (id) => {
    setBusyId(id);
    try {
      await axios.post(
        `${API}/admin/reviews/${id}/unapprove`,
        {},
        { headers: { "X-Admin-Token": token } }
      );
      toast.success("Review hidden.");
      fetchAll(token);
    } catch (e) {
      toast.error("Could not update.");
    } finally {
      setBusyId(null);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review permanently?")) return;
    setBusyId(id);
    try {
      await axios.delete(`${API}/admin/reviews/${id}`, {
        headers: { "X-Admin-Token": token },
      });
      toast.success("Review deleted.");
      fetchAll(token);
    } catch (e) {
      toast.error("Could not delete.");
    } finally {
      setBusyId(null);
    }
  };

  // ============ LOGIN VIEW ============
  if (!verified) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: 0,
              border: "2px solid #0a0a0a",
              fontFamily: "Work Sans, sans-serif",
              boxShadow: "4px 4px 0 0 rgba(10, 10, 10, 1)",
            },
          }}
        />
        <form
          onSubmit={handleLogin}
          data-testid="admin-login-form"
          className="w-full max-w-md bg-white border-2 border-[#0a0a0a] shadow-brutal p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <RayMark size="md" />
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.3em] font-bold text-[#0a0a0a]/60">
                Ray Driving School
              </p>
              <h1 className="font-display font-black uppercase text-2xl tracking-tight text-[#0a0a0a]">
                Admin Console
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label
              htmlFor="token"
              className="font-body text-[11px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]"
            >
              Admin Token
            </label>
            <input
              id="token"
              name="token"
              type="password"
              required
              data-testid="admin-token-input"
              placeholder="Paste your token"
              className="w-full bg-[#fafafa] border-2 border-[#0a0a0a] px-4 h-12 font-body text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7dd3fc] focus:ring-offset-0 transition-colors"
            />
          </div>
          <button
            type="submit"
            data-testid="admin-login-btn"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0a0a0a] font-body font-bold text-sm uppercase tracking-widest px-6 py-4 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
          >
            <ShieldCheck className="w-4 h-4" strokeWidth={2.5} /> Sign In
          </button>
          <a
            href="/"
            className="mt-5 inline-block font-body text-xs uppercase tracking-[0.2em] font-bold text-[#0a0a0a]/60 hover:text-[#0a0a0a]"
          >
            ← Back to website
          </a>
        </form>
      </div>
    );
  }

  // ============ MAIN VIEW ============
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: 0,
            border: "2px solid #0a0a0a",
            fontFamily: "Work Sans, sans-serif",
            boxShadow: "4px 4px 0 0 rgba(10, 10, 10, 1)",
          },
        }}
      />
      {/* Top bar */}
      <header className="bg-white border-b-2 border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3" data-testid="admin-home-link">
            <RayMark size="sm" />
            <div className="leading-none">
              <div className="font-display font-black uppercase tracking-tight text-base">Admin</div>
              <div className="font-body text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/60 font-bold mt-0.5">
                Ray Driving School
              </div>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fetchAll(token)}
              data-testid="admin-refresh-btn"
              className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] font-body font-bold text-xs uppercase tracking-widest px-4 py-2 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} strokeWidth={2.5} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              data-testid="admin-logout-btn"
              className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white font-body font-bold text-xs uppercase tracking-widest px-4 py-2 border-2 border-[#0a0a0a] shadow-brutal-sm hover-lift-sm transition-all"
            >
              <LogOut className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Bookings" value={data.lessons.length} icon={GraduationCap} />
          <StatCard label="New (24h)" value={data.lessons.filter((l) => recent(l.created_at)).length} icon={GraduationCap} highlight />
          <StatCard label="Messages" value={data.contact.length} icon={MessageSquare} />
          <StatCard
            label="Reviews · Pending"
            value={`${data.reviews.length} · ${data.reviews.filter((r) => !r.approved).length}`}
            icon={Star}
          />
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex gap-px bg-[#0a0a0a] border-2 border-[#0a0a0a] w-full sm:w-fit" data-testid="admin-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              data-testid={`admin-tab-${t.id}`}
              onClick={() => setActiveTab(t.id)}
              className={`font-body text-xs uppercase tracking-widest font-bold px-5 py-3 transition-colors ${
                activeTab === t.id ? "bg-[#7dd3fc] text-[#0a0a0a]" : "bg-white text-[#0a0a0a]/70 hover:text-[#0a0a0a]"
              }`}
            >
              {t.label} ({data[t.id].length})
            </button>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-7 h-7 animate-spin text-[#0a0a0a]" />
          </div>
        ) : activeTab === "lessons" ? (
          <LessonsTable items={data.lessons} />
        ) : activeTab === "contact" ? (
          <ContactTable items={data.contact} />
        ) : (
          <ReviewsTable
            items={data.reviews}
            onApprove={approveReview}
            onUnapprove={unapproveReview}
            onDelete={deleteReview}
            busyId={busyId}
          />
        )}
      </main>
    </div>
  );
}

function recent(iso) {
  if (!iso) return false;
  try {
    const d = new Date(iso);
    return Date.now() - d.getTime() < 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

const StatCard = ({ label, value, icon: Icon, highlight }) => (
  <div className={`p-5 border-2 border-[#0a0a0a] ${highlight ? "bg-[#7dd3fc]" : "bg-white"}`}>
    <div className="flex items-center justify-between mb-3">
      <span className="font-body text-[10px] uppercase tracking-[0.25em] font-bold text-[#0a0a0a]/70">
        {label}
      </span>
      <Icon className="w-4 h-4 text-[#0a0a0a]" strokeWidth={2.5} />
    </div>
    <div className="font-display font-black text-3xl text-[#0a0a0a] tracking-tighter">
      {value}
    </div>
  </div>
);

const Empty = ({ children }) => (
  <div className="bg-white border-2 border-[#0a0a0a] p-10 text-center font-body text-sm text-[#4a4a4a]">
    {children}
  </div>
);

const LessonsTable = ({ items }) => {
  if (items.length === 0) return <Empty>No bookings yet.</Empty>;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" data-testid="admin-lessons-list">
      {items.map((l) => (
        <article
          key={l.id}
          data-testid={`admin-lesson-${l.id}`}
          className="bg-white border-2 border-[#0a0a0a] shadow-brutal-sm p-5 lg:p-6"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-display font-black text-lg lg:text-xl tracking-tight text-[#0a0a0a]">
                {l.name}
              </h3>
              <p className="font-body text-[11px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]/60 mt-1">
                {fmt(l.created_at)}
              </p>
            </div>
            <span className="font-body text-[10px] uppercase tracking-[0.2em] font-bold bg-[#7dd3fc] border-2 border-[#0a0a0a] px-2 py-1">
              {l.licence_type || "—"}
            </span>
          </div>
          <ul className="text-sm font-body space-y-1.5 text-[#0a0a0a]">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> <a href={`tel:${l.phone}`} className="underline">{l.phone}</a>
            </li>
            {l.email && (
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> {l.email}
              </li>
            )}
            {l.preferred_days && (
              <li className="text-[#4a4a4a]">📅 {l.preferred_days}</li>
            )}
            {l.experience_level && (
              <li className="text-[#4a4a4a]">🎯 {l.experience_level}</li>
            )}
            {l.message && (
              <li className="mt-3 pt-3 border-t border-[#0a0a0a]/15 text-[#4a4a4a] italic">
                &ldquo;{l.message}&rdquo;
              </li>
            )}
          </ul>
        </article>
      ))}
    </div>
  );
};

const ContactTable = ({ items }) => {
  if (items.length === 0) return <Empty>No messages yet.</Empty>;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" data-testid="admin-contact-list">
      {items.map((m) => (
        <article
          key={m.id}
          data-testid={`admin-contact-${m.id}`}
          className="bg-white border-2 border-[#0a0a0a] shadow-brutal-sm p-5 lg:p-6"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-display font-black text-lg tracking-tight text-[#0a0a0a]">
              {m.name}
            </h3>
            <p className="font-body text-[11px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]/60">
              {fmt(m.created_at)}
            </p>
          </div>
          <ul className="text-sm font-body space-y-1.5 mb-3 text-[#0a0a0a]">
            {m.phone && (
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{m.phone}</li>
            )}
            {m.email && (
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" />{m.email}</li>
            )}
          </ul>
          <p className="font-body text-sm text-[#0a0a0a]/85 leading-relaxed border-t border-[#0a0a0a]/15 pt-3">
            {m.message}
          </p>
        </article>
      ))}
    </div>
  );
};

const ReviewsTable = ({ items, onApprove, onUnapprove, onDelete, busyId }) => {
  if (items.length === 0) return <Empty>No reviews yet.</Empty>;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" data-testid="admin-reviews-list">
      {items.map((r) => (
        <article
          key={r.id}
          data-testid={`admin-review-${r.id}`}
          className={`border-2 border-[#0a0a0a] shadow-brutal-sm p-5 lg:p-6 ${
            r.approved ? "bg-white" : "bg-[#7dd3fc]/30"
          }`}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-display font-black text-lg tracking-tight text-[#0a0a0a]">
                {r.name}
                {r.location && <span className="text-[#0a0a0a]/60 font-bold text-sm ml-2">· {r.location}</span>}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < (r.rating || 0) ? "text-[#0a0a0a] fill-[#7dd3fc]" : "text-[#0a0a0a]/15"
                    }`}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`font-body text-[10px] uppercase tracking-[0.2em] font-bold border-2 border-[#0a0a0a] px-2 py-1 ${
                  r.approved ? "bg-[#7dd3fc] text-[#0a0a0a]" : "bg-white text-[#0a0a0a]"
                }`}
              >
                {r.approved ? "Live" : "Pending"}
              </span>
            </div>
          </div>
          {r.achievement && (
            <p className="font-body text-[11px] uppercase tracking-[0.2em] font-bold text-[#0a0a0a]/70 mb-2">
              {r.achievement}
            </p>
          )}
          <p className="font-body text-sm text-[#0a0a0a] leading-relaxed">
            &ldquo;{r.text}&rdquo;
          </p>
          <p className="font-body text-[11px] text-[#0a0a0a]/50 mt-3">
            {fmt(r.created_at)}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {!r.approved ? (
              <button
                type="button"
                onClick={() => onApprove(r.id)}
                disabled={busyId === r.id}
                data-testid={`approve-review-${r.id}`}
                className="inline-flex items-center gap-1.5 bg-[#0a0a0a] text-white font-body font-bold text-xs uppercase tracking-widest px-3 py-2 border-2 border-[#0a0a0a]"
              >
                <Check className="w-3.5 h-3.5" strokeWidth={3} /> Approve
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onUnapprove(r.id)}
                disabled={busyId === r.id}
                data-testid={`unapprove-review-${r.id}`}
                className="inline-flex items-center gap-1.5 bg-white text-[#0a0a0a] font-body font-bold text-xs uppercase tracking-widest px-3 py-2 border-2 border-[#0a0a0a]"
              >
                <X className="w-3.5 h-3.5" strokeWidth={3} /> Hide
              </button>
            )}
            <button
              type="button"
              onClick={() => onDelete(r.id)}
              disabled={busyId === r.id}
              data-testid={`delete-review-${r.id}`}
              className="inline-flex items-center gap-1.5 bg-white text-[#dc2626] font-body font-bold text-xs uppercase tracking-widest px-3 py-2 border-2 border-[#0a0a0a]"
            >
              <Trash2 className="w-3.5 h-3.5" strokeWidth={2.5} /> Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

function fmt(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-ZA", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
