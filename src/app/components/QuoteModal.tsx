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

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      service: String(fd.get("service") || ""),
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
        onClose();
        setOk(false);
        (e.currentTarget as HTMLFormElement).reset();
      }, 2000);
    } catch {
      setErr("Failed — try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 backdrop-blur-sm">
      {/* panel: dark glass, white text */}
      <div className="w-[640px] max-w-[92vw] rounded-2xl bg-black/65 text-white shadow-2xl ring-1 ring-white/15 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-lg font-semibold">Get a Quote</h2>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm text-white/70 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <form onSubmit={onSubmit} className="px-6 pb-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              name="name"
              placeholder="Name"
              required
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 outline-none focus:border-white/25"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 outline-none focus:border-white/25"
            />
            <input
              name="phone"
              placeholder="Phone"
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 outline-none focus:border-white/25"
            />
            <input
              name="service"
              placeholder="Service"
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 outline-none focus:border-white/25"
            />
          </div>

          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            className="mt-3 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 outline-none focus:border-white/25"
          />

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm">
              {ok && (
                <span className="text-emerald-400">
                  Request sent — we’ll be in touch shortly.
                </span>
              )}
              {!ok && err && <span className="text-red-300">{err}</span>}
            </div>
            <button
              disabled={loading}
              className="rounded-full bg-white text-black px-5 py-2 text-sm font-semibold hover:bg-white/90 disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
