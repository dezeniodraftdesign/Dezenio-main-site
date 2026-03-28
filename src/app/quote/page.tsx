"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import ScrollOffsets from "../components/ScrollOffsets";

export default function QuotePage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

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
      formEl.reset();

      requestAnimationFrame(() => {
        const el = document.getElementById("project-request-form");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      setErr("Failed — try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    "w-full rounded-[16px] border border-white/12 bg-[rgba(12,14,20,0.52)] px-4 py-3 text-[15px] text-white placeholder-white/38 outline-none transition focus:border-white/26 focus:bg-[rgba(16,18,24,0.66)]";

  const cardClass =
    "rounded-[24px] border border-white/12 bg-[rgba(16,18,24,0.58)] p-5 backdrop-blur-[10px] shadow-[0_18px_40px_rgba(0,0,0,0.24)] md:p-6";

  return (
    <div
      id="top"
      className="relative text-white pb-[calc(var(--bottom-band-height,64px)+76px)] md:pb-[calc(var(--bottom-band-height,64px)+140px)]"
    >
      <ScrollOffsets />

      <div className="fixed inset-0 -z-20">
        <Image
          src="/sections/lakeshore.png"
          alt="Dezenio Draft Design background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
        <div className="absolute inset-0 bg-black/58" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/16 to-black/34" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_34%)]" />
      </div>

      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-14 pt-18 sm:px-6 md:pb-20 md:pt-28 lg:px-8">
        <section className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/74">
            Project Intake
          </p>

          <h1 className="mt-3 text-[2.2rem] font-extrabold tracking-tight leading-[1.02] text-white md:text-5xl">
            Request a quote.
          </h1>

          <p className="mt-4 text-[15px] leading-7 text-white/88 md:text-lg">
            Share your scope and we’ll respond with next steps — whether you
            need cabinetry, construction documents, remodel support, or help
            figuring out the right direction.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
            <a
              href="#project-request-form"
              className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-white/90 sm:py-2"
            >
              Start Project Request
            </a>

            <Link
              href="/services"
              className="rounded-full border border-white/28 bg-black/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:py-2"
            >
              View Services
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/28 bg-black/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:py-2"
            >
              Contact Info
            </Link>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-10">
          <div className={cardClass}>
            <h2 className="text-xl font-semibold text-white">
              What to include
            </h2>

            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/86">
              <li>
                <span className="font-semibold text-white">
                  Project address
                </span>{" "}
                + city (or area).
              </li>
              <li>
                <span className="font-semibold text-white">Scope</span> — what
                you’re changing, adding, or replacing.
              </li>
              <li>
                <span className="font-semibold text-white">
                  Plans / inspiration
                </span>{" "}
                (PDFs, screenshots, photos) if you have them.
              </li>
              <li>
                <span className="font-semibold text-white">Timeline</span> and
                whether you’re in a rush.
              </li>
              <li>
                <span className="font-semibold text-white">Budget range</span>{" "}
                (even a ballpark helps us guide options).
              </li>
            </ul>

            <p className="mt-6 text-sm leading-7 text-white/68">
              Don’t worry if you don’t have everything — submit what you can and
              we’ll guide the next steps.
            </p>
          </div>

          <div className={cardClass}>
            <h2 className="text-xl font-semibold text-white">
              What happens next
            </h2>

            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-white/86">
              <li>We review your info and any attachments.</li>
              <li>
                We follow up with questions if needed to lock scope and timing.
              </li>
              <li>
                You get a clear quote or next-step plan based on your service
                type.
              </li>
            </ol>

            <div className="mt-8">
              <a
                href="#project-request-form"
                className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 sm:py-2"
              >
                Open the Form Below
              </a>
            </div>
          </div>
        </section>

        <section
          id="project-request-form"
          className="mt-10 scroll-mt-28 md:mt-12"
        >
          <div className={cardClass}>
            {!ok ? (
              <>
                <div className="max-w-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    Project request form
                  </p>
                  <h2 className="mt-2 text-[1.8rem] font-extrabold tracking-tight text-white">
                    Tell us about the project
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/74">
                    This form covers cabinetry, construction documents, remodel
                    support, and related project needs.
                  </p>
                </div>

                <form
                  onSubmit={onSubmit}
                  className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2"
                >
                  <div className="space-y-4">
                    <SectionTitle>Contact</SectionTitle>

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

                    <Field label="Service Needed">
                      <SelectField name="service" defaultValue="Cabinetry">
                        <option>Cabinetry</option>
                        <option>Construction Documents</option>
                        <option>As-Builts / Existing Conditions</option>
                        <option>Remodel / Design Support</option>
                        <option>Structural Framing</option>
                        <option>Not Sure</option>
                      </SelectField>
                    </Field>

                    <SectionTitle>Project</SectionTitle>

                    <Field label="Project Address">
                      <input
                        name="projectAddress"
                        placeholder="1234 Oak St"
                        className={inputBase}
                      />
                    </Field>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
                    </div>

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

                  <div className="space-y-4">
                    <SectionTitle>Timing &amp; Budget</SectionTitle>

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

                    <SectionTitle>Details</SectionTitle>

                    <Field label="Project Details">
                      <textarea
                        name="message"
                        placeholder="Scope, inspiration, timeline, and what you need help with..."
                        rows={8}
                        className={`${inputBase} min-h-[180px] resize-y`}
                      />
                    </Field>
                  </div>

                  <div className="lg:col-span-2 flex flex-col gap-3 border-t border-white/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-h-[20px] text-sm">
                      {err ? (
                        <span className="text-red-300">{err}</span>
                      ) : (
                        <span className="text-white/52">
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
                </form>
              </>
            ) : (
              <div className="mx-auto max-w-2xl py-2 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                  <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                </div>

                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/52">
                  Request received
                </p>

                <h2 className="mt-2 text-[1.9rem] font-extrabold tracking-tight text-white md:text-[2.2rem]">
                  Thank you — we’ve got it.
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/76 md:text-base">
                  Your request was submitted successfully. We’ll review the
                  details and follow up shortly with the right next step.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/"
                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                  >
                    Back to Home
                  </Link>

                  <Link
                    href="/services"
                    className="rounded-full border border-white/28 bg-black/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    View Services
                  </Link>

                  <Link
                    href="/contact"
                    className="rounded-full border border-white/28 bg-black/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Contact Info
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="pt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/52">
      {children}
    </p>
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
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-white/62">
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
        className="w-full rounded-[16px] border border-white/12 bg-[rgba(12,14,20,0.52)] px-4 py-3 pr-11 text-[15px] text-white outline-none transition focus:border-white/26 focus:bg-[rgba(16,18,24,0.66)]"
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
        }}
      >
        {children}
      </select>

      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/58" />
    </div>
  );
}
