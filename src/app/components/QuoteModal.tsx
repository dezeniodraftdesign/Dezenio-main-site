"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow || "";
    };
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

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

  function handleClose() {
    setOk(false);
    setErr(null);
    onClose();
  }

  if (!open) return null;

  const inputBase =
    "w-full rounded-[16px] border border-white/10 bg-[rgba(255,255,255,0.045)] px-4 py-3 text-[15px] text-white placeholder-white/36 outline-none transition focus:border-white/24 focus:bg-[rgba(255,255,255,0.07)]";

  const sectionCard =
    "rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-4 sm:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

  return (
    <div className="fixed inset-0 z-[140]">
      <button
        aria-label="Close quote modal"
        className="absolute inset-0 bg-black/72 backdrop-blur-md"
        onClick={handleClose}
      />

      <div className="absolute inset-0 flex items-end justify-center p-2 sm:items-center sm:p-5">
        <div
          className="relative flex w-full max-w-[96vw] flex-col overflow-hidden rounded-[28px] border border-white/12 bg-[rgba(8,10,14,0.70)] text-white shadow-[0_28px_90px_rgba(0,0,0,0.48)] backdrop-blur-2xl sm:w-[760px] lg:w-[820px]"
          style={{ height: "min(92dvh, 980px)" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_26%,rgba(255,255,255,0.015))]" />

          <div className="relative shrink-0 border-b border-white/10 px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="mb-3">
                  <Image
                    src="/logos/ddd-logo-wht-trans-crop.png"
                    alt="Dezenio Draft Design"
                    width={220}
                    height={52}
                    className="h-auto w-[165px] sm:w-[180px]"
                    priority
                  />
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/52">
                  Cabinetry inquiry
                </p>

                <h2 className="mt-2 text-[1.95rem] font-extrabold tracking-tight leading-none sm:text-[2rem]">
                  Get a Quote
                </h2>

                <p className="mt-3 max-w-[34rem] text-sm leading-6 text-white/70">
                  Tell us a bit about the project and we’ll follow up with the
                  right next step.
                </p>
              </div>

              <button
                onClick={handleClose}
                type="button"
                className="shrink-0 rounded-full border border-white/12 bg-white/[0.035] px-4 py-2 text-sm text-white/78 transition hover:bg-white/10 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="relative flex min-h-0 flex-1 flex-col"
          >
            <div
              className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5"
              style={{
                paddingBottom: "calc(env(safe-area-inset-bottom) + 18px)",
              }}
            >
              <div className="space-y-4">
                <div className={sectionCard}>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                    Contact
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="Full Name">
                      <input
                        name="name"
                        placeholder="Jane Doe"
                        required
                        className={inputBase}
                      />
                    </Field>

                    <Field label="Email">
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        className={inputBase}
                      />
                    </Field>

                    <Field label="Phone (optional)">
                      <input
                        name="phone"
                        placeholder="(615) 555-1234"
                        className={inputBase}
                      />
                    </Field>

                    <Field label="Service">
                      <SelectField name="service" defaultValue="Cabinetry">
                        <option>Cabinetry</option>
                        <option>Construction Documents</option>
                        <option>As-Builts / Existing Conditions</option>
                        <option>Remodel / Design Support</option>
                        <option>Structural Framing</option>
                        <option>Not Sure</option>
                      </SelectField>
                    </Field>
                  </div>
                </div>

                <div className={sectionCard}>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                    Project
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Field label="Project Address">
                        <input
                          name="projectAddress"
                          placeholder="1234 Oak St"
                          className={inputBase}
                        />
                      </Field>
                    </div>

                    <Field label="City">
                      <input
                        name="city"
                        placeholder="Nashville"
                        className={inputBase}
                      />
                    </Field>

                    <Field label="State">
                      <input
                        name="state"
                        placeholder="TN"
                        className={inputBase}
                      />
                    </Field>

                    <Field label="ZIP">
                      <input
                        name="zip"
                        placeholder="37211"
                        className={inputBase}
                      />
                    </Field>

                    <Field label="Project Type">
                      <SelectField name="projectType" defaultValue="Kitchen">
                        <option>Kitchen</option>
                        <option>Bath</option>
                        <option>Whole Home</option>
                        <option>Addition</option>
                        <option>New Build</option>
                        <option>Other</option>
                      </SelectField>
                    </Field>
                  </div>
                </div>

                <div className={sectionCard}>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                    Timing & Budget
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Desired Start">
                      <SelectField name="desiredStart" defaultValue="ASAP">
                        <option>ASAP</option>
                        <option>2–4 weeks</option>
                        <option>1–3 months</option>
                        <option>3–6 months</option>
                        <option>6+ months</option>
                        <option>Not sure</option>
                      </SelectField>
                    </Field>

                    <Field label="Budget Range">
                      <SelectField name="budgetRange" defaultValue="$10–25k">
                        <option>$5–10k</option>
                        <option>$10–25k</option>
                        <option>$25–50k</option>
                        <option>$50–100k</option>
                        <option>$100k+</option>
                        <option>Not Sure</option>
                      </SelectField>
                    </Field>

                    <Field label="How did you hear about us?">
                      <SelectField name="heardFrom" defaultValue="Referral">
                        <option>Referral</option>
                        <option>Google</option>
                        <option>Facebook / Instagram</option>
                        <option>Builder / Contractor</option>
                        <option>Past Client</option>
                        <option>Other</option>
                      </SelectField>
                    </Field>
                  </div>
                </div>

                <div className={sectionCard}>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                    Details
                  </p>

                  <Field label="Project Details">
                    <textarea
                      name="message"
                      placeholder="Layout info, scope, finishes, timeline, and what you need help with..."
                      rows={5}
                      className={`${inputBase} min-h-[150px] resize-y`}
                    />
                  </Field>
                </div>
              </div>
            </div>

            <div className="relative shrink-0 border-t border-white/10 bg-[rgba(8,10,14,0.72)] px-4 py-3 backdrop-blur-xl sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-h-[20px] text-sm">
                  {ok ? (
                    <span className="text-emerald-400">
                      Thank you — request sent. We’ll be in touch shortly.
                    </span>
                  ) : err ? (
                    <span className="text-red-300">{err}</span>
                  ) : (
                    <span className="text-white/45">
                      We’ll review it and follow up.
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/92 disabled:opacity-50"
                >
                  {loading ? "Sending…" : "Send Request"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-white/58">
        {label}
      </span>
      {children}
    </label>
  );
}

function SelectField({
  name,
  defaultValue,
  children,
}: {
  name: string;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-[16px] border border-white/10 bg-[rgba(255,255,255,0.045)] px-4 py-3 pr-11 text-[15px] text-white outline-none transition focus:border-white/24 focus:bg-[rgba(255,255,255,0.07)]"
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
        }}
      >
        {children}
      </select>

      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55" />
    </div>
  );
}
