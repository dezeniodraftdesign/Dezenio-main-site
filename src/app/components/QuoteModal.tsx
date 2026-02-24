"use client";

import { useState } from "react";

export default function QuoteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    // ✅ capture form now so reset is safe later
    const formEl = e.currentTarget;

    const fd = new FormData(formEl);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),

      service: String(fd.get("service") || ""),
      projectType: String(fd.get("projectType") || ""),
      projectAddress: String(fd.get("projectAddress") || ""),
      city: String(fd.get("city") || ""),
      state: String(fd.get("state") || ""),
      zip: String(fd.get("zip") || ""),

      desiredStart: String(fd.get("desiredStart") || ""),
      budgetRange: String(fd.get("budgetRange") || ""),
      heardFrom: String(fd.get("heardFrom") || ""),

      message: String(fd.get("message") || ""),
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("Send failed");

      setOk(true);

      setTimeout(() => {
        formEl.reset();
        setOk(false);
        onClose();
      }, 1600);
    } catch {
      setErr("Failed — try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  const input =
    "rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 outline-none focus:border-white/25";
  const label = "text-[11px] uppercase tracking-wide text-white/60";

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 backdrop-blur-sm">
      <div className="w-[720px] max-w-[92vw] rounded-2xl bg-black/65 text-white shadow-2xl ring-1 ring-white/15 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold">Get a Quote</h2>
            <p className="mt-1 text-xs text-white/70">
              Tell us a bit about the project — we’ll follow up quickly.
            </p>
          </div>
          <button
            onClick={() => {
              setOk(false);
              setErr(null);
              onClose();
            }}
            className="rounded-full px-3 py-1 text-sm text-white/70 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <form onSubmit={onSubmit} className="px-6 pb-6">
          {/* Contact */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <div className={label}>Full Name</div>
              <input
                name="name"
                placeholder="Jane Doe"
                required
                className={input}
              />
            </div>

            <div>
              <div className={label}>Email</div>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className={input}
              />
            </div>

            <div>
              <div className={label}>Phone (optional)</div>
              <input
                name="phone"
                placeholder="(615) 555-1234"
                className={input}
              />
            </div>

            <div>
              <div className={label}>Service</div>
              <select name="service" className={input} defaultValue="Cabinetry">
                <option>Cabinetry</option>
                <option>Construction Documents</option>
                <option>As-Builts / Existing Conditions</option>
                <option>Remodel / Design Support</option>
                <option>Structural Framing</option>
                <option>Not Sure</option>
              </select>
            </div>
          </div>

          {/* Project */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <div className={label}>Project Address</div>
              <input
                name="projectAddress"
                placeholder="1234 Oak St"
                className={input}
              />
            </div>

            <div>
              <div className={label}>City</div>
              <input name="city" placeholder="Nashville" className={input} />
            </div>

            <div>
              <div className={label}>State</div>
              <input name="state" placeholder="TN" className={input} />
            </div>

            <div>
              <div className={label}>ZIP</div>
              <input name="zip" placeholder="37211" className={input} />
            </div>

            <div>
              <div className={label}>Project Type</div>
              <select
                name="projectType"
                className={input}
                defaultValue="Kitchen"
              >
                <option>Kitchen</option>
                <option>Bath</option>
                <option>Whole Home</option>
                <option>Addition</option>
                <option>New Build</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Timing & budget */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <div className={label}>Desired Start</div>
              {/* ✅ premium-friendly timeline instead of ugly date picker */}
              <select name="desiredStart" className={input} defaultValue="ASAP">
                <option>ASAP</option>
                <option>2–4 weeks</option>
                <option>1–3 months</option>
                <option>3–6 months</option>
                <option>6+ months</option>
                <option>Not sure</option>
              </select>
            </div>

            <div>
              <div className={label}>Budget Range</div>
              <select
                name="budgetRange"
                className={input}
                defaultValue="$10–25k"
              >
                <option>$5–10k</option>
                <option>$10–25k</option>
                <option>$25–50k</option>
                <option>$50–100k</option>
                <option>$100k+</option>
                <option>Not Sure</option>
              </select>
            </div>

            <div>
              <div className={label}>How did you hear about us?</div>
              <select
                name="heardFrom"
                className={input}
                defaultValue="Referral"
              >
                <option>Referral</option>
                <option>Google</option>
                <option>Facebook / Instagram</option>
                <option>Builder / Contractor</option>
                <option>Past Client</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Details */}
          <div className="mt-5">
            <div className={label}>Project Details</div>
            <textarea
              name="message"
              placeholder="Layout info, scope, finishes, timeline, what you need help with..."
              rows={5}
              className={`w-full ${input}`}
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm">
              {ok && (
                <span className="text-emerald-400">
                  Thank you — request sent. We’ll be in touch shortly.
                </span>
              )}
              {!ok && err && <span className="text-red-300">{err}</span>}
            </div>

            <button
              disabled={loading}
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
